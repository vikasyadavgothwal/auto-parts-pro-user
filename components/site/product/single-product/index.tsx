import { productImages, keyFeatures, highlights, offers } from "@/lib/data/product";
import { CompareOffersSection } from "./compare-offers-section";
import { ProductGallery } from "./product-gallery";
import {
  installationBenefits,
  singleProduct,
} from "./product-content";
import { ProductOverview } from "./product-overview";
import { ProductSupportSections } from "./product-support-sections";

export function AutoPartsMarketplacePage() {
  return (
    <main className="min-h-full bg-[#0A0A0A] text-white">
      <div className="h-10" />
      <div className="mx-auto max-w-[1440px] px-4 pb-16 ">
        <div className="mb-14 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <ProductGallery
            images={productImages}
            title={singleProduct.title}
          />

          <ProductOverview
            title={singleProduct.title}
            partNumber={singleProduct.partNumber}
            rating={singleProduct.rating}
            reviewCount={singleProduct.reviewCount}
            keyFeatures={keyFeatures}
            highlights={highlights}
          />
        </div>

        <CompareOffersSection offers={offers} />
        <ProductSupportSections installationBenefits={installationBenefits} />
      </div>
    </main>
  );
}
