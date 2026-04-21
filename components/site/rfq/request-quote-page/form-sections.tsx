"use client";

import { useRef, useState, type HTMLInputTypeAttribute } from "react";
import { CloseIcon, PlusIcon } from "@/components/icons/site-icons";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { companyFields, vehicleFields } from "@/lib/data/request";
type TextFieldProps = {
  label: string;
  placeholder?: string;
  required?: boolean;
  type?: HTMLInputTypeAttribute;
};
type PartRequest = {
  id: number;
};
function TextField({
  label,
  placeholder,
  required,
  type = "text",
}: TextFieldProps) {
  return (
    <div>
      <Label className="mb-2 block text-sm font-medium text-white">
        {label}
      </Label>

      <Input
        required={required}
        type={type}
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
    <Card className="rounded-xl bg-brand-surface p-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h4 className="font-medium text-white">Part #{partNumber}</h4>

        {canRemove ? (
          <Button
            type="button"
            variant="ghost"
            onClick={() => onRemove(part.id)}
            className="rounded-sm px-3 text-[#DC2626] hover:bg-[#DC2626]/10 hover:text-[#DC2626]"
          >
            <CloseIcon className="h-4 w-4" />
            Remove
          </Button>
        ) : null}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <Input
            name={`parts.${part.id}.name`}
            placeholder="Front brake pads"
            aria-label={`Part ${partNumber} name`}
            className="h-12 rounded-xl bg-brand-panel px-4 text-base"
          />
        </div>

        <Input
          name={`parts.${part.id}.partNumber`}
          placeholder="BC1259"
          aria-label={`Part ${partNumber} part number`}
          className="h-12 rounded-xl bg-brand-panel px-4 text-base"
        />

        <Input
          name={`parts.${part.id}.quantity`}
          type="number"
          min={1}
          defaultValue={1}
          aria-label={`Part ${partNumber} quantity`}
          className="h-12 rounded-xl bg-brand-panel px-4 text-base"
        />

        <div className="md:col-span-2">
          <Textarea
            name={`parts.${part.id}.requirements`}
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
  return (
    <Card className="rounded-2xl p-8">
      <h2 className="mb-6 text-2xl font-semibold text-white">
        Company Information
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        {companyFields.map(([label, placeholder]) => (
          <TextField
            key={label}
            label={label}
            placeholder={placeholder}
            required
          />
        ))}
      </div>
    </Card>
  );
}

export function VehicleInformationSection() {
  return (
    <Card className="rounded-2xl p-8">
      <h2 className="mb-6 text-2xl font-semibold text-white">
        Vehicle Information
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="md:col-span-2">
          <TextField label="VIN (Optional)" placeholder="1HGBH41JXMN109186" />
        </div>

        {vehicleFields.map((label) => (
          <TextField key={label} label={label} />
        ))}
      </div>
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
    <Card className="rounded-2xl p-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-white">Parts Needed</h2>

        <Button
          type="button"
          variant="outline"
          onClick={handleAddPart}
          className="rounded-sm border-primary/20 px-4 py-4 text-primary hover:bg-primary/10"
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

        <div className="cursor-pointer rounded-xl border-2 border-dashed border-border p-8 text-center transition-colors hover:border-primary">
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
            className="lucide lucide-upload w-8 h-8 text-[#9CA3AF] mx-auto mb-3"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" x2="12" y1="3" y2="15"></line>
          </svg>
          <p className="mb-1 text-brand-muted">
            Drop files here or click to upload
          </p>
          <p className="text-sm text-brand-placeholder">
            PDF, PNG, JPG up to 10MB
          </p>
        </div>
      </div>
    </Card>
  );
}
