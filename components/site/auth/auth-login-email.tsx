"use client";

import { type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import {
  AuthFeedback,
  AuthSeparator,
  EmailForm,
  GoogleButton,
} from "@/components/site/auth/auth-shared";

export function AuthLoginEmail({
  email,
  password,
  showPassword,
  isSubmitting,
  errorMessage,
  statusMessage,
  verificationUser,
  onEmailChange,
  onPasswordChange,
  onTogglePassword,
  onEmailSubmit,
  onUsePhone,
  onCheckVerification,
  onResendVerification,
  onGoogleSignIn,
  onResetPassword,
}: {
  email: string;
  password: string;
  showPassword: boolean;
  isSubmitting: boolean;
  errorMessage: string;
  statusMessage: string;
  verificationUser: unknown;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onTogglePassword: () => void;
  onEmailSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onUsePhone: () => void;
  onCheckVerification: () => void;
  onResendVerification: () => void;
  onGoogleSignIn: () => void;
  onResetPassword: () => void;
}) {
  return (
    <div className="min-w-0 px-4 pb-6 sm:px-8 sm:pb-8">
      <EmailForm
        mode="signin"
        email={email}
        password={password}
        showPassword={showPassword}
        isSubmitting={isSubmitting}
        onEmailChange={onEmailChange}
        onPasswordChange={onPasswordChange}
        onTogglePassword={onTogglePassword}
        onSubmit={onEmailSubmit}
      />
      <Button
        type="button"
        variant="outline"
        disabled={isSubmitting}
        onClick={onUsePhone}
        className="mt-3 h-11 w-full rounded-xl border-border bg-background"
      >
        Sign in with mobile OTP
      </Button>
      <Button
        type="button"
        variant="ghost"
        disabled={isSubmitting}
        onClick={onResetPassword}
        className="mt-2 h-10 w-full rounded-xl text-brand-muted"
      >
        Forgot password?
      </Button>

      <AuthFeedback error={errorMessage} status={statusMessage} />
      {verificationUser ? (
        <div className="mb-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
          <Button
            type="button"
            disabled={isSubmitting}
            onClick={onCheckVerification}
            className="h-11 rounded-xl"
          >
            I&apos;ve Verified
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={isSubmitting}
            onClick={onResendVerification}
            className="h-11 rounded-xl"
          >
            Resend Email
          </Button>
        </div>
      ) : null}

      <AuthSeparator />
      <GoogleButton disabled={isSubmitting} onClick={onGoogleSignIn} />
    </div>
  );
}
