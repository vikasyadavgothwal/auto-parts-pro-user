import Link from "next/link";
import { JSX } from "react";

export const CategoryType = () => {
  const categories = [
    { name: "Engine Parts", count: "12,450 parts", icon: "cog" },
    { name: "Suspension", count: "8,320 parts", icon: "wrench" },
    { name: "Electrical", count: "15,680 parts", icon: "battery" },
    { name: "Brakes", count: "9,870 parts", icon: "package" },
    { name: "Transmission", count: "6,540 parts", icon: "cog" },
    { name: "Body Parts", count: "22,100 parts", icon: "car" },
  ];

  const icons: Record<string, JSX.Element> = {
    cog: (
      <>
        <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
        <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
        <path d="M12 2v2M12 22v-2M17 20.66l-1-1.73M11 10.27 7 3.34M20.66 17l-1.73-1M3.34 7l1.73 1M14 12h8M2 12h2M20.66 7l-1.73 1M3.34 17l1.73-1M17 3.34l-1 1.73M11 13.73l-4 6.93" />
      </>
    ),
    wrench: (
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    ),
    battery: (
      <>
        <rect width="16" height="10" x="2" y="7" rx="2" />
        <line x1="22" x2="22" y1="11" y2="13" />
      </>
    ),
    package: (
      <>
        <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z" />
        <path d="M12 22V12" />
        <polyline points="3.29 7 12 12 20.71 7" />
        <path d="m7.5 4.27 9 5.15" />
      </>
    ),
    car: (
      <>
        <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
        <circle cx="7" cy="17" r="2" />
        <path d="M9 17h6" />
        <circle cx="17" cy="17" r="2" />
      </>
    ),
  };

  return (
    <section className="bg-[#0A0A0A] py-24">
      <div className="mx-auto max-w-[1200px] px-8">
        <div className="mb-16 text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-[#DC2626]">
            EXPLORE BY TYPE
          </span>

          <h2 className="mt-2 mb-4 text-4xl font-bold text-white">
            Browse by Category
          </h2>

          <p className="text-lg text-[#9CA3AF]">
            Explore our extensive catalog of auto parts
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href="/search"
              className="group rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] p-6 transition-all hover:border-[#DC2626] hover:bg-[#1F1F1F]"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-[#DC2626]/20 bg-[#DC2626]/10 transition-colors group-hover:bg-[#DC2626]/20">
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
                  className="h-7 w-7 text-[#DC2626]"
                >
                  {icons[cat.icon]}
                </svg>
              </div>

              <h3 className="mb-1 text-center text-sm font-semibold text-white">
                {cat.name}
              </h3>

              <p className="text-center text-xs text-[#9CA3AF]">
                {cat.count}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
