export const BusinessCTASection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#DC2626] to-[#B91C1C] py-24">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-5xl font-bold text-white">
            Ready to Transform Your Business?
          </h2>

          <p className="mb-12 text-xl text-white/80">
            Join thousands of repair shops and fleet managers who trust
            AutoPartsPro
          </p>

          <div className="flex justify-center gap-4">
            <button className="rounded-lg bg-white px-8 py-4 text-lg font-medium text-[#DC2626] transition-all hover:bg-gray-100">
              Schedule a Demo
            </button>

            <button className="rounded-lg border-2 border-white bg-transparent px-8 py-4 text-lg font-medium text-white transition-all hover:bg-white/10">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};