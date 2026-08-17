import { notFound } from "next/navigation";

import { AutoPartsMarketplacePage } from "@/components/site/product/SingleProduct";
import { VehicleChangeSection } from "@/components/site/user/sections/vehicle-change-section";
import { getMarketplaceProduct } from "@/lib/marketplace";

type ProductDetailsPageProps = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const getSearchParam = (
  params: Record<string, string | string[] | undefined> | undefined,
  key: string,
) => {
  const value = params?.[key];

  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
};

export default async function ProductDetailsPage({
  params,
  searchParams,
}: ProductDetailsPageProps) {
  const { id } = await params;
  const queryParams = await searchParams;
  const product = await getMarketplaceProduct(id, {
    deliveryCity: getSearchParam(queryParams, "deliveryCity").trim().slice(0, 120),
    deliveryState: getSearchParam(queryParams, "deliveryState").trim().slice(0, 120),
    deliveryCountry: getSearchParam(queryParams, "deliveryCountry").trim().slice(0, 120),
  });

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
