import { CarFrontIcon } from "@/components/icons/site-icons";
import { BookingStepFrame } from "@/components/site/booking/booking-step-frame";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  vehicleDisplayName,
  type UserVehicleRecord,
} from "@/lib/user-vehicles";
import type { BookingSelection } from "@/types/site/booking";

type VehicleStepProps = {
  selection: BookingSelection;
  vehicles: readonly UserVehicleRecord[];
  onChange: <Key extends keyof BookingSelection>(
    key: Key,
    value: BookingSelection[Key],
  ) => void;
  onSelectVehicle: (vehicle: UserVehicleRecord) => void;
};

export function VehicleStep({
  selection,
  vehicles,
  onChange,
  onSelectVehicle,
}: VehicleStepProps) {
  return (
    <BookingStepFrame stepId="vehicle">
      <h2 className="mb-2 text-3xl font-bold text-foreground">
        Select Your Car
      </h2>
      <p className="mb-8 text-brand-muted">
        Select one of your saved cars before scheduling this garage appointment
      </p>

      <Card className="rounded-xl border border-border bg-card shadow-none">
        <CardContent className="space-y-6 p-6">
          <div className="flex items-center gap-4 rounded-xl border border-primary/20 bg-primary/10 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-background">
              <CarFrontIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">
                Appointment vehicle
              </h3>
              <p className="text-sm text-brand-muted">
                The garage will receive your account contact details from your login.
              </p>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">
              Your cars
            </h3>
            {vehicles.length ? (
              <div className="grid gap-3 md:grid-cols-2">
                {vehicles.map((vehicle) => (
                  <button
                    key={vehicle.id}
                    type="button"
                    onClick={() => onSelectVehicle(vehicle)}
                    className={`rounded-xl border-2 bg-background p-4 text-left transition-all ${
                      selection.vehicleId === vehicle.id
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="font-semibold text-foreground">
                      {vehicleDisplayName(vehicle)}
                    </div>
                    <div className="mt-1 text-sm text-brand-muted">
                      {vehicle.vin ? `VIN: ${vehicle.vin}` : "VIN not added"}
                    </div>
                    {vehicle.mileage ? (
                      <div className="mt-1 text-sm text-brand-muted">
                        Mileage: {Number(vehicle.mileage).toLocaleString()}
                      </div>
                    ) : null}
                    <div className="mt-1 text-sm text-brand-muted">
                      Status: {vehicle.status}
                    </div>
                    {vehicle.primary ? (
                      <div className="mt-2 text-xs font-medium text-primary">
                        Primary vehicle
                      </div>
                    ) : null}
                  </button>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-border bg-background p-4 text-sm text-brand-muted">
                No saved cars found. Add a car in your user dashboard, then return to booking.
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="bookingNotes">Notes</Label>
            <Textarea
              id="bookingNotes"
              value={selection.notes}
              onChange={(event) => onChange("notes", event.target.value)}
              placeholder="Describe the issue or anything the garage should know"
            />
          </div>
        </CardContent>
      </Card>
    </BookingStepFrame>
  );
}
