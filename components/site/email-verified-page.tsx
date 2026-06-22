"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, reload } from "firebase/auth";

import { Button } from "@/components/ui/button";
import { getFirebaseClientAuth } from "@/lib/firebase/client";
import { establishApplicationSession } from "@/lib/user-auth";

type VerificationState = "checking" | "authenticated" | "signin" | "error";

export function EmailVerifiedPage() {
  const router = useRouter();
  const [state, setState] = useState<VerificationState>("checking");

  useEffect(() => {
    let active = true;
    const auth = getFirebaseClientAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!active) {
        return;
      }

      if (!user) {
        setState("signin");
        return;
      }

      try {
        await reload(user);
        if (!user.emailVerified) {
          setState("signin");
          return;
        }

        await establishApplicationSession(user, true);
        setState("authenticated");
        router.replace("/");
        router.refresh();
      } catch {
        setState("error");
      }
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, [router]);

  return (
    <main className="site-container flex min-h-[60vh] items-center justify-center py-16">
      <div className="w-full max-w-md text-center">
        <h1 className="text-3xl font-semibold text-foreground">
          Email verification
        </h1>
        <p className="mt-3 text-brand-muted">
          {state === "checking"
            ? "Confirming your verified email..."
            : state === "authenticated"
              ? "Email verified. Signing you in..."
              : state === "signin"
                ? "Your email is verified. Sign in to continue."
                : "Your email was verified, but the application session could not be created."}
        </p>

        {state === "signin" || state === "error" ? (
          <Button asChild className="mt-6">
            <Link href="/">Return to sign in</Link>
          </Button>
        ) : null}
      </div>
    </main>
  );
}
