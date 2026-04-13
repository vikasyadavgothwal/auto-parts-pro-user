export const ServicesSearchHero = () => {
  return (
    <section className="bg-gradient-to-b from-[#1A1A1A] to-[#0A0A0A] py-16">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
            Find Trusted Auto Services
          </h1>
          <p className="text-lg text-[#9CA3AF] sm:text-xl">
            Book certified mechanics and garages near you
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col gap-2 rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] p-2 md:flex-row">
            <div className="flex flex-1 items-center gap-3 px-4">
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
                className="h-5 w-5 text-[#9CA3AF]"
              >
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>

              <input
                type="text"
                placeholder="What service do you need?"
                className="flex-1 border-none bg-transparent text-white placeholder:text-[#4B5563] focus:outline-none"
              />
            </div>

            <div className="flex flex-1 items-center gap-3 border-[#2A2A2A] px-4 pt-2 md:border-t-0 md:border-l md:pt-0 border-t">
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
                className="h-5 w-5 text-[#9CA3AF]"
              >
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                <circle cx="12" cy="10" r="3" />
              </svg>

              <input
                type="text"
                placeholder="Enter ZIP code or city"
                className="flex-1 border-none bg-transparent text-white placeholder:text-[#4B5563] focus:outline-none"
              />
            </div>

            <button className="rounded-lg bg-[#DC2626] px-8 py-3 font-medium text-white transition-all hover:bg-[#B91C1C]">
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};