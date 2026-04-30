import { VehicleChangeSection } from "@/components/site/user/sections/vehicle-change-section";
import { SearchContent } from "./search-content";

export function SearchPage() {
  return (
    <div className="min-h-full bg-[#0A0A0A]">
      <div className=" h-10 md:h-20"  />
      <VehicleChangeSection />
      <SearchContent />
    </div>
  );
}
