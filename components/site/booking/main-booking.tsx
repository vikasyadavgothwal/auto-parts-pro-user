"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "motion/react";
import { AuthModalCard } from "@/components/site/AuthModel";
import { BookingActions } from "@/components/site/booking/booking-actions";
import { BookingConfirmation } from "@/components/site/booking/booking-confirmation";
import { BOOKING_INITIAL_SELECTION } from "@/components/site/booking/config";
import { BookingProgress } from "@/components/site/booking/booking-progress";
import { DateTimeStep } from "@/components/site/booking/steps/date-time-step";
import { ReviewStep } from "@/components/site/booking/steps/review-step";
import { ServiceStep } from "@/components/site/booking/steps/service-step";
import { VehicleStep } from "@/components/site/booking/steps/vehicle-step";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/current-user";
import { getBookingAvailableDates, bookingStepOrder } from "@/lib/data/booking";
import {
  readUserVehiclesFromStorage,
  type UserVehicleRecord,
} from "@/lib/user-vehicles";
import type {
  BookingCustomerVehicle,
  BookingSelection,
  BookingService,
  BookingStep,
  GarageBookingResult,
} from "@/types/site/booking";
import type { UserAuthProfile } from "@/types/api/user-auth";
import type { PublicGarageDetail } from "@/types/site/garages";

type BookingPageProps = {
  garage: PublicGarageDetail | null;
  initialServiceId?: string;
};

type BookingResponse = {
  ok: boolean;
  message?: string;
  booking?: GarageBookingResult;
};

const servicePrice = (price: number) => price / 100;

const serviceDuration = (minutes: number) => {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  return remaining ? `${hours}h ${remaining}m` : `${hours}h`;
};

export function BookingPage({ garage, initialServiceId = "" }: BookingPageProps) {
  const router = useRouter();
  const services = useMemo<BookingService[]>(
    () =>
      (garage?.services ?? []).map((service) => ({
        id: service.id,
        name: service.name,
        price: servicePrice(service.price),
        currency: service.currency,
        duration: serviceDuration(service.durationMinutes),
        description: service.category || service.name,
      })),
    [garage],
  );
  const initialService = services.some((service) => service.id === initialServiceId)
    ? initialServiceId
    : services[0]?.id ?? "";
  const availableDates = useMemo(() => getBookingAvailableDates(), []);
  const [step, setStep] = useState<BookingStep>("service");
  const [selection, setSelection] = useState<BookingSelection>({
    ...BOOKING_INITIAL_SELECTION,
    serviceId: initialService,
  });
  const [currentUser, setCurrentUser] = useState<UserAuthProfile | null>(null);
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [vehicles, setVehicles] = useState<UserVehicleRecord[]>([]);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] =
    useState<GarageBookingResult | null>(null);
  const selectedService = services.find(
    (service) => service.id === selection.serviceId,
  );
  const selectedDate = availableDates.find(
    (date) => date.date === selection.date,
  );
  const customerVehicle: BookingCustomerVehicle = {
    customerName: selection.customerName.trim(),
    customerEmail: selection.customerEmail.trim(),
    customerPhone: selection.customerPhone.trim(),
    year: selection.vehicleYear.trim(),
    make: selection.vehicleMake.trim(),
    model: selection.vehicleModel.trim(),
    vin: selection.vehicleVin.trim(),
    notes: selection.notes.trim(),
  };

  const applyUserDefaults = (user: UserAuthProfile | null) => {
    if (!user) return;
    const name = [user.firstName, user.lastName].filter(Boolean).join(" ");
    setSelection((current) => ({
      ...current,
      customerName: current.customerName || name,
      customerEmail: current.customerEmail || user.email || "",
      customerPhone: current.customerPhone || user.phone || "",
    }));
  };

  const refreshCurrentUser = async () => {
    const user = await getCurrentUser();
    setCurrentUser(user);
    setVehicles(user ? readUserVehiclesFromStorage() : []);
    applyUserDefaults(user);
    setHasCheckedAuth(true);
    return user;
  };

  useEffect(() => {
    void refreshCurrentUser();
  }, []);

  const setSelectionValue = <Key extends keyof BookingSelection>(
    key: Key,
    value: BookingSelection[Key],
  ) => {
    setSubmitError("");
    setSelection((current) => ({
      ...current,
      [key]: value,
    }));
  };
  const handleSelectVehicle = (vehicle: UserVehicleRecord) => {
    setSubmitError("");
    setSelection((current) => ({
      ...current,
      vehicleId: vehicle.id,
      vehicleYear: vehicle.year,
      vehicleMake: vehicle.make,
      vehicleModel: vehicle.model,
      vehicleVin: vehicle.vin,
    }));
  };
  const vehicleDetailsComplete =
    Boolean(
      selection.vehicleId &&
        customerVehicle.make &&
        customerVehicle.model,
    );

  const handleConfirm = async () => {
    if (!garage || !selectedService || !selection.date || !selection.time) {
      setSubmitError("Select a garage, service, date, and time before booking.");
      return;
    }
    if (!vehicleDetailsComplete) {
      setSubmitError("Select one of your saved cars before booking.");
      return;
    }
    if (!currentUser) {
      setIsAuthModalOpen(true);
      setSubmitError("Login is required before booking a service.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/garage-bookings", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          garageId: garage.id,
          serviceId: selectedService.id,
          vehicleYear: customerVehicle.year,
          vehicleMake: customerVehicle.make,
          vehicleModel: customerVehicle.model,
          vehicleVin: customerVehicle.vin,
          notes: customerVehicle.notes,
          bookingDate: selection.date,
          bookingTime: selection.time,
        }),
      });
      const payload = (await response.json()) as BookingResponse;

      if (!response.ok || !payload.ok || !payload.booking) {
        throw new Error(payload.message || "Unable to confirm booking");
      }

      setConfirmedBooking(payload.booking);
      setStep("confirmed");
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Unable to confirm booking",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!garage) {
    return (
      <div className="flex min-h-full items-center justify-center bg-background p-8">
        <div className="w-full max-w-xl rounded-2xl border border-border bg-card p-8 text-center">
          <h1 className="mb-3 text-3xl font-bold text-foreground">
            Select a garage first
          </h1>
          <p className="mb-6 text-brand-muted">
            Choose a garage from the services page before booking an appointment.
          </p>
          <Button asChild className="rounded-xl bg-primary text-primary-foreground">
            <Link href="/services">Browse Garages</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (step === "confirmed") {
    return (
      <BookingConfirmation
        booking={confirmedBooking}
        garageName={garage.name}
        selectedDate={selectedDate}
        selectedService={selectedService}
        selectedTime={selection.time}
        customerVehicle={customerVehicle}
        onBookAnother={() => router.push(`/garage/${garage.id}`)}
      />
    );
  }

  if (!hasCheckedAuth) {
    return (
      <div className="flex min-h-full items-center justify-center bg-background p-8">
        <div className="w-full max-w-xl rounded-2xl border border-border bg-card p-8 text-center text-brand-muted">
          Checking your account...
        </div>
      </div>
    );
  }

  if (!currentUser || !currentUser.roles.includes("User")) {
    return (
      <div className="flex min-h-full items-center justify-center bg-background p-8">
        <div className="w-full max-w-xl rounded-2xl border border-border bg-card p-8 text-center">
          <h1 className="mb-3 text-3xl font-bold text-foreground">
            Login to book this service
          </h1>
          <p className="mb-6 text-brand-muted">
            Service bookings are available for user accounts. Login first, then choose one of your saved cars.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              type="button"
              onClick={() => setIsAuthModalOpen(true)}
              className="rounded-xl bg-primary text-primary-foreground"
            >
              Login to Continue
            </Button>
            <Button asChild variant="outline" className="rounded-xl">
              <Link href="/services">Back to Garages</Link>
            </Button>
          </div>
        </div>

        {isAuthModalOpen ? (
          <AuthModalCard
            onAuthenticated={() => void refreshCurrentUser()}
            onClose={() => setIsAuthModalOpen(false)}
          />
        ) : null}
      </div>
    );
  }

  const currentStepIndex = bookingStepOrder.indexOf(step);
  const canProceed =
    step === "service"
      ? Boolean(selection.serviceId)
      : step === "vehicle"
        ? vehicleDetailsComplete
        : step === "datetime"
          ? Boolean(selection.date && selection.time)
          : false;

  const handleNext = () => {
    if (!canProceed) {
      return;
    }

    const nextStep = bookingStepOrder[currentStepIndex + 1];

    if (nextStep) {
      setStep(nextStep);
    }
  };

  const handleBack = () => {
    const previousStep = bookingStepOrder[currentStepIndex - 1];

    if (previousStep) {
      setStep(previousStep);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case "service":
        return (
          <ServiceStep
            services={services}
            selectedServiceId={selection.serviceId}
            onSelectService={(serviceId) =>
              setSelectionValue("serviceId", serviceId)
            }
          />
        );
      case "vehicle":
        return (
          <VehicleStep
            selection={selection}
            vehicles={vehicles}
            onChange={setSelectionValue}
            onSelectVehicle={handleSelectVehicle}
          />
        );
      case "datetime":
        return (
          <DateTimeStep
            dates={availableDates}
            selectedDate={selection.date}
            selectedTime={selection.time}
            onSelectDate={(date) => setSelectionValue("date", date)}
            onSelectTime={(time) => setSelectionValue("time", time)}
          />
        );
      case "review":
        return (
          <ReviewStep
            error={submitError}
            garageName={garage.name}
            isSubmitting={isSubmitting}
            selectedDate={selectedDate}
            selectedService={selectedService}
            selectedTime={selection.time}
            customerVehicle={customerVehicle}
            onConfirm={handleConfirm}
          />
        );
    }
  };

  return (
    <div className="min-h-full bg-background">
      <div className="mx-auto max-w-[1440px] px-8 pt-6">
        <div className="flex justify-between gap-4">
          <div>
            <div className="text-sm text-brand-muted">Booking at</div>
            <div className="font-semibold text-foreground">{garage.name}</div>
          </div>
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="text-brand-muted hover:bg-transparent hover:text-foreground"
          >
            Cancel
          </Button>
        </div>
      </div>

      <BookingProgress currentStep={step} currentStepIndex={currentStepIndex} />

      <div className="mx-auto max-w-4xl px-8 py-16">
        <AnimatePresence mode="wait">{renderStepContent()}</AnimatePresence>

        {submitError && step !== "review" ? (
          <div className="mt-6 rounded-xl border border-primary/30 bg-primary/10 p-4 text-sm text-primary">
            {submitError}
          </div>
        ) : null}

        {step !== "review" && (
          <BookingActions
            canProceed={canProceed}
            onBack={handleBack}
            onNext={handleNext}
            showBackButton={currentStepIndex > 0}
          />
        )}
      </div>
    </div>
  );
}
