import Link from "next/link";
import { JSX } from "react";

export const Business = () => {
  const solutions = [
    {
      title: "For Repair Shops",
      description:
        "Volume pricing, dedicated account manager, priority support, and integrated shop management tools.",
      icon: "wrench",
    },
    {
      title: "For Fleet Managers",
      description:
        "Bulk ordering, custom integrations, procurement dashboards, and fleet-specific inventory management.",
      icon: "package",
    },
  ];

  const icons: Record<string, JSX.Element> = {
    wrench: (
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    ),
    package: (
      <>
        <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z" />
        <path d="M12 22V12" />
        <polyline points="3.29 7 12 12 20.71 7" />
        <path d="m7.5 4.27 9 5.15" />
      </>
    ),
  };

  return (
    <section id="business" className="scroll-mt-20 bg-[#0A0A0A] py-24">
      <div className="mx-auto max-w-[1200px] px-8">
        <div className="mb-16 text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-[#DC2626]">
            ENTERPRISE SOLUTIONS
          </span>

          <h2 className="mt-2 mb-4 text-4xl font-bold text-white">
            Built for Business
          </h2>

          <p className="text-lg text-[#9CA3AF]">
            Specialized solutions for garages, fleets, and repair shops
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {solutions.map((solution) => (
            <div
              key={solution.title}
              className="group rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] p-10 transition-all hover:border-[#DC2626]"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl border border-[#DC2626]/20 bg-[#DC2626]/10">
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
                  className="h-8 w-8 text-[#DC2626]"
                >
                  {icons[solution.icon]}
                </svg>
              </div>

              <h3 className="mb-4 text-2xl font-semibold text-white">
                {solution.title}
              </h3>

              <p className="mb-6 leading-relaxed text-[#9CA3AF]">
                {solution.description}
              </p>

              <Link
                href="/business"
                className="inline-flex items-center gap-2 font-medium text-[#DC2626] hover:underline"
              >
                Learn more
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
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
