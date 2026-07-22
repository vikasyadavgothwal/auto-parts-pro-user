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

export const SiteFooter = () => {
  return (
    <footer className="bg-black text-white">
      <div className="site-container py-14">
        <div className="grid gap-10 md:grid-cols-[1fr_auto]">
          <div>
            <BrandLogo href="/" textClassName="text-white" />
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
              </ul>
            </div>

            {/* Support */}
            <div>
              <h2 className="mb-4 text-md font-semibold uppercase tracking-wider">
                Support
              </h2>

              <ul className="space-y-2 text-white">
                <li>
                  <Link href="/help" className="hover:text-white">
                    971 000 0000
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="hover:text-white">
                    info@autoparts.ae
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="hover:text-white">
                    Dubai, Lorem Lipsum Eslopsum
                  </Link>
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
            <span>© 2026 Prisma Digital</span>

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

          <div className="flex items-center gap-5 text-white">
            <Link href="#" aria-label="Facebook">
              <FacebookBrandIcon className="size-5 transition-colors hover:text-primary" />
            </Link>

            <Link href="#" aria-label="Instagram">
              <InstagramBrandIcon className="size-5 transition-colors hover:text-primary" />
            </Link>

            <Link href="#" aria-label="Twitter">
              <XBrandIcon className="size-5 transition-colors hover:text-primary" />
            </Link>

            <Link href="#" aria-label="YouTube">
              <YouTubeBrandIcon className="size-5 transition-colors hover:text-primary" />
            </Link>

            <Link href="#" aria-label="LinkedIn">
              <LinkedInBrandIcon className="size-5 transition-colors hover:text-primary" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
