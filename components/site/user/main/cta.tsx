import Link from "next/link";

export const CTASection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#DC2626] to-[#B91C1C] py-24">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#ffffff_0%,_transparent_50%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-8">
        <div className="text-center">
          <h2 className="mb-6 text-5xl font-bold text-white">
            Ready to Find Your Part?
          </h2>

          <p className="mx-auto mb-8 max-w-2xl text-xl text-white/90">
            Join thousands of professionals who trust AutoPartsPro for quality
            parts and unbeatable service.
          </p>

          <div className="flex items-center justify-center gap-4">
            <Link
              href="/search"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-medium text-[#DC2626] transition-all hover:bg-gray-100"
            >
              Start Shopping Now
            </Link>

            <Link
              href="/rfq"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-white bg-white/10 px-8 py-4 text-lg font-medium text-white transition-all hover:bg-white/20"
            >
              Request Quote
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
