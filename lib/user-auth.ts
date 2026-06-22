import type { User } from "firebase/auth";

import { apiInterpreter } from "@/lib/api/client";
import type {
  FirebaseSessionRequest,
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
): Promise<UserAuthApiSuccess> {
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
    },
  });

  if (!response.ok) {
    throw new Error(response.message);
  }

  return response;
}
