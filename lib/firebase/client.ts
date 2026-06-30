import { getApp, getApps, initializeApp } from "firebase/app";
import {
  getAuth,
  sendEmailVerification,
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

export function getFirebaseClientAuth(): Auth {
  if (requiredConfig.some((value) => !value?.trim())) {
    throw new Error("Firebase client authentication is not configured.");
  }

  const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  return getAuth(app);
}

const getVerificationContinueUrl = (
  firebaseUid: string,
  role?: UserAccountRole,
): string => {
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const siteUrl = configuredSiteUrl || window.location.origin;
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
