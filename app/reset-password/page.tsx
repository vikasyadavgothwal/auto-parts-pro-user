"use client";

import { Suspense, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { LockIcon } from "@/components/icons/site-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AuthFeedback,
  AuthField,
  AuthMethodHeading,
} from "@/components/site/auth/auth-shared";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token")?.trim() ?? "";
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setStatusMessage("");

    if (!token) {
      setErrorMessage("Password reset link is invalid or expired.");
      return;
    }
    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/auth/password-reset/verify", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const payload = (await response.json().catch(() => null)) as
        | { message?: string }
        | null;
      if (!response.ok) {
        throw new Error(payload?.message || "Unable to reset password.");
      }
      setStatusMessage(
        payload?.message ||
          "Password reset successfully. Opening sign in...",
      );
      setPassword("");
      setConfirmPassword("");
      window.setTimeout(() => router.replace("/?auth=signin"), 900);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to reset password.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex flex-1 items-center justify-center bg-background px-4 py-12">
      <section className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl sm:p-8">
        <AuthMethodHeading
          title="Set new password"
          description="Enter and confirm your new AutoPartsPro password."
        />
        <form onSubmit={handleSubmit}>
          <AuthField label="New Password">
            <div className="relative">
              <LockIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-muted" />
              <Input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="new-password"
                placeholder="Enter new password"
                className="h-12 bg-background pl-12"
                minLength={8}
                required
              />
            </div>
          </AuthField>
          <AuthField label="Confirm Password">
            <div className="relative">
              <LockIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-muted" />
              <Input
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                autoComplete="new-password"
                placeholder="Confirm new password"
                className="h-12 bg-background pl-12"
                minLength={8}
                required
              />
            </div>
          </AuthField>
          <Button type="submit" disabled={isSubmitting} className="h-12 w-full rounded-xl">
            {isSubmitting ? "Updating..." : "Confirm Password"}
          </Button>
        </form>
        <AuthFeedback error={errorMessage} status={statusMessage} />
        <Button asChild variant="ghost" className="mt-1 h-11 w-full rounded-xl text-brand-muted">
          <Link href="/?auth=signin">Back to sign in</Link>
        </Button>
      </section>
    </main>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordForm />
    </Suspense>
  );
}
