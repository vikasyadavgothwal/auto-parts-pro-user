
import type { Metadata } from "next";
import {Suppliers} from "../../../components/site/suppliers/main/Suppliers";
export const metadata: Metadata = {
  title: "Suppliers | Auto Parts Pro",
  description: "Supplier partner experience for Auto Parts Pro.",
};

export default function SuppliersPage() {
  return (
    <main className="relative flex-1 overflow-hidden bg-background">
      <Suppliers />
    </main>
  );
}
