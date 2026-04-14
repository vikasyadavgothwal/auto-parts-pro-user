import { ServiceHeader } from "@/components/site/service/service-header";

export default function BusinessLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
        <ServiceHeader
      />
      <div className="flex-1">{children}</div>
    </div>
  );
}
