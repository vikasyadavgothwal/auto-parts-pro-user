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
