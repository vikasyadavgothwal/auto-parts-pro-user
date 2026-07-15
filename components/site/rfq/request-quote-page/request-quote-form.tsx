"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";

import { AuthModalCard } from "@/components/site/AuthModal";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { dashboardUrlForRole, getCurrentUser } from "@/lib/current-user";
import type { UserAuthProfile } from "@/types/api/user-auth";
import {
  CompanyInformationSection,
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

export function RequestQuoteForm() {
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserAuthProfile | null>(null);
  const [vehicles, setVehicles] = useState<RfqVehicleOption[]>([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState("");
  const [isLoadingVehicles, setIsLoadingVehicles] = useState(true);

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

      const response = await fetch(vehicleEndpoint, {
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

    const selectedVehicle = vehicles.find((vehicle) => vehicle.id === selectedVehicleId);
    if (!selectedVehicle) {
      setError(
        activeUser.activeRole === "Fleet"
          ? "Select a fleet vehicle before submitting this RFQ."
          : "Select one of your saved vehicles before submitting this RFQ.",
      );
      setMessage("");
      return;
    }

    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    const partIds = Array.from(values.keys())
      .map((key) => key.match(/^parts\.(\d+)\.name$/)?.[1])
      .filter((value): value is string => Boolean(value));
    const parts = partIds.map((id) => ({
      partName: String(values.get(`parts.${id}.name`) ?? ""),
      partNumber: String(values.get(`parts.${id}.partNumber`) ?? ""),
      quantity: Number(values.get(`parts.${id}.quantity`) ?? 1),
      targetPrice: String(values.get(`parts.${id}.targetPrice`) ?? ""),
      notes: String(values.get(`parts.${id}.notes`) ?? ""),
    }));
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + 7);
    const companyName = String(values.get("companyName") ?? "");
    const contactName = String(values.get("contactName") ?? "").trim();
    const email = String(values.get("email") ?? "").trim().toLowerCase();
    const phone = String(values.get("phone") ?? "").trim();
    const source = activeUser.activeRole === "Fleet" ? "fleet" : "user";
    const vin = selectedVehicle.vin.trim().toUpperCase();
    const year = Number(selectedVehicle.year);
    const make = selectedVehicle.make.trim();
    const model = selectedVehicle.model.trim();
    const currentYear = new Date().getFullYear();
    const validationError =
      companyName.trim().length < 2
        ? "Company name must contain at least 2 characters."
        : contactName.length < 2
          ? "Contact name must contain at least 2 characters."
            : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
              ? "Enter a valid email address."
              : !/^\+\d{8,18}$/.test(phone)
                ? "Enter a valid phone number with country code."
              : vin && !/^[A-HJ-NPR-Z0-9]{17}$/.test(vin)
                ? "VIN must contain exactly 17 valid characters."
                : !Number.isInteger(year) || year < 1886 || year > currentYear + 1
                  ? `Vehicle year must be between 1886 and ${currentYear + 1}.`
                  : !make
                    ? "Vehicle make is required."
                    : !model
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
    const attachment = values.get("attachment");
    const attachmentError =
      attachment instanceof File && attachment.size > 10 * 1024 * 1024
        ? "Attachment must be 10 MB or smaller."
        : attachment instanceof File &&
            attachment.size > 0 &&
            !["application/pdf", "image/png", "image/jpeg"].includes(
              attachment.type,
            )
          ? "Attachment must be PDF, PNG, or JPG."
          : "";
    if (validationError || attachmentError) {
      setError(validationError || attachmentError);
      setMessage("");
      return;
    }
    const payload = {
      source,
      ...(source === "fleet"
        ? { fleetVehicleId: selectedVehicle.id }
        : { userVehicleId: selectedVehicle.id }),
      projectName: `${companyName} parts request`,
      description: "Public website RFQ",
      responseDeadline: deadline.toISOString(),
      deliveryRequirement: "Standard Delivery",
      paymentTerms: "Due on Receipt",
      companyName,
      contactName,
      email,
      phone,
      vehicle: {
        vin,
        year,
        make,
        model,
        trim: selectedVehicle.trim ?? "",
      },
      parts,
    };
    const body = new FormData();
    body.set("payload", JSON.stringify(payload));
    if (attachment instanceof File && attachment.size > 0) body.set("attachment", attachment);

    setPending(true);
    setError("");
    setMessage("");
    try {
      const response = await fetch("/api/rfqs", {
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
        <CompanyInformationSection />
        <VehicleInformationSection
          accountRole={currentUser?.activeRole}
          vehicles={vehicles}
          selectedVehicleId={selectedVehicleId}
          isLoadingVehicles={isLoadingVehicles}
          dashboardVehiclesUrl={`${dashboardUrlForRole(currentUser?.activeRole)}/vehicles`}
          onVehicleChange={setSelectedVehicleId}
        />
        <PartsNeededSection />
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
          className="max-w-[calc(100%-2rem)] border-0 bg-transparent p-0 text-inherit shadow-none ring-0 sm:max-w-md"
        >
          <DialogHeader className="sr-only">
            <DialogTitle>Sign in to submit RFQ</DialogTitle>
            <DialogDescription>
              Sign in or create a User or Fleet account to submit this RFQ.
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
