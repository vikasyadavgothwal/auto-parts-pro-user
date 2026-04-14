"use client";

import { useState } from "react";

import {
  BuildingIcon,
  CloseIcon,
  EyeIcon,
  LockIcon,
  MailIcon,
  UserIcon,
} from "@/components/icons/site-icons";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type AuthMode = "signin" | "signup";
type AccountType = "buyer" | "supplier";

type AuthModalCardProps = {
  onClose?: () => void;
};

export function AuthModalCard({ onClose }: AuthModalCardProps) {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [accountType, setAccountType] = useState<AccountType>("buyer");

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

      <Card className="relative mx-4 w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
        <Button
          variant="ghost"
          size="icon"
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 h-8 w-8 rounded-lg bg-border text-brand-muted hover:bg-input hover:text-foreground"
        >
          <CloseIcon className="h-5 w-5" />
        </Button>

        <CardContent className="p-0">
          <div className="p-8 pb-6">
            <div className="mb-6 text-center">
              <h2 className="mb-2 text-3xl font-bold text-foreground">
                {mode === "signin" ? "Welcome Back" : "Get Started"}
              </h2>
              <p className="text-brand-muted">
                {mode === "signin"
                  ? "Sign in to access your account"
                  : "Create your account to continue"}
              </p>
            </div>

            <div className="flex gap-2 rounded-lg border border-border bg-background p-1">
              <Button
                type="button"
                onClick={() => setMode("signin")}
                className={`flex-1 rounded-md py-2.5 text-sm font-medium ${
                  mode === "signin"
                    ? "bg-primary text-primary-foreground hover:bg-primary"
                    : "bg-transparent text-brand-muted hover:bg-transparent hover:text-foreground"
                }`}
              >
                Sign In
              </Button>

              <Button
                type="button"
                onClick={() => setMode("signup")}
                className={`flex-1 rounded-md py-2.5 text-sm font-medium ${
                  mode === "signup"
                    ? "bg-primary text-primary-foreground hover:bg-primary"
                    : "bg-transparent text-brand-muted hover:bg-transparent hover:text-foreground"
                }`}
              >
                Sign Up
              </Button>
            </div>
          </div>

          {mode === "signin" ? (
            <form
              className="px-8 pb-8"
              onSubmit={(event) => event.preventDefault()}
            >
              <div className="mb-4 space-y-2">
                <Label className="text-sm font-medium text-foreground">
                  Email Address
                </Label>

                <div className="relative">
                  <MailIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-muted" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="h-12 border-border bg-background pl-12 pr-4 text-foreground placeholder:text-brand-placeholder focus-visible:ring-ring/50"
                    required
                  />
                </div>
              </div>

              <div className="mb-4 space-y-2">
                <Label className="text-sm font-medium text-foreground">
                  Password
                </Label>

                <div className="relative">
                  <LockIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-muted" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="h-12 border-border bg-background pl-12 pr-12 text-foreground placeholder:text-brand-placeholder focus-visible:ring-ring/50"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 text-brand-muted hover:bg-transparent hover:text-foreground"
                  >
                    <EyeIcon className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="mb-6 flex justify-end">
                <Button
                  type="button"
                  variant="link"
                  className="h-auto p-0 text-sm text-primary hover:underline"
                >
                  Forgot Password?
                </Button>
              </div>

              <Button
                type="submit"
                className="h-12 w-full rounded-lg bg-primary font-medium text-primary-foreground hover:bg-brand-primary-hover"
              >
                Sign In
              </Button>
            </form>
          ) : (
            <form
              className="px-8 pb-8"
              onSubmit={(event) => event.preventDefault()}
            >
              <div className="mb-6">
                <Label className="mb-3 block text-sm font-medium text-foreground">
                  Account Type
                </Label>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAccountType("buyer")}
                    className={`rounded-lg border-2 p-4 transition-all ${
                      accountType === "buyer"
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <UserIcon
                      className={`mx-auto mb-2 h-6 w-6 ${
                        accountType === "buyer"
                          ? "text-primary"
                          : "text-brand-muted"
                      }`}
                    />
                    <div
                      className={`text-sm font-medium ${
                        accountType === "buyer"
                          ? "text-foreground"
                          : "text-brand-muted"
                      }`}
                    >
                      Buyer
                    </div>
                    <div className="mt-1 text-xs text-brand-muted">
                      Shop & repair
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAccountType("supplier")}
                    className={`rounded-lg border-2 p-4 transition-all ${
                      accountType === "supplier"
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <BuildingIcon
                      className={`mx-auto mb-2 h-6 w-6 ${
                        accountType === "supplier"
                          ? "text-primary"
                          : "text-brand-muted"
                      }`}
                    />
                    <div
                      className={`text-sm font-medium ${
                        accountType === "supplier"
                          ? "text-foreground"
                          : "text-brand-muted"
                      }`}
                    >
                      Supplier
                    </div>
                    <div className="mt-1 text-xs text-brand-muted">
                      Sell parts
                    </div>
                  </button>
                </div>
              </div>

              {accountType === "buyer" ? (
                <div className="mb-4 space-y-2">
                  <Label className="text-sm font-medium text-foreground">
                    Full Name
                  </Label>

                  <div className="relative">
                    <UserIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-muted" />
                    <Input
                      type="text"
                      placeholder="Enter your name"
                      className="h-12 border-border bg-background pl-12 pr-4 text-foreground placeholder:text-brand-placeholder focus-visible:ring-ring/50"
                      required
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-4 space-y-2">
                    <Label className="text-sm font-medium text-foreground">
                      Business Name
                    </Label>

                    <div className="relative">
                      <BuildingIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-muted" />
                      <Input
                        type="text"
                        placeholder="Enter business name"
                        className="h-12 border-border bg-background pl-12 pr-4 text-foreground placeholder:text-brand-placeholder focus-visible:ring-ring/50"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4 space-y-2">
                    <Label className="text-sm font-medium text-foreground">
                      Phone Number
                    </Label>

                    <Input
                      type="tel"
                      placeholder="Enter phone number"
                      className="h-12 border-border bg-background text-foreground placeholder:text-brand-placeholder focus-visible:ring-ring/50"
                      required
                    />
                  </div>
                </>
              )}

              <div className="mb-4 space-y-2">
                <Label className="text-sm font-medium text-foreground">
                  Email Address
                </Label>

                <div className="relative">
                  <MailIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-muted" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="h-12 border-border bg-background pl-12 pr-4 text-foreground placeholder:text-brand-placeholder focus-visible:ring-ring/50"
                    required
                  />
                </div>
              </div>

              <div className="mb-4 space-y-2">
                <Label className="text-sm font-medium text-foreground">
                  Password
                </Label>

                <div className="relative">
                  <LockIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-muted" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="h-12 border-border bg-background pl-12 pr-12 text-foreground placeholder:text-brand-placeholder focus-visible:ring-ring/50"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 text-brand-muted hover:bg-transparent hover:text-foreground"
                  >
                    <EyeIcon className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="mb-6 flex items-start gap-3">
                <Checkbox id="terms" className="mt-1" />
                <Label
                  htmlFor="terms"
                  className="text-sm leading-6 text-brand-muted"
                >
                  I agree to the{" "}
                  <a href="#" className="text-primary hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                </Label>
              </div>

              <Button
                type="submit"
                className="h-12 w-full rounded-lg bg-primary font-medium text-primary-foreground hover:bg-brand-primary-hover"
              >
                Create Account
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default AuthModalCard;
