"use client";

import { useRef, useState, type HTMLInputTypeAttribute } from "react";
import { CloseIcon, PlusIcon, UploadIcon } from "@/components/icons/site-icons";
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
            className="rounded-xl px-3 text-[#DC2626] hover:bg-[#DC2626]/10 hover:text-[#DC2626]"
          >
            <CloseIcon className="h-4 w-4" />
            Remove
          </Button>
        ) : null}
      </div>

      <div className="flex flex-col gap-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex flex-col">
            <Label className="mb-2">Part Name / Description</Label>
            <Input
              name={`parts.${part.id}.name`}
              placeholder="Front brake pads"
              aria-label={`Part ${partNumber} name`}
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
              defaultValue={1}
              aria-label={`Part ${partNumber} quantity`}
              className="h-12 rounded-xl bg-brand-panel px-4 text-base"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <Label className="mb-2">Additional Notes</Label>
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
      <h2 className="mb-6 text-2xl font-thin text-white">
        Company Information
      </h2>

      <div className="grid gap-6 md:grid-cols-4">
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
      <h2 className="mb-6 text-2xl font-thin text-white">
        Vehicle Information
      </h2>

      <div className="grid gap-6 md:grid-cols-5">
        <TextField label="VIN (Optional)" placeholder="1HGBH41JXMN109186" />
        {vehicleFields.map((field) => (
          <TextField
            key={field.label}
            label={field.label}
            placeholder={field.placeholder}
          />
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
          className="rounded-xl border-primary/20 px-4 py-4 text-primary hover:bg-primary/10"
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
          <UploadIcon className="mx-auto mb-3 h-8 w-8 text-[#9CA3AF]" />
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
