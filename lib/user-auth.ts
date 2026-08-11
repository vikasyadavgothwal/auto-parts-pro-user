import type { User } from "firebase/auth";

import {
  clearPendingAccountRegistration,
  getPendingAccountRegistration,
} from "@/lib/account-registration";
import type {
  BrowserSessionDevice,
  FirebaseSessionRequest,
  LoginVerificationRequest,
  PasswordSessionRequest,
  UserAccountRole,
  UserAuthApiResponse,
  UserAuthApiSuccess,
} from "@/types/api/user-auth";

const USER_LOGIN_PATH = "/api/auth/login";
const USER_LOGIN_VERIFY_PATH = "/api/auth/login/verify";

const getBrowserName = (userAgent: string) => {
  if (userAgent.includes("Edg/")) return "Edge";
  if (userAgent.includes("Firefox/")) return "Firefox";
  if (userAgent.includes("Chrome/") || userAgent.includes("CriOS/")) return "Chrome";
  if (userAgent.includes("Safari/")) return "Safari";
  return "Browser";
};

const getBrowserDeviceMetadata = (): BrowserSessionDevice => {
  if (typeof window === "undefined") return {};

  const userAgent = window.navigator.userAgent;
  const platform = window.navigator.platform;
  const deviceName = [
    "AutoParts Pro website",
    getBrowserName(userAgent),
    platform,
  ].filter(Boolean).join(" - ");

  return {
    deviceName,
  };
};

const withBrowserDeviceMetadata = <T extends object>(body: T): T & BrowserSessionDevice => ({
  ...getBrowserDeviceMetadata(),
  ...body,
});

const requestApplicationSession = async (
  body: FirebaseSessionRequest | PasswordSessionRequest,
): Promise<UserAuthApiResponse> => {
  const response = await fetch(USER_LOGIN_PATH, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(withBrowserDeviceMetadata(body)),
  });
  const payload = (await response.json().catch(() => null)) as
    | UserAuthApiResponse
    | null;

  if (!payload) {
    throw new Error(`Login request failed with status ${response.status}`);
  }

  return payload;
};

export async function establishApplicationSession(
  firebaseUser: User,
  forceRefresh = false,
  requestedRole?: UserAccountRole,
  requestedDisplayName?: string,
): Promise<UserAuthApiSuccess> {
  const pendingRegistration = getPendingAccountRegistration(firebaseUser.uid);
  const resolvedRole = requestedRole ?? pendingRegistration?.role;
  const resolvedDisplayName =
    requestedDisplayName?.trim() ||
    (pendingRegistration && pendingRegistration.role === resolvedRole
      ? pendingRegistration.displayName
      : undefined) ||
    (resolvedRole ? firebaseUser.displayName?.trim() : undefined);
  const firebaseIdToken = await firebaseUser.getIdToken(forceRefresh);
  const response = await requestApplicationSession({
    firebaseIdToken,
    requestedRole: resolvedRole,
    requestedRoleUid: resolvedRole ? firebaseUser.uid : undefined,
    requestedDisplayName: resolvedDisplayName,
    requestedSupplierContactPerson:
      resolvedRole === "Supplier"
        ? pendingRegistration?.supplierContactPerson
        : undefined,
    requestedSupplierDesignation:
      resolvedRole === "Supplier"
        ? pendingRegistration?.supplierDesignation
        : undefined,
    requestedSupplierPhone:
      resolvedRole === "Supplier" ? pendingRegistration?.supplierPhone : undefined,
  });

  if (!response.ok) {
    throw new Error(response.message);
  }

  clearPendingAccountRegistration(firebaseUser.uid);

  return response;
}

export async function establishPasswordApplicationSession(
  email: string,
  password: string,
): Promise<UserAuthApiSuccess> {
  const response = await requestApplicationSession({
    email: email.trim(),
    password,
  });

  if (!response.ok) {
    throw new Error(response.message);
  }

  return response;
}

export async function verifyBusinessLoginSession(input: {
  challengeId: string;
  code: string;
  method: "otp" | "pin";
}): Promise<UserAuthApiSuccess> {
  const response = await fetch(USER_LOGIN_VERIFY_PATH, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(withBrowserDeviceMetadata<LoginVerificationRequest>(input)),
  });
  const payload = (await response.json().catch(() => null)) as
    | UserAuthApiResponse
    | null;

  if (!payload) throw new Error(`Login verification failed with status ${response.status}`);
  if (!payload.ok) throw new Error(payload.message);
  return payload;
}
