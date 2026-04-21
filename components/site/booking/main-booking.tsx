"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "motion/react";
import { BookingActions } from "@/components/site/booking/booking-actions";
import { BookingConfirmation } from "@/components/site/booking/booking-confirmation";
import {
  BOOKING_INITIAL_SELECTION,
  BOOKING_ROUTES,
} from "@/components/site/booking/config";
import { BookingProgress } from "@/components/site/booking/booking-progress";
import { DateTimeStep } from "@/components/site/booking/steps/date-time-step";
import { ReviewStep } from "@/components/site/booking/steps/review-step";
import { ServiceStep } from "@/components/site/booking/steps/service-step";
import { VehicleStep } from "@/components/site/booking/steps/vehicle-step";
import { Button } from "@/components/ui/button";
import {
  bookingAvailableDates,
  bookingServices,
  bookingStepOrder,
  bookingVehicles,
} from "@/lib/data/booking";
import type { BookingSelection, BookingStep } from "@/types/site/booking";
export function BookingPage() {
  const router = useRouter();
  const [step, setStep] = useState<BookingStep>("service");
  const [selection, setSelection] = useState<BookingSelection>(
    BOOKING_INITIAL_SELECTION,
  );
  const selectedService = bookingServices.find(
    (service) => service.id === selection.serviceId,
  );
  const selectedVehicle = bookingVehicles.find(
    (vehicle) => vehicle.id === selection.vehicleId,
  );
  const selectedDate = bookingAvailableDates.find(
    (date) => date.date === selection.date,
  );
  const setSelectionValue = <Key extends keyof BookingSelection>(
    key: Key,
    value: BookingSelection[Key],
  ) => {
    setSelection((current) => ({
      ...current,
      [key]: value,
    }));
  };
  const handleConfirm = () => {
    setStep("confirmed");
  };
  if (step === "confirmed") {
    return (
      <BookingConfirmation
        selectedDate={selectedDate}
        selectedService={selectedService}
        selectedTime={selection.time}
        selectedVehicle={selectedVehicle}
        onBookAnother={() => router.push(BOOKING_ROUTES.bookAnother)}
      />
    );
  }

  const currentStepIndex = bookingStepOrder.indexOf(step);
  const canProceed =
    step === "service"
      ? Boolean(selection.serviceId)
      : step === "vehicle"
        ? Boolean(selection.vehicleId)
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
            selectedServiceId={selection.serviceId}
            onSelectService={(serviceId) =>
              setSelectionValue("serviceId", serviceId)
            }
          />
        );
      case "vehicle":
        return (
          <VehicleStep
            selectedVehicleId={selection.vehicleId}
            onSelectVehicle={(vehicleId) =>
              setSelectionValue("vehicleId", vehicleId)
            }
          />
        );
      case "datetime":
        return (
          <DateTimeStep
            selectedDate={selection.date}
            selectedTime={selection.time}
            onSelectDate={(date) => setSelectionValue("date", date)}
            onSelectTime={(time) => setSelectionValue("time", time)}
          />
        );
      case "review":
        return (
          <ReviewStep
            selectedDate={selectedDate}
            selectedService={selectedService}
            selectedTime={selection.time}
            selectedVehicle={selectedVehicle}
            onConfirm={handleConfirm}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background">
        <div className="mx-auto max-w-[1440px] px-8">
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-foreground">
              AutoParts<span className="text-primary">Pro</span>
            </Link>

            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="text-brand-muted hover:bg-transparent hover:text-foreground"
            >
              Cancel
            </Button>
          </div>
        </div>
      </header>

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
