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
  createdAt: number;
};

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
          ? value.displayName.trim()
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
  storage: RegistrationStorage = window.localStorage,
  now = Date.now(),
): void {
  if (!isFirebaseUid(firebaseUid)) {
    throw new Error("A valid Firebase user is required for registration.");
  }

  const existing = readPendingRegistration(storage, now);
  const normalizedDisplayName = displayName?.trim();
  const registration: PendingAccountRegistration = {
    firebaseUid: firebaseUid.trim(),
    role,
    displayName:
      normalizedDisplayName ||
      (existing?.firebaseUid === firebaseUid.trim()
        ? existing.displayName
        : undefined),
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
}: {
  role: UserAccountRole;
  fullName: string;
  businessName: string;
  acceptedTerms: boolean;
}): string {
  if (!acceptedTerms) {
    throw new Error("Accept the Terms of Service and Privacy Policy.");
  }

  const displayName = role === "User" ? fullName.trim() : businessName.trim();
  if (!displayName) {
    throw new Error(
      role === "User" ? "Enter your full name." : "Enter your business name.",
    );
  }

  return displayName;
}

