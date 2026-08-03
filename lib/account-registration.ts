import type { UserAccountRole } from "@/types/api/user-auth";

const PENDING_REGISTRATION_KEY = "auto-parts-pro-pending-registration";
const REGISTRATION_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

const ACCOUNT_ROLES = new Set<UserAccountRole>([
  "Fleet",
  "User",
  "Garage",
  "Supplier",
]);

type RegistrationStorage = Pick<
  Storage,
  "getItem" | "setItem" | "removeItem"
>;

export type PendingAccountRegistration = {
  firebaseUid: string;
  role: UserAccountRole;
  displayName?: string;
  supplierContactPerson?: string;
  supplierDesignation?: string;
  supplierPhone?: string;
  createdAt: number;
};

export type SupplierSignupDetails = {
  contactPerson: string;
  designation: string;
  phone: string;
};

const TEXT_FIELD_LIMIT = 100;
const BUSINESS_NAME_LIMIT = 120;
const SUPPLIER_DESIGNATION_LIMIT = 80;
const SUPPLIER_PHONE_PATTERN = /^\+[1-9]\d{6,14}$/;

const sanitizeSingleLine = (value: string, maximum: number) =>
  value.replace(/[\r\n\t]+/g, " ").replace(/\s+/g, " ").trim().slice(0, maximum);

const isAccountRole = (value: unknown): value is UserAccountRole =>
  typeof value === "string" &&
  ACCOUNT_ROLES.has(value as UserAccountRole);

const isFirebaseUid = (value: unknown): value is string =>
  typeof value === "string" &&
  value.trim().length > 0 &&
  value.trim().length <= 128;

const readPendingRegistration = (
  storage: RegistrationStorage,
  now: number,
): PendingAccountRegistration | undefined => {
  const serialized = storage.getItem(PENDING_REGISTRATION_KEY);
  if (!serialized) {
    return undefined;
  }

  try {
    const value = JSON.parse(serialized) as Partial<PendingAccountRegistration>;
    if (
      !isFirebaseUid(value.firebaseUid) ||
      !isAccountRole(value.role) ||
      typeof value.createdAt !== "number" ||
      now - value.createdAt > REGISTRATION_MAX_AGE_MS
    ) {
      storage.removeItem(PENDING_REGISTRATION_KEY);
      return undefined;
    }

    return {
      firebaseUid: value.firebaseUid.trim(),
      role: value.role,
      displayName:
        typeof value.displayName === "string" && value.displayName.trim()
          ? sanitizeSingleLine(value.displayName, BUSINESS_NAME_LIMIT)
          : undefined,
      supplierContactPerson:
        typeof value.supplierContactPerson === "string" &&
        value.supplierContactPerson.trim()
          ? sanitizeSingleLine(value.supplierContactPerson, TEXT_FIELD_LIMIT)
          : undefined,
      supplierDesignation:
        typeof value.supplierDesignation === "string" &&
        value.supplierDesignation.trim()
          ? sanitizeSingleLine(value.supplierDesignation, SUPPLIER_DESIGNATION_LIMIT)
          : undefined,
      supplierPhone:
        typeof value.supplierPhone === "string" && value.supplierPhone.trim()
          ? sanitizeSingleLine(value.supplierPhone, 20)
          : undefined,
      createdAt: value.createdAt,
    };
  } catch {
    storage.removeItem(PENDING_REGISTRATION_KEY);
    return undefined;
  }
};

export function setPendingAccountRegistration(
  firebaseUid: string,
  role: UserAccountRole,
  displayName?: string,
  supplierDetailsOrStorage?: SupplierSignupDetails | RegistrationStorage,
  storageOrNow?: RegistrationStorage | number,
  nowMaybe?: number,
): void {
  if (!isFirebaseUid(firebaseUid)) {
    throw new Error("A valid Firebase user is required for registration.");
  }

  const supplierDetails =
    supplierDetailsOrStorage &&
    "contactPerson" in supplierDetailsOrStorage &&
    "designation" in supplierDetailsOrStorage &&
    "phone" in supplierDetailsOrStorage
      ? supplierDetailsOrStorage
      : undefined;
  const storage =
    supplierDetailsOrStorage && "getItem" in supplierDetailsOrStorage
      ? supplierDetailsOrStorage
      : storageOrNow && typeof storageOrNow !== "number"
        ? storageOrNow
        : window.localStorage;
  const now =
    typeof storageOrNow === "number"
      ? storageOrNow
      : typeof nowMaybe === "number"
        ? nowMaybe
        : Date.now();

  const existing = readPendingRegistration(storage, now);
  const normalizedDisplayName = displayName?.trim();
  const existingSupplierDetails =
    existing?.firebaseUid === firebaseUid.trim()
      ? {
          contactPerson: existing.supplierContactPerson,
          designation: existing.supplierDesignation,
          phone: existing.supplierPhone,
        }
      : undefined;
  const normalizedSupplierDetails =
    role === "Supplier" ? supplierDetails ?? existingSupplierDetails : undefined;
  const registration: PendingAccountRegistration = {
    firebaseUid: firebaseUid.trim(),
    role,
    displayName:
      (normalizedDisplayName
        ? sanitizeSingleLine(normalizedDisplayName, BUSINESS_NAME_LIMIT)
        : "") ||
      (existing?.firebaseUid === firebaseUid.trim()
        ? existing.displayName
        : undefined),
    supplierContactPerson:
      normalizedSupplierDetails?.contactPerson,
    supplierDesignation: normalizedSupplierDetails?.designation,
    supplierPhone: normalizedSupplierDetails?.phone,
    createdAt: now,
  };

  storage.setItem(PENDING_REGISTRATION_KEY, JSON.stringify(registration));
}

export function getPendingAccountRegistration(
  firebaseUid: string,
  storage: RegistrationStorage = window.localStorage,
  now = Date.now(),
): PendingAccountRegistration | undefined {
  const registration = readPendingRegistration(storage, now);
  return registration?.firebaseUid === firebaseUid.trim()
    ? registration
    : undefined;
}

export function clearPendingAccountRegistration(
  firebaseUid: string,
  storage: RegistrationStorage = window.localStorage,
): void {
  const registration = readPendingRegistration(storage, Date.now());
  if (registration?.firebaseUid === firebaseUid.trim()) {
    storage.removeItem(PENDING_REGISTRATION_KEY);
  }
}

export function readRegistrationFromSearch(
  search: string,
): Pick<PendingAccountRegistration, "firebaseUid" | "role"> | undefined {
  const parameters = new URLSearchParams(search);
  const firebaseUid = parameters.get("uid");
  const role = parameters.get("role");

  return isFirebaseUid(firebaseUid) && isAccountRole(role)
    ? { firebaseUid: firebaseUid.trim(), role }
    : undefined;
}

export function validateSignupDetails({
  role,
  fullName,
  businessName,
  acceptedTerms,
  supplierContactPerson,
  supplierDesignation,
  supplierPhone,
}: {
  role: UserAccountRole;
  fullName: string;
  businessName: string;
  acceptedTerms: boolean;
  supplierContactPerson?: string;
  supplierDesignation?: string;
  supplierPhone?: string;
}): string {
  if (!acceptedTerms) {
    throw new Error("Accept the Terms of Service and Privacy Policy.");
  }

  const displayName =
    role === "User"
      ? sanitizeSingleLine(fullName, TEXT_FIELD_LIMIT)
      : sanitizeSingleLine(businessName, BUSINESS_NAME_LIMIT);
  if (!displayName) {
    throw new Error(
      role === "User" ? "Enter your full name." : "Enter your business name.",
    );
  }

  if (role === "Supplier") {
    const contactPerson = sanitizeSingleLine(
      supplierContactPerson ?? "",
      TEXT_FIELD_LIMIT,
    );
    const designation = sanitizeSingleLine(
      supplierDesignation ?? "",
      SUPPLIER_DESIGNATION_LIMIT,
    );
    const phone = sanitizeSingleLine(supplierPhone ?? "", 20);
    if (!contactPerson) {
      throw new Error("Enter the authorized person's name.");
    }
    if (!designation) {
      throw new Error("Enter the authorized person's designation.");
    }
    if (!SUPPLIER_PHONE_PATTERN.test(phone)) {
      throw new Error("Enter a valid supplier phone number with country code.");
    }
  }

  return displayName;
}

export function normalizeSupplierSignupDetails({
  contactPerson,
  designation,
  phone,
}: SupplierSignupDetails): SupplierSignupDetails {
  return {
    contactPerson: sanitizeSingleLine(contactPerson, TEXT_FIELD_LIMIT),
    designation: sanitizeSingleLine(designation, SUPPLIER_DESIGNATION_LIMIT),
    phone: sanitizeSingleLine(phone, 20),
  };
}
