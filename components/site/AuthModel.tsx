"use client";

import {
  type FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  RecaptchaVerifier,
  reload,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  signInWithPopup,
  updateProfile,
  type ConfirmationResult,
  type User,
} from "firebase/auth";

import { GoogleBrandIcon } from "@/components/icons/brands";
import {
  BuildingIcon,
  CloseIcon,
  EyeIcon,
  LockIcon,
  MailIcon,
  PhoneIcon,
  UserIcon,
} from "@/components/icons/site-icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { FieldSeparator } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ApiRequestError } from "@/lib/api/client";
import {
  getPendingAccountRegistration,
  setPendingAccountRegistration,
  validateSignupDetails,
} from "@/lib/account-registration";
import {
  getFirebaseClientAuth,
  sendUserEmailVerification,
} from "@/lib/firebase/client";
import { establishApplicationSession } from "@/lib/user-auth";
import type { UserAccountRole } from "@/types/api/user-auth";

type AuthMode = "signin" | "signup";
type AccountType = UserAccountRole;
type LoginMethod = "email" | "phone";

const ACCOUNT_TYPE_DESCRIPTIONS: Record<AccountType, string> = {
  Fleet: "Manage vehicles and source parts for your fleet.",
  User: "Shop for parts for your personal vehicle.",
  Garage: "Source parts for customer repairs and services.",
  Supplier: "List and sell automotive parts.",
};

type AuthModalCardProps = {
  onClose?: () => void;
};

const getAuthErrorMessage = (error: unknown): string => {
  if (error instanceof ApiRequestError) {
    return error.message;
  }

  if (!(error instanceof FirebaseError)) {
    return error instanceof Error
      ? error.message
      : "Unable to authenticate. Please try again.";
  }

  const messages: Record<string, string> = {
    "auth/email-already-in-use": "An account already exists with this email.",
    "auth/invalid-credential": "The email or password is incorrect.",
    "auth/invalid-email": "Enter a valid email address.",
    "auth/invalid-phone-number": "Enter a valid phone number with country code.",
    "auth/invalid-verification-code": "The verification code is incorrect.",
    "auth/missing-phone-number": "Enter your phone number with country code.",
    "auth/operation-not-allowed":
      "This sign-in method is not enabled in Firebase Authentication.",
    "auth/popup-closed-by-user": "Google sign-in was cancelled.",
    "auth/too-many-requests": "Too many attempts. Please try again later.",
    "auth/unauthorized-continue-uri":
      "The verification redirect domain is not authorized in Firebase.",
    "auth/invalid-continue-uri":
      "The verification redirect URL is not valid.",
    "auth/weak-password": "Choose a stronger password.",
  };

  return messages[error.code] ?? "Unable to authenticate. Please try again.";
};

export function AuthModalCard({ onClose }: AuthModalCardProps) {
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
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [verificationUser, setVerificationUser] = useState<User | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    return () => {
      recaptchaVerifier.current?.clear();
      recaptchaVerifier.current = null;
    };
  }, []);

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
    await establishApplicationSession(
      user,
      forceRefresh,
      requestedRole,
      requestedDisplayName,
    );
    router.refresh();
    onClose?.();
  };

  const runAuthAction = async (action: () => Promise<void>) => {
    resetFeedback();
    setIsSubmitting(true);

    try {
      await action();
    } catch (error) {
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
        const credential = await signInWithEmailAndPassword(
          auth,
          email.trim(),
          password,
        );
        await reload(credential.user);

        if (!credential.user.emailVerified) {
          setVerificationUser(credential.user);
          throw new Error(
            "Verify your email using the link we sent before signing in.",
          );
        }

        setVerificationUser(null);
        await finishAuthentication(credential.user, true);
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
        getPendingAccountRegistration(verificationUser.uid)?.role ?? accountType,
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
      const signupDisplayName =
        mode === "signup"
          ? validateSignupDetails({
              role: accountType,
              fullName,
              businessName,
              acceptedTerms,
            })
          : undefined;
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      const credential = await signInWithPopup(
        getFirebaseClientAuth(),
        provider,
      );
      if (signupDisplayName) {
        setPendingAccountRegistration(
          credential.user.uid,
          accountType,
          signupDisplayName,
        );
      }
      await finishAuthentication(
        credential.user,
        false,
        signupDisplayName ? accountType : undefined,
        signupDisplayName,
      );
    });
  };

  const handleSendOtp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    void runAuthAction(async () => {
      if (!phoneNumber.trim().startsWith("+")) {
        throw new Error("Enter the phone number with country code, for example +1.");
      }

      recaptchaVerifier.current?.clear();
      const verifier = new RecaptchaVerifier(
        getFirebaseClientAuth(),
        "firebase-phone-submit",
        { size: "invisible" },
      );
      recaptchaVerifier.current = verifier;
      const result = await signInWithPhoneNumber(
        getFirebaseClientAuth(),
        phoneNumber.trim(),
        verifier,
      );
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
      await finishAuthentication(credential.user);
    });
  };

  const selectMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    setLoginMethod("email");
    setVerificationUser(null);
    resetFeedback();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

      <Card className="relative max-h-[calc(100dvh-1.5rem)] w-full max-w-md overflow-y-auto rounded-2xl border border-border bg-card shadow-2xl no-scrollbar sm:max-h-[90vh]">
        <Button
          variant="ghost"
          size="icon"
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 h-8 w-8 rounded-xl bg-border text-brand-muted hover:bg-input hover:text-foreground"
          aria-label="Close authentication"
        >
          <CloseIcon className="h-5 w-5" />
        </Button>

        <CardContent className="p-0">
          <div className="p-6 pb-6 sm:p-8 sm:pb-6">
            <div className="mb-6 text-center">
              <h2 className="mb-2 text-2xl font-bold text-foreground sm:text-3xl">
                {mode === "signin" ? "Welcome Back" : "Get Started"}
              </h2>
              <p className="text-brand-muted">
                {mode === "signin"
                  ? "Sign in to access your account"
                  : "Create your account to continue"}
              </p>
            </div>

            <div className="flex gap-2 rounded-xl border border-border bg-background p-1">
              <ModeButton
                active={mode === "signin"}
                onClick={() => selectMode("signin")}
              >
                Sign In
              </ModeButton>
              <ModeButton
                active={mode === "signup"}
                onClick={() => selectMode("signup")}
              >
                Sign Up
              </ModeButton>
            </div>
          </div>

          {mode === "signin" ? (
            <div className="px-6 pb-8 sm:px-8">
              <div className="mb-5 grid grid-cols-2 gap-2 rounded-xl border border-border bg-background p-1">
                <ModeButton
                  active={loginMethod === "email"}
                  onClick={() => {
                    setLoginMethod("email");
                    resetFeedback();
                  }}
                >
                  Email
                </ModeButton>
                <ModeButton
                  active={loginMethod === "phone"}
                  onClick={() => {
                    setLoginMethod("phone");
                    resetFeedback();
                  }}
                >
                  Phone OTP
                </ModeButton>
              </div>

              {loginMethod === "email" ? (
                <EmailForm
                  mode={mode}
                  email={email}
                  password={password}
                  showPassword={showPassword}
                  isSubmitting={isSubmitting}
                  onEmailChange={setEmail}
                  onPasswordChange={setPassword}
                  onTogglePassword={() => setShowPassword((value) => !value)}
                  onSubmit={handleEmailSubmit}
                />
              ) : confirmationResult ? (
                <form onSubmit={handleVerifyOtp}>
                  <AuthField label="Verification Code">
                    <Input
                      value={otp}
                      onChange={(event) => setOtp(event.target.value)}
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      placeholder="Enter SMS code"
                      className="h-12 bg-background"
                      required
                    />
                  </AuthField>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-5 h-12 w-full rounded-xl"
                  >
                    {isSubmitting ? "Verifying..." : "Verify and Sign In"}
                  </Button>
                  <Button
                    type="button"
                    variant="link"
                    disabled={isSubmitting}
                    onClick={() => {
                      setConfirmationResult(null);
                      setOtp("");
                      resetFeedback();
                    }}
                    className="mt-2 w-full"
                  >
                    Use another phone number
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleSendOtp}>
                  <AuthField label="Phone Number">
                    <div className="relative">
                      <PhoneIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-muted" />
                      <Input
                        type="tel"
                        value={phoneNumber}
                        onChange={(event) => setPhoneNumber(event.target.value)}
                        autoComplete="tel"
                        placeholder="+1 555 123 4567"
                        className="h-12 bg-background pl-12"
                        required
                      />
                    </div>
                  </AuthField>
                  <Button
                    id="firebase-phone-submit"
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-5 h-12 w-full rounded-xl"
                  >
                    {isSubmitting ? "Sending..." : "Send Verification Code"}
                  </Button>
                </form>
              )}

              <AuthFeedback error={errorMessage} status={statusMessage} />
              {verificationUser ? (
                <div className="mb-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <Button
                    type="button"
                    disabled={isSubmitting}
                    onClick={handleCheckVerification}
                    className="h-11 rounded-xl"
                  >
                    I&apos;ve Verified
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    disabled={isSubmitting}
                    onClick={handleResendVerification}
                    className="h-11 rounded-xl"
                  >
                    Resend Email
                  </Button>
                </div>
              ) : null}

              <FieldSeparator className="my-6 *:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>
              <GoogleButton
                disabled={isSubmitting}
                onClick={handleGoogleSignIn}
              />
            </div>
          ) : (
            <form className="px-6 pb-8 sm:px-8" onSubmit={handleEmailSubmit}>
              <div className="mb-6 space-y-2">
                <Label
                  htmlFor="account-type"
                  className="block text-sm font-medium text-foreground"
                >
                  Account Type
                </Label>
                <Select
                  value={accountType}
                  onValueChange={(value) => setAccountType(value as AccountType)}
                >
                  <SelectTrigger
                    id="account-type"
                    className="h-12 w-full rounded-xl bg-background"
                  >
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="Fleet">Fleet</SelectItem>
                    <SelectItem value="User">User</SelectItem>
                    <SelectItem value="Garage">Garage</SelectItem>
                    <SelectItem value="Supplier">Supplier</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs leading-5 text-brand-muted">
                  {ACCOUNT_TYPE_DESCRIPTIONS[accountType]}
                </p>
              </div>

              <AuthField
                label={accountType === "User" ? "Full Name" : "Business Name"}
              >
                <div className="relative">
                  {accountType === "User" ? (
                    <UserIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-muted" />
                  ) : (
                    <BuildingIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-muted" />
                  )}
                  <Input
                    value={accountType === "User" ? fullName : businessName}
                    onChange={(event) =>
                      accountType === "User"
                        ? setFullName(event.target.value)
                        : setBusinessName(event.target.value)
                    }
                    autoComplete="name"
                    placeholder={
                      accountType === "User"
                        ? "Enter your name"
                        : "Enter business name"
                    }
                    className="h-12 bg-background pl-12"
                    required
                  />
                </div>
              </AuthField>

              <EmailFields
                email={email}
                password={password}
                showPassword={showPassword}
                onEmailChange={setEmail}
                onPasswordChange={setPassword}
                onTogglePassword={() => setShowPassword((value) => !value)}
              />

              <div className="mb-6 flex items-start gap-3">
                <Checkbox
                  id="terms"
                  checked={acceptedTerms}
                  onCheckedChange={(checked) => setAcceptedTerms(checked === true)}
                  className="mt-1"
                />
                <Label htmlFor="terms" className="text-sm leading-6 text-brand-muted">
                  I agree to the Terms of Service and Privacy Policy
                </Label>
              </div>

              <AuthFeedback error={errorMessage} status={statusMessage} />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-12 w-full rounded-xl"
              >
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </Button>

              <FieldSeparator className="my-6 *:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>
              <GoogleButton
                disabled={isSubmitting}
                onClick={handleGoogleSignIn}
              />
            </form>
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

function EmailForm({
  mode,
  email,
  password,
  showPassword,
  isSubmitting,
  onEmailChange,
  onPasswordChange,
  onTogglePassword,
  onSubmit,
}: {
  mode: AuthMode;
  email: string;
  password: string;
  showPassword: boolean;
  isSubmitting: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onTogglePassword: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form onSubmit={onSubmit}>
      <EmailFields
        email={email}
        password={password}
        showPassword={showPassword}
        onEmailChange={onEmailChange}
        onPasswordChange={onPasswordChange}
        onTogglePassword={onTogglePassword}
      />
      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-12 w-full rounded-xl"
      >
        {isSubmitting ? "Signing In..." : mode === "signin" ? "Sign In" : "Continue"}
      </Button>
    </form>
  );
}

function EmailFields({
  email,
  password,
  showPassword,
  onEmailChange,
  onPasswordChange,
  onTogglePassword,
}: {
  email: string;
  password: string;
  showPassword: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onTogglePassword: () => void;
}) {
  return (
    <>
      <AuthField label="Email Address">
        <div className="relative">
          <MailIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-muted" />
          <Input
            type="email"
            value={email}
            onChange={(event) => onEmailChange(event.target.value)}
            autoComplete="email"
            placeholder="Enter your email"
            className="h-12 bg-background pl-12"
            required
          />
        </div>
      </AuthField>
      <AuthField label="Password">
        <div className="relative">
          <LockIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-muted" />
          <Input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => onPasswordChange(event.target.value)}
            autoComplete="current-password"
            placeholder="Enter your password"
            className="h-12 bg-background pl-12 pr-12"
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onTogglePassword}
            className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 text-brand-muted hover:bg-transparent hover:text-foreground"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <EyeIcon className="h-5 w-5" />
          </Button>
        </div>
      </AuthField>
    </>
  );
}

function AuthField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4 space-y-2">
      <Label className="text-sm font-medium text-foreground">{label}</Label>
      {children}
    </div>
  );
}

function GoogleButton({
  disabled,
  onClick,
}: {
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      type="button"
      variant="outline"
      disabled={disabled}
      onClick={onClick}
      className="h-11 w-full rounded-xl border-border bg-background"
    >
      <GoogleBrandIcon className="h-5 w-5" />
      Continue with Google
    </Button>
  );
}

function AuthFeedback({ error, status }: { error: string; status: string }) {
  if (!error && !status) {
    return null;
  }

  return (
    <p
      role="status"
      aria-live="polite"
      className={`mb-4 text-sm ${error ? "text-destructive" : "text-emerald-600"}`}
    >
      {error || status}
    </p>
  );
}

export default AuthModalCard;
