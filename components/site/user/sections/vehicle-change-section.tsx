import { FitmentConfirmedIcon } from "@/components/icons/site-icons"
import { Button } from "@/components/ui/button"

type VehicleInfo = {
  year?: string
  make?: string
  model?: string
  vin?: string
}

type VehicleChangeSectionProps = {
  title?: string
  description?: string
  buttonLabel?: string
  vehicle?: VehicleInfo
}

export const VehicleChangeSection = ({
  title,
  description,
  vehicle,
}: VehicleChangeSectionProps) => {
  const year = vehicle?.year ?? ""
  const make = vehicle?.make ?? ""
  const model = vehicle?.model ?? ""
  const vin = vehicle?.vin ?? ""
  const showVehicleLine = year || make || model || vin
  const showDescription = Boolean(description?.trim())
  const yearModel = `${year} ${make} ${model}`.trim()

  return (
    <div className=" backdrop-blur-xl">
      <div className="mx-auto max-w-[1440px] px-4 py-4 sm:px-4 sm:py-4 lg:px-4">
        <div className="flex flex-col gap-4 rounded-md  bg-[#1A1A1A]/80 p-4  backdrop-blur-sm sm:p-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-[#10B981]/30 bg-[#10B981]/10">
              <FitmentConfirmedIcon className="h-8 w-8 text-[#10B981]" />
            </div>

            <div>
              {title ? (
                <h3 className="mb-1 text-lg font-semibold text-[#10B981]">
                  {title}
                </h3>
              ) : null}
              {showDescription ? (
                <p className="mb-2 text-sm text-[#9CA3AF]">{description}</p>
              ) : null}
              {showVehicleLine ? (
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  {yearModel ? (
                    <span className="font-medium text-white">{yearModel}</span>
                  ) : null}
                  {vin && yearModel ? (
                    <span className="text-[#4B5563]">•</span>
                  ) : null}
                  {vin ? (
                    <span className="text-[#9CA3AF]">{`VIN: ${vin}`}</span>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>

            <Button className="px-6 py-5 rounded-xl">Change Vehicle</Button>
        </div>
      </div>
    </div>
  )
}

export default VehicleChangeSection
