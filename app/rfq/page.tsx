import Link from "next/link";
export default function RequestQuotePage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <header className="sticky top-0 z-50 border-b border-[#2A2A2A] bg-[#0A0A0A]">
        <div className="mx-auto max-w-[1440px] px-8">
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-white">
              AutoParts<span className="text-[#DC2626]">Pro</span>
            </Link>
            <Link    
              href="/rfq"
              className="text-[#9CA3AF] transition-colors hover:text-white"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <div className="mx-auto max-w-4xl px-8 py-16">

        {/* TITLE */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-bold text-white">
            Request a Quote
          </h1>
          <p className="text-xl text-[#9CA3AF]">
            Get personalized offers from multiple verified suppliers
          </p>
        </div>

        {/* FORM */}
        <form className="space-y-8">

          {/* COMPANY INFO */}
          <section className="rounded-2xl border border-[#2A2A2A] bg-[#1A1A1A] p-8">
            <h2 className="mb-6 text-2xl font-semibold text-white">
              Company Information
            </h2>

            <div className="grid gap-6 md:grid-cols-2">

              {[
                ["Company Name *", "Your Company LLC"],
                ["Contact Name *", "John Doe"],
                ["Email *", "john@company.com"],
                ["Phone *", "+1 (555) 123-4567"],
              ].map(([label, placeholder], i) => (
                <div key={i}>
                  <label className="mb-2 block text-sm font-medium text-white">
                    {label}
                  </label>

                  <input
                    required
                    className="h-12 w-full rounded-xl border border-[#2A2A2A] bg-[#0A0A0A] px-4 text-white placeholder:text-[#4B5563] transition-all focus:border-[#DC2626] focus:outline-none focus:ring-2 focus:ring-[#DC2626]/50"
                    placeholder={placeholder}
                  />
                </div>
              ))}

            </div>
          </section>

          {/* VEHICLE INFO */}
          <section className="rounded-2xl border border-[#2A2A2A] bg-[#1A1A1A] p-8">
            <h2 className="mb-6 text-2xl font-semibold text-white">
              Vehicle Information
            </h2>

            <div className="grid gap-6 md:grid-cols-2">

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-white">
                  VIN (Optional)
                </label>
                <input
                  className="h-12 w-full rounded-xl border border-[#2A2A2A] bg-[#0A0A0A] px-4 text-white placeholder:text-[#4B5563] transition-all focus:border-[#DC2626] focus:outline-none focus:ring-2 focus:ring-[#DC2626]/50"
                  placeholder="1HGBH41JXMN109186"
                />
              </div>

              {["Year *", "Make *", "Model *", "Trim"].map((label, i) => (
                <div key={i}>
                  <label className="mb-2 block text-sm font-medium text-white">
                    {label}
                  </label>

                  <input
                    className="h-12 w-full rounded-xl border border-[#2A2A2A] bg-[#0A0A0A] px-4 text-white placeholder:text-[#4B5563] transition-all focus:border-[#DC2626] focus:outline-none focus:ring-2 focus:ring-[#DC2626]/50"
                  />
                </div>
              ))}

            </div>
          </section>

          {/* PARTS SECTION */}
          <section className="rounded-2xl border border-[#2A2A2A] bg-[#1A1A1A] p-8">

            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-white">
                Parts Needed
              </h2>

              <button
                type="button"
                className="flex items-center gap-2 rounded-xl border border-[#DC2626]/20 px-4 py-2 text-[#DC2626] transition-colors hover:bg-[#DC2626]/10"
              >
                Add Part
              </button>
            </div>

            <div className="space-y-4">

              <div className="rounded-xl border border-[#2A2A2A] bg-[#0A0A0A] p-6">

                <h4 className="mb-4 font-medium text-white">
                  Part #1
                </h4>

                <div className="grid gap-4 md:grid-cols-2">

                  <div className="md:col-span-2">
                    <input
                      placeholder="Front brake pads"
                      className="h-12 w-full rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] px-4 text-white placeholder:text-[#4B5563]"
                    />
                  </div>

                  <input
                    placeholder="BC1259"
                    className="h-12 rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] px-4 text-white"
                  />

                  <input
                    type="number"
                    defaultValue={1}
                    className="h-12 rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] px-4 text-white"
                  />

                  <div className="md:col-span-2">
                    <textarea
                      rows={2}
                      placeholder="Any specific requirements or preferences..."
                      className="w-full resize-none rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] px-4 py-3 text-white"
                    />
                  </div>

                </div>
              </div>

            </div>

            {/* FILE UPLOAD */}
            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium text-white">
                Attach Documents (Optional)
              </label>

              <div className="cursor-pointer rounded-xl border-2 border-dashed border-[#2A2A2A] p-8 text-center transition-colors hover:border-[#DC2626]">
                <p className="mb-1 text-[#9CA3AF]">
                  Drop files here or click to upload
                </p>
                <p className="text-sm text-[#4B5563]">
                  PDF, PNG, JPG up to 10MB
                </p>
              </div>
            </div>

          </section>

          {/* SUBMIT */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="rounded-xl bg-[#DC2626] px-12 py-4 text-lg font-medium text-white transition-all hover:bg-[#B91C1C]"
            >
              Submit Quote Request
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};