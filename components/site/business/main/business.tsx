export const BusinessFeatures = () => {
  const features = [
    {
      title: "Volume Pricing",
      description: "Scale discounts that grow with your business",
      icon: (
        <>
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
          <polyline points="16 7 22 7 22 13" />
        </>
      ),
    },
    {
      title: "Dedicated Account Manager",
      description: "Personal support for your team",
      icon: (
        <>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </>
      ),
    },
    {
      title: "Priority Processing",
      description: "Fast-track order fulfillment",
      icon: (
        <>
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </>
      ),
    },
    {
      title: "Extended Warranty",
      description: "Business-grade protection plans",
      icon: (
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      ),
    },
    {
      title: "API Integration",
      description: "Connect directly to your systems",
      icon: (
        <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
      ),
    },
    {
      title: "Analytics Dashboard",
      description: "Track spending and optimize costs",
      icon: (
        <>
          <path d="M3 3v16a2 2 0 0 0 2 2h16" />
          <path d="M18 17V9" />
          <path d="M13 17V5" />
          <path d="M8 17v-3" />
        </>
      ),
    },
    {
      title: "24/7 Business Support",
      description: "Always available when you need us",
      icon: (
        <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
      ),
    },
    {
      title: "Custom Invoicing",
      description: "Flexible billing and NET terms",
      icon: (
        <>
          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
          <path d="M14 2v4a2 2 0 0 0 2 2h4" />
          <path d="M10 9H8" />
          <path d="M16 13H8" />
          <path d="M16 17H8" />
        </>
      ),
    },
    {
      title: "Fleet Cards Accepted",
      description: "WEX, Voyager, and more",
      icon: (
        <>
          <rect width="20" height="14" x="2" y="5" rx="2" />
          <line x1="2" x2="22" y1="10" y2="10" />
        </>
      ),
    },
  ];

  return (
    <section className="bg-[#1A1A1A] py-24">
      <div className="mx-auto max-w-[1200px] px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-white">
            Everything Your Business Needs
          </h2>
          <p className="text-lg text-[#9CA3AF]">
            Professional tools and support to power your operations
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-xl border border-[#2A2A2A] bg-[#0A0A0A] p-8 transition-all hover:border-[#DC2626]"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl border border-[#DC2626]/20 bg-[#DC2626]/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-7 w-7 text-[#DC2626]"
                >
                  {feature.icon}
                </svg>
              </div>

              <h3 className="mb-2 text-xl font-semibold text-white">
                {feature.title}
              </h3>

              <p className="text-[#9CA3AF]">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};