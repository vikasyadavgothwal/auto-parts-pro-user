import { FitmentConfirmedIcon } from "@/components/icons/site-icons";
import { BOOKING_STEP_LABELS } from "@/components/site/booking/config";
import { bookingStepOrder } from "@/lib/data/booking";
import type { BookingActiveStep } from "@/types/site/booking";
type BookingProgressProps = {
  currentStep: BookingActiveStep;
  currentStepIndex: number;
};
export function BookingProgress({
  currentStep,
  currentStepIndex,
}: BookingProgressProps) {
  return (
    <div className="border-b border-border bg-card">
      <div className="mx-auto max-w-4xl px-8 py-6">
        <div className="flex items-center justify-between">
          {bookingStepOrder.map((step, idx) => {
            const isCurrent = currentStep === step;
            const isCompleted = currentStepIndex > idx;

            return (
              <div key={step} className="flex flex-1 items-center">
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
                    {BOOKING_STEP_LABELS[step]}
                  </span>
                </div>

                {idx < bookingStepOrder.length - 1 && (
                  <div className="mx-4 h-0.5 flex-1 bg-border">
                    <div
                      className={`h-full transition-all ${
                        isCompleted ? "bg-brand-success" : "bg-transparent"
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
  );
}
