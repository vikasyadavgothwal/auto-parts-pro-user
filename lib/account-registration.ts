import type { UserAccountRole } from "@/types/api/user-auth";
import { z } from "zod";

const PENDING_REGISTRATION_KEY = "auto-parts-pro-pending-registration";
const REGISTRATION_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
const ACCOUNT_ROLES = ["Fleet", "User", "Garage", "Supplier"] as const;
const ACCOUNT_ROLE_SET = new Set<UserAccountRole>(ACCOUNT_ROLES);

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

const accountSignupValidationSchema = z
  .object({
    role: z.enum(ACCOUNT_ROLES),
    fullName: z
      .string()
      .transform((value) => sanitizeSingleLine(value, TEXT_FIELD_LIMIT)),
    businessName: z
      .string()
      .transform((value) => sanitizeSingleLine(value, BUSINESS_NAME_LIMIT)),
    acceptedTerms: z.boolean(),
    supplierContactPerson: z
      .string()
      .transform((value) => sanitizeSingleLine(value, TEXT_FIELD_LIMIT))
      .optional(),
    supplierDesignation: z
      .string()
      .transform((value) => sanitizeSingleLine(value, SUPPLIER_DESIGNATION_LIMIT))
      .optional(),
    supplierPhone: z
      .string()
      .transform((value) => sanitizeSingleLine(value, 20))
      .optional(),
  })
  .superRefine((value, context) => {
    if (!value.acceptedTerms) {
      context.addIssue({
        code: "custom",
        path: ["acceptedTerms"],
        message: "Accept the Terms of Service and Privacy Policy.",
      });
      return;
    }

    const displayName =
      value.role === "User" ? value.fullName : value.businessName;
    if (!displayName) {
      context.addIssue({
        code: "custom",
        path: [value.role === "User" ? "fullName" : "businessName"],
        message:
          value.role === "User"
            ? "Enter your full name."
            : "Enter your business name.",
      });
      return;
    }
    if (displayName.length < 2 || !/[\p{L}\p{N}]/u.test(displayName)) {
      context.addIssue({
        code: "custom",
        path: [value.role === "User" ? "fullName" : "businessName"],
        message:
          value.role === "User"
            ? "Full name must contain at least 2 meaningful characters."
            : "Business name must contain at least 2 meaningful characters.",
      });
      return;
    }

    if (value.role !== "Supplier") {
      return;
    }

    if (!value.supplierContactPerson) {
      context.addIssue({
        code: "custom",
        path: ["supplierContactPerson"],
        message: "Enter the authorized person's name.",
      });
      return;
    }
    if (
      value.supplierContactPerson.length < 2 ||
      !/[\p{L}\p{N}]/u.test(value.supplierContactPerson)
    ) {
      context.addIssue({
        code: "custom",
        path: ["supplierContactPerson"],
        message:
          "Authorized person name must contain at least 2 meaningful characters.",
      });
      return;
    }

    if (!value.supplierDesignation) {
      context.addIssue({
        code: "custom",
        path: ["supplierDesignation"],
        message: "Enter the authorized person's designation.",
      });
      return;
    }
    if (
      value.supplierDesignation.length < 2 ||
      !/[\p{L}\p{N}]/u.test(value.supplierDesignation)
    ) {
      context.addIssue({
        code: "custom",
        path: ["supplierDesignation"],
        message: "Designation must contain at least 2 meaningful characters.",
      });
      return;
    }

    if (!SUPPLIER_PHONE_PATTERN.test(value.supplierPhone ?? "")) {
      context.addIssue({
        code: "custom",
        path: ["supplierPhone"],
        message: "Enter a valid supplier phone number with country code.",
      });
    }
  });

const sanitizeSingleLine = (value: string, maximum: number) =>
  value.replace(/[\r\n\t]+/g, " ").replace(/\s+/g, " ").trim().slice(0, maximum);

const isAccountRole = (value: unknown): value is UserAccountRole =>
  typeof value === "string" &&
  ACCOUNT_ROLE_SET.has(value as UserAccountRole);

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
  const validation = accountSignupValidationSchema.safeParse({
    role,
    fullName,
    businessName,
    acceptedTerms,
    supplierContactPerson,
    supplierDesignation,
    supplierPhone,
  });

  if (!validation.success) {
    throw new Error(validation.error.issues[0]?.message ?? "Check the required fields.");
  }

  return validation.data.role === "User"
    ? validation.data.fullName
    : validation.data.businessName;
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
