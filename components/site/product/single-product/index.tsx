import {
  highlights,
  keyFeatures as fallbackKeyFeatures,
  offers as fallbackOffers,
  productImages as fallbackProductImages,
} from "@/lib/data/product";
import { marketplaceOffersToProductOffers } from "@/lib/marketplace";
import type {
  MarketplaceProductDetail,
  MarketplaceSelectedVendorContent,
} from "@/types/site/marketplace";
import { CompareOffersSection } from "./compare-offers-section";
import { ProductGallery } from "./product-gallery";
import { installationBenefits, singleProduct } from "./product-content";
import { ProductOverview } from "./product-overview";
import { ProductSupportSections } from "./product-support-sections";

type AutoPartsMarketplacePageProps = {
  product?: MarketplaceProductDetail;
};

const supplierProductInfoItems = (
  content: MarketplaceSelectedVendorContent,
): Array<{ label: string; value: string | null }> => {
  const rows: Array<[string, string | null]> = [
    ["Short Description", content.shortDescription],
    ["Description", content.longDescription],
    ["Manufacturer Part Number (MPN)", content.manufacturerPartNumber],
  ];

  return rows.map(([label, value]) => ({ label, value }));
}

const supplierProductBadges = (
  content: MarketplaceSelectedVendorContent,
): Array<{ label: string; value: string | null }> => [
  { label: "Grade", value: content.grade },
  { label: "Condition", value: content.condition },
]

export function AutoPartsMarketplacePage({
  product,
}: AutoPartsMarketplacePageProps) {
  const productImages = product?.images ?? fallbackProductImages;
  const title = product?.title ?? singleProduct.title;
  const partNumber = product?.partNumber ?? singleProduct.partNumber;
  const selectedVendorContent = product?.selectedVendorContent;
  const supplierProductInfo = selectedVendorContent
    ? supplierProductInfoItems(selectedVendorContent)
    : undefined;
  const productInfoBadges = selectedVendorContent
    ? supplierProductBadges(selectedVendorContent)
    : undefined;
  const keyFeatures = product?.keyFeatures ?? fallbackKeyFeatures;
  const keyFeaturesTitle = selectedVendorContent ? undefined : "Key Features";
  const offers = product ? marketplaceOffersToProductOffers(product) : fallbackOffers;
  const ratingAverage = product?.ratingAverage ?? 0;
  const reviewCount = product?.reviewCount ?? 0;

  return (
    <main className="min-h-full bg-[#0A0A0A] text-white">
      <div className="h-10" />
      <div className="mx-auto max-w-[1440px] px-4 pb-16 ">
        <div className="mb-14 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <ProductGallery
            images={productImages}
            title={title}
          />

          <ProductOverview
            partUid={product?.partUid}
            title={title}
            partNumber={partNumber}
            rating={ratingAverage}
            reviewCount={reviewCount}
            keyFeatures={keyFeatures}
            keyFeaturesTitle={keyFeaturesTitle}
            productInfoRows={supplierProductInfo}
            productInfoBadges={productInfoBadges}
            highlights={highlights}
          />
        </div>

        <CompareOffersSection offers={offers} />
        <ProductSupportSections installationBenefits={installationBenefits} />
      </div>
    </main>
  );
}
