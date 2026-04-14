function CheckCircleIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export const VehicleChangeSection = () => {
  return (
    <>
      <div className="border-b border-[#2A2A2A] bg-gradient-to-r from-[#10B981]/10 to-emerald-500/10 backdrop-blur-xl">
        <div className="mx-auto max-w-[1440px] px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
          <div className="flex flex-col gap-4 rounded-xl border-2 border-[#10B981]/30 bg-[#1A1A1A]/80 p-4 shadow-lg shadow-[#10B981]/20 backdrop-blur-sm sm:p-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-[#10B981]/30 bg-[#0A0A0A] shadow-lg shadow-[#10B981]/20">
                <CheckCircleIcon className="h-8 w-8 text-[#10B981]" />
              </div>

              <div>
                <h3 className="mb-1 text-lg font-semibold text-[#10B981]">
                  Confirmed Fitment
                </h3>
                <p className="mb-2 text-sm text-[#9CA3AF]">
                  This part is guaranteed to fit your vehicle
                </p>
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="font-medium text-white">
                    2018 Honda Accord
                  </span>
                  <span className="text-[#4B5563]">•</span>
                  <span className="text-[#9CA3AF]">VIN: 1HGBH41JXMN109186</span>
                </div>
              </div>
            </div>

            <button className="rounded-lg bg-[#DC2626] px-6 py-2.5 font-medium text-white transition-colors hover:bg-[#B91C1C]">
              Change Vehicle
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default VehicleChangeSection;
