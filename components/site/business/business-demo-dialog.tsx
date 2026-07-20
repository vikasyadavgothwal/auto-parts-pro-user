"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentProps,
  type FormEvent,
  type ReactNode,
} from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CountryPhoneInput,
  isValidInternationalPhoneNumber,
} from "@/components/site/shared/country-phone-input";
import type { BusinessQueryType } from "@/lib/business-query-cta";

type BusinessDemoDialogButtonProps = {
  children: ReactNode;
  className?: string;
  queryType?: BusinessQueryType;
  source?: string;
  variant?: ComponentProps<typeof Button>["variant"];
};

const inputClassName =
  "h-11 rounded-xl border-border bg-brand-surface px-3 text-white placeholder:text-brand-placeholder";
const messageMaxLength = 1500;

export function BusinessDemoDialogButton({
  children,
  className,
  queryType = "General",
  source = "Business CTA",
  variant,
}: BusinessDemoDialogButtonProps) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [phoneCountryCode, setPhoneCountryCode] = useState("+971");
  const [phone, setPhone] = useState("");
  const [messageLength, setMessageLength] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const formId = useId();

  useEffect(() => {
    return () => {
      if (closeTimer.current) {
        clearTimeout(closeTimer.current);
      }
    };
  }, []);

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen && closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    if (nextOpen) {
      setError("");
      setSuccess("");
    }
    setOpen(nextOpen);
  }

  const updatePhone = useCallback((value: string) => {
    setPhone(value.replace(/\D/g, "").slice(0, 14));
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    const name = String(values.name ?? "").trim();
    const email = String(values.email ?? "").trim();
    const phoneNumber = String(values.phone ?? "").trim();
    const company = String(values.company ?? "").trim();
    const message = String(values.message ?? "").trim();

    setError("");
    setSuccess("");

    if (name.length < 2) {
      setError("Enter your full name.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    if (!isValidInternationalPhoneNumber(phoneNumber)) {
      setError("Enter a valid phone number with country code.");
      return;
    }
    if (company.length < 2) {
      setError("Enter your company name.");
      return;
    }
    if (message.length < 5) {
      setError("Add a short message.");
      return;
    }
    if (message.length > messageMaxLength) {
      setError(`Message must be ${messageMaxLength} characters or less.`);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/business-queries", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: queryType,
          source,
          name,
          email,
          phone: phoneNumber,
          company,
          message,
          pagePath: window.location.pathname,
        }),
      });
      const payload = (await response.json().catch(() => null)) as
        | { ok?: boolean; message?: string }
        | null;

      if (!response.ok || !payload?.ok) {
        throw new Error(payload?.message || "Unable to submit the form.");
      }

      form.reset();
      setPhone("");
      setMessageLength(0);
      setSuccess("Thanks. Your request has been submitted.");
      closeTimer.current = setTimeout(() => {
        setOpen(false);
        setSuccess("");
      }, 2000);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to submit the form.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button type="button" variant={variant} className={className}>
          {children}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[calc(100dvh-2rem)] overflow-y-auto border border-border bg-brand-panel p-5 sm:max-w-lg sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-white">
            Schedule a Demo
          </DialogTitle>
          <DialogDescription className="text-brand-muted">
            Share your details and the AutoPartsPro team will contact you.
          </DialogDescription>
        </DialogHeader>

        <form className="grid gap-4" onSubmit={handleSubmit} noValidate>
          <input type="hidden" name="source" value={source} />

          <div className="grid gap-2">
            <Label htmlFor={`${formId}-name`} className="text-white">
              Name
            </Label>
            <Input
              id={`${formId}-name`}
              name="name"
              required
              className={inputClassName}
              autoComplete="name"
              minLength={2}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor={`${formId}-email`} className="text-white">
              Email
            </Label>
            <Input
              id={`${formId}-email`}
              name="email"
              type="email"
              required
              className={inputClassName}
              autoComplete="email"
            />
          </div>

          <CountryPhoneInput
            id={`${formId}-phone`}
            name="phone"
            label="Phone"
            countryCode={phoneCountryCode}
            phoneNumber={phone}
            onCountryCodeChange={setPhoneCountryCode}
            onPhoneNumberChange={updatePhone}
            labelClassName="text-white"
            selectClassName="h-11 border-border bg-brand-surface text-white"
            inputClassName="h-11 border-border bg-brand-surface text-white placeholder:text-brand-placeholder"
          />

          <div className="grid gap-2">
            <Label htmlFor={`${formId}-company`} className="text-white">
              Company
            </Label>
            <Input
              id={`${formId}-company`}
              name="company"
              required
              className={inputClassName}
              autoComplete="organization"
              minLength={2}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor={`${formId}-message`} className="text-white">
              Message
            </Label>
            <Textarea
              id={`${formId}-message`}
              name="message"
              required
              rows={4}
              minLength={5}
              maxLength={messageMaxLength}
              onChange={(event) => setMessageLength(event.target.value.length)}
              className="resize-none rounded-xl border-border bg-brand-surface px-3 py-2 text-white placeholder:text-brand-placeholder"
            />
            <p className="text-right text-xs text-brand-muted">
              {messageLength}/{messageMaxLength}
            </p>
          </div>

          <div aria-live="polite" className="min-h-5">
            {error ? <p className="text-sm text-red-400">{error}</p> : null}
            {success ? <p className="text-sm text-green-400">{success}</p> : null}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 h-11 w-full rounded-xl font-medium hover:bg-brand-primary-hover"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
