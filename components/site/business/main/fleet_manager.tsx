export const FleetOperationsSection = () => {
  const features = [
    "Bulk ordering with custom pricing",
    "Fleet-specific inventory management",
    "Predictive maintenance alerts",
    "Multi-vehicle tracking",
    "Custom reporting & analytics",
    "Integration with fleet management software",
    "Dedicated fleet specialist",
    "Emergency part sourcing",
  ];

  return (
    <section className="bg-[#1A1A1A] py-24">
      <div className="mx-auto max-w-[1200px] px-8">
        <div className="grid items-center gap-16 md:grid-cols-2">
          
          {/* LEFT CONTENT */}
          <div>
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
                <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z" />
                <path d="M12 22V12" />
                <polyline points="3.29 7 12 12 20.71 7" />
                <path d="m7.5 4.27 9 5.15" />
              </svg>
              <span>For Fleet Managers</span>
            </div>

            <h2 className="mb-6 text-5xl font-bold text-white">
              Purpose-Built for Fleet Operations
            </h2>

            <p className="mb-8 text-xl leading-relaxed text-[#9CA3AF]">
              Manage parts procurement across your entire fleet with intelligent
              tools designed for scale.
            </p>

            <ul className="mb-8 space-y-4">
              {features.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
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
                    className="mt-0.5 h-6 w-6 shrink-0 text-[#DC2626]"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span className="text-lg text-[#9CA3AF]">{item}</span>
                </li>
              ))}
            </ul>

            <button className="rounded-lg bg-[#DC2626] px-8 py-4 text-lg font-medium text-white transition-all hover:bg-[#B91C1C]">
              Request Fleet Demo
            </button>
          </div>

          {/* RIGHT METRICS PANEL */}
          <div className="relative">
            <div className="relative aspect-square overflow-hidden rounded-xl border border-[#2A2A2A] bg-gradient-to-br from-[#DC2626]/10 to-[#DC2626]/5 p-12">
              <div className="absolute inset-0 opacity-5 bg-grid-pattern"></div>

              <div className="relative z-10 space-y-6">

                {/* CARD 1 */}
                <div className="rounded-xl border border-[#2A2A2A] bg-[#0A0A0A] p-6">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm text-[#9CA3AF]">
                      Monthly Savings
                    </span>

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
                      className="h-5 w-5 text-[#DC2626]"
                    >
                      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                      <polyline points="16 7 22 7 22 13" />
                    </svg>
                  </div>

                  <p className="text-3xl font-bold text-white">$12,450</p>
                  <p className="mt-1 text-sm text-[#DC2626]">
                    ↑ 23% vs last month
                  </p>
                </div>

                {/* CARD 2 */}
                <div className="rounded-xl border border-[#2A2A2A] bg-[#0A0A0A] p-6">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm text-[#9CA3AF]">
                      Active Vehicles
                    </span>

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
                      className="h-5 w-5 text-[#DC2626]"
                    >
                      <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z" />
                      <path d="M12 22V12" />
                      <polyline points="3.29 7 12 12 20.71 7" />
                      <path d="m7.5 4.27 9 5.15" />
                    </svg>
                  </div>

                  <p className="text-3xl font-bold text-white">247</p>
                </div>

                {/* CARD 3 */}
                <div className="rounded-xl border border-[#2A2A2A] bg-[#0A0A0A] p-6">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm text-[#9CA3AF]">
                      Parts in Stock
                    </span>

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
                      className="h-5 w-5 text-[#DC2626]"
                    >
                      <path d="M3 3v16a2 2 0 0 0 2 2h16" />
                      <path d="M18 17V9" />
                      <path d="M13 17V5" />
                      <path d="M8 17v-3" />
                    </svg>
                  </div>

                  <p className="text-3xl font-bold text-white">1,234</p>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};