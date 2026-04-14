import Link from "next/link";
import { BrandLogo } from "@/components/site/shared/brand-logo";

export function MainHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-brand-surface">
      <div className="site-container-wide">
        <div className="flex h-20 items-center justify-between">
          <BrandLogo href="/" />
          <Link
            href="/"
            className="text-brand-muted transition-colors hover:text-white"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </header>
  );
}
