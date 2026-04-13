export const Process = () => {
  const steps = [
    {
      number: "1",
      title: "Enter Your VIN",
      description:
        "Start with your vehicle's VIN for guaranteed fitment or browse by category",
    },
    {
      number: "2",
      title: "Compare Offers",
      description:
        "View real-time prices from multiple verified suppliers side by side",
    },
    {
      number: "3",
      title: "Order or RFQ",
      description:
        "Buy instantly or request custom quotes for bulk orders and special parts",
    },
  ];

  return (
    <section className="bg-[#1A1A1A] py-24">
      <div className="mx-auto max-w-[1200px] px-8">
        <div className="mb-16 text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-[#DC2626]">
            SIMPLE PROCESS
          </span>
          <h2 className="mt-2 mb-4 text-4xl font-bold text-white">
            How It Works
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#DC2626] text-2xl font-bold text-white">
                {step.number}
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">
                {step.title}
              </h3>
              <p className="text-[#9CA3AF]">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};