import { AutoPartsMarketplacePage } from "@/components/site/product/SingleProduct";
import { VehicleChangeSection } from "@/components/site/user/sections/vehicle-change-section";

export default function ProductPage() {
  return (
    <div className="min-h-full bg-brand-surface">
      <VehicleChangeSection />
      <AutoPartsMarketplacePage />
    </div>
  );
}
