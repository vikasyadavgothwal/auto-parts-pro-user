export const BusinessHero = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#DC2626]/5 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-[1200px] px-8 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#DC2626]/20 bg-[#DC2626]/10 px-4 py-2 text-sm font-medium text-[#DC2626]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
            </svg>
            <span>Trusted by 5,000+ businesses</span>
          </div>

          <h1 className="mb-6 text-6xl font-bold leading-tight text-white">
            Enterprise Solutions for
            <br />
            <span className="text-[#DC2626]">Repair Shops &amp; Fleets</span>
          </h1>

          <p className="mb-12 text-xl leading-relaxed text-[#9CA3AF]">
            Streamline procurement, reduce costs, and keep your operations
            running smoothly with our B2B platform built for automotive
            professionals.
          </p>

          <div className="flex justify-center gap-4">
            <button className="rounded-lg bg-[#DC2626] px-8 py-4 text-lg font-medium text-white transition-all hover:bg-[#B91C1C]">
              Schedule a Demo
            </button>

            <button className="rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] px-8 py-4 text-lg font-medium text-white transition-all hover:border-[#DC2626]">
              View Pricing
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
