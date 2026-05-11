import { VehicleChangeSection } from "@/components/site/user/sections/vehicle-change-section";
import { SearchContent } from "./search-content";
import { bookingVehicles } from "@/lib/data/booking";

export function SearchPage() {
  return (
    <div className="min-h-full bg-[#0A0A0A]">
      <div className=" h-10 md:h-20"  />
      <VehicleChangeSection
        title="Results Found"
        // description="Filters and results are scoped to this selected vehicle"
        // buttonLabel="Change Vehicle"
        // vehicle={bookingVehicles[0]}
        
      />
      <SearchContent />
    </div>
  );
}
