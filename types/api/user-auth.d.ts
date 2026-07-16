export type UserAccountRole = "Fleet" | "User" | "Garage" | "Supplier";

export type FirebaseSessionRequest = {
  firebaseIdToken: string;
  installationId: string;
  requestedRole?: UserAccountRole;
  requestedRoleUid?: string;
  requestedDisplayName?: string;
};

export type PasswordSessionRequest = {
  email: string;
  password: string;
  installationId: string;
};

export type UserAuthProfile = {
  id: string;
  firebaseUid: string | null;
  email: string | null;
  phone: string | null;
  firstName: string | null;
  lastName: string | null;
  avatarUrl: string | null;
  roles: string[];
  activeRole: string;
};

export type UserAuthApiSuccess = {
  ok: true;
  success: true;
  user: UserAuthProfile;
  expiresAt?: string;
};

export type UserAuthApiError = {
  ok: false;
  success: false;
  message: string;
};

export type UserAuthApiResponse = UserAuthApiSuccess | UserAuthApiError;
