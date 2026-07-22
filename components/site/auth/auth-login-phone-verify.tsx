"use client";

import { type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AuthFeedback,
  AuthField,
  AuthMethodHeading,
} from "@/components/site/auth/auth-shared";

export function AuthLoginPhoneVerify({
  otp,
  isSubmitting,
  errorMessage,
  statusMessage,
  onOtpChange,
  onVerifyOtp,
  onUseAnotherPhone,
  onUseEmail,
}: {
  otp: string;
  isSubmitting: boolean;
  errorMessage: string;
  statusMessage: string;
  onOtpChange: (value: string) => void;
  onVerifyOtp: (event: FormEvent<HTMLFormElement>) => void;
  onUseAnotherPhone: () => void;
  onUseEmail: () => void;
}) {
  // FIX: Extracted existing phone OTP verification view without changing handlers.
  return (
    <div className="min-w-0 px-4 pb-6 sm:px-8 sm:pb-8">
      <form onSubmit={onVerifyOtp}>
        <AuthMethodHeading
          title="Verify your mobile"
          description="Enter the one-time code sent to your phone."
        />
        <AuthField label="Verification Code">
          <Input
            value={otp}
            onChange={(event) => onOtpChange(event.target.value)}
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
          {isSubmitting ? "Verifying..." : "Verify and sign in"}
        </Button>
        <Button
          type="button"
          variant="ghost"
          disabled={isSubmitting}
          onClick={onUseAnotherPhone}
          className="mt-2 w-full rounded-xl text-brand-muted"
        >
          Use another phone number
        </Button>
        <Button
          type="button"
          variant="link"
          disabled={isSubmitting}
          onClick={onUseEmail}
          className="w-full"
        >
          Use email and password instead
        </Button>
      </form>
      <AuthFeedback error={errorMessage} status={statusMessage} />
    </div>
  );
}
