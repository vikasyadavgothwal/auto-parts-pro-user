"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { AuthModalCard } from "@/components/site/AuthModal";
import { BookingActions } from "@/components/site/booking/booking-actions";
import { BOOKING_INITIAL_SELECTION } from "@/components/site/booking/config";
import { BookingProgress } from "@/components/site/booking/booking-progress";
import { DateTimeStep } from "@/components/site/booking/steps/date-time-step";
import { ReviewStep } from "@/components/site/booking/steps/review-step";
import { ServiceStep } from "@/components/site/booking/steps/service-step";
import { VehicleStep } from "@/components/site/booking/steps/vehicle-step";
import { Button } from "@/components/ui/button";
import { getCurrentUser, siteAuthenticatedFetch } from "@/lib/current-user";
import {
  bookingAvailableDates,
  bookingStepOrder,
} from "@/lib/data/booking";
import {
  type UserVehicleRecord,
} from "@/lib/user-vehicles";
import type {
  BookingCustomerVehicle,
  BookingSelection,
  BookingService,
  BookingDateOption,
  BookingActiveStep,
  GarageBookingResult,
} from "@/types/site/booking";
import type { UserAuthProfile } from "@/types/api/user-auth";
import type { PublicGarageDetail } from "@/types/site/garages";

type BookingPageProps = {
  garage: PublicGarageDetail | null;
  initialServiceId?: string;
  paymentStatus?: string;
  paymentSessionId?: string;
};

type BookingAdvance = {
  mode: "percentage" | "fixed";
  value: number;
};

type BookingResponse = {
  ok: boolean;
  message?: string;
  booking?: GarageBookingResult;
  payment?: {
    mode: BookingAdvance["mode"];
    value: number;
    percentage: number | null;
    amount: number;
    currency: string;
    status: string;
    checkoutUrl?: string | null;
    stripeConfigured?: boolean;
  };
};

type AvailabilityResponse = {
  ok: boolean;
  unavailableTimes?: string[];
  bookingUnavailable?: boolean;
  bookingUnavailableMessage?: string | null;
  advance?: BookingAdvance;
  advancePercentage?: number;
  message?: string;
};

type UserVehiclesResponse = {
  ok: boolean;
  vehicles?: UserVehicleRecord[];
  message?: string;
};

const servicePrice = (price: number) => price / 100;

const serviceDuration = (minutes: number) => {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  return remaining ? `${hours}h ${remaining}m` : `${hours}h`;
};

const dayFormatter = new Intl.DateTimeFormat("en-US", { weekday: "long" });
const labelFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
});

const getDayName = (date: Date) => dayFormatter.format(date);

const getBookingDateLabel = (date: Date, offset: number) => {
  if (offset === 0) return "Today";
  if (offset === 1) return "Tomorrow";
  return labelFormatter.format(date);
};

const formatBookingDate = (date: Date) => date.toISOString().slice(0, 10);

const getGarageOpenDays = (garage: PublicGarageDetail) => {
  if (Object.keys(garage.workingHoursByDay || {}).length > 0) {
    return new Set(
      Object.entries(garage.workingHoursByDay)
        .filter(([, hours]) => hours?.enabled)
        .map(([day]) => day),
    );
  }

  return new Set(garage.workingDays);
};

const getGarageAvailableDates = (
  garage: PublicGarageDetail | null,
): BookingDateOption[] => {
  if (!garage) {
    return bookingAvailableDates;
  }

  const openDays = getGarageOpenDays(garage);

  const today = new Date();
  today.setHours(12, 0, 0, 0);

  return Array.from({ length: 5 }, (_, offset) => {
    const date = new Date(today);
    date.setDate(today.getDate() + offset);
    const dayName = getDayName(date);
    const isAvailable = openDays.size === 0 || openDays.has(dayName);

    return {
      date: formatBookingDate(date),
      label: getBookingDateLabel(date, offset),
      availability: isAvailable
        ? offset === 0 || offset === 4
          ? "limited"
          : "available"
        : "unavailable",
    } as BookingDateOption;
  });
};

export function BookingPage({
  garage,
  initialServiceId = "",
  paymentStatus = "",
  paymentSessionId = "",
}: BookingPageProps) {
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
    : "";
  const availableDates = useMemo(
    () => getGarageAvailableDates(garage),
    [garage],
  );
  const [step, setStep] = useState<BookingActiveStep>(
    initialService ? "vehicle" : "service",
  );
  const [selection, setSelection] = useState<BookingSelection>({
    ...BOOKING_INITIAL_SELECTION,
    serviceId: initialService,
  });
  const [currentUser, setCurrentUser] = useState<UserAuthProfile | null>(null);
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [vehicles, setVehicles] = useState<UserVehicleRecord[]>([]);
  const [isLoadingVehicles, setIsLoadingVehicles] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [unavailableTimes, setUnavailableTimes] = useState<string[]>([]);
  const [bookingUnavailableMessage, setBookingUnavailableMessage] = useState("");
  const [isLoadingAvailability, setIsLoadingAvailability] = useState(false);
  const [advance, setAdvance] = useState<BookingAdvance>({ mode: "percentage", value: 10 });
  const selectedService = services.find(
    (service) => service.id === selection.serviceId,
  );
  const selectedDate = availableDates.find(
    (date) => date.date === selection.date,
  );
  const isSelectedDateAvailable =
    !!selectedDate &&
    selectedDate.availability !== "unavailable" &&
    !bookingUnavailableMessage;
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

  const loadUserVehicles = async () => {
    setIsLoadingVehicles(true);
    try {
      const response = await siteAuthenticatedFetch("/api/user/vehicles?page=1&pageSize=50", {
        method: "GET",
        cache: "no-store",
        credentials: "include",
        headers: { accept: "application/json" },
      });
      const payload = (await response.json()) as UserVehiclesResponse;
      if (!response.ok || !payload.ok) {
        throw new Error(payload.message || "Unable to load your saved cars");
      }
      setVehicles(payload.vehicles ?? []);
    } catch (error) {
      setVehicles([]);
      toast.error(error instanceof Error ? error.message : "Unable to load your saved cars");
    } finally {
      setIsLoadingVehicles(false);
    }
  };

  const refreshCurrentUser = async () => {
    const user = await getCurrentUser();
    setCurrentUser(user);
    if (user?.roles.includes("User")) await loadUserVehicles();
    else setVehicles([]);
    applyUserDefaults(user);
    setHasCheckedAuth(true);
    return user;
  };

  useEffect(() => {
    let isActive = true;

    void getCurrentUser().then((user) => {
      if (!isActive) return;
      setCurrentUser(user);
      if (user?.roles.includes("User")) void loadUserVehicles();
      else setVehicles([]);
      applyUserDefaults(user);
      setHasCheckedAuth(true);
    });

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    if (paymentStatus !== "cancelled" || !paymentSessionId) {
      return;
    }

    void siteAuthenticatedFetch(
      `/api/payments/${encodeURIComponent(paymentSessionId)}/status?payment=cancelled`,
      {
        method: "GET",
        cache: "no-store",
        credentials: "include",
        headers: { accept: "application/json" },
      },
    ).catch(() => undefined);
  }, [paymentSessionId, paymentStatus]);

  useEffect(() => {
    if (!garage?.id || !selection.serviceId || !selection.date) {
      return;
    }
    let active = true;
    const params = new URLSearchParams({ garageId: garage.id, serviceId: selection.serviceId, bookingDate: selection.date });
    void fetch(`/api/garage-bookings?${params}`, { cache: "no-store" })
      .then(async (response) => {
        const payload = await response.json() as AvailabilityResponse;
        if (!response.ok || !payload.ok) throw new Error(payload.message || "Unable to load available times");
        if (!active) return;
        setUnavailableTimes(payload.unavailableTimes ?? []);
        setBookingUnavailableMessage(
          payload.bookingUnavailable
            ? payload.bookingUnavailableMessage ||
                "This garage is not accepting new bookings right now."
            : "",
        );
        setAdvance(payload.advance ?? { mode: "percentage", value: payload.advancePercentage ?? 10 });
        setSelection((current) =>
          payload.bookingUnavailable || (payload.unavailableTimes ?? []).includes(current.time)
            ? { ...current, time: "" }
            : current,
        );
      })
      .catch((error) => { if (active) toast.error(error instanceof Error ? error.message : "Unable to load available times"); })
      .finally(() => { if (active) setIsLoadingAvailability(false); });
    return () => { active = false; };
  }, [garage?.id, selection.serviceId, selection.date]);

  const setSelectionValue = <Key extends keyof BookingSelection>(
    key: Key,
    value: BookingSelection[Key],
  ) => {
    setSelection((current) => ({
      ...current,
      [key]: value,
    }));
  };
  const handleSelectVehicle = (vehicle: UserVehicleRecord) => {
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
      toast.error("Select a garage, service, date, and time before booking.");
      return;
    }
    if (!isSelectedDateAvailable) {
      toast.error("Selected date is not available for this garage.");
      return;
    }
    if (!vehicleDetailsComplete) {
      toast.error("Select one of your saved cars before booking.");
      return;
    }
    if (!currentUser) {
      setIsAuthModalOpen(true);
      toast.error("Login is required before booking a service.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await siteAuthenticatedFetch("/api/garage-bookings", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "Idempotency-Key": `site-booking-${Date.now()}-${Math.random().toString(16).slice(2)}`,
        },
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
          paymentSuccessUrl: `${window.location.origin}/?booking_payment=success&session_id={CHECKOUT_SESSION_ID}`,
          paymentCancelUrl: `${window.location.origin}/booking?payment=cancelled&session_id={CHECKOUT_SESSION_ID}`,
        }),
      });
      const payload = (await response.json()) as BookingResponse;

      if (!response.ok || !payload.ok || !payload.booking || !payload.payment) {
        throw new Error(payload.message || "Unable to confirm booking");
      }

      if (!payload.payment.checkoutUrl) {
        const paymentStatus = payload.payment.status
          ? ` Payment status: ${payload.payment.status}.`
          : "";
        throw new Error(
          payload.payment.stripeConfigured === false
            ? "Stripe test keys are not configured on the backend."
            : `Stripe did not return a Checkout URL.${paymentStatus}`,
        );
      }
      window.location.assign(payload.payment.checkoutUrl);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to confirm booking");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!garage) {
    if (paymentStatus === "cancelled") {
      return (
        <div className="flex min-h-full items-center justify-center bg-background p-8">
          <div className="w-full max-w-xl rounded-2xl border border-border bg-card p-8 text-center">
            <h1 className="mb-3 text-3xl font-bold text-foreground">
              Payment cancelled
            </h1>
            <p className="mb-6 text-brand-muted">
              No booking was confirmed because the advance payment was cancelled.
            </p>
            <Button asChild className="rounded-xl bg-primary text-primary-foreground">
              <Link href="/services">Browse Garages</Link>
            </Button>
          </div>
        </div>
      );
    }

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
          ? Boolean(selection.date && selection.time && isSelectedDateAvailable)
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
            onSelectService={(serviceId) => {
              if (selection.date) setIsLoadingAvailability(true);
              setBookingUnavailableMessage("");
              setSelectionValue("serviceId", serviceId);
            }}
          />
        );
      case "vehicle":
        return (
          <VehicleStep
            selection={selection}
            vehicles={vehicles}
            isLoading={isLoadingVehicles}
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
            onSelectDate={(date) => {
              setIsLoadingAvailability(true);
              setBookingUnavailableMessage("");
              setSelectionValue("date", date);
              setSelectionValue("time", "");
            }}
            onSelectTime={(time) => setSelectionValue("time", time)}
            unavailableTimes={unavailableTimes}
            unavailableMessage={bookingUnavailableMessage}
            isLoadingAvailability={isLoadingAvailability}
          />
        );
      case "review":
        return (
          <ReviewStep
            garageName={garage.name}
            isSubmitting={isSubmitting}
            selectedDate={selectedDate}
            selectedService={selectedService}
            selectedTime={selection.time}
            customerVehicle={customerVehicle}
            onConfirm={handleConfirm}
            advance={advance}
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
