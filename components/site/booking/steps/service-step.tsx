import { ClockIcon } from "@/components/icons/site-icons";
import { BookingStepFrame } from "@/components/site/booking/booking-step-frame";
import { Card, CardContent } from "@/components/ui/card";
import { bookingServices } from "@/lib/data/booking";
import type { BookingService } from "@/types/site/booking";

type ServiceStepProps = {
  onSelectService: (serviceId: string) => void;
  selectedServiceId: string;
  services?: readonly BookingService[];
};

export function ServiceStep({
  onSelectService,
  selectedServiceId,
  services = bookingServices,
}: ServiceStepProps) {
  return (
    <BookingStepFrame stepId="service">
      <h2 className="mb-2 text-3xl font-bold text-foreground">
        Select a Service
      </h2>
      <p className="mb-8 text-brand-muted">Choose the service you need</p>

      {services.length ? (
        <div className="space-y-4">
          {services.map((service) => (
          <Card
            key={service.id}
            onClick={() => onSelectService(service.id)}
            className={`cursor-pointer rounded-xl border-2 bg-card shadow-none transition-all ${
              selectedServiceId === service.id
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
                    {service.currency ?? "AED"} {service.price.toFixed(2)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-card p-6 text-brand-muted">
          This garage has not added active services yet.
        </div>
      )}
    </BookingStepFrame>
  );
}
