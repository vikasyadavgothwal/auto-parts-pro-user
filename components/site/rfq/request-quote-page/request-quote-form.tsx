"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { toast } from "sonner";

import { AuthModalCard } from "@/components/site/AuthModal";
import {
  PHONE_COUNTRY_OPTIONS,
} from "@/components/site/shared/country-phone-input";
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
import {
  RFQ_MAX_PARTS,
  validateRfqImportFile,
} from "@/lib/rfq-validation";
import {
  firstZodError,
  internationalPhoneSchema,
  rfqFormSchema,
} from "@/lib/validation/site-forms";

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
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserAuthProfile | null>(null);
  const [vehicles, setVehicles] = useState<RfqVehicleOption[]>([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState("");
  const [isLoadingVehicles, setIsLoadingVehicles] = useState(true);
  const [isImporting, setIsImporting] = useState(false);
  const [isCheckingVin, setIsCheckingVin] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneCountryCode, setPhoneCountryCode] = useState("+971");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [saveVehicle, setSaveVehicle] = useState(false);
  const [partsResetKey, setPartsResetKey] = useState(0);
  const submitLockRef = useRef(false);

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
      toast.error(caught instanceof Error ? caught.message : "Unable to load saved vehicles");
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
    try {
      const fileError = validateRfqImportFile(file);
      if (fileError) throw new Error(fileError);

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
      if (result.parts.length > RFQ_MAX_PARTS) {
        throw new Error(`An RFQ can include up to ${RFQ_MAX_PARTS} parts.`);
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
      toast.error(message);
      throw new Error(message);
    } finally {
      setIsImporting(false);
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending || isCheckingVin || isImporting) return;
    const activeUser = currentUser ?? (await getCurrentUser());
    if (!activeUser) {
      setIsAuthModalOpen(true);
      toast.error("Sign in with a User or Fleet account to submit an RFQ.");
      return;
    }
    if (activeUser.activeRole !== "User" && activeUser.activeRole !== "Fleet") {
      toast.error(
        "Only User and Fleet accounts can submit RFQs.",
      );
      return;
    }

    const form = event.currentTarget;
    if (!form.checkValidity()) {
      const invalidField = form.querySelector(":invalid") as
        | HTMLInputElement
        | HTMLTextAreaElement
        | null;
      toast.error(invalidField?.validationMessage || "Check the required RFQ fields.");
      invalidField?.focus();
      return;
    }
    const values = new FormData(form);
    const selectedVehicle = vehicles.find((vehicle) => vehicle.id === selectedVehicleId);
    const manualVehicle = {
      vin: String(values.get("vehicleVin") ?? "").trim().toUpperCase(),
      year: String(values.get("vehicleYear") ?? "").trim(),
      make: String(values.get("vehicleMake") ?? "").trim(),
      model: String(values.get("vehicleModel") ?? "").trim(),
      trim: String(values.get("vehicleTrim") ?? "").trim(),
    };
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
    if (parts.length > RFQ_MAX_PARTS) {
      toast.error(`An RFQ can include up to ${RFQ_MAX_PARTS} parts.`);
      return;
    }
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + 7);
    const submittedCompanyName = String(values.get("companyName") ?? "");
    const submittedContactName = String(values.get("contactName") ?? "").trim();
    const submittedEmail = String(values.get("email") ?? "").trim().toLowerCase();
    const phone = String(values.get("phone") ?? "").trim();
    const source = activeUser.activeRole === "Fleet" ? "fleet" : "user";
    const selectedVin = selectedVehicle
      ? selectedVehicle.vin.trim().toUpperCase()
      : manualVehicle.vin;
    const validation = rfqFormSchema.safeParse({
      companyName: submittedCompanyName,
      contactName: submittedContactName,
      email: submittedEmail,
      phone,
      selectedVehicleVin: selectedVin,
      selectedVehicleYear: selectedVehicle?.year ?? manualVehicle.year,
      selectedVehicleMake: selectedVehicle?.make ?? manualVehicle.make,
      selectedVehicleModel: selectedVehicle?.model ?? manualVehicle.model,
      parts,
    });
    if (!validation.success) {
      toast.error(firstZodError(validation.error));
      return;
    }
    const phoneValidation = internationalPhoneSchema.safeParse(phone);
    if (!phoneValidation.success) {
      toast.error(firstZodError(phoneValidation.error));
      return;
    }
    if (submitLockRef.current) return;
    submitLockRef.current = true;

    try {
      const partVins = Array.from(new Set(parts.map((part) => part.vehicleVin).filter(Boolean)));
      let resolvedVehicles: ResolvedVinVehicle[] = [];
      let primaryVehicle:
        | {
            id?: string;
            year: number;
            make: string;
            model: string;
            trim: string;
            vin: string;
          }
        | null = null;
      const manualPrimaryVehicle = !selectedVehicle && manualVehicle.year && manualVehicle.make && manualVehicle.model
        ? {
            year: Number(manualVehicle.year),
            make: manualVehicle.make,
            model: manualVehicle.model,
            trim: manualVehicle.trim,
            vin: manualVehicle.vin,
          }
        : null;
      const lookupPath =
        source === "fleet"
          ? "/api/fleet/vehicles/vin-lookup"
          : "/api/user/vehicles/vin-lookup";
      const batchVins = Array.from(new Set([
        ...partVins,
        ...(selectedVehicle && parts.some((part) => !part.vehicleVin) && selectedVin ? [selectedVin] : []),
      ]));

      setIsCheckingVin(true);
      try {
        const lookupResults: ResolvedVinVehicle[] = [];
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
            toast.error(lookup.message ?? `Unable to validate VIN ${vinToResolve}.`);
            return;
          }
          if (!lookup.found || !lookup.vehicle) {
            toast.error(`VIN ${vinToResolve} was not found. Correct it before submitting.`);
            return;
          }
          lookupResults.push(lookup.vehicle);
        }
        resolvedVehicles = lookupResults;

        const primaryVin = batchVins[0] || manualPrimaryVehicle?.vin || "";
        const primarySavedVehicle = vehicles.find((vehicle) => vehicle.vin.trim().toUpperCase() === primaryVin);
        const primaryResolvedVehicle = resolvedVehicles.find((vehicle) => vehicle.vin === primaryVin);
        primaryVehicle = primarySavedVehicle
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
            : manualPrimaryVehicle;
        if (!primaryVehicle) {
          toast.error("Select a saved vehicle or enter vehicle information before submitting.");
          return;
        }
      } finally {
        setIsCheckingVin(false);
      }

      const payload = {
      source,
      ...(selectedVehicle && batchVins.length === 1 && "id" in primaryVehicle
        ? source === "fleet"
          ? { fleetVehicleId: primaryVehicle.id }
          : { userVehicleId: primaryVehicle.id }
        : {}),
      projectName: `${cleanText(submittedCompanyName || submittedContactName || submittedEmail)} parts request`,
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
      try {
        const response = await siteAuthenticatedFetch("/api/rfqs", {
          method: "POST",
          body,
          credentials: "include",
        });
        const result = await response.json();
        if (!response.ok || !result.ok) throw new Error(result.message ?? "Unable to submit RFQ");
        form.reset();
        if (activeUser.activeRole === "User" && saveVehicle && !selectedVehicle && manualPrimaryVehicle) {
          await siteAuthenticatedFetch("/api/user/vehicles", {
            method: "POST",
            credentials: "include",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              year: manualPrimaryVehicle.year,
              make: manualPrimaryVehicle.make,
              model: manualPrimaryVehicle.model,
              vin: manualPrimaryVehicle.vin || null,
              mileage: 0,
            }),
          }).catch(() => undefined);
        }
        setCompanyName("");
        setContactName("");
        setEmail("");
        setPhoneCountryCode("+971");
        setPhoneNumber("");
        setSelectedVehicleId("");
        setSaveVehicle(false);
        setPartsResetKey((current) => current + 1);
        toast.success("Quote request submitted to suppliers successfully.");
      } catch (submitError) {
        toast.error(submitError instanceof Error ? submitError.message : "Unable to submit RFQ");
      } finally {
        setPending(false);
      }
    } finally {
      submitLockRef.current = false;
    }
  }

  return (
    <>
      <form noValidate className="space-y-6 sm:space-y-8" onSubmit={submit}>
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
          onVehicleChange={(vehicleId) => {
            setSelectedVehicleId(vehicleId);
            if (vehicleId) setSaveVehicle(false);
          }}
          saveVehicle={saveVehicle}
          onSaveVehicleChange={setSaveVehicle}
        />
        <PartsNeededSection
          key={partsResetKey}
          isImporting={isImporting}
          onImportFile={importRfqFile}
        />
        <div className="flex justify-center">
          <Button type="submit" disabled={pending || isCheckingVin || isImporting} className="h-12 w-full rounded-full px-6 text-base font-medium hover:bg-brand-primary-hover sm:h-auto sm:w-auto sm:px-8 sm:py-6 sm:text-lg">
            {isCheckingVin ? "Checking VIN..." : pending ? "Submitting..." : "Submit Quote Request"}
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
