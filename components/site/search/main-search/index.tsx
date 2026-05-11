import { VehicleChangeSection } from "@/components/site/user/sections/vehicle-change-section";
import { SearchContent } from "./search-content";

type VehicleInfo = {
  year?: string
  make?: string
  model?: string
  vin?: string
}

type SearchPageProps = {
  heading?: string;
  description?: string;
  buttonLabel?: string;
  vehicle?: VehicleInfo;
};

export function SearchPage({
  heading = "Results Found",
  description,
  buttonLabel,
  vehicle,
}: SearchPageProps) {
  const hasDescription = Boolean(description?.trim())
  const hasButtonLabel = Boolean(buttonLabel?.trim())

  return (
    <div className="min-h-full bg-[#0A0A0A]">
      <div className=" h-10 md:h-20"  />
      <VehicleChangeSection
        title={heading}
        description={hasDescription ? description : undefined}
        buttonLabel={hasButtonLabel ? buttonLabel : undefined}
        vehicle={hasDescription ? vehicle : undefined}
        
      />
      <SearchContent />
    </div>
  );
}
