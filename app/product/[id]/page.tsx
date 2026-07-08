import { notFound } from "next/navigation";

import { AutoPartsMarketplacePage } from "@/components/site/product/SingleProduct";
import { VehicleChangeSection } from "@/components/site/user/sections/vehicle-change-section";
import { getMarketplaceProduct } from "@/lib/marketplace";

type ProductDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { id } = await params;
  const product = await getMarketplaceProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-full bg-brand-surface">
      <div className="h-16" />
      <VehicleChangeSection
        title="Marketplace Product"
        description={`${product.offerCount} supplier offer${product.offerCount === 1 ? "" : "s"} available`}
        buttonLabel="Change Vehicle"
      />
      <AutoPartsMarketplacePage product={product} />
    </div>
  );
}
