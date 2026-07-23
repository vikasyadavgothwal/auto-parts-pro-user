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
  value?: string;
  onChange?: (value: string) => void;
};
type PartRequest = {
  id: number;
  vin?: string;
  partName?: string;
  partNumber?: string;
  quantity?: number;
  targetPrice?: string;
  notes?: string;
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
  value,
  onChange,
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
        value={value}
        onChange={onChange ? (event) => onChange(event.target.value) : undefined}
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
            <Label className="mb-2">Different Vehicle VIN</Label>
            <Input
              name={`parts.${part.id}.vin`}
              maxLength={17}
              defaultValue={part.vin ?? ""}
              placeholder="Leave blank to use selected vehicle"
              aria-label={`Part ${partNumber} vehicle VIN`}
              className="h-12 rounded-xl bg-brand-panel px-4 uppercase text-base"
              onChange={(event) => {
                event.currentTarget.value = event.currentTarget.value
                  .toUpperCase()
                  .replace(/[^A-HJ-NPR-Z0-9]/g, "")
                  .slice(0, 17);
              }}
            />
          </div>

          <div className="flex flex-col">
            <Label className="mb-2">Part Name / Description</Label>
            <Input
              name={`parts.${part.id}.name`}
              required
              defaultValue={part.partName ?? ""}
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
              defaultValue={part.targetPrice ?? ""}
              className="h-12 rounded-xl bg-brand-panel px-4 text-base"
            />
          </div>

          <div className="flex flex-col">
            <Label className="mb-2">Part Number (if known)</Label>
            <Input
              name={`parts.${part.id}.partNumber`}
              placeholder="BC1259"
              defaultValue={part.partNumber ?? ""}
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
              defaultValue={part.quantity ?? 1}
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
            defaultValue={part.notes ?? ""}
            aria-label={`Part ${partNumber} requirements`}
            className="resize-none rounded-xl bg-brand-panel px-4 py-3 text-base"
          />
        </div>
      </div>
    </Card>
  );
}

export function CompanyInformationSection({
  companyName,
  contactName,
  email,
  phoneCountryCode,
  phoneNumber,
  onCompanyNameChange,
  onContactNameChange,
  onEmailChange,
  onPhoneCountryCodeChange,
  onPhoneNumberChange,
}: {
  companyName: string;
  contactName: string;
  email: string;
  phoneCountryCode: string;
  phoneNumber: string;
  onCompanyNameChange: (value: string) => void;
  onContactNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPhoneCountryCodeChange: (value: string) => void;
  onPhoneNumberChange: (value: string) => void;
}) {

  return (
    <Card className="rounded-2xl p-5 sm:p-6 lg:p-8">
      <h2 className="mb-5 text-xl font-thin text-white sm:mb-6 sm:text-2xl">
        Company Information
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        <TextField name="companyName" label={companyFields[0]?.[0] ?? "Company Name"} placeholder={companyFields[0]?.[1]} required value={companyName} onChange={onCompanyNameChange} />
        <TextField name="contactName" label={companyFields[1]?.[0] ?? "Contact Name"} placeholder={companyFields[1]?.[1]} required value={contactName} onChange={onContactNameChange} />
        <TextField name="email" label={companyFields[2]?.[0] ?? "Email"} placeholder={companyFields[2]?.[1]} required type="email" value={email} onChange={onEmailChange} />
        <CountryPhoneInput
          id="rfq-phone"
          name="phone"
          label={companyFields[3]?.[0] ?? "Phone *"}
          countryCode={phoneCountryCode}
          phoneNumber={phoneNumber}
          onCountryCodeChange={onPhoneCountryCodeChange}
          onPhoneNumberChange={onPhoneNumberChange}
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
              {accountRole === "Fleet" ? "Fleet Vehicle" : "Saved Vehicle"}
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
                    ? "No fleet vehicles are saved yet. You can still enter a valid VIN on each part."
                    : "No saved vehicles are available yet. You can still enter a valid VIN on each part."}
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
          <p className="text-sm text-brand-muted">
            The selected vehicle applies to every part unless you enter a different VIN on a part. If no vehicle is selected, every part must include a valid VIN.
          </p>
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

export type ImportedRfqPart = Omit<PartRequest, "id">;

export function PartsNeededSection({
  isImporting,
  onImportFile,
}: {
  isImporting: boolean;
  onImportFile: (file: File) => Promise<ImportedRfqPart[]>;
}) {
  const nextPartId = useRef(2);
  const [parts, setParts] = useState<PartRequest[]>([{ id: 1 }]);

  function handleAddPart() {
    const id = nextPartId.current;
    nextPartId.current += 1;
    setParts((currentParts) => [...currentParts, { id }]);
  }

  async function handleImportFile(file: File | undefined) {
    if (!file) return;
    try {
      const importedParts = await onImportFile(file);
      nextPartId.current = Date.now() + importedParts.length + 1;
      setParts(
        importedParts.map((part, index) => ({
          ...part,
          id: Date.now() + index,
          notes: part.notes ?? "",
        })),
      );
    } catch {
      // Parent form owns the visible import error message.
    }
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

      <label className="mb-6 block cursor-pointer rounded-xl border-2 border-dashed border-border p-6 transition-colors hover:border-primary">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <UploadIcon className="h-8 w-8 text-[#9CA3AF]" />
          <div className="flex-1">
            <h3 className="mb-1 text-lg font-semibold text-white">
              Import CSV or Excel
            </h3>
            <p className="text-sm text-brand-muted">
              Columns: VIN No, Quantity, Target Price, Part Number, Part Name
            </p>
          </div>
          <span className="inline-flex h-10 items-center justify-center rounded-xl bg-primary px-4 text-sm font-medium text-white">
            {isImporting ? "Importing..." : "Choose File"}
          </span>
          <input
            type="file"
            className="sr-only"
            accept=".csv,.xlsx,.xls"
            disabled={isImporting}
            onChange={(event) => {
              void handleImportFile(event.target.files?.[0]);
              event.currentTarget.value = "";
            }}
          />
        </div>
      </label>
      <div className="mb-6 flex justify-end">
        <a
          href="/templates/rfq-import-template.csv"
          download="rfq-import-template.csv"
          className="text-sm font-medium text-primary hover:underline"
        >
          Download sample RFQ CSV
        </a>
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

    </Card>
  );
}
