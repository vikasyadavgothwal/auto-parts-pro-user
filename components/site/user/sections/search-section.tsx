"use client"

import { type FormEvent, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
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
import { GlobalMessageDialog } from "@/components/site/shared/global-message-dialog"
import type { VinSearchVehicle } from "@/types/api/vin-search"

const buildConfirmedFitmentUrl = (vehicle: VinSearchVehicle) => {
  const params = new URLSearchParams({
    fitment: "confirmed",
    vin: vehicle.fullVin,
    year: vehicle.modelYearFromVin,
    model: vehicle.epc,
    make: vehicle.epc,
  })

  return `/search?${params.toString()}`
}

const buildPartNumberSearchUrl = (partNumber: string) => {
  const params = new URLSearchParams({
    partNumber: partNumber.trim(),
  })

  return `/search?${params.toString()}`
}

export function SearchSection({ config }: { config?: TextPair }) {
  const router = useRouter()
  const heading = getPublicText(config?.heading)
  const subheading = getPublicText(config?.subheading)
  const vinLabel = heading || "Vehicle Identification Number (VIN)"
  const partNumberLabel = subheading || "Vehicle Part Number"
  const [vin, setVin] = useState("")
  const [partNumber, setPartNumber] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false)
  const [confirmedVehicle, setConfirmedVehicle] =
    useState<VinSearchVehicle | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const vinSearch = useMutation({
    mutationFn: lookupVin,
    onSuccess: (result) => {
      if (!result.ok) {
        setConfirmedVehicle(null)
        setDialogOpen(false)
        setIsErrorDialogOpen(true)
        setErrorMessage(result.error)
        return
      }

      setErrorMessage("")
      setConfirmedVehicle(result.vehicle)
      setDialogOpen(true)
    },
    onError: () => {
      setConfirmedVehicle(null)
      setErrorMessage("Unable to verify VIN right now. Please try again.")
      setDialogOpen(false)
      setIsErrorDialogOpen(true)
    },
  })
  const formattedMake = useMemo(
    () => confirmedVehicle?.epc ?? "",
    [confirmedVehicle?.epc],
  )

  const onVinSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMessage("")
    setIsErrorDialogOpen(false)
    vinSearch.mutate(vin)
  }

  const onPartNumberSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const normalizedPartNumber = partNumber.trim()

    if (!normalizedPartNumber) {
      setErrorMessage("Enter a part number before searching.")
      setIsErrorDialogOpen(true)
      return
    }

    router.push(buildPartNumberSearchUrl(normalizedPartNumber))
  }

  const onConfirmVehicle = () => {
    if (!confirmedVehicle) {
      return
    }

    router.push(buildConfirmedFitmentUrl(confirmedVehicle))
  }

  return (
    <section className="bg-brand-surface py-10">
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
                {vinLabel}
              </Label>
              <Input
                id="home-vin-search"
                type="text"
                value={vin}
                onChange={(event) => setVin(event.target.value.toUpperCase())}
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
                {partNumberLabel}
              </Label>
              <Input
                type="text"
                value={partNumber}
                onChange={(event) => setPartNumber(event.target.value)}
                placeholder="Enter Vehicle Part Number (e.g., BP-1234)"
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
      <GlobalMessageDialog
        open={isErrorDialogOpen}
        title="VIN Error"
        message={errorMessage}
        onClose={() => {
          setIsErrorDialogOpen(false)
          setErrorMessage("")
        }}
      />

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
