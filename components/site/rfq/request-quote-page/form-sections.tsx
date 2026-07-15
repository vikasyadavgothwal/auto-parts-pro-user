"use client";

import { useRef, useState, type HTMLInputTypeAttribute } from "react";
import { CloseIcon, PlusIcon, UploadIcon } from "@/components/icons/site-icons";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CountryPhoneInput } from "@/components/site/shared/country-phone-input";
import { companyFields, vehicleFields } from "@/lib/data/request";
const MAX_VEHICLE_YEAR = new Date().getFullYear() + 1;
export type RfqVehicleOption = {
  id: string;
  label: string;
  vin: string;
  year: string;
  make: string;
  model: string;
  trim?: string;
  mileage?: string;
};

type TextFieldProps = {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  type?: HTMLInputTypeAttribute;
  min?: number;
  max?: number;
  maxLength?: number;
};
type PartRequest = {
  id: number;
};
function TextField({
  name,
  label,
  placeholder,
  required,
  type = "text",
  min,
  max,
  maxLength,
}: TextFieldProps) {
  return (
    <div>
      <Label className="mb-2 block text-sm font-medium text-white">
        {label}
      </Label>

      <Input
        name={name}
        required={required}
        type={type}
        min={min}
        max={max}
        maxLength={maxLength}
        placeholder={placeholder}
        className="h-12 rounded-xl bg-brand-surface px-4 text-base"
      />
    </div>
  );
}

function PartRequestCard({
  part,
  partNumber,
  canRemove,
  onRemove,
}: {
  part: PartRequest;
  partNumber: number;
  canRemove: boolean;
  onRemove: (partId: number) => void;
}) {
  return (
    <Card className="rounded-xl bg-brand-surface p-4 sm:p-6">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <h4 className="font-medium text-white">Part #{partNumber}</h4>

        {canRemove ? (
          <Button
            type="button"
            variant="ghost"
            onClick={() => onRemove(part.id)}
            className="h-10 w-full rounded-xl px-3 text-[#DC2626] hover:bg-[#DC2626]/10 hover:text-[#DC2626] sm:w-auto"
          >
            <CloseIcon className="h-4 w-4" />
            Remove
          </Button>
        ) : null}
      </div>

      <div className="flex flex-col gap-6">
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
          <div className="flex flex-col">
            <Label className="mb-2">Part Name / Description</Label>
            <Input
              name={`parts.${part.id}.name`}
              required
              placeholder="Front brake pads"
              aria-label={`Part ${partNumber} name`}
              className="h-12 rounded-xl bg-brand-panel px-4 text-base"
            />
          </div>

          <div className="flex flex-col">
            <Label className="mb-2">Target Price (AED)</Label>
            <Input
              name={`parts.${part.id}.targetPrice`}
              type="number"
              min={0}
              max={100000000}
              step="0.01"
              placeholder="0.00"
              className="h-12 rounded-xl bg-brand-panel px-4 text-base"
            />
          </div>

          <div className="flex flex-col">
            <Label className="mb-2">Part Number (if known)</Label>
            <Input
              name={`parts.${part.id}.partNumber`}
              placeholder="BC1259"
              aria-label={`Part ${partNumber} part number`}
              className="h-12 rounded-xl bg-brand-panel px-4 text-base"
            />
          </div>

          <div className="flex flex-col">
            <Label className="mb-2">Quantity</Label>
            <Input
              name={`parts.${part.id}.quantity`}
              type="number"
              min={1}
              max={10000}
              step={1}
              required
              defaultValue={1}
              aria-label={`Part ${partNumber} quantity`}
              className="h-12 rounded-xl bg-brand-panel px-4 text-base"
            />
          </div>
        </div>

        <div>
          <Label className="mb-2">Additional Notes</Label>
          <Textarea
            name={`parts.${part.id}.notes`}
            rows={2}
            placeholder="Any specific requirements or preferences..."
            aria-label={`Part ${partNumber} requirements`}
            className="resize-none rounded-xl bg-brand-panel px-4 py-3 text-base"
          />
        </div>
      </div>
    </Card>
  );
}

export function CompanyInformationSection() {
  const [phoneCountryCode, setPhoneCountryCode] = useState("+971");
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <Card className="rounded-2xl p-5 sm:p-6 lg:p-8">
      <h2 className="mb-5 text-xl font-thin text-white sm:mb-6 sm:text-2xl">
        Company Information
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {companyFields.slice(0, 3).map(([label, placeholder], index) => (
          <TextField
            key={label}
            name={["companyName", "contactName", "email", "phone"][index]}
            label={label}
            placeholder={placeholder}
            required
            type={index === 2 ? "email" : "text"}
          />
        ))}
        <CountryPhoneInput
          id="rfq-phone"
          name="phone"
          label={companyFields[3]?.[0] ?? "Phone *"}
          countryCode={phoneCountryCode}
          phoneNumber={phoneNumber}
          onCountryCodeChange={setPhoneCountryCode}
          onPhoneNumberChange={setPhoneNumber}
          labelClassName="text-sm font-medium text-white"
          selectClassName="bg-brand-surface text-white"
          inputClassName="bg-brand-surface px-4 text-base text-white"
        />
      </div>
    </Card>
  );
}

export function VehicleInformationSection({
  accountRole,
  vehicles,
  selectedVehicleId,
  isLoadingVehicles,
  dashboardVehiclesUrl,
  onVehicleChange,
}: {
  accountRole?: string | null;
  vehicles: RfqVehicleOption[];
  selectedVehicleId: string;
  isLoadingVehicles: boolean;
  dashboardVehiclesUrl: string;
  onVehicleChange: (vehicleId: string) => void;
}) {
  const selectedVehicle = vehicles.find((vehicle) => vehicle.id === selectedVehicleId);
  const usesSavedVehicles = accountRole === "User" || accountRole === "Fleet";

  return (
    <Card className="rounded-2xl p-5 sm:p-6 lg:p-8">
      <h2 className="mb-5 text-xl font-thin text-white sm:mb-6 sm:text-2xl">
        Vehicle Information
      </h2>

      {usesSavedVehicles ? (
        <div className="space-y-4">
          <div>
            <Label htmlFor="rfq-saved-vehicle" className="mb-2 block text-sm font-medium text-white">
              {accountRole === "Fleet" ? "Fleet Vehicle *" : "Saved Vehicle *"}
            </Label>
            {isLoadingVehicles ? (
              <p className="rounded-xl border border-border bg-brand-surface px-4 py-3 text-sm text-brand-muted">
                Loading saved vehicles...
              </p>
            ) : vehicles.length ? (
              <select
                id="rfq-saved-vehicle"
                value={selectedVehicleId}
                onChange={(event) => onVehicleChange(event.target.value)}
                required
                className="h-12 w-full rounded-xl border border-border bg-brand-surface px-4 text-base text-white outline-none transition-colors focus-visible:border-primary"
              >
                <option value="">Select a vehicle</option>
                {vehicles.map((vehicle) => (
                  <option key={vehicle.id} value={vehicle.id}>
                    {vehicle.label}
                    {vehicle.vin ? ` - ${vehicle.vin}` : ""}
                  </option>
                ))}
              </select>
            ) : (
              <div className="space-y-3 rounded-xl border border-border bg-brand-surface p-4 text-sm text-brand-muted">
                <p>
                  {accountRole === "Fleet"
                    ? "No fleet vehicles are saved yet. Add a fleet vehicle before submitting an RFQ."
                    : "No saved vehicles are available yet. Add a vehicle before submitting an RFQ."}
                </p>
                <a
                  href={dashboardVehiclesUrl}
                  className="inline-flex h-10 items-center rounded-xl bg-primary px-4 font-medium text-white hover:bg-brand-primary-hover"
                >
                  Add vehicle
                </a>
              </div>
            )}
          </div>

          {selectedVehicle ? (
            <div className="grid gap-3 rounded-xl border border-border bg-brand-surface p-4 text-sm text-brand-muted sm:grid-cols-2 lg:grid-cols-4">
              <p><span className="text-white">Year:</span> {selectedVehicle.year || "-"}</p>
              <p><span className="text-white">Make:</span> {selectedVehicle.make || "-"}</p>
              <p><span className="text-white">Model:</span> {selectedVehicle.model || "-"}</p>
              <p><span className="text-white">VIN:</span> {selectedVehicle.vin || "-"}</p>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-5">
          <TextField name="vehicleVin" label="VIN (Optional)" placeholder="1HGBH41JXMN109186" maxLength={17} />
          {vehicleFields.map((field, index) => (
            <TextField
              key={field.label}
              name={["vehicleYear", "vehicleMake", "vehicleModel", "vehicleTrim"][index]}
              label={field.label}
              placeholder={field.placeholder}
              required={index < 3}
              type={index === 0 ? "number" : "text"}
              min={index === 0 ? 1886 : undefined}
              max={index === 0 ? MAX_VEHICLE_YEAR : undefined}
            />
          ))}
        </div>
      )}
    </Card>
  );
}

export function PartsNeededSection() {
  const nextPartId = useRef(2);
  const [parts, setParts] = useState<PartRequest[]>([{ id: 1 }]);

  function handleAddPart() {
    const id = nextPartId.current;
    nextPartId.current += 1;
    setParts((currentParts) => [...currentParts, { id }]);
  }

  function handleRemovePart(partId: number) {
    setParts((currentParts) =>
      currentParts.length > 1
        ? currentParts.filter((part) => part.id !== partId)
        : currentParts,
    );
  }

  return (
    <Card className="rounded-2xl p-5 sm:p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold text-white sm:text-2xl">
          Parts Needed
        </h2>

        <Button
          type="button"
          variant="outline"
          onClick={handleAddPart}
          className="h-11 w-full rounded-xl border-primary/20 px-4 text-primary hover:bg-primary/10 sm:w-auto"
        >
          <PlusIcon className="h-4 w-4" />
          Add Part
        </Button>
      </div>

      <div className="space-y-4">
        {parts.map((part, index) => (
          <PartRequestCard
            key={part.id}
            part={part}
            partNumber={index + 1}
            canRemove={parts.length > 1}
            onRemove={handleRemovePart}
          />
        ))}
      </div>

      <div className="mt-6">
        <Label className="mb-2 block text-sm font-medium text-white">
          Attach Documents (Optional)
        </Label>

        <div className="cursor-pointer rounded-xl border-2 border-dashed border-border p-6 text-center transition-colors hover:border-primary sm:p-8">
          <UploadIcon className="mx-auto mb-3 h-8 w-8 text-[#9CA3AF]" />
          <p className="mb-1 text-brand-muted">
            Drop files here or click to upload
          </p>
          <p className="text-sm text-brand-placeholder">
            PDF, PNG, JPG up to 10MB
          </p>
          <Input
            name="attachment"
            type="file"
            accept="application/pdf,image/png,image/jpeg"
            onChange={(event) => {
              const file = event.target.files?.[0]
              event.target.setCustomValidity(
                file && file.size > 10 * 1024 * 1024
                  ? "Attachment must be 10 MB or smaller."
                  : "",
              )
            }}
            className="mx-auto mt-4 max-w-md bg-brand-panel"
          />
        </div>
      </div>
    </Card>
  );
}
