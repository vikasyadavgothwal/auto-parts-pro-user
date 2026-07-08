import type { User } from "firebase/auth";

import {
  clearPendingAccountRegistration,
  getPendingAccountRegistration,
} from "@/lib/account-registration";
import { apiInterpreter } from "@/lib/api/client";
import type {
  FirebaseSessionRequest,
  UserAccountRole,
  UserAuthApiResponse,
  UserAuthApiSuccess,
} from "@/types/api/user-auth";

const USER_LOGIN_PATH = "/api/v1/user/auth/login";
const INSTALLATION_ID_KEY = "auto-parts-pro-installation-id";

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
  const response = await apiInterpreter.public<
    UserAuthApiResponse,
    FirebaseSessionRequest
  >(USER_LOGIN_PATH, {
    method: "POST",
    credentials: "include",
    body: {
      firebaseIdToken,
      installationId: getInstallationId(),
      requestedRole: resolvedRole,
      requestedRoleUid: resolvedRole ? firebaseUser.uid : undefined,
      requestedDisplayName: resolvedDisplayName,
    },
  });

  if (!response.ok) {
    throw new Error(response.message);
  }

  clearPendingAccountRegistration(firebaseUser.uid);

  return response;
}
