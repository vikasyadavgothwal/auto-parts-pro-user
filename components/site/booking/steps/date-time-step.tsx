import {
  BOOKING_DATE_AVAILABILITY_CLASSES,
  BOOKING_DATE_AVAILABILITY_LABELS,
} from "@/components/site/booking/config";
import { BookingStepFrame } from "@/components/site/booking/booking-step-frame";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { bookingAvailableDates, bookingTimeSlots } from "@/lib/data/booking";
import type { BookingDateOption } from "@/types/site/booking";
import { RequiredMark } from "@/components/site/shared/required-mark";

type DateTimeStepProps = {
  dates?: readonly BookingDateOption[];
  onSelectDate: (date: string) => void;
  onSelectTime: (time: string) => void;
  selectedDate: string;
  selectedTime: string;
  unavailableTimes?: readonly string[];
  unavailableMessage?: string;
  isLoadingAvailability?: boolean;
};

export function DateTimeStep({
  dates = bookingAvailableDates,
  onSelectDate,
  onSelectTime,
  selectedDate,
  selectedTime,
  unavailableTimes = [],
  unavailableMessage = "",
  isLoadingAvailability = false,
}: DateTimeStepProps) {
  const unavailable = new Set(unavailableTimes);
  const isGarageUnavailable = Boolean(unavailableMessage);
  return (
    <BookingStepFrame stepId="datetime">
      <h2 className="mb-2 text-3xl font-bold text-foreground">
        Select Date & Time<RequiredMark />
      </h2>
      <p className="mb-8 text-brand-muted">
        Choose your preferred appointment slot
      </p>

      <div className="mb-8">
        <h3 className="mb-4 text-lg font-semibold text-foreground">
          Select Date
        </h3>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {dates.map((dateOption) => {
            const isUnavailable = dateOption.availability === "unavailable";

            return (
              <Card
                key={dateOption.date}
                onClick={() => {
                  if (isUnavailable) return;
                  onSelectDate(dateOption.date);
                }}
                aria-disabled={isUnavailable}
                className={`rounded-xl border-2 bg-card text-center shadow-none transition-all ${
                  isUnavailable
                    ? "cursor-not-allowed border-border bg-muted/40 opacity-60"
                    : "cursor-pointer border-border hover:border-primary/50"
                } ${
                  selectedDate === dateOption.date
                    ? "border-primary ring-2 ring-primary/20"
                    : ""
                }`}
              >
                <CardContent className="p-4">
                  <div className="mb-1 font-semibold text-foreground">
                    {dateOption.label}
                  </div>
                  <div
                    className={`text-xs ${BOOKING_DATE_AVAILABILITY_CLASSES[dateOption.availability]}`}
                  >
                    {BOOKING_DATE_AVAILABILITY_LABELS[dateOption.availability]}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {selectedDate && (
        <div>
          <h3 className="mb-4 text-lg font-semibold text-foreground">
            Select Time
          </h3>

          {isGarageUnavailable ? (
            <div className="mb-4 rounded-xl border border-border bg-muted/40 p-4 text-sm font-medium text-brand-muted">
              {unavailableMessage}
            </div>
          ) : null}

          <div className="space-y-6">
            {Object.entries(bookingTimeSlots).map(([period, slots]) => (
              <div key={period}>
                <h4 className="mb-3 text-sm font-medium capitalize text-brand-muted">
                  {period}
                </h4>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                  {slots.map((time) => (
                    <Button
                      key={time}
                      disabled={isGarageUnavailable || isLoadingAvailability || unavailable.has(time)}
                      onClick={() => onSelectTime(time)}
                      variant="outline"
                      className={`rounded-xl border-2 py-6 font-medium transition-all ${
                        isGarageUnavailable || unavailable.has(time)
                          ? "cursor-not-allowed border-border bg-muted text-brand-muted opacity-50"
                          : selectedTime === time
                          ? "border-primary bg-primary text-primary-foreground hover:bg-brand-primary-hover"
                          : "border-border bg-card text-foreground hover:border-primary/50 hover:bg-card"
                      }`}
                    >
                      {time}{unavailable.has(time) ? " · Booked" : ""}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </BookingStepFrame>
  );
}
