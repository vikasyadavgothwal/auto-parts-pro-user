import type { User } from "firebase/auth";

import {
  clearPendingAccountRegistration,
  getPendingAccountRegistration,
} from "@/lib/account-registration";
import type {
  FirebaseSessionRequest,
  PasswordSessionRequest,
  UserAccountRole,
  UserAuthApiResponse,
  UserAuthApiSuccess,
} from "@/types/api/user-auth";

const USER_LOGIN_PATH = "/api/auth/login";
const INSTALLATION_ID_KEY = "auto-parts-pro-installation-id";

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
    body: JSON.stringify(body),
  });
  const payload = (await response.json().catch(() => null)) as
    | UserAuthApiResponse
    | null;

  if (!payload) {
    throw new Error(`Login request failed with status ${response.status}`);
  }

  return payload;
};

const createInstallationId = (): string => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `device-${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

export function getInstallationId(): string {
  const existing = window.localStorage.getItem(INSTALLATION_ID_KEY);
  if (existing) {
    return existing;
  }

  const installationId = createInstallationId();
  window.localStorage.setItem(INSTALLATION_ID_KEY, installationId);
  return installationId;
}

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
    installationId: getInstallationId(),
    requestedRole: resolvedRole,
    requestedRoleUid: resolvedRole ? firebaseUser.uid : undefined,
    requestedDisplayName: resolvedDisplayName,
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
    installationId: getInstallationId(),
  });

  if (!response.ok) {
    throw new Error(response.message);
  }

  return response;
}
