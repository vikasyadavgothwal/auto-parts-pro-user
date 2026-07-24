"use client"

import { type FormEvent } from "react"

import { MailIcon, LockIcon } from "@/components/icons/site-icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  AuthFeedback,
  AuthField,
  AuthMethodHeading,
} from "@/components/site/auth/auth-shared"

export function AuthResetPassword({
  email,
  otp,
  password,
  otpSent,
  isSubmitting,
  errorMessage,
  statusMessage,
  onEmailChange,
  onOtpChange,
  onPasswordChange,
  onRequestOtp,
  onResetPassword,
  onBackToSignIn,
}: {
  email: string
  otp: string
  password: string
  otpSent: boolean
  isSubmitting: boolean
  errorMessage: string
  statusMessage: string
  onEmailChange: (value: string) => void
  onOtpChange: (value: string) => void
  onPasswordChange: (value: string) => void
  onRequestOtp: (event: FormEvent<HTMLFormElement>) => void
  onResetPassword: (event: FormEvent<HTMLFormElement>) => void
  onBackToSignIn: () => void
}) {
  return (
    <div className="min-w-0 px-4 pb-6 sm:px-8 sm:pb-8">
      <AuthMethodHeading
        title="Reset password"
        description="Enter your account email, verify the OTP sent to your inbox, then set a new password."
      />

      {!otpSent ? (
        <form onSubmit={onRequestOtp}>
          <AuthField label="Email Address">
            <div className="relative">
              <MailIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-muted" />
              <Input
                type="email"
                value={email}
                onChange={(event) => onEmailChange(event.target.value)}
                autoComplete="email"
                placeholder="Enter your account email"
                className="h-12 bg-background pl-12"
                required
              />
            </div>
          </AuthField>
          <Button type="submit" disabled={isSubmitting} className="h-12 w-full rounded-xl">
            {isSubmitting ? "Sending OTP..." : "Send OTP"}
          </Button>
        </form>
      ) : (
        <form onSubmit={onResetPassword}>
          <AuthField label="OTP">
            <Input
              inputMode="numeric"
              value={otp}
              onChange={(event) => onOtpChange(event.target.value)}
              autoComplete="one-time-code"
              placeholder="Enter 6 digit OTP"
              className="h-12 bg-background"
              maxLength={6}
              required
            />
          </AuthField>
          <AuthField label="New Password">
            <div className="relative">
              <LockIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-muted" />
              <Input
                type="password"
                value={password}
                onChange={(event) => onPasswordChange(event.target.value)}
                autoComplete="new-password"
                placeholder="Enter new password"
                className="h-12 bg-background pl-12"
                minLength={8}
                required
              />
            </div>
          </AuthField>
          <Button type="submit" disabled={isSubmitting} className="h-12 w-full rounded-xl">
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      )}

      <AuthFeedback error={errorMessage} status={statusMessage} />
      <Button
        type="button"
        variant="ghost"
        disabled={isSubmitting}
        onClick={onBackToSignIn}
        className="mt-1 h-11 w-full rounded-xl text-brand-muted"
      >
        Back to sign in
      </Button>
    </div>
  )
}
