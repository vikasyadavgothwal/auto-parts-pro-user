
import type { Metadata } from "next";
import { SuppliersSection } from "@/components/site/suppliers/sections/suppliers-section";
export const metadata: Metadata = {
  title: "Suppliers | Auto Parts Pro",
  description: "Supplier partner experience for Auto Parts Pro.",
};

export default function SuppliersPage() {
  return (
    <main className="relative flex-1 overflow-hidden bg-background">
      <SuppliersSection />
    </main>
  );
}
