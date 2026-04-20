import { FitmentConfirmedIcon } from "@/components/icons/site-icons"
import { Button } from "@/components/ui/button"
export const VehicleChangeSection = () => {
  return (
    <div className="border-b  border-[#2A2A2A] bg-gradient-to-r from-[#10B981]/10 to-emerald-500/10 backdrop-blur-xl">
      <div className="mx-auto max-w-[1440px] px-4 py-4 sm:px-4 sm:py-4 lg:px-4">
        <div className="flex flex-col gap-4 rounded-sm border-2 border-[#10B981]/30 bg-[#1A1A1A]/80 p-4 shadow-lg shadow-[#10B981]/20 backdrop-blur-sm sm:p-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-[#10B981]/30 bg-[#0A0A0A] shadow-lg shadow-[#10B981]/20">
              <FitmentConfirmedIcon className="h-8 w-8 text-[#10B981]" />
            </div>

            <div>
              <h3 className="mb-1 text-lg font-semibold text-[#10B981]">
                Confirmed Fitment
              </h3>
              <p className="mb-2 text-sm text-[#9CA3AF]">
                This part is guaranteed to fit your vehicle
              </p>
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="font-medium text-white">2018 Honda Accord</span>
                <span className="text-[#4B5563]">•</span>
                <span className="text-[#9CA3AF]">VIN: 1HGBH41JXMN109186</span>
              </div>
            </div>
          </div>

          <Button  className="px-6 py-5 rounded-sm">
            Change Vehicle
          </Button>
        </div>
      </div>
    </div>
  )
}

export default VehicleChangeSection
