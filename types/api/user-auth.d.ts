export type UserAccountRole = "Fleet" | "User" | "Garage" | "Supplier";

export type BrowserSessionDevice = {
  deviceName?: string;
  deviceIdentifier?: string;
  deviceMacAddress?: string;
};

export type FirebaseSessionRequest = BrowserSessionDevice & {
  firebaseIdToken: string;
  requestedRole?: UserAccountRole;
  requestedRoleUid?: string;
  requestedDisplayName?: string;
  requestedSupplierContactPerson?: string;
  requestedSupplierDesignation?: string;
  requestedSupplierPhone?: string;
};

export type PasswordSessionRequest = BrowserSessionDevice & {
  email: string;
  password: string;
};

export type LoginVerificationRequest = BrowserSessionDevice & {
  challengeId: string;
  code: string;
  method: "otp" | "pin";
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
  mfa?: {
    challengeId: string;
    method: "otp" | "pin_or_otp";
    planCode: "Free" | "Pro" | "Enterprise";
    hasPin: boolean;
    message: string;
  };
};

export type UserAuthApiError = {
  ok: false;
  success: false;
  message: string;
};

export type UserAuthApiResponse = UserAuthApiSuccess | UserAuthApiError;
