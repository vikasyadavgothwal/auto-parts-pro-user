import Link from "next/link";
import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, ClipboardList, ShieldCheck, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";

type SupplierCard = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const supplierFeatures: SupplierCard[] = [
  {
    title: "Quality standards",
    description:
      "Define packaging rules, inspection checkpoints, and the documentation expected per shipment.",
    icon: ShieldCheck,
  },
  {
    title: "Logistics planning",
    description:
      "Coordinate lane commitments, replenishment windows, and receiving expectations before dispatch.",
    icon: Truck,
  },
  {
    title: "Commercial terms",
    description:
      "Prepare static content for lead times, credit rules, and catalog contribution workflows.",
    icon: ClipboardList,
  },
];

export const metadata: Metadata = {
  title: "Suppliers | Auto Parts Pro",
  description: "Supplier partner experience for Auto Parts Pro.",
};

export default function SuppliersPage() {
  return (
    <main className="relative flex-1 overflow-hidden bg-background">

    </main>
  );
}
