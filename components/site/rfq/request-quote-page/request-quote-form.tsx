"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";

import { AuthModalCard } from "@/components/site/AuthModal";
import { PHONE_COUNTRY_OPTIONS } from "@/components/site/shared/country-phone-input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { dashboardUrlForRole, getCurrentUser, siteAuthenticatedFetch } from "@/lib/current-user";
import type { UserAuthProfile } from "@/types/api/user-auth";
import {
  CompanyInformationSection,
  type ImportedRfqPart,
  PartsNeededSection,
  type RfqVehicleOption,
  VehicleInformationSection,
} from "./form-sections";

type UserVehiclesResponse = {
  ok: boolean;
  vehicles?: Array<{
    id: string;
    year: string;
    make: string;
    model: string;
    vin: string;
    mileage?: string;
    primary?: boolean;
    isPrimary?: boolean;
  }>;
  message?: string;
};

type FleetVehiclesResponse = {
  ok: boolean;
  vehicles?: Array<{
    id: string;
    vehicleName: string;
    vin: string;
    mileage: number;
    year: number;
    make: string;
    model: string;
    trim: string | null;
    isPrimary: boolean;
  }>;
  message?: string;
};

type ResolvedVinVehicle = {
  vin: string;
  year: number;
  make: string;
  model: string;
};

type VinLookupResponse = {
  ok: boolean;
  found?: boolean;
  vehicle?: ResolvedVinVehicle;
  message?: string;
};

type RfqImportResponse = {
  ok: boolean;
  vin?: string;
  vins?: string[];
  parts?: Array<{
    vin?: string;
    partName: string;
    partNumber: string;
    quantity: number;
    targetPrice: string;
  }>;
  message?: string;
};

const userVehicleLabel = (
  vehicle: NonNullable<UserVehiclesResponse["vehicles"]>[number],
) =>
  [vehicle.year, vehicle.make, vehicle.model].filter(Boolean).join(" ");

const mapUserVehicle = (
  vehicle: NonNullable<UserVehiclesResponse["vehicles"]>[number],
): RfqVehicleOption => ({
  id: vehicle.id,
  label: userVehicleLabel(vehicle) || "Saved vehicle",
  year: vehicle.year,
  make: vehicle.make,
  model: vehicle.model,
  vin: vehicle.vin,
  mileage: vehicle.mileage,
});

const mapFleetVehicle = (
  vehicle: NonNullable<FleetVehiclesResponse["vehicles"]>[number],
): RfqVehicleOption => ({
  id: vehicle.id,
  label: vehicle.vehicleName || [vehicle.year, vehicle.make, vehicle.model].filter(Boolean).join(" "),
  year: String(vehicle.year),
  make: vehicle.make,
  model: vehicle.model,
  trim: vehicle.trim ?? "",
  vin: vehicle.vin,
  mileage: String(vehicle.mileage),
});

const cleanText = (value: string) => value.trim().replace(/\s+/g, " ");

const validVin = (value: string) => /^[A-HJ-NPR-Z0-9]{17}$/.test(value);
const maxParts = 20;

const profileName = (user: UserAuthProfile) =>
  [user.firstName, user.lastName].filter(Boolean).join(" ") ||
  user.email ||
  "";

const splitPhone = (value: string | null | undefined) => {
  const normalized = value?.trim() ?? "";
  const matchedCountry = [...PHONE_COUNTRY_OPTIONS]
    .sort((left, right) => right.code.length - left.code.length)
    .find((country) => normalized.startsWith(country.code));
  if (!matchedCountry) return { countryCode: "+971", phoneNumber: "" };
  return {
    countryCode: matchedCountry.code,
    phoneNumber: normalized.slice(matchedCountry.code.length).replace(/\D/g, ""),
  };
};

export function RequestQuoteForm() {
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserAuthProfile | null>(null);
  const [vehicles, setVehicles] = useState<RfqVehicleOption[]>([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState("");
  const [isLoadingVehicles, setIsLoadingVehicles] = useState(true);
  const [isImporting, setIsImporting] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneCountryCode, setPhoneCountryCode] = useState("+971");
  const [phoneNumber, setPhoneNumber] = useState("");

  const loadAccountVehicles = useCallback(async () => {
    try {
      const user = await getCurrentUser();
      if (!user) {
        setCurrentUser(null);
        setVehicles([]);
        setSelectedVehicleId("");
        setIsLoadingVehicles(false);
        return;
      }

      setCurrentUser(user);
      const displayName = profileName(user);
      setCompanyName((current) => current || displayName);
      setContactName((current) => current || displayName);
      setEmail((current) => current || user.email || "");
      const phone = splitPhone(user.phone);
      if (phone.phoneNumber) {
        setPhoneCountryCode(phone.countryCode);
        setPhoneNumber((current) => current || phone.phoneNumber);
      }
      const vehicleEndpoint =
        user.activeRole === "Fleet"
          ? "/api/fleet/vehicles?page=1&pageSize=50"
          : user.activeRole === "User"
            ? "/api/user/vehicles?page=1&pageSize=50"
            : "";

      if (!vehicleEndpoint) {
        setVehicles([]);
        setSelectedVehicleId("");
        setIsLoadingVehicles(false);
        return;
      }

      const response = await siteAuthenticatedFetch(vehicleEndpoint, {
        method: "GET",
        cache: "no-store",
        credentials: "include",
        headers: { accept: "application/json" },
      });
      const payload = user.activeRole === "Fleet"
        ? ((await response.json()) as FleetVehiclesResponse)
        : ((await response.json()) as UserVehiclesResponse);
      if (!response.ok || !payload.ok) {
        throw new Error(payload.message ?? "Unable to load saved vehicles");
      }

      const nextVehicles =
        user.activeRole === "Fleet"
          ? ((payload as FleetVehiclesResponse).vehicles ?? []).map(mapFleetVehicle)
          : ((payload as UserVehiclesResponse).vehicles ?? []).map(mapUserVehicle);
      setVehicles(nextVehicles);
      setSelectedVehicleId(
        (current) =>
          (current && nextVehicles.some((vehicle) => vehicle.id === current)
            ? current
            : "") ||
          nextVehicles[0]?.id ||
          "",
      );
      setIsLoadingVehicles(false);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to load saved vehicles");
      setVehicles([]);
      setSelectedVehicleId("");
      setIsLoadingVehicles(false);
    }
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      void loadAccountVehicles();
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [loadAccountVehicles]);

  async function importRfqFile(file: File) {
    setIsImporting(true);
    setError("");
    setMessage("");
    try {
      const body = new FormData();
      body.set("file", file);
      const response = await siteAuthenticatedFetch("/api/rfqs/import", {
        method: "POST",
        body,
        credentials: "include",
      });
      const result = (await response.json()) as RfqImportResponse;
      if (!response.ok || !result.ok || !result.parts?.length) {
        throw new Error(result.message ?? "Unable to import RFQ file");
      }
      if (result.parts.length > maxParts) {
        throw new Error(`An RFQ can include up to ${maxParts} parts.`);
      }
      const importedVin = result.vin?.trim().toUpperCase();
      if (importedVin) {
        const matchedVehicle = vehicles.find((vehicle) => vehicle.vin.trim().toUpperCase() === importedVin);
        setSelectedVehicleId(matchedVehicle?.id ?? "");
      }
      return result.parts.map((part): ImportedRfqPart => ({
        vin: part.vin?.trim().toUpperCase() || result.vin?.trim().toUpperCase() || "",
        partName: part.partName,
        partNumber: part.partNumber,
        quantity: part.quantity,
        targetPrice: part.targetPrice,
        notes: "",
      }));
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "Unable to import RFQ file";
      setError(message);
      throw new Error(message);
    } finally {
      setIsImporting(false);
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const activeUser = currentUser ?? (await getCurrentUser());
    if (!activeUser) {
      setIsAuthModalOpen(true);
      setError("Sign in with a User or Fleet account to submit an RFQ.");
      setMessage("");
      return;
    }
    if (activeUser.activeRole !== "User" && activeUser.activeRole !== "Fleet") {
      setError(
        "Only User and Fleet accounts can submit RFQs.",
      );
      setMessage("");
      return;
    }

    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    const selectedVehicle = vehicles.find((vehicle) => vehicle.id === selectedVehicleId);
    const partIds = Array.from(values.keys())
      .map((key) => key.match(/^parts\.(\d+)\.name$/)?.[1])
      .filter((value): value is string => Boolean(value));
    const parts = partIds.map((id) => ({
      vehicleVin: String(values.get(`parts.${id}.vin`) ?? "").trim().toUpperCase(),
      partName: String(values.get(`parts.${id}.name`) ?? ""),
      partNumber: String(values.get(`parts.${id}.partNumber`) ?? ""),
      quantity: Number(values.get(`parts.${id}.quantity`) ?? 1),
      targetPrice: String(values.get(`parts.${id}.targetPrice`) ?? ""),
      notes: String(values.get(`parts.${id}.notes`) ?? ""),
    }));
    if (parts.length > maxParts) {
      setError(`An RFQ can include up to ${maxParts} parts.`);
      setMessage("");
      return;
    }
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + 7);
    const submittedCompanyName = String(values.get("companyName") ?? "");
    const submittedContactName = String(values.get("contactName") ?? "").trim();
    const submittedEmail = String(values.get("email") ?? "").trim().toLowerCase();
    const phone = String(values.get("phone") ?? "").trim();
    const source = activeUser.activeRole === "Fleet" ? "fleet" : "user";
    const selectedVin = selectedVehicle?.vin.trim().toUpperCase() ?? "";
    const currentYear = new Date().getFullYear();
    const validationError =
      submittedCompanyName.trim().length < 2
        ? "Company name must contain at least 2 characters."
        : submittedContactName.length < 2
          ? "Contact name must contain at least 2 characters."
            : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submittedEmail)
              ? "Enter a valid email address."
              : !/^\+\d{8,18}$/.test(phone)
                ? "Enter a valid phone number with country code."
              : !selectedVehicle && parts.some((part) => !part.vehicleVin)
                ? "Select a saved vehicle or enter a valid VIN for every part."
                : parts.some((part) => part.vehicleVin && !validVin(part.vehicleVin))
                  ? "Every VIN must contain exactly 17 valid characters."
                  : selectedVehicle && !validVin(selectedVin)
                    ? "Selected vehicle VIN must contain exactly 17 valid characters."
                    : selectedVehicle &&
                        (!Number.isInteger(Number(selectedVehicle.year)) ||
                          Number(selectedVehicle.year) < 1886 ||
                          Number(selectedVehicle.year) > currentYear + 1)
                      ? `Vehicle year must be between 1886 and ${currentYear + 1}.`
                      : selectedVehicle && !selectedVehicle.make.trim()
                        ? "Vehicle make is required."
                        : selectedVehicle && !selectedVehicle.model.trim()
                          ? "Vehicle model is required."
                          : parts.some((part) => part.partName.trim().length < 2)
                        ? "Every part must have a valid part name."
                        : parts.some(
                            (part) =>
                              !Number.isInteger(part.quantity) ||
                              part.quantity < 1 ||
                              part.quantity > 10000,
                          )
                          ? "Every part quantity must be between 1 and 10,000."
                          : parts.some(
                              (part) =>
                                part.targetPrice !== "" &&
                                (!Number.isFinite(Number(part.targetPrice)) ||
                                  Number(part.targetPrice) < 0),
                            )
                            ? "Target prices must be valid non-negative amounts."
                            : "";
    if (validationError) {
      setError(validationError);
      setMessage("");
      return;
    }

    const partVins = Array.from(new Set(parts.map((part) => part.vehicleVin).filter(Boolean)));
    const batchVins = Array.from(new Set([...partVins, ...(parts.some((part) => !part.vehicleVin) && selectedVin ? [selectedVin] : [])]));
    const resolvedVehicles: ResolvedVinVehicle[] = [];
    const lookupPath =
      source === "fleet"
        ? "/api/fleet/vehicles/vin-lookup"
        : "/api/user/vehicles/vin-lookup";

    for (const vinToResolve of partVins) {
      if (vehicles.some((vehicle) => vehicle.vin.trim().toUpperCase() === vinToResolve)) {
        continue;
      }
      const lookupResponse = await siteAuthenticatedFetch(
        `${lookupPath}?vin=${encodeURIComponent(vinToResolve)}`,
        { method: "GET", cache: "no-store", credentials: "include" },
      );
      const lookup = (await lookupResponse.json()) as VinLookupResponse;
      if (!lookupResponse.ok || !lookup.ok) {
        setError(lookup.message ?? `Unable to validate VIN ${vinToResolve}.`);
        setMessage("");
        return;
      }
      if (!lookup.found || !lookup.vehicle) {
        setError(`VIN ${vinToResolve} was not found. Correct it before submitting.`);
        setMessage("");
        return;
      }
      resolvedVehicles.push(lookup.vehicle);
    }

    const primaryVin = batchVins[0];
    const primarySavedVehicle = vehicles.find((vehicle) => vehicle.vin.trim().toUpperCase() === primaryVin);
    const primaryResolvedVehicle = resolvedVehicles.find((vehicle) => vehicle.vin === primaryVin);
    const primaryVehicle = primarySavedVehicle
      ? {
          id: primarySavedVehicle.id,
          year: Number(primarySavedVehicle.year),
          make: primarySavedVehicle.make,
          model: primarySavedVehicle.model,
          trim: primarySavedVehicle.trim ?? "",
          vin: primarySavedVehicle.vin,
        }
      : primaryResolvedVehicle
        ? {
            year: primaryResolvedVehicle.year,
            make: primaryResolvedVehicle.make,
            model: primaryResolvedVehicle.model,
            trim: "",
            vin: primaryResolvedVehicle.vin,
          }
        : null;
    if (!primaryVehicle) {
      setError(`VIN ${primaryVin} was not found. Correct it before submitting.`);
      setMessage("");
      return;
    }

    const payload = {
      source,
      ...(batchVins.length === 1 && "id" in primaryVehicle
        ? source === "fleet"
          ? { fleetVehicleId: primaryVehicle.id }
          : { userVehicleId: primaryVehicle.id }
        : {}),
      projectName: `${cleanText(submittedCompanyName)} parts request`,
      description: "Public website RFQ",
      responseDeadline: deadline.toISOString(),
      deliveryRequirement: "Standard Delivery",
      paymentTerms: "Due on Receipt",
      companyName: cleanText(submittedCompanyName),
      contactName: cleanText(submittedContactName),
      email: submittedEmail,
      phone,
      vehicle: {
        vin: primaryVehicle.vin.trim().toUpperCase(),
        year: primaryVehicle.year,
        make: cleanText(primaryVehicle.make),
        model: cleanText(primaryVehicle.model),
        trim: cleanText(primaryVehicle.trim),
      },
      parts: parts.map((part) => ({
        vehicleVin: part.vehicleVin || selectedVin,
        partName: cleanText(part.partName),
        partNumber: cleanText(part.partNumber),
        quantity: part.quantity,
        targetPrice: part.targetPrice,
        notes: cleanText(part.notes),
      })),
    };
    const body = new FormData();
    body.set("payload", JSON.stringify(payload));

    setPending(true);
    setError("");
    setMessage("");
    try {
      const response = await siteAuthenticatedFetch("/api/rfqs", {
        method: "POST",
        body,
        credentials: "include",
      });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.message ?? "Unable to submit RFQ");
      form.reset();
      setMessage("Quote request submitted to suppliers successfully.");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to submit RFQ");
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <form className="space-y-6 sm:space-y-8" onSubmit={submit}>
        <CompanyInformationSection
          companyName={companyName}
          contactName={contactName}
          email={email}
          phoneCountryCode={phoneCountryCode}
          phoneNumber={phoneNumber}
          onCompanyNameChange={setCompanyName}
          onContactNameChange={setContactName}
          onEmailChange={setEmail}
          onPhoneCountryCodeChange={setPhoneCountryCode}
          onPhoneNumberChange={setPhoneNumber}
        />
        <VehicleInformationSection
          accountRole={currentUser?.activeRole}
          vehicles={vehicles}
          selectedVehicleId={selectedVehicleId}
          isLoadingVehicles={isLoadingVehicles}
          dashboardVehiclesUrl={`${dashboardUrlForRole(currentUser?.activeRole)}/vehicles`}
          onVehicleChange={setSelectedVehicleId}
        />
        <PartsNeededSection
          isImporting={isImporting}
          onImportFile={importRfqFile}
        />
        {error ? <p className="text-center text-sm text-red-500">{error}</p> : null}
        {message ? <p className="text-center text-sm text-green-500">{message}</p> : null}
        <div className="flex justify-center">
          <Button type="submit" disabled={pending} className="h-12 w-full rounded-full px-6 text-base font-medium hover:bg-brand-primary-hover sm:h-auto sm:w-auto sm:px-8 sm:py-6 sm:text-lg">
            {pending ? "Submitting..." : "Submit Quote Request"}
          </Button>
        </div>
      </form>

      <Dialog open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen}>
        <DialogContent
          showCloseButton={false}
          className="max-w-[calc(100%-1rem)] border-0 bg-transparent p-0 text-inherit shadow-none ring-0 sm:max-w-lg"
        >
          <DialogHeader className="sr-only">
            <DialogTitle>Sign in to submit RFQ</DialogTitle>
            <DialogDescription>
              Sign in or create a User account to submit this RFQ.
            </DialogDescription>
          </DialogHeader>
          <AuthModalCard
            onAuthenticated={() => {
              setIsAuthModalOpen(false);
              void loadAccountVehicles();
            }}
            onClose={() => setIsAuthModalOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
