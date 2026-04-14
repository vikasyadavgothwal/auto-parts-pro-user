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
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      <Card className="relative mx-4 w-full max-w-md overflow-hidden rounded-2xl border border-[#2A2A2A] bg-[#1A1A1A] shadow-2xl">
        <Button
          variant="ghost"
          size="icon"
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 h-8 w-8 rounded-lg bg-[#2A2A2A] text-[#9CA3AF] hover:bg-[#3A3A3A] hover:text-white"
        >
          <CloseIcon className="h-5 w-5" />
        </Button>

        <CardContent className="p-0">
          <div className="p-8 pb-6">
            <div className="mb-6 text-center">
              <h2 className="mb-2 text-3xl font-bold text-white">
                {mode === "signin" ? "Welcome Back" : "Get Started"}
              </h2>
              <p className="text-[#9CA3AF]">
                {mode === "signin"
                  ? "Sign in to access your account"
                  : "Create your account to continue"}
              </p>
            </div>

            <div className="flex gap-2 rounded-lg border border-[#2A2A2A] bg-[#0A0A0A] p-1">
              <Button
                type="button"
                onClick={() => setMode("signin")}
                className={`flex-1 rounded-md py-2.5 text-sm font-medium ${
                  mode === "signin"
                    ? "bg-[#DC2626] text-white hover:bg-[#DC2626]"
                    : "bg-transparent text-[#9CA3AF] hover:bg-transparent hover:text-white"
                }`}
              >
                Sign In
              </Button>

              <Button
                type="button"
                onClick={() => setMode("signup")}
                className={`flex-1 rounded-md py-2.5 text-sm font-medium ${
                  mode === "signup"
                    ? "bg-[#DC2626] text-white hover:bg-[#DC2626]"
                    : "bg-transparent text-[#9CA3AF] hover:bg-transparent hover:text-white"
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
                <Label className="text-sm font-medium text-white">
                  Email Address
                </Label>

                <div className="relative">
                  <MailIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9CA3AF]" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="h-12 border-[#2A2A2A] bg-[#0A0A0A] pl-12 pr-4 text-white placeholder:text-[#4B5563] focus-visible:ring-[#DC2626]/50"
                    required
                  />
                </div>
              </div>

              <div className="mb-4 space-y-2">
                <Label className="text-sm font-medium text-white">
                  Password
                </Label>

                <div className="relative">
                  <LockIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9CA3AF]" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="h-12 border-[#2A2A2A] bg-[#0A0A0A] pl-12 pr-12 text-white placeholder:text-[#4B5563] focus-visible:ring-[#DC2626]/50"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 text-[#9CA3AF] hover:bg-transparent hover:text-white"
                  >
                    <EyeIcon className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="mb-6 flex justify-end">
                <Button
                  type="button"
                  variant="link"
                  className="h-auto p-0 text-sm text-[#DC2626] hover:underline"
                >
                  Forgot Password?
                </Button>
              </div>

              <Button
                type="submit"
                className="h-12 w-full rounded-lg bg-[#DC2626] font-medium text-white hover:bg-[#B91C1C]"
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
                <Label className="mb-3 block text-sm font-medium text-white">
                  Account Type
                </Label>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAccountType("buyer")}
                    className={`rounded-lg border-2 p-4 transition-all ${
                      accountType === "buyer"
                        ? "border-[#DC2626] bg-[#DC2626]/10"
                        : "border-[#2A2A2A] hover:border-[#DC2626]/50"
                    }`}
                  >
                    <UserIcon
                      className={`mx-auto mb-2 h-6 w-6 ${
                        accountType === "buyer"
                          ? "text-[#DC2626]"
                          : "text-[#9CA3AF]"
                      }`}
                    />
                    <div
                      className={`text-sm font-medium ${
                        accountType === "buyer"
                          ? "text-white"
                          : "text-[#9CA3AF]"
                      }`}
                    >
                      Buyer
                    </div>
                    <div className="mt-1 text-xs text-[#9CA3AF]">
                      Shop & repair
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAccountType("supplier")}
                    className={`rounded-lg border-2 p-4 transition-all ${
                      accountType === "supplier"
                        ? "border-[#DC2626] bg-[#DC2626]/10"
                        : "border-[#2A2A2A] hover:border-[#DC2626]/50"
                    }`}
                  >
                    <BuildingIcon
                      className={`mx-auto mb-2 h-6 w-6 ${
                        accountType === "supplier"
                          ? "text-[#DC2626]"
                          : "text-[#9CA3AF]"
                      }`}
                    />
                    <div
                      className={`text-sm font-medium ${
                        accountType === "supplier"
                          ? "text-white"
                          : "text-[#9CA3AF]"
                      }`}
                    >
                      Supplier
                    </div>
                    <div className="mt-1 text-xs text-[#9CA3AF]">
                      Sell parts
                    </div>
                  </button>
                </div>
              </div>

              {accountType === "buyer" ? (
                <div className="mb-4 space-y-2">
                  <Label className="text-sm font-medium text-white">
                    Full Name
                  </Label>

                  <div className="relative">
                    <UserIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9CA3AF]" />
                    <Input
                      type="text"
                      placeholder="Enter your name"
                      className="h-12 border-[#2A2A2A] bg-[#0A0A0A] pl-12 pr-4 text-white placeholder:text-[#4B5563] focus-visible:ring-[#DC2626]/50"
                      required
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-4 space-y-2">
                    <Label className="text-sm font-medium text-white">
                      Business Name
                    </Label>

                    <div className="relative">
                      <BuildingIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9CA3AF]" />
                      <Input
                        type="text"
                        placeholder="Enter business name"
                        className="h-12 border-[#2A2A2A] bg-[#0A0A0A] pl-12 pr-4 text-white placeholder:text-[#4B5563] focus-visible:ring-[#DC2626]/50"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4 space-y-2">
                    <Label className="text-sm font-medium text-white">
                      Phone Number
                    </Label>

                    <Input
                      type="tel"
                      placeholder="Enter phone number"
                      className="h-12 border-[#2A2A2A] bg-[#0A0A0A] text-white placeholder:text-[#4B5563] focus-visible:ring-[#DC2626]/50"
                      required
                    />
                  </div>
                </>
              )}

              <div className="mb-4 space-y-2">
                <Label className="text-sm font-medium text-white">
                  Email Address
                </Label>

                <div className="relative">
                  <MailIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9CA3AF]" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="h-12 border-[#2A2A2A] bg-[#0A0A0A] pl-12 pr-4 text-white placeholder:text-[#4B5563] focus-visible:ring-[#DC2626]/50"
                    required
                  />
                </div>
              </div>

              <div className="mb-4 space-y-2">
                <Label className="text-sm font-medium text-white">
                  Password
                </Label>

                <div className="relative">
                  <LockIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9CA3AF]" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="h-12 border-[#2A2A2A] bg-[#0A0A0A] pl-12 pr-12 text-white placeholder:text-[#4B5563] focus-visible:ring-[#DC2626]/50"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 text-[#9CA3AF] hover:bg-transparent hover:text-white"
                  >
                    <EyeIcon className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="mb-6 flex items-start gap-3">
                <Checkbox
                  id="terms"
                  className="mt-1 border-[#2A2A2A] data-[state=checked]:border-[#DC2626] data-[state=checked]:bg-[#DC2626]"
                />
                <Label
                  htmlFor="terms"
                  className="text-sm leading-6 text-[#9CA3AF]"
                >
                  I agree to the{" "}
                  <a href="#" className="text-[#DC2626] hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-[#DC2626] hover:underline">
                    Privacy Policy
                  </a>
                </Label>
              </div>

              <Button
                type="submit"
                className="h-12 w-full rounded-lg bg-[#DC2626] font-medium text-white hover:bg-[#B91C1C]"
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