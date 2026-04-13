import Link from "next/link";

export const ServicesHeader = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-[#2A2A2A] bg-[#0A0A0A]">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center gap-6 lg:gap-12">
            <Link href="/" className="text-2xl font-bold text-white">
              AutoParts<span className="text-[#DC2626]">Pro</span>
            </Link>

            <nav className="hidden items-center gap-6 md:flex lg:gap-8">
              <Link
                href="/search"
                className="text-[#9CA3AF] transition-colors hover:text-white"
              >
                Browse Parts
              </Link>

              <Link
                href="/services"
                className="text-white transition-colors"
              >
                Services
              </Link>

              <Link
                href="/rfq"
                className="text-[#9CA3AF] transition-colors hover:text-white"
              >
                Request Quote
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button className="px-5 py-2.5 text-[#9CA3AF] transition-colors hover:text-white">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};