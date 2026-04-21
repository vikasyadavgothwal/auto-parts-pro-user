import { MainHeader } from "@/components/site/header";
import { VehicleChangeSection } from "@/components/site/user/sections/vehicle-change-section";
import { SearchContent } from "./search-content";

export function SearchPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <MainHeader />
      <VehicleChangeSection />
      <SearchContent />
    </div>
  );
}
