import { SiteFooter } from "@/components/site/user/user-footer";
import { UserHeader } from "@/components/site/user/user-header";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <UserHeader />
      <div className="flex-1">{children}</div>
      <SiteFooter
      />
    </div>
  );
}
