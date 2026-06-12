import { PublicSectionContentBoundary } from "@/components/site/public-content/public-section-content-boundary";
import { SuppliersSection } from "@/components/site/suppliers/sections/suppliers-section";
import { getPublicContentMetadata } from "@/lib/public-seo";

export const dynamic = "force-dynamic";

export const generateMetadata = () =>
  getPublicContentMetadata("suppliers", {
    title: "Suppliers | Auto Parts Pro",
    description: "Supplier partner experience for Auto Parts Pro.",
  });

export default function SuppliersPage() {
  return (
    <main className="relative flex-1 overflow-hidden bg-background">
      <PublicSectionContentBoundary slug="suppliers">
        <SuppliersSection />
      </PublicSectionContentBoundary>
    </main>
  );
}
