import { CalendarIcon, ClockIcon } from "@/components/icons/site-icons";
import { BookingStepFrame } from "@/components/site/booking/booking-step-frame";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type {
  BookingDateOption,
  BookingService,
  BookingVehicle,
} from "@/types/site/booking";

type ReviewStepProps = {
  selectedDate?: BookingDateOption;
  selectedService?: BookingService;
  selectedTime: string;
  selectedVehicle?: BookingVehicle;
  onConfirm: () => void;
};

export function ReviewStep({
  selectedDate,
  selectedService,
  selectedTime,
  selectedVehicle,
  onConfirm,
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
              <h3 className="mb-2 text-sm font-semibold text-brand-muted">
                Vehicle
              </h3>
              <div className="text-lg font-semibold text-foreground">
                {selectedVehicle?.year} {selectedVehicle?.make}{" "}
                {selectedVehicle?.model}
              </div>
              <div className="mt-1 text-sm text-brand-muted">
                VIN: {selectedVehicle?.vin}
              </div>
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
                  ${selectedService?.price}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button
        onClick={onConfirm}
        className="h-14 w-full rounded-xl bg-primary text-lg text-primary-foreground hover:bg-brand-primary-hover"
      >
        Confirm Booking
      </Button>
    </BookingStepFrame>
  );
}
