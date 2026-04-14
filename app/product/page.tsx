import { MainHeader } from "@/components/site/header";
import { AutoPartsMarketplacePage } from "@/components/site/product/SingleProduct";
import { VehicleChangeSection } from "@/components/site/user/sections/veicle-change-section";

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-brand-surface">
      <MainHeader />
      <VehicleChangeSection />
      <AutoPartsMarketplacePage />
    </div>
  );
}
