import { CarFrontIcon } from "@/components/icons/site-icons";
import { BookingStepFrame } from "@/components/site/booking/booking-step-frame";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { bookingVehicles } from "@/lib/data/Booking";

type VehicleStepProps = {
  onSelectVehicle: (vehicleId: string) => void;
  selectedVehicleId: string;
};

export function VehicleStep({
  onSelectVehicle,
  selectedVehicleId,
}: VehicleStepProps) {
  return (
    <BookingStepFrame stepId="vehicle">
      <h2 className="mb-2 text-3xl font-bold text-foreground">
        Select Vehicle
      </h2>
      <p className="mb-8 text-brand-muted">
        Choose which vehicle needs service
      </p>

      <div className="mb-6 space-y-4">
        {bookingVehicles.map((vehicle) => (
          <Card
            key={vehicle.id}
            onClick={() => onSelectVehicle(vehicle.id)}
            className={`cursor-pointer rounded-xl border-2 bg-card shadow-none transition-all ${
              selectedVehicleId === vehicle.id
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
                  <p className="text-sm text-brand-muted">VIN: {vehicle.vin}</p>
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
    </BookingStepFrame>
  );
}
