"use client"

import { type FormEvent, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { SearchIcon } from "@/components/icons/site-icons"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getPublicText, type TextPair } from "@/lib/public-content"
import { lookupVin } from "@/lib/vin-search"
import type { VinSearchVehicle } from "@/types/api/vin-search"
import { RequiredMark } from "@/components/site/shared/required-mark"

const VIN_MAX_LENGTH = 17
const PART_SEARCH_MAX_LENGTH = 120
const CURRENT_YEAR = new Date().getFullYear()
const VIN_PATTERN = /^[A-HJ-NPR-Z0-9]{17}$/
const VEHICLE_TEXT_PATTERN = /^[a-zA-Z0-9][a-zA-Z0-9 .,'/-]*$/

const buildConfirmedFitmentUrl = (vehicle: VinSearchVehicle) => {
  const params = new URLSearchParams({
    fitment: "confirmed",
    vin: vehicle.fullVin,
    year: vehicle.modelYearFromVin,
    model: vehicle.epc,
    make: vehicle.epc,
  })

  if (vehicle.modelId) {
    params.set("modelId", vehicle.modelId)
  }

  return `/search?${params.toString()}`
}

const buildPartSearchUrl = (query: string, queryType: "part_number" | "vin") => {
  const params = new URLSearchParams({
    [queryType === "vin" ? "vin" : "partNumber"]: query.trim(),
    queryType,
  })

  return `/search?${params.toString()}`
}

const buildPartNameSearchUrl = (
  query: string,
  vehicle: { vehicleName: string; year: string; make: string; model: string },
) => {
  const params = new URLSearchParams({
    q: query.trim(),
    queryType: "part_name",
    vehicleName: vehicle.vehicleName.trim(),
    year: vehicle.year.trim(),
    make: vehicle.make.trim(),
    model: vehicle.model.trim(),
  })

  return `/search?${params.toString()}`
}

const looksLikePartNumber = (query: string) =>
  /[0-9]/.test(query) || /[-_/]/.test(query)

const validateVehicleText = (value: string, label: string) => {
  if (value.length < 2) {
    return `${label} must be at least 2 characters.`
  }
  if (!VEHICLE_TEXT_PATTERN.test(value)) {
    return `${label} can only include letters, numbers, spaces, and common vehicle punctuation.`
  }

  return ""
}

export function SearchSection({ config }: { config?: TextPair }) {
  const router = useRouter()
  const heading = getPublicText(config?.heading)
  const vinLabel = heading || "Vehicle Identification Number (VIN)"
  const partNumberLabel = "Part Number, OEM Number, or Part Name"
  const [vin, setVin] = useState("")
  const [partNumber, setPartNumber] = useState("")
  const [partNameDialogOpen, setPartNameDialogOpen] = useState(false)
  const [partNameVehicle, setPartNameVehicle] = useState({
    vehicleName: "",
    year: "",
    make: "",
    model: "",
  })
  const [confirmedVehicle, setConfirmedVehicle] =
    useState<VinSearchVehicle | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const vinSearch = useMutation({
    mutationFn: lookupVin,
    onSuccess: (result) => {
      if (!result.ok) {
        setConfirmedVehicle(null)
        setDialogOpen(false)
        toast.error(result.error)
        return
      }

      setConfirmedVehicle(result.vehicle)
      setDialogOpen(true)
    },
    onError: () => {
      setConfirmedVehicle(null)
      toast.error("Unable to verify VIN right now. Please try again.")
      setDialogOpen(false)
    },
  })
  const formattedMake = useMemo(
    () => confirmedVehicle?.epc ?? "",
    [confirmedVehicle?.epc],
  )

  const onVinSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const normalizedVin = vin.trim().toUpperCase()
    if (normalizedVin.length !== VIN_MAX_LENGTH) {
      toast.error("VIN must contain exactly 17 valid characters.")
      return
    }
    vinSearch.mutate(normalizedVin)
  }

  const onPartNumberSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const normalizedPartNumber = partNumber.trim()

    if (!normalizedPartNumber) {
      toast.error("Enter a part number, OEM number, or part name before searching.")
      return
    }
    if (normalizedPartNumber.length > PART_SEARCH_MAX_LENGTH) {
      toast.error(`Part number, OEM number, or part name must be ${PART_SEARCH_MAX_LENGTH} characters or fewer.`)
      return
    }

    const normalizedToken = normalizedPartNumber
      .toUpperCase()
      .replace(/[^A-HJ-NPR-Z0-9]/g, "")

    if (VIN_PATTERN.test(normalizedToken)) {
      router.push(buildPartSearchUrl(normalizedToken, "vin"))
      return
    }

    if (looksLikePartNumber(normalizedPartNumber)) {
      router.push(buildPartSearchUrl(normalizedPartNumber, "part_number"))
      return
    }

    setPartNameDialogOpen(true)
  }

  const onPartNameVehicleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const vehicleName = partNameVehicle.vehicleName.trim()
    const year = partNameVehicle.year.trim()
    const make = partNameVehicle.make.trim()
    const model = partNameVehicle.model.trim()
    const parsedYear = Number.parseInt(year, 10)

    if (!vehicleName || !year || !make || !model) {
      toast.error("Enter car name, model year, make, and model before searching.")
      return
    }
    const vehicleNameError = validateVehicleText(vehicleName, "Car name")
    if (vehicleNameError) {
      toast.error(vehicleNameError)
      return
    }
    if (!Number.isInteger(parsedYear) || parsedYear < 1900 || parsedYear > CURRENT_YEAR + 1) {
      toast.error(`Model year must be between 1900 and ${CURRENT_YEAR + 1}.`)
      return
    }
    const makeError = validateVehicleText(make, "Make")
    if (makeError) {
      toast.error(makeError)
      return
    }
    const modelError = validateVehicleText(model, "Model")
    if (modelError) {
      toast.error(modelError)
      return
    }

    router.push(
      buildPartNameSearchUrl(partNumber, {
        vehicleName,
        year,
        make,
        model,
      }),
    )
  }

  const onConfirmVehicle = () => {
    if (!confirmedVehicle) {
      return
    }

    router.push(buildConfirmedFitmentUrl(confirmedVehicle))
  }

  return (
    <section id="vehicle-search" className="scroll-mt-24 bg-brand-surface py-10">
      <div className="site-container">
        <div className="flex flex-col gap-5">
          <form
            onSubmit={onVinSubmit}
            className="flex flex-col gap-4 md:flex-row"
          >
            <div className="flex-1">
              <Label
                htmlFor="home-vin-search"
                className="mb-2 block text-sm font-medium text-brand-muted"
              >
                <span>{vinLabel}<RequiredMark /></span>
              </Label>
              <Input
                id="home-vin-search"
                type="text"
                value={vin}
                onChange={(event) =>
                  setVin(
                    event.target.value
                      .toUpperCase()
                      .replace(/[^A-HJ-NPR-Z0-9]/g, "")
                      .slice(0, VIN_MAX_LENGTH),
                  )
                }
                maxLength={VIN_MAX_LENGTH}
                required
                placeholder="Enter Vehicle Identification Number (VIN) (e.g., 1HGBH41JXMN109186)"
                className="h-14 bg-brand-panel px-5 text-base rounded-sm"
                autoComplete="off"
              />
            </div>

            <div className="flex items-end">
              <Button
                type="submit"
                disabled={vinSearch.isPending}
                className="h-14 w-full rounded-full px-8 text-base font-medium hover:bg-brand-primary-hover md:w-auto"
              >
                <SearchIcon className="size-5 text-white" />
                <span>{vinSearch.isPending ? "Checking..." : "Search"}</span>
              </Button>
            </div>
          </form>

          <form
            onSubmit={onPartNumberSubmit}
            className="flex flex-col gap-4 md:flex-row"
          >
            <div className="flex-1">
              <Label className="mb-2 block text-sm font-medium text-brand-muted">
                <span>{partNumberLabel}<RequiredMark /></span>
              </Label>
              <Input
                type="text"
                value={partNumber}
                onChange={(event) =>
                  setPartNumber(event.target.value.slice(0, PART_SEARCH_MAX_LENGTH))
                }
                maxLength={PART_SEARCH_MAX_LENGTH}
                required
                placeholder="Enter part number, OEM number, or part name"
                className="h-14 bg-brand-panel px-5 text-base rounded-sm"
                autoComplete="off"
              />
            </div>

            <div className="flex items-end">
              <Button
                type="submit"
                className="h-14 w-full rounded-full px-8 text-base font-medium hover:bg-brand-primary-hover md:w-auto"
              >
                <SearchIcon className="size-5 text-white" />
                <span>Search</span>
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="border border-border bg-brand-surface text-white sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl text-white">
              We found this model
            </DialogTitle>
            <DialogDescription className="text-brand-muted">
              Confirm this VIN, year, and make before browsing compatible parts.
            </DialogDescription>
          </DialogHeader>

          {confirmedVehicle ? (
            <div className="grid gap-3 rounded-lg border border-border bg-brand-panel p-4 text-sm">
              <InfoRow label="VIN" value={confirmedVehicle.fullVin} />
              <InfoRow
                label="Model year"
                value={confirmedVehicle.modelYearFromVin}
              />
              <InfoRow label="Make name" value={formattedMake} />
              {confirmedVehicle.modelId ? (
                <InfoRow label="Model id" value={confirmedVehicle.modelId} />
              ) : null}
            </div>
          ) : null}

          <DialogFooter className="bg-transparent">
            <Button
              type="button"
              variant="outline"
              onClick={() => setDialogOpen(false)}
              className="border-border bg-brand-surface text-white hover:bg-border"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={onConfirmVehicle}
              className="hover:bg-brand-primary-hover"
            >
              Confirm and Browse Parts
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={partNameDialogOpen} onOpenChange={setPartNameDialogOpen}>
        <DialogContent className="border border-border bg-brand-surface text-white sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl text-white">
              Vehicle details required
            </DialogTitle>
            <DialogDescription className="text-brand-muted">
              Part name searches need vehicle details so we can match compatible parts.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={onPartNameVehicleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="part-name-car-name">
                Car name<RequiredMark />
              </Label>
              <Input
                id="part-name-car-name"
                value={partNameVehicle.vehicleName}
                placeholder="e.g., Toyota Corolla 1.8"
                onChange={(event) =>
                  setPartNameVehicle((current) => ({
                    ...current,
                    vehicleName: event.target.value.slice(0, 80),
                  }))
                }
                className="bg-brand-panel"
                maxLength={80}
                autoComplete="off"
                required
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="grid gap-2">
                <Label htmlFor="part-name-year">
                  Model year<RequiredMark />
                </Label>
                <Input
                  id="part-name-year"
                  inputMode="numeric"
                  value={partNameVehicle.year}
                  placeholder={`e.g., ${CURRENT_YEAR}`}
                  onChange={(event) =>
                    setPartNameVehicle((current) => ({
                      ...current,
                      year: event.target.value.replace(/\D/g, "").slice(0, 4),
                    }))
                  }
                  className="bg-brand-panel"
                  maxLength={4}
                  autoComplete="off"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="part-name-make">
                  Make<RequiredMark />
                </Label>
                <Input
                  id="part-name-make"
                  value={partNameVehicle.make}
                  placeholder="e.g., Toyota"
                  onChange={(event) =>
                    setPartNameVehicle((current) => ({
                      ...current,
                      make: event.target.value.slice(0, 80),
                    }))
                  }
                  className="bg-brand-panel"
                  maxLength={80}
                  autoComplete="off"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="part-name-model">
                  Model<RequiredMark />
                </Label>
                <Input
                  id="part-name-model"
                  value={partNameVehicle.model}
                  placeholder="e.g., Corolla"
                  onChange={(event) =>
                    setPartNameVehicle((current) => ({
                      ...current,
                      model: event.target.value.slice(0, 80),
                    }))
                  }
                  className="bg-brand-panel"
                  maxLength={80}
                  autoComplete="off"
                  required
                />
              </div>
            </div>
            <DialogFooter className="bg-transparent">
              <Button
                type="button"
                variant="outline"
                onClick={() => setPartNameDialogOpen(false)}
                className="border-border bg-brand-surface text-white hover:bg-border"
              >
                Cancel
              </Button>
              <Button type="submit" className="hover:bg-brand-primary-hover">
                Search Parts
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 sm:grid-cols-[140px_1fr] sm:gap-4">
      <span className="text-brand-muted">{label}</span>
      <span className="font-medium text-white">{value}</span>
    </div>
  )
}
