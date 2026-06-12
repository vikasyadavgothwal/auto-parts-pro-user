
import type { Metadata } from "next";
import { PublicSectionContentBoundary } from "@/components/site/public-content/public-section-content-boundary";
import { SuppliersSection } from "@/components/site/suppliers/sections/suppliers-section";
export const metadata: Metadata = {
  title: "Suppliers | Auto Parts Pro",
  description: "Supplier partner experience for Auto Parts Pro.",
};

export const dynamic = "force-dynamic";

export default function SuppliersPage() {
  return (
    <main className="relative flex-1 overflow-hidden bg-background">
      <PublicSectionContentBoundary slug="suppliers">
        <SuppliersSection />
      </PublicSectionContentBoundary>
    </main>
  );
}
