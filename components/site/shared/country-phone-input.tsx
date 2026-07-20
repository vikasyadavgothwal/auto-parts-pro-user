"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export const PHONE_COUNTRY_OPTIONS = [
  { code: "+971", label: "UAE" },
  { code: "+91", label: "India" },
  { code: "+966", label: "Saudi Arabia" },
  { code: "+1", label: "United States" },
  { code: "+44", label: "United Kingdom" },
  { code: "+974", label: "Qatar" },
  { code: "+965", label: "Kuwait" },
  { code: "+968", label: "Oman" },
  { code: "+973", label: "Bahrain" },
  { code: "+92", label: "Pakistan" },
] as const;

export const normalizePhoneDigits = (value: string, maximum = 14) =>
  value.replace(/\D/g, "").slice(0, maximum);

export const isValidNationalPhoneNumber = (value: string) =>
  /^\d{6,14}$/.test(value);

export const buildInternationalPhoneNumber = (
  countryCode: string,
  phoneNumber: string,
) => `${countryCode}${normalizePhoneDigits(phoneNumber)}`;

export const isValidInternationalPhoneNumber = (value: string) =>
  /^\+[1-9]\d{6,14}$/.test(value);

type CountryPhoneInputProps = {
  id: string;
  label?: string;
  name?: string;
  countryCode: string;
  phoneNumber: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
  selectClassName?: string;
  inputClassName?: string;
  onCountryCodeChange: (value: string) => void;
  onPhoneNumberChange: (value: string) => void;
};

export function CountryPhoneInput({
  id,
  label,
  name,
  countryCode,
  phoneNumber,
  required = true,
  disabled = false,
  className,
  labelClassName,
  selectClassName,
  inputClassName,
  onCountryCodeChange,
  onPhoneNumberChange,
}: CountryPhoneInputProps) {
  const fullPhoneNumber = buildInternationalPhoneNumber(countryCode, phoneNumber);

  return (
    <div className={cn("grid gap-2", className)}>
      {label ? (
        <Label htmlFor={id} className={labelClassName}>
          {label}
        </Label>
      ) : null}
      {name ? <input type="hidden" name={name} value={fullPhoneNumber} /> : null}
      <div className="flex min-w-0">
        <select
          aria-label="Country code"
          value={countryCode}
          disabled={disabled}
          onChange={(event) => onCountryCodeChange(event.target.value)}
          className={cn(
            "h-12 w-32 shrink-0 rounded-l-xl border border-input bg-input px-3 text-sm text-foreground outline-none transition-[border-color,box-shadow] focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50",
            selectClassName,
          )}
        >
          {PHONE_COUNTRY_OPTIONS.map((country) => (
            <option key={`${country.code}-${country.label}`} value={country.code}>
              {country.code} {country.label}
            </option>
          ))}
        </select>
        <Input
          id={id}
          type="tel"
          value={phoneNumber}
          required={required}
          disabled={disabled}
          onChange={(event) =>
            onPhoneNumberChange(normalizePhoneDigits(event.target.value))
          }
          autoComplete="tel-national"
          inputMode="numeric"
          pattern="[0-9]{6,14}"
          minLength={6}
          maxLength={14}
          placeholder="Phone number"
          className={cn("h-12 min-w-0 rounded-l-none border-l-0", inputClassName)}
        />
      </div>
    </div>
  );
}
