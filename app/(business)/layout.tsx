import {BusinessHeader}  from "@/components/site/business/business-header";
import {BusinessFooter} from "@/components/site/business/business-footer";

export default function BusinessLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
        <BusinessHeader
      />
      <div className="flex-1">{children}</div>
      <BusinessFooter />
    </div>
  );
}
