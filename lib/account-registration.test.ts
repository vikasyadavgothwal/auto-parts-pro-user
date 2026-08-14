import { describe, expect, it } from "vitest";

import {
  clearPendingAccountRegistration,
  getPendingAccountRegistration,
  readRegistrationFromSearch,
  setPendingAccountRegistration,
  validateSignupDetails,
} from "./account-registration";

const createStorage = () => {
  const values = new Map<string, string>();

  return {
    values,
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => values.set(key, value),
    removeItem: (key: string) => values.delete(key),
  };
};

describe("pending account registration", () => {
  it("returns registration only for the matching Firebase user", () => {
    const storage = createStorage();
    const now = Date.now();
    setPendingAccountRegistration(
      "supplier-uid",
      "Supplier",
      "Acme Parts",
      storage,
      now,
    );

    expect(getPendingAccountRegistration("other-uid", storage, now)).toBeUndefined();
    expect(getPendingAccountRegistration("supplier-uid", storage, now)).toMatchObject({
      firebaseUid: "supplier-uid",
      role: "Supplier",
      displayName: "Acme Parts",
    });
  });

  it("stores supplier registration contact details", () => {
    const storage = createStorage();
    const now = Date.now();
    setPendingAccountRegistration(
      "supplier-uid",
      "Supplier",
      "Acme Parts",
      {
        contactPerson: "  Dana Manager  ",
        designation: "  Operations Lead  ",
        phone: "+971501234567",
      },
      storage,
      now,
    );

    expect(getPendingAccountRegistration("supplier-uid", storage, now)).toMatchObject({
      supplierContactPerson: "Dana Manager",
      supplierDesignation: "Operations Lead",
      supplierPhone: "+971501234567",
    });
  });

  it("does not clear another user's pending registration", () => {
    const storage = createStorage();
    setPendingAccountRegistration(
      "fleet-uid",
      "Fleet",
      "Road Fleet",
      storage,
    );

    clearPendingAccountRegistration("other-uid", storage);
    expect(getPendingAccountRegistration("fleet-uid", storage)).toBeDefined();

    clearPendingAccountRegistration("fleet-uid", storage);
    expect(getPendingAccountRegistration("fleet-uid", storage)).toBeUndefined();
  });

  it("preserves the signup name when the verification URL refreshes the intent", () => {
    const storage = createStorage();
    const now = Date.now();
    setPendingAccountRegistration(
      "garage-uid",
      "Garage",
      "City Garage",
      storage,
      now,
    );
    setPendingAccountRegistration(
      "garage-uid",
      "Garage",
      undefined,
      storage,
      now + 1,
    );

    expect(
      getPendingAccountRegistration("garage-uid", storage, now + 1)?.displayName,
    ).toBe("City Garage");
  });

  it("removes expired and malformed values", () => {
    const storage = createStorage();
    setPendingAccountRegistration("user-uid", "User", "Alex", storage, 1);

    expect(
      getPendingAccountRegistration(
        "user-uid",
        storage,
        8 * 24 * 60 * 60 * 1000,
      ),
    ).toBeUndefined();
    expect(storage.values.size).toBe(0);

    storage.setItem("auto-parts-pro-pending-registration", "legacy-role-value");
    expect(getPendingAccountRegistration("user-uid", storage)).toBeUndefined();
    expect(storage.values.size).toBe(0);
  });
});

describe("verification registration parameters", () => {
  it("restores a valid UID-bound role from the verification URL", () => {
    expect(
      readRegistrationFromSearch("?uid=fleet-uid&role=Fleet"),
    ).toEqual({ firebaseUid: "fleet-uid", role: "Fleet" });
  });

  it("rejects missing, invalid, or oversized registration parameters", () => {
    expect(readRegistrationFromSearch("?role=Supplier")).toBeUndefined();
    expect(readRegistrationFromSearch("?uid=user-uid&role=Admin")).toBeUndefined();
    expect(
      readRegistrationFromSearch(`?uid=${"a".repeat(129)}&role=Garage`),
    ).toBeUndefined();
  });
});

describe("signup validation", () => {
  it("requires terms for every signup method", () => {
    expect(() =>
      validateSignupDetails({
        role: "Supplier",
        fullName: "",
        businessName: "Acme Parts",
        acceptedTerms: false,
      }),
    ).toThrow("Accept the Terms of Service and Privacy Policy.");
  });

  it("uses personal names for users and business names for business roles", () => {
    expect(
      validateSignupDetails({
        role: "User",
        fullName: "  Alex Doe  ",
        businessName: "",
        acceptedTerms: true,
      }),
    ).toBe("Alex Doe");
    expect(
      validateSignupDetails({
        role: "Garage",
        fullName: "",
        businessName: "  City Garage  ",
        acceptedTerms: true,
      }),
    ).toBe("City Garage");
  });

  it("rejects an empty business name", () => {
    expect(() =>
      validateSignupDetails({
        role: "Fleet",
        fullName: "Alex Doe",
        businessName: " ",
        acceptedTerms: true,
      }),
    ).toThrow("Enter your business name.");
  });

  it("rejects one-character and punctuation-only account names", () => {
    expect(() =>
      validateSignupDetails({
        role: "User",
        fullName: "A",
        businessName: "",
        acceptedTerms: true,
      }),
    ).toThrow("Full name must contain at least 2 meaningful characters.");
    expect(() =>
      validateSignupDetails({
        role: "Garage",
        fullName: "",
        businessName: "--",
        acceptedTerms: true,
      }),
    ).toThrow("Business name must contain at least 2 meaningful characters.");
  });

  it("requires supplier contact details and international phone", () => {
    expect(() =>
      validateSignupDetails({
        role: "Supplier",
        fullName: "",
        businessName: "Acme Parts",
        acceptedTerms: true,
        supplierContactPerson: "Dana Manager",
        supplierDesignation: "Operations Lead",
        supplierPhone: "0501234567",
      }),
    ).toThrow("Enter a valid supplier phone number with country code.");

    expect(
      validateSignupDetails({
        role: "Supplier",
        fullName: "",
        businessName: "Acme Parts",
        acceptedTerms: true,
        supplierContactPerson: "Dana Manager",
        supplierDesignation: "Operations Lead",
        supplierPhone: "+971501234567",
      }),
    ).toBe("Acme Parts");
  });
});
