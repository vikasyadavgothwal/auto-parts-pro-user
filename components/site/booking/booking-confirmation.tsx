"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { FitmentConfirmedIcon } from "@/components/icons/site-icons";
import { BOOKING_ROUTES } from "@/components/site/booking/config";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type {
  BookingDateOption,
  BookingService,
  BookingVehicle,
} from "@/types/site/booking";
type BookingConfirmationProps = {
  selectedDate?: BookingDateOption;
  selectedService?: BookingService;
  selectedTime: string;
  selectedVehicle?: BookingVehicle;
  onBookAnother: () => void;
};
export function BookingConfirmation({
  selectedDate,
  selectedService,
  selectedTime,
  selectedVehicle,
  onBookAnother,
}: BookingConfirmationProps) {
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
                      {selectedService?.name}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-brand-muted">Vehicle</span>
                    <span className="text-right font-medium text-foreground">
                      {selectedVehicle?.year} {selectedVehicle?.make}{" "}
                      {selectedVehicle?.model}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-brand-muted">Date & Time</span>
                    <span className="text-right font-medium text-foreground">
                      {selectedDate?.label} at {selectedTime}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4 border-t border-border pt-3">
                    <span className="text-brand-muted">Total</span>
                    <span className="text-xl font-bold text-primary">
                      ${selectedService?.price}
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
                <Link href={BOOKING_ROUTES.home}>Back to Home</Link>
              </Button>

              <Button
                variant="outline"
                onClick={onBookAnother}
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
