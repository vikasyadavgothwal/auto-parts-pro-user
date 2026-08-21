import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Toaster } from "sonner";
import { Providers } from "@/components/providers";
import { SiteFooter } from "@/components/site/user/user-footer";
import { UserHeader } from "@/components/site/user/user-header";
import "./globals.css";

import { getMainWebsiteSiteSettings } from "@/lib/site-settings";
import { isSiteLanguage, siteLanguageCookie, siteLanguageDirection } from "@/lib/language-preference";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getMainWebsiteSiteSettings();
  return {
    title: settings.seo.title || settings.siteName,
    description: settings.seo.description,
    ...(settings.seo.keywords ? { keywords: settings.seo.keywords.split(",").map((value) => value.trim()).filter(Boolean) } : {}),
    ...(settings.seo.canonicalUrl ? { alternates: { canonical: settings.seo.canonicalUrl } } : {}),
    robots: { index: !settings.seo.noIndex, follow: !settings.seo.noFollow },
    icons: { icon: `/api/favicon?v=${encodeURIComponent(settings.faviconKey || "default")}` },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getMainWebsiteSiteSettings();
  const languageCookie = (await cookies()).get(siteLanguageCookie)?.value;
  const language = isSiteLanguage(languageCookie) ? languageCookie : "en";
  return (
    <html lang={language} dir={siteLanguageDirection(language)} className="h-full bg-background antialiased">
      <body className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
        <Providers initialLanguage={language}>
          <UserHeader logoUrl={settings.logoUrl} siteName={settings.siteName} />
          <div className="flex flex-1 flex-col">{children}</div>
          <SiteFooter settings={settings} />
          <Toaster
            position="top-right"
            theme="dark"
            richColors={false}
            className="brand-toaster"
            closeButton
            expand={true}
            toastOptions={{
              classNames: {
                toast: "text-[var(--primary)]",
                title: "text-[var(--primary)]",
                description: "text-[var(--primary)]",
                icon: "text-[var(--primary)]",
                closeButton: "text-[var(--primary)] hover:text-[var(--primary)]",
                actionButton: "text-[var(--primary)] hover:text-[var(--primary)] border border-[var(--primary)]",
                cancelButton: "text-[var(--primary)] hover:text-[var(--primary)] border border-[var(--primary)]",
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
