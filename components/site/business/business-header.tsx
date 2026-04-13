import Link from "next/link";

export const BusinessHeader = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-[#2A2A2A] bg-[#0A0A0A]/80 backdrop-blur-md">
      <div className="mx-auto max-w-[1440px] px-8">
        <div className="flex h-20 items-center justify-between">
          
          {/* Left side */}
          <div className="flex items-center gap-12">
            <Link href="/" className="text-2xl font-bold text-white">
              AutoPartsPro
            </Link>

            <nav className="hidden items-center gap-8 md:flex">
              <Link
                href="/search"
                className="text-[#9CA3AF] transition-colors hover:text-white"
              >
                Browse Parts
              </Link>

              <Link
                href="/rfq"
                className="text-[#9CA3AF] transition-colors hover:text-white"
              >
                Request Quote
              </Link>

              <Link
                href="/business"
                className="font-medium text-[#DC2626]"
              >
                For Business
              </Link>
            </nav>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <button className="px-5 py-2.5 text-[#9CA3AF] transition-colors hover:text-white">
              Sign In
            </button>

            <button className="rounded-lg bg-[#DC2626] px-6 py-2.5 text-white transition-all hover:bg-[#B91C1C]">
              Get Started
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};

