import { MainHeader } from "@/components/site/header";
import { AutoPartsMarketplacePage } from "@/components/site/product/SingleProduct";
import { VehicleChangeSection } from "@/components/site/user/sections/vehicle-change-section";

export default function ProductDetailsPage() {
  return (
    <div className="min-h-screen bg-brand-surface">
      <MainHeader />
      <VehicleChangeSection />
      <AutoPartsMarketplacePage />
    </div>
  );
}
