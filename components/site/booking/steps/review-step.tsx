import { CalendarIcon, ClockIcon } from "@/components/icons/site-icons";
import { BookingStepFrame } from "@/components/site/booking/booking-step-frame";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type {
  BookingCustomerVehicle,
  BookingDateOption,
  BookingService,
} from "@/types/site/booking";

type ReviewStepProps = {
  error?: string;
  garageName?: string;
  isSubmitting?: boolean;
  selectedDate?: BookingDateOption;
  selectedService?: BookingService;
  selectedTime: string;
  customerVehicle: BookingCustomerVehicle;
  onConfirm: () => void;
  advancePercentage?: number;
};

export function ReviewStep({
  error,
  garageName,
  isSubmitting = false,
  selectedDate,
  selectedService,
  selectedTime,
  customerVehicle,
  onConfirm,
  advancePercentage = 10,
}: ReviewStepProps) {
  return (
    <BookingStepFrame stepId="review">
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
                Garage
              </h3>
              <div className="text-lg font-semibold text-foreground">
                {garageName}
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <h3 className="mb-2 text-sm font-semibold text-brand-muted">
                Service
              </h3>
              <div className="text-lg font-semibold text-foreground">
                {selectedService?.name}
              </div>
              <div className="mt-1 text-sm text-brand-muted">
                {selectedService?.description}
              </div>
              <div className="mt-2 flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1 text-brand-muted">
                  <ClockIcon className="h-4 w-4" />
                  {selectedService?.duration}
                </span>
              </div>
            </div>
            <div className="border-t border-border pt-6">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground">Advance payment ({advancePercentage}%)</span>
                <span className="font-bold text-primary">{selectedService?.currency ?? "AED"} {(((selectedService?.price ?? 0) * advancePercentage) / 100).toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <h3 className="mb-2 text-sm font-semibold text-brand-muted">
                Vehicle
              </h3>
              <div className="text-lg font-semibold text-foreground">
                {[customerVehicle.year, customerVehicle.make, customerVehicle.model]
                  .filter(Boolean)
                  .join(" ")}
              </div>
              {customerVehicle.vin ? (
                <div className="mt-1 text-sm text-brand-muted">
                  VIN: {customerVehicle.vin}
                </div>
              ) : null}
            </div>

            <div className="border-t border-border pt-6">
              <h3 className="mb-2 text-sm font-semibold text-brand-muted">
                Date & Time
              </h3>
              <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
                <CalendarIcon className="h-5 w-5 text-primary" />
                <span>
                  {selectedDate?.label} at {selectedTime}
                </span>
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-foreground">
                  Total
                </span>
                <span className="text-3xl font-bold text-primary">
                  {selectedService?.currency ?? "AED"}{" "}
                  {selectedService?.price.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {error ? (
        <div className="mb-4 rounded-xl border border-primary/30 bg-primary/10 p-4 text-sm text-primary">
          {error}
        </div>
      ) : null}

      <Button
        onClick={onConfirm}
        disabled={isSubmitting}
        className="h-14 w-full rounded-xl bg-primary text-lg text-primary-foreground hover:bg-brand-primary-hover"
      >
        {isSubmitting ? "Processing payment..." : "Pay Advance & Book Service"}
      </Button>
    </BookingStepFrame>
  );
}
