import { SupplierFooter } from "@/components/site/suppliers/supplier-footer";
import { SupplierHeader } from "@/components/site/suppliers/supplier-header";

export default function SuppliersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <SupplierHeader />
      <div className="flex-1">{children}</div>
      <SupplierFooter />
    </div>
  );
}
