"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  RecaptchaVerifier,
  reload,
  signOut,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithPhoneNumber,
  updateProfile,
  type ConfirmationResult,
  type User,
} from "firebase/auth";

import { CloseIcon } from "@/components/icons/site-icons";
import { AuthCompleteAccount } from "@/components/site/auth/auth-complete-account";
import { AuthLoginEmail } from "@/components/site/auth/auth-login-email";
import { AuthLoginPhoneSend } from "@/components/site/auth/auth-login-phone-send";
import { AuthLoginPhoneVerify } from "@/components/site/auth/auth-login-phone-verify";
import { AuthRegister } from "@/components/site/auth/auth-register";
import { AuthResetPassword } from "@/components/site/auth/auth-reset-password";
import type { AccountType } from "@/components/site/auth/auth-shared";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  buildInternationalPhoneNumber,
  isValidNationalPhoneNumber,
} from "@/components/site/shared/country-phone-input";
import { ApiRequestError } from "@/lib/api/client";
import {
  getPendingAccountRegistration,
  setPendingAccountRegistration,
  validateSignupDetails,
} from "@/lib/account-registration";
import {
  getFirebaseAuthDiagnostics,
  getFirebaseClientAuth,
  sendUserPasswordResetEmail,
  sendUserEmailVerification,
} from "@/lib/firebase/client";
import {
  establishApplicationSession,
  establishPasswordApplicationSession,
} from "@/lib/user-auth";
import { dashboardUrlForRole } from "@/lib/current-user";

type AuthMode = "signin" | "signup" | "reset";
type LoginMethod = "email" | "phone";

const VERIFIED_ACCOUNT_ROLE_REQUIRED_MESSAGE =
  "Choose an account type to finish creating your account";

type AuthModalCardProps = {
  onAuthenticated?: () => void;
  onClose?: () => void;
};

const getAuthErrorMessage = (error: unknown): string => {
  const diagnostics = getFirebaseAuthDiagnostics();
  const origin =
    diagnostics.origin === "server" ? "this domain" : diagnostics.origin;

  if (
    error instanceof Error &&
    error.message.includes("reCAPTCHA has already been rendered")
  ) {
    return "Phone verification is already initialized. Refresh the page and try again.";
  }

  if (error instanceof ApiRequestError) {
    return error.message;
  }

  if (!(error instanceof FirebaseError)) {
    return error instanceof Error
      ? error.message
      : "Unable to authenticate. Please try again.";
  }

  if (error.code.startsWith("auth/requests-from-referer-")) {
    return `Firebase blocked requests from ${origin}. Add ${origin}/* to the Google Cloud API key HTTP referrers for this Firebase project's Web API key.`;
  }

  const messages: Record<string, string> = {
    "auth/email-already-in-use": "An account already exists with this email.",
    "auth/invalid-credential": "The email or password is incorrect.",
    "auth/invalid-email": "Enter a valid email address.",
    "auth/app-not-authorized":
      "This domain is not authorized for Firebase Authentication.",
    "auth/captcha-check-failed": "Phone verification failed. Try again.",
    "auth/code-expired":
      "The verification code has expired. Request a new code.",
    "auth/credential-already-in-use":
      "This phone number is already linked to another account.",
    "auth/invalid-phone-number":
      "Enter a valid phone number with country code.",
    "auth/invalid-verification-code": "The verification code is incorrect.",
    "auth/missing-app-credential":
      "Phone verification could not start. Refresh the page and try again.",
    "auth/invalid-app-credential": `Phone verification is blocked for ${origin}. Add this domain in Firebase Auth Authorized domains and, if your Firebase API key is restricted, add ${origin}/* in Google Cloud API key HTTP referrers.`,
    "auth/missing-phone-number": "Enter your phone number with country code.",
    "auth/network-request-failed":
      "Network error while contacting Firebase. Check your connection and try again.",
    "auth/operation-not-allowed":
      "Phone sign-in is not enabled for this Firebase project.",
    "auth/popup-closed-by-user": "Google sign-in was cancelled.",
    "auth/quota-exceeded":
      "Firebase SMS quota is exceeded. Try again later or use a test phone number.",
    "auth/too-many-requests": "Too many attempts. Please try again later.",
    "auth/unauthorized-continue-uri":
      "The verification redirect domain is not authorized in Firebase.",
    "auth/invalid-continue-uri": "The verification redirect URL is not valid.",
    "auth/weak-password": "Choose a stronger password.",
    "auth/web-storage-unsupported":
      "This browser is blocking Firebase storage. Enable cookies/storage and try again.",
  };

  return (
    messages[error.code] ??
    `${error.message || "Unable to authenticate. Please try again."} (${error.code})`
  );
};

const logFirebaseAuthError = (error: unknown) => {
  if (
    error instanceof FirebaseError &&
    (error.code === "auth/invalid-app-credential" ||
      error.code.startsWith("auth/requests-from-referer-"))
  ) {
    console.warn("Firebase phone auth app verifier rejected", {
      ...getFirebaseAuthDiagnostics(),
      code: error.code,
      message: error.message,
    });
  }
};

const isVerifiedAccountRoleRequired = (error: unknown) =>
  error instanceof Error &&
  error.message === VERIFIED_ACCOUNT_ROLE_REQUIRED_MESSAGE;

export function AuthModalCard({
  onAuthenticated,
  onClose,
}: AuthModalCardProps) {
  const router = useRouter();
  const recaptchaVerifier = useRef<RecaptchaVerifier | null>(null);
  const [mode, setMode] = useState<AuthMode>("signin");
  const [loginMethod, setLoginMethod] = useState<LoginMethod>("email");
  const [showPassword, setShowPassword] = useState(false);
  const [accountType, setAccountType] = useState<AccountType>("User");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [phoneCountryCode, setPhoneCountryCode] = useState("+971");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [verificationUser, setVerificationUser] = useState<User | null>(null);
  const [pendingVerifiedUser, setPendingVerifiedUser] = useState<User | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    return () => {
      recaptchaVerifier.current?.clear();
      recaptchaVerifier.current = null;
    };
  }, []);

  const clearPhoneRecaptchaVerifier = () => {
    recaptchaVerifier.current?.clear();
    recaptchaVerifier.current = null;
    document.getElementById("firebase-phone-recaptcha")?.replaceChildren();
  };

  const getPhoneRecaptchaVerifier = () => {
    clearPhoneRecaptchaVerifier();
    const verifier = new RecaptchaVerifier(
      getFirebaseClientAuth(),
      "firebase-phone-recaptcha",
      { size: "invisible" },
    );
    recaptchaVerifier.current = verifier;
    return verifier;
  };

  const resetFeedback = () => {
    setErrorMessage("");
    setStatusMessage("");
  };

  const finishAuthentication = async (
    user: User,
    forceRefresh = false,
    requestedRole?: AccountType,
    requestedDisplayName?: string,
  ) => {
    const session = await establishApplicationSession(
      user,
      forceRefresh,
      requestedRole,
      requestedDisplayName,
    );
    if (session.user.activeRole !== "User") {
      await signOut(getFirebaseClientAuth()).catch(() => undefined);
      window.location.assign(dashboardUrlForRole(session.user.activeRole));
      return;
    }
    router.refresh();
    onAuthenticated?.();
    onClose?.();
  };

  const finishPasswordAuthentication = async () => {
    const session = await establishPasswordApplicationSession(email, password);
    if (session.user.activeRole !== "User") {
      await signOut(getFirebaseClientAuth()).catch(() => undefined);
      window.location.assign(dashboardUrlForRole(session.user.activeRole));
      return;
    }
    router.refresh();
    onAuthenticated?.();
    onClose?.();
  };

  const finishVerifiedProviderAuthentication = async (
    user: User,
    forceRefresh = true,
    requestedRole?: AccountType,
    requestedDisplayName?: string,
  ) => {
    try {
      await finishAuthentication(
        user,
        forceRefresh,
        requestedRole,
        requestedDisplayName,
      );
    } catch (error) {
      if (!requestedRole && isVerifiedAccountRoleRequired(error)) {
        setPendingVerifiedUser(user);
        setVerificationUser(null);
        setConfirmationResult(null);
        setOtp("");
        setMode("signup");
        setStatusMessage(VERIFIED_ACCOUNT_ROLE_REQUIRED_MESSAGE);
        return;
      }

      throw error;
    }
  };

  const runAuthAction = async (action: () => Promise<void>) => {
    resetFeedback();
    setIsSubmitting(true);

    try {
      await action();
    } catch (error) {
      logFirebaseAuthError(error);
      setErrorMessage(getAuthErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    void runAuthAction(async () => {
      const auth = getFirebaseClientAuth();

      if (mode === "signin") {
        let credential;
        try {
          credential = await signInWithEmailAndPassword(
            auth,
            email.trim(),
            password,
          );
        } catch (firebaseError) {
          try {
            await finishPasswordAuthentication();
            return;
          } catch {
            throw firebaseError;
          }
        }
        await reload(credential.user);

        if (!credential.user.emailVerified) {
          setVerificationUser(credential.user);
          throw new Error(
            "Verify your email using the link we sent before signing in.",
          );
        }

        setVerificationUser(null);
        await finishVerifiedProviderAuthentication(credential.user, true);
        return;
      }

      const displayName = validateSignupDetails({
        role: accountType,
        fullName,
        businessName,
        acceptedTerms,
      });

      const credential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );
      await updateProfile(credential.user, { displayName });
      setPendingAccountRegistration(
        credential.user.uid,
        accountType,
        displayName,
      );
      await sendUserEmailVerification(credential.user, accountType);
      setVerificationUser(credential.user);
      setMode("signin");
      setPassword("");
      setStatusMessage(
        "Verification email sent. Open the link in your inbox, then return here.",
      );
    });
  };

  const handleResendVerification = () => {
    void runAuthAction(async () => {
      if (!verificationUser) {
        throw new Error("Sign in with your email and password first.");
      }

      await sendUserEmailVerification(
        verificationUser,
        getPendingAccountRegistration(verificationUser.uid)?.role ??
          accountType,
      );
      setStatusMessage("A new verification email has been sent.");
    });
  };

  const handleCheckVerification = () => {
    void runAuthAction(async () => {
      if (!verificationUser) {
        throw new Error("Sign in with your email and password first.");
      }

      await reload(verificationUser);
      if (!verificationUser.emailVerified) {
        throw new Error(
          "Your email is not verified yet. Open the verification link and try again.",
        );
      }

      setVerificationUser(null);
      await finishAuthentication(verificationUser, true);
    });
  };

  const handleGoogleSignIn = () => {
    void runAuthAction(async () => {
      const auth = getFirebaseClientAuth();
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      if (mode === "signup" && !acceptedTerms) {
        throw new Error("Accept the Terms of Service and Privacy Policy.");
      }

      const credential = await signInWithPopup(auth, provider);
      const signupDisplayName = mode === "signup"
        ? validateSignupDetails({
            role: accountType,
            fullName: fullName.trim() || credential.user.displayName || "",
            businessName:
              businessName.trim() || credential.user.displayName || "",
            acceptedTerms,
          })
        : undefined;
      if (signupDisplayName) {
        await updateProfile(credential.user, {
          displayName: signupDisplayName,
        });
        setPendingAccountRegistration(
          credential.user.uid,
          accountType,
          signupDisplayName,
        );
      }

      await finishVerifiedProviderAuthentication(
        credential.user,
        true,
        signupDisplayName ? accountType : undefined,
        signupDisplayName,
      );
    });
  };

  const handleSendOtp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    void runAuthAction(async () => {
      if (!isValidNationalPhoneNumber(phoneNumber)) {
        throw new Error("Enter a valid phone number.");
      }

      let result: ConfirmationResult;
      try {
        result = await signInWithPhoneNumber(
          getFirebaseClientAuth(),
          buildInternationalPhoneNumber(phoneCountryCode, phoneNumber),
          getPhoneRecaptchaVerifier(),
        );
      } catch (error) {
        clearPhoneRecaptchaVerifier();
        throw error;
      }
      setConfirmationResult(result);
      setStatusMessage("Verification code sent.");
    });
  };

  const handleVerifyOtp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    void runAuthAction(async () => {
      if (!confirmationResult) {
        throw new Error("Request a verification code first.");
      }

      const credential = await confirmationResult.confirm(otp.trim());
      await finishVerifiedProviderAuthentication(credential.user, true);
    });
  };

  const handleCompleteVerifiedAccount = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    void runAuthAction(async () => {
      if (!pendingVerifiedUser) {
        throw new Error("Sign in with Google or phone first.");
      }

      const displayName = validateSignupDetails({
        role: accountType,
        fullName,
        businessName,
        acceptedTerms,
      });

      await updateProfile(pendingVerifiedUser, { displayName });
      setPendingAccountRegistration(
        pendingVerifiedUser.uid,
        accountType,
        displayName,
      );
      await finishAuthentication(
        pendingVerifiedUser,
        true,
        accountType,
        displayName,
      );
    });
  };

  const readApiMessage = async (response: Response) => {
    const payload = (await response.json().catch(() => null)) as
      | { message?: string }
      | null;
    return payload?.message;
  };

  const handleRequestPasswordResetOtp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    void runAuthAction(async () => {
      const response = await fetch("/api/auth/password-reset/request", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const message = await readApiMessage(response);
      if (!response.ok) {
        throw new Error(message || "Unable to send password reset link");
      }
      await sendUserPasswordResetEmail(email.trim());
      setOtp("");
      setPassword("");
      setStatusMessage("Password reset link sent by Firebase.");
    });
  };

  const selectMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    setLoginMethod("email");
    setVerificationUser(null);
    setPendingVerifiedUser(null);
    setOtp("");
    resetFeedback();
  };

  return (
    <div className="w-full min-w-0">
      <Card className="relative max-h-[calc(100dvh-1rem)] w-full min-w-0 max-w-lg overflow-x-hidden overflow-y-auto rounded-2xl border border-border/80 bg-card shadow-[0_24px_80px_rgba(0,0,0,0.35)] no-scrollbar sm:max-h-[90vh] sm:rounded-3xl">
        <Button
          variant="ghost"
          size="icon"
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 h-9 w-9 rounded-xl bg-border text-brand-muted hover:bg-input hover:text-foreground sm:right-4 sm:top-4 sm:h-8 sm:w-8"
          aria-label="Close authentication"
        >
          <CloseIcon className="h-5 w-5" />
        </Button>

        <CardContent className="p-0">
          <div className="border-b border-border/70 bg-gradient-to-b from-primary/10 to-transparent p-5 pb-6 pr-14 sm:p-8 sm:pb-7 sm:pr-14">
            <div className="mb-6 text-center">
              <h2 className="mb-2 text-2xl font-bold text-foreground sm:text-3xl">
                {pendingVerifiedUser
                  ? "Finish Account Setup"
                  : mode === "reset"
                    ? "Reset Password"
                  : mode === "signin"
                    ? "Welcome Back"
                    : "Get Started"}
              </h2>
              <p className="text-brand-muted">
                {pendingVerifiedUser
                  ? "Choose the account type that matches how you use AutoPartsPro."
                  : mode === "reset"
                    ? "Verify your email before changing your password"
                  : mode === "signin"
                    ? "Sign in to access your account"
                    : "Create your account to continue"}
              </p>
            </div>

            {!pendingVerifiedUser ? (
              <div className="flex gap-2 rounded-xl border border-border bg-background p-1">
                <ModeButton
                  active={mode === "signin"}
                  onClick={() => selectMode("signin")}
                >
                  Sign in
                </ModeButton>
                <ModeButton
                  active={mode === "signup"}
                  onClick={() => selectMode("signup")}
                >
                  Sign Up
                </ModeButton>
              </div>
            ) : null}
          </div>

          {pendingVerifiedUser ? (
            <AuthCompleteAccount
              accountType={accountType}
              fullName={fullName}
              businessName={businessName}
              acceptedTerms={acceptedTerms}
              isSubmitting={isSubmitting}
              errorMessage={errorMessage}
              statusMessage={statusMessage}
              onAccountTypeChange={setAccountType}
              onFullNameChange={setFullName}
              onBusinessNameChange={setBusinessName}
              onTermsChange={setAcceptedTerms}
              onSubmit={handleCompleteVerifiedAccount}
            />
          ) : mode === "signin" ? (
            loginMethod === "email" ? (
              <AuthLoginEmail
                email={email}
                password={password}
                showPassword={showPassword}
                isSubmitting={isSubmitting}
                errorMessage={errorMessage}
                statusMessage={statusMessage}
                verificationUser={verificationUser}
                onEmailChange={setEmail}
                onPasswordChange={setPassword}
                onTogglePassword={() => setShowPassword((value) => !value)}
                onEmailSubmit={handleEmailSubmit}
                onUsePhone={() => {
                  setLoginMethod("phone");
                  resetFeedback();
                }}
                onCheckVerification={handleCheckVerification}
                onResendVerification={handleResendVerification}
                onGoogleSignIn={handleGoogleSignIn}
                onResetPassword={() => selectMode("reset")}
              />
            ) : confirmationResult ? (
              <AuthLoginPhoneVerify
                otp={otp}
                isSubmitting={isSubmitting}
                errorMessage={errorMessage}
                statusMessage={statusMessage}
                onOtpChange={setOtp}
                onVerifyOtp={handleVerifyOtp}
                onUseAnotherPhone={() => {
                  setConfirmationResult(null);
                  setOtp("");
                  resetFeedback();
                }}
                onUseEmail={() => {
                  setLoginMethod("email");
                  setConfirmationResult(null);
                  setOtp("");
                  resetFeedback();
                }}
              />
            ) : (
              <AuthLoginPhoneSend
                phoneCountryCode={phoneCountryCode}
                phoneNumber={phoneNumber}
                isSubmitting={isSubmitting}
                errorMessage={errorMessage}
                statusMessage={statusMessage}
                onCountryCodeChange={setPhoneCountryCode}
                onPhoneNumberChange={setPhoneNumber}
                onSendOtp={handleSendOtp}
                onUseEmail={() => {
                  setLoginMethod("email");
                  resetFeedback();
                }}
              />
            )
          ) : mode === "reset" ? (
            <AuthResetPassword
              email={email}
              isSubmitting={isSubmitting}
              errorMessage={errorMessage}
              statusMessage={statusMessage}
              onEmailChange={setEmail}
              onRequestOtp={handleRequestPasswordResetOtp}
              onBackToSignIn={() => selectMode("signin")}
            />
          ) : (
            <AuthRegister
              accountType={accountType}
              fullName={fullName}
              businessName={businessName}
              email={email}
              password={password}
              showPassword={showPassword}
              acceptedTerms={acceptedTerms}
              isSubmitting={isSubmitting}
              errorMessage={errorMessage}
              statusMessage={statusMessage}
              onAccountTypeChange={setAccountType}
              onFullNameChange={setFullName}
              onBusinessNameChange={setBusinessName}
              onEmailChange={setEmail}
              onPasswordChange={setPassword}
              onTogglePassword={() => setShowPassword((value) => !value)}
              onTermsChange={setAcceptedTerms}
              onSubmit={handleEmailSubmit}
              onGoogleSignIn={handleGoogleSignIn}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function ModeButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Button
      type="button"
      onClick={onClick}
      className={`flex-1 rounded-xl py-2.5 text-sm font-medium ${
        active
          ? "bg-primary text-primary-foreground hover:bg-primary"
          : "bg-transparent text-brand-muted hover:bg-transparent hover:text-foreground"
      }`}
    >
      {children}
    </Button>
  );
}

export default AuthModalCard;
