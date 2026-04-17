import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import {
  CalendarIcon,
  CarFrontIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  FitmentConfirmedIcon,
} from "@/components/icons/site-icons";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { availableDates, servicesnew, vehicles , stepOrder , timeSlots } from "@/lib/Data/BookingData";
type BookingStep = "service" | "vehicle" | "datetime" | "review" | "confirmed";


export default function BookingPage() {
  const router = useRouter();

  const [step, setStep] = useState<BookingStep>("service");
  const [selectedService, setSelectedService] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const selectedServiceData = useMemo(
    () => servicesnew.find((service) => service.id === selectedService),
    [selectedService]
  );

  const selectedVehicleData = useMemo(
    () => vehicles.find((vehicle) => vehicle.id === selectedVehicle),
    [selectedVehicle]
  );

  const selectedDateData = useMemo(
    () => availableDates.find((date) => date.date === selectedDate),
    [selectedDate]
  );

  const currentStepIndex = stepOrder.indexOf(step as (typeof stepOrder)[number]);

  const handleNext = () => {
    if (step === "service" && selectedService) setStep("vehicle");
    else if (step === "vehicle" && selectedVehicle) setStep("datetime");
    else if (step === "datetime" && selectedDate && selectedTime) setStep("review");
  };

  const handleBack = () => {
    if (step === "vehicle") setStep("service");
    else if (step === "datetime") setStep("vehicle");
    else if (step === "review") setStep("datetime");
  };

  const handleConfirm = () => {
    setStep("confirmed");
  };

  const canProceed = () => {
    if (step === "service") return !!selectedService;
    if (step === "vehicle") return !!selectedVehicle;
    if (step === "datetime") return !!selectedDate && !!selectedTime;
    return false;
  };

  if (step === "confirmed") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-2xl"
        >
          <Card className="rounded-3xl border border-border bg-card shadow-none">
            <CardContent className="p-12 text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-brand-success/20 bg-brand-success/10">
                <FitmentConfirmedIcon className="h-10 w-10 text-brand-success" />
              </div>

              <h1 className="mb-4 text-4xl font-bold text-foreground">
                Booking Confirmed!
              </h1>

              <p className="mb-2 text-xl text-brand-muted">
                Your appointment has been scheduled successfully.
              </p>

              <p className="mb-8 text-lg text-brand-muted">
                You&apos;ll receive a confirmation email shortly.
              </p>

              <Card className="mb-8 rounded-xl border border-border bg-background shadow-none">
                <CardContent className="p-6 text-left">
                  <h3 className="mb-4 text-sm font-semibold text-brand-muted">
                    Appointment Details
                  </h3>

                  <div className="space-y-3">
                    <div className="flex justify-between gap-4">
                      <span className="text-brand-muted">Service</span>
                      <span className="text-right font-medium text-foreground">
                        {selectedServiceData?.name}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4">
                      <span className="text-brand-muted">Vehicle</span>
                      <span className="text-right font-medium text-foreground">
                        {selectedVehicleData?.year} {selectedVehicleData?.make}{" "}
                        {selectedVehicleData?.model}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4">
                      <span className="text-brand-muted">Date & Time</span>
                      <span className="text-right font-medium text-foreground">
                        {selectedDateData?.label} at {selectedTime}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4 border-t border-border pt-3">
                      <span className="text-brand-muted">Total</span>
                      <span className="text-xl font-bold text-primary">
                        ${selectedServiceData?.price}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button
                  asChild
                  className="rounded-xl bg-primary px-8 py-3 text-primary-foreground hover:bg-brand-primary-hover"
                >
                  <Link href="/">Back to Home</Link>
                </Button>

                <Button
                  variant="outline"
                  onClick={() => router.push("/servicesnew")}
                  className="rounded-xl border-2 border-border bg-card px-8 py-3 text-foreground hover:border-primary hover:bg-card"
                >
                  Book Another
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

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

      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-4xl px-8 py-6">
          <div className="flex items-center justify-between">
            {stepOrder.map((item, idx) => {
              const itemIndex = stepOrder.indexOf(item);
              const isCurrent = step === item;
              const isCompleted = currentStepIndex > itemIndex;

              return (
                <div key={item} className="flex flex-1 items-center">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold transition-all ${
                        isCurrent
                          ? "bg-primary text-primary-foreground"
                          : isCompleted
                          ? "bg-brand-success text-primary-foreground"
                          : "bg-border text-brand-muted"
                      }`}
                    >
                      {isCompleted ? (
                        <FitmentConfirmedIcon className="h-5 w-5" />
                      ) : (
                        idx + 1
                      )}
                    </div>

                    <span
                      className={`hidden text-sm font-medium md:block ${
                        isCurrent ? "text-foreground" : "text-brand-muted"
                      }`}
                    >
                      {item === "service" && "Select Service"}
                      {item === "vehicle" && "Select Vehicle"}
                      {item === "datetime" && "Date & Time"}
                      {item === "review" && "Review"}
                    </span>
                  </div>

                  {idx < stepOrder.length - 1 && (
                    <div className="mx-4 h-0.5 flex-1 bg-border">
                      <div
                        className={`h-full transition-all ${
                          currentStepIndex > idx ? "bg-brand-success" : "bg-transparent"
                        }`}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-8 py-16">
        <AnimatePresence mode="wait">
          {step === "service" && (
            <motion.div
              key="service"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="mb-2 text-3xl font-bold text-foreground">
                Select a Service
              </h2>
              <p className="mb-8 text-brand-muted">Choose the service you need</p>

              <div className="space-y-4">
                {servicesnew.map((service) => (
                  <Card
                    key={service.id}
                    onClick={() => setSelectedService(service.id)}
                    className={`cursor-pointer rounded-xl border-2 bg-card shadow-none transition-all ${
                      selectedService === service.id
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-6">
                        <div className="flex-1">
                          <h3 className="mb-2 text-xl font-semibold text-foreground">
                            {service.name}
                          </h3>
                          <p className="mb-3 text-brand-muted">
                            {service.description}
                          </p>

                          <div className="flex items-center gap-4 text-sm">
                            <span className="flex items-center gap-1 text-brand-muted">
                              <ClockIcon className="h-4 w-4" />
                              {service.duration}
                            </span>
                          </div>
                        </div>

                        <div className="ml-6 text-right">
                          <div className="text-2xl font-bold text-primary">
                            ${service.price}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {step === "vehicle" && (
            <motion.div
              key="vehicle"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="mb-2 text-3xl font-bold text-foreground">
                Select Vehicle
              </h2>
              <p className="mb-8 text-brand-muted">
                Choose which vehicle needs service
              </p>

              <div className="mb-6 space-y-4">
                {vehicles.map((vehicle) => (
                  <Card
                    key={vehicle.id}
                    onClick={() => setSelectedVehicle(vehicle.id)}
                    className={`cursor-pointer rounded-xl border-2 bg-card shadow-none transition-all ${
                      selectedVehicle === vehicle.id
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
                          <CarFrontIcon className="h-6 w-6 text-primary" />
                        </div>

                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-foreground">
                            {vehicle.year} {vehicle.make} {vehicle.model}
                          </h3>
                          <p className="text-sm text-brand-muted">
                            VIN: {vehicle.vin}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Button
                variant="outline"
                className="w-full rounded-xl border-2 border-dashed border-border bg-card p-6 text-brand-muted hover:border-primary hover:bg-card hover:text-foreground"
              >
                + Add New Vehicle
              </Button>
            </motion.div>
          )}

          {step === "datetime" && (
            <motion.div
              key="datetime"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="mb-2 text-3xl font-bold text-foreground">
                Select Date & Time
              </h2>
              <p className="mb-8 text-brand-muted">
                Choose your preferred appointment slot
              </p>

              <div className="mb-8">
                <h3 className="mb-4 text-lg font-semibold text-foreground">
                  Select Date
                </h3>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                  {availableDates.map((dateOption) => (
                    <Card
                      key={dateOption.date}
                      onClick={() => setSelectedDate(dateOption.date)}
                      className={`cursor-pointer rounded-sm border-2 bg-card text-center shadow-none transition-all ${
                        selectedDate === dateOption.date
                          ? "border-primary ring-2 ring-primary/20"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="mb-1 font-semibold text-foreground">
                          {dateOption.label}
                        </div>
                        <div
                          className={`text-xs ${
                            dateOption.availability === "available"
                              ? "text-brand-success"
                              : dateOption.availability === "limited"
                              ? "text-brand-warning"
                              : "text-primary"
                          }`}
                        >
                          {dateOption.availability === "available" && "Available"}
                          {dateOption.availability === "limited" && "Limited"}
                          {/* {dateOption.availability === "unavailable" && "Full"} */}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {selectedDate && (
                <div>
                  <h3 className="mb-4 text-lg font-semibold text-foreground">
                    Select Time
                  </h3>

                  <div className="space-y-6">
                    {Object.entries(timeSlots).map(([period, slots]) => (
                      <div key={period}>
                        <h4 className="mb-3 text-sm font-medium capitalize text-brand-muted">
                          {period}
                        </h4>

                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                          {slots.map((time) => (
                            <Button
                              key={time}
                              onClick={() => setSelectedTime(time)}
                              variant="outline"
                              className={`rounded-sm border-2 py-4 font-medium transition-all ${
                                selectedTime === time
                                  ? "border-primary bg-primary text-primary-foreground hover:bg-brand-primary-hover"
                                  : "border-border bg-card text-foreground hover:border-primary/50 hover:bg-card"
                              }`}
                            >
                              {time}
                            </Button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {step === "review" && (
            <motion.div
              key="review"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="mb-2 text-3xl font-bold text-foreground">
                Review Your Booking
              </h2>
              <p className="mb-8 text-brand-muted">
                Please confirm your appointment details
              </p>

              <Card className="mb-8 rounded-xl border border-border bg-card shadow-none">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="mb-2 text-sm font-semibold text-brand-muted">
                        Service
                      </h3>
                      <div className="text-lg font-semibold text-foreground">
                        {selectedServiceData?.name}
                      </div>
                      <div className="mt-1 text-sm text-brand-muted">
                        {selectedServiceData?.description}
                      </div>
                      <div className="mt-2 flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1 text-brand-muted">
                          <ClockIcon className="h-4 w-4" />
                          {selectedServiceData?.duration}
                        </span>
                      </div>
                    </div>

                    <div className="border-t border-border pt-6">
                      <h3 className="mb-2 text-sm font-semibold text-brand-muted">
                        Vehicle
                      </h3>
                      <div className="text-lg font-semibold text-foreground">
                        {selectedVehicleData?.year} {selectedVehicleData?.make}{" "}
                        {selectedVehicleData?.model}
                      </div>
                      <div className="mt-1 text-sm text-brand-muted">
                        VIN: {selectedVehicleData?.vin}
                      </div>
                    </div>

                    <div className="border-t border-border pt-6">
                      <h3 className="mb-2 text-sm font-semibold text-brand-muted">
                        Date & Time
                      </h3>
                      <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
                        <CalendarIcon className="h-5 w-5 text-primary" />
                        <span>
                          {selectedDateData?.label} at {selectedTime}
                        </span>
                      </div>
                    </div>

                    <div className="border-t border-border pt-6">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-foreground">
                          Total
                        </span>
                        <span className="text-3xl font-bold text-primary">
                          ${selectedServiceData?.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button
                onClick={handleConfirm}
                className="h-14 w-full rounded-xl bg-primary text-lg text-primary-foreground hover:bg-brand-primary-hover"
              >
                Confirm Booking
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {step !== "review" && (
          <div className="mt-12 flex gap-4">
            {step !== "service" && (
              <Button
                variant="outline"
                onClick={handleBack}
                className="gap-2 rounded-xl border border-border bg-card px-8 py-6 text-foreground hover:border-primary hover:bg-card"
              >
                <ChevronLeftIcon className="h-5 w-5" />
                Back
              </Button>
            )}

            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`flex-1 gap-2 h-10 rounded-xl px-8 py-6 font-medium transition-all ${
                canProceed()
                  ? "bg-primary text-primary-foreground hover:bg-brand-primary-hover"
                  : "cursor-not-allowed bg-border text-brand-placeholder hover:bg-border"
              }`}
            >
              Continue
              <ChevronRightIcon className="h-5 w-5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
