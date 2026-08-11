import { getApp, getApps, initializeApp } from "firebase/app";
import {
  getAuth,
  inMemoryPersistence,
  sendPasswordResetEmail,
  sendEmailVerification,
  setPersistence,
  type ActionCodeSettings,
  type Auth,
  type User,
} from "firebase/auth";

import type { UserAccountRole } from "@/types/api/user-auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const requiredConfig = [
  firebaseConfig.apiKey,
  firebaseConfig.authDomain,
  firebaseConfig.projectId,
  firebaseConfig.appId,
];

const getMainSiteOrigin = (): string => {
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configuredSiteUrl) {
    try {
      const configuredUrl = new URL(configuredSiteUrl);
      if (configuredUrl.hostname === window.location.hostname) {
        return configuredUrl.origin;
      }
    } catch {
      // Keep browser-local origin if the configured URL is temporarily malformed.
    }
  }

  return window.location.origin;
};

export function getFirebaseClientAuth(): Auth {
  if (requiredConfig.some((value) => !value?.trim())) {
    throw new Error("Firebase client authentication is not configured.");
  }

  const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  return getAuth(app);
}

export async function getEphemeralFirebaseClientAuth(): Promise<Auth> {
  const auth = getFirebaseClientAuth();
  await setPersistence(auth, inMemoryPersistence);
  return auth;
}

export function getFirebaseAuthDiagnostics() {
  return {
    origin: typeof window === "undefined" ? "server" : window.location.origin,
    authDomain: firebaseConfig.authDomain ?? "",
    projectId: firebaseConfig.projectId ?? "",
    apiKeyHint: firebaseConfig.apiKey
      ? `${firebaseConfig.apiKey.slice(0, 6)}...${firebaseConfig.apiKey.slice(-4)}`
      : "",
  };
}

const getVerificationContinueUrl = (
  firebaseUid: string,
  role?: UserAccountRole,
): string => {
  const siteUrl = getMainSiteOrigin();
  const url = new URL("/auth/email-verified", siteUrl);

  url.searchParams.set("uid", firebaseUid);

  if (role) {
    url.searchParams.set("role", role);
  }

  return url.toString();
};

export async function sendUserEmailVerification(
  user: User,
  role?: UserAccountRole,
): Promise<void> {
  const actionCodeSettings: ActionCodeSettings = {
    url: getVerificationContinueUrl(user.uid, role),
    handleCodeInApp: false,
  };

  await sendEmailVerification(user, actionCodeSettings);
}

export async function sendUserPasswordResetEmail(email: string): Promise<void> {
  const siteUrl = getMainSiteOrigin();
  const continueUrl = `${siteUrl.replace(/\/+$/, "")}/?auth=signin`;
  const actionCodeSettings: ActionCodeSettings = {
    url: continueUrl,
    handleCodeInApp: false,
  };

  await sendPasswordResetEmail(
    getFirebaseClientAuth(),
    email,
    actionCodeSettings,
  );
}
