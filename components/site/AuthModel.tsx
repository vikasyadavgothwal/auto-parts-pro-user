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
import {
  FieldSeparator,
} from "@/components/ui/field";

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

      <Card className="relative md:mx-4 mx-0 w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-card shadow-2xl no-scrollbar ">
        <Button
          variant="ghost"
          size="icon"
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 h-8 w-8 rounded-sm bg-border text-brand-muted hover:bg-input hover:text-foreground"
        >
          <CloseIcon className="h-5 w-5" />
        </Button>

        <CardContent className="p-0">
          <div className="p-6 sm:p-8 sm:pb-6">
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

            <div className="flex gap-2 rounded-sm border border-border bg-background p-1">
              <Button
                type="button"
                onClick={() => setMode("signin")}
                className={`flex-1 rounded-sm py-2.5 text-sm font-medium ${
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
                className={`flex-1 rounded-sm py-2.5 text-sm font-medium ${
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
              className="px-6 pb-8 sm:px-8"
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
                className="h-12 w-full rounded-sm bg-primary font-medium text-primary-foreground hover:bg-brand-primary-hover"
              >
                Sign In
              </Button>

              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card my-6">
                Or continue with
              </FieldSeparator>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="h-11 flex items-center justify-center gap-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-sm hover:border-[#DC2626] transition-all"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#EA4335"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    ></path>
                    <path
                      fill="#4285F4"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    ></path>
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    ></path>
                    <path
                      fill="#34A853"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    ></path>
                  </svg>
                  <span className="text-white text-sm">Google</span>
                </button>
                <button
                  type="button"
                  className="h-11 flex items-center justify-center gap-2 bg-[#0A0A0A] border border-[#2A2A2A] rounded-sm hover:border-[#DC2626] transition-all"
                >
                  <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"></path>
                  </svg>
                  <span className="text-white text-sm">GitHub</span>
                </button>
              </div>
            </form>
          ) : (
            <form
              className="px-6 pb-8 sm:px-8"
              onSubmit={(event) => event.preventDefault()}
            >
              <div className="mb-6">
                <Label className="mb-3 block text-sm font-medium text-foreground">
                  Account Type
                </Label>

                <div className="grid grid-cols-2 gap-3 ">
                  <button
                    type="button"
                    onClick={() => setAccountType("buyer")}
                    className={`rounded-sm border-2 p-4 transition-all ${
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
                    className={`rounded-sm border-2 p-4 transition-all ${
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
                className="h-12 w-full rounded-sm bg-primary font-medium text-primary-foreground hover:bg-brand-primary-hover"
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
