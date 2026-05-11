import { AutoPartsMarketplacePage } from "@/components/site/product/SingleProduct";
import { VehicleChangeSection } from "@/components/site/user/sections/vehicle-change-section";
import { bookingVehicles } from "@/lib/data/booking";

export default function ProductDetailsPage() {
  return (
    <div className="min-h-full bg-brand-surface">
      <div className="h-16" />
      <VehicleChangeSection
        title="Confirmed Fitment"
        description="This part is guaranteed to fit your vehicle"
        buttonLabel="Change Vehicle"
        vehicle={bookingVehicles[1]}
      />
      <AutoPartsMarketplacePage />
    </div>
  );
}
