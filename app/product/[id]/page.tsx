import { AutoPartsMarketplacePage } from "@/components/site/product/SingleProduct";
import { VehicleChangeSection } from "@/components/site/user/sections/vehicle-change-section";

export default function ProductDetailsPage() {
  return (
    <div className="min-h-full bg-brand-surface">
      <div className="h-16" />
      <VehicleChangeSection />
      <AutoPartsMarketplacePage />
    </div>
  );
}
