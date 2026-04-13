export const Benefit = () => {
  const items = [
    {
      title: "Guaranteed Fitment",
      desc: "VIN-verified compatibility on every part",
      icon: (
        <>
          <path d="M21.801 10A10 10 0 1 1 17 3.335" />
          <path d="m9 11 3 3L22 4" />
        </>
      ),
    },
    {
      title: "Best Price Promise",
      desc: "Compare offers from verified suppliers",
      icon: (
        <>
          <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
          <circle cx="12" cy="8" r="6" />
        </>
      ),
    },
    {
      title: "Real-Time Inventory",
      desc: "Live stock updates across 500+ suppliers",
      icon: (
        <>
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
          <polyline points="16 7 22 7 22 13" />
        </>
      ),
    },
  ];

  return (
    <section className="bg-[#1A1A1A] py-16">
      <div className="mx-auto max-w-[1200px] px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {items.map((item) => (
            <div key={item.title} className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-[#DC2626]/20 bg-[#DC2626]/10">
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
                  {item.icon}
                </svg>
              </div>

              <h3 className="mb-2 text-xl font-semibold text-white">
                {item.title}
              </h3>

              <p className="text-[#9CA3AF]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
