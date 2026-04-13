
import {Supplier_Header} from "@/components/site/suppliers/suppliers-header";
import {Footer_Suppllier} from "@/components/site/suppliers/suppliers-footer";

export default function SuppliersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Supplier_Header />
      <div className="flex-1">{children}</div>
      <Footer_Suppllier />
    </div>
  );
}
