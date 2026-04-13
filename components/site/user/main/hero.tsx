import Image from "next/image";

export const Hero = () => {
  const features = [
    {
      title: "Verified OEM Parts",
      icon: (
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
          className="w-5 h-5 text-white"
        >
          <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      ),
    },
    {
      title: "Same-Day Shipping",
      icon: (
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
          className="w-5 h-5 text-white"
        >
          <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
        </svg>
      ),
    },
    {
      title: "24/7 Support",
      icon: (
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
          className="w-5 h-5 text-white"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1759189189642-192febc42404?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBjYXIlMjBhdXRvbW90aXZlJTIwd29ya3Nob3B8ZW58MXx8fHwxNzc0OTU1ODgzfDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Banner background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/24" />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-8 py-24">
        <div className="mb-16 max-w-3xl text-left">
          <div className="mb-6">
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white">
              PREMIUM AUTO PARTS MARKETPLACE
            </span>
          </div>

          <h1 className="mb-6 text-[48px] font-bold leading-tight text-white">
            Find the Right Part,
            <br />
            <span className="text-white">Instantly</span>
          </h1>

          <p className="text-[20px] leading-relaxed text-[#9CA3AF]">
            Access thousands of verified OEM and aftermarket parts from trusted
            suppliers.
            <br />
            Search by VIN for guaranteed fitment.
          </p>
        </div>

        <div className="mt-12 flex justify-start gap-12">
          {features.map((feature) => (
            <div key={feature.title} className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10">
                {feature.icon}
              </div>
              <span className="text-sm text-[#9CA3AF]">{feature.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
