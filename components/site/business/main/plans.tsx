export const PricingSection = () => {
  const plans = [
    {
      name: "Starter",
      description: "Perfect for independent mechanics",
      price: "Free",
      suffix: "",
      buttonText: "Get Started",
      buttonClassName:
        "w-full h-12 rounded-lg font-medium transition-all bg-[#0A0A0A] text-[#DC2626] hover:bg-[#2A2A2A] border border-[#2A2A2A]",
      cardClassName:
        "relative rounded-xl border-2 bg-[#1A1A1A] p-8 border-[#2A2A2A]",
      features: [
        "5% discount on all orders",
        "Standard shipping rates",
        "Email support",
        "Basic order history",
        "Monthly statements",
      ],
    },
    {
      name: "Professional",
      description: "For established repair shops",
      price: "$49",
      suffix: "/month",
      buttonText: "Start Free Trial",
      badge: "Most Popular",
      buttonClassName:
        "w-full h-12 rounded-lg font-medium transition-all bg-[#DC2626] text-white hover:bg-[#B91C1C]",
      cardClassName:
        "relative rounded-xl border-2 bg-[#1A1A1A] p-8 border-[#DC2626] shadow-2xl shadow-[#DC2626]/20",
      features: [
        "12% discount on all orders",
        "Free 2-day shipping",
        "Priority phone support",
        "Advanced analytics",
        "NET 30 payment terms",
        "Dedicated account manager",
        "Custom price lists",
      ],
    },
    {
      name: "Enterprise",
      description: "For multi-location operations",
      price: "Custom",
      suffix: "",
      buttonText: "Contact Sales",
      buttonClassName:
        "w-full h-12 rounded-lg font-medium transition-all bg-[#0A0A0A] text-[#DC2626] hover:bg-[#2A2A2A] border border-[#2A2A2A]",
      cardClassName:
        "relative rounded-xl border-2 bg-[#1A1A1A] p-8 border-[#2A2A2A]",
      features: [
        "Custom volume pricing",
        "White-glove service",
        "24/7 priority support",
        "API access",
        "Custom NET terms",
        "Multi-location management",
        "Custom integrations",
        "Training & onboarding",
      ],
    },
  ];

  return (
    <section id="pricing" className="bg-[#0A0A0A] py-24">
      <div className="mx-auto max-w-[1200px] px-8">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#2A2A2A] bg-[#1A1A1A] px-4 py-2 text-sm font-medium">
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
              className="h-4 w-4 text-[#DC2626]"
            >
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
            <span className="text-[#9CA3AF]">For Repair Shops</span>
          </div>

          <h2 className="mb-4 text-4xl font-bold text-white">
            Plans That Scale With You
          </h2>
          <p className="text-lg text-[#9CA3AF]">
            Choose the plan that fits your shop size and needs
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <div key={plan.name} className={plan.cardClassName}>
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#DC2626] px-4 py-1 text-sm font-semibold text-white">
                  {plan.badge}
                </div>
              )}

              <h3 className="mb-2 text-2xl font-bold text-white">
                {plan.name}
              </h3>
              <p className="mb-6 text-[#9CA3AF]">{plan.description}</p>

              <div className="mb-6">
                <span className="text-5xl font-bold text-white">
                  {plan.price}
                </span>
                {plan.suffix && (
                  <span className="text-[#9CA3AF]">{plan.suffix}</span>
                )}
              </div>

              <ul className="mb-8 space-y-4">
                {plan.features.map((feature, index) => (
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
                      className="mt-0.5 h-5 w-5 shrink-0 text-[#DC2626]"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span className="text-[#9CA3AF]">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={plan.buttonClassName}>{plan.buttonText}</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};