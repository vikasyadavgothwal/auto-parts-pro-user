import Link from "next/link";
import {
  FacebookBrandIcon,
  InstagramBrandIcon,
  LinkedInBrandIcon,
  XBrandIcon,
  YouTubeBrandIcon,
} from "@/components/icons/brands";
import { Separator } from "@/components/ui/separator";
import { BrandLogo } from "@/components/site/shared/brand-logo";
import { getMainWebsiteSiteSettings } from "@/lib/site-settings";
import type { MainWebsiteSiteSettings } from "@/types/api/site-settings";

const whatsappHref = (phone: string) => `https://wa.me/${phone.replace(/\D/g, "")}`;

export const SiteFooter = async ({ settings: providedSettings }: { settings?: MainWebsiteSiteSettings }) => {
  const settings = providedSettings ?? (await getMainWebsiteSiteSettings());
  const socialLinks = [
    { label: "Facebook", href: settings.social.facebook, icon: <FacebookBrandIcon className="size-5 transition-colors hover:text-primary" /> },
    { label: "Instagram", href: settings.social.instagram, icon: <InstagramBrandIcon className="size-5 transition-colors hover:text-primary" /> },
    { label: "X", href: settings.social.x, icon: <XBrandIcon className="size-5 transition-colors hover:text-primary" /> },
    { label: "YouTube", href: settings.social.youtube, icon: <YouTubeBrandIcon className="size-5 transition-colors hover:text-primary" /> },
    { label: "LinkedIn", href: settings.social.linkedin, icon: <LinkedInBrandIcon className="size-5 transition-colors hover:text-primary" /> },
  ].filter((link) => link.href);

  return (
    <footer className="bg-black text-white" data-no-translate="true">
      <div className="site-container py-14">
        <div className="grid gap-10 md:grid-cols-[1fr_auto]">
          <div>
            <BrandLogo
              href="/"
              logoUrl={settings.logoUrl}
              logoKey={settings.logoKey}
              siteName={settings.siteName}
              logoClassName="h-16 max-w-[240px]"
              textClassName="text-5xl text-white"
            />
            <p className="mt-4 max-w-md text-sm leading-6 text-white">
              AutoParts Pro connects customers, suppliers, garages, and fleets through one trusted marketplace for auto parts and vehicle services across the UAE.
            </p>
          </div>

          {/* Right → Links */}
          <div className="grid grid-cols-2">
            {/* Quick Links */}
            <div>
              <h2 className="mb-4 text-md font-semibold uppercase tracking-wider">
                Quick Links
              </h2>

              <ul className="space-y-2 text-white">
                <li>
                  <Link href="/search" className="hover:text-white">
                    Browse Parts
                  </Link>
                </li>
                <li>
                  <Link href="/rfq" className="hover:text-white">
                    Request Quote
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-white">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/business" className="hover:text-white">
                    For Business
                  </Link>
                </li>
                <li>
                  <Link href="/developers/api" className="hover:text-white">
                    Developer API
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h2 className="mb-4 text-md font-semibold uppercase tracking-wider">
                Support
              </h2>

              <ul className="space-y-2 text-white">
                <li>
                  <a href={settings.contact.phone ? whatsappHref(settings.contact.phone) : "#"} className="hover:text-white" target="_blank" rel="noreferrer">
                    Contact Number: {settings.contact.phone || "Not provided"}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${settings.contact.email}`} className="hover:text-white">
                    {settings.contact.email || "Not provided"}
                  </a>
                </li>
                <li>
                  <span>
                    Address: {settings.contact.address || "Not provided"}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* SEPARATOR */}
        <Separator className="my-10 bg-white/15" />

        {/* BOTTOM SECTION */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Left side */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-white">
            <span>{settings.copyright}</span>

            <Link href="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>

            <Link href="/terms-of-services" className="hover:text-white">
              Terms of services
            </Link>
            <Link href="/cookies-settings" className="hover:text-white">
              Cookies settings
            </Link>
          </div>

          {socialLinks.length ? <div className="flex items-center gap-5 text-white">
            {socialLinks.map((link) => <a key={link.label} href={link.href} aria-label={link.label} target="_blank" rel="noreferrer">{link.icon}</a>)}
          </div> : null}
        </div>
      </div>
    </footer>
  );
};
