import Link from "next/link";
import { ChevronLeftIcon } from "@/components/icons/site-icons";
import { Button } from "@/components/ui/button";
import { productImages, keyFeatures, highlights, offers } from "@/lib/data/product";
import { CompareOffersSection } from "./compare-offers-section";
import { ProductDetailsSection } from "./product-details-section";
import { ProductGallery } from "./product-gallery";
import {
  installationBenefits,
  productSpecifications,
  singleProduct,
} from "./product-content";
import { ProductOverview } from "./product-overview";
import { ProductSupportSections } from "./product-support-sections";

export function AutoPartsMarketplacePage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="mx-auto max-w-[1440px] px-4 py-5 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          asChild
          className="h-auto px-0 text-[#9CA3AF] hover:bg-transparent hover:text-white"
        >
          <Link href="/search" className="inline-flex items-center gap-2">
            <ChevronLeftIcon className="h-4 w-4" />
            <span className="text-sm">Back to search results</span>
          </Link>
        </Button>
      </div>

      <div className="mx-auto max-w-[1200px] px-4 pb-16 sm:px-6 lg:px-8">
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
        <ProductDetailsSection
          description={singleProduct.description}
          specifications={productSpecifications}
        />
      </div>
    </main>
  );
}
