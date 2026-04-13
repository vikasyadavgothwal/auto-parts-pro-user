import { ServicesHeader } from "@/components/site/service/servce-header";

export default function BusinessLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
        <ServicesHeader
      />
      <div className="flex-1">{children}</div>
    </div>
  );
}