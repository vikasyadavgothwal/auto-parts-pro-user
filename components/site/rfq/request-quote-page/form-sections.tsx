import type { HTMLInputTypeAttribute } from "react";
import { PlusIcon } from "@/components/icons/site-icons";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { companyFields, vehicleFields } from "@/lib/data/Request";

type TextFieldProps = {
  label: string;
  placeholder?: string;
  required?: boolean;
  type?: HTMLInputTypeAttribute;
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
  return (
    <Card className="rounded-2xl p-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-white">Parts Needed</h2>

        <Button
          type="button"
          variant="outline"
          className="rounded-xl border-primary/20 px-4 py-2 text-primary hover:bg-primary/10"
        >
          <PlusIcon className="h-4 w-4" />
          Add Part
        </Button>
      </div>

      <div className="space-y-4">
        <Card className="rounded-xl bg-brand-surface p-6">
          <h4 className="mb-4 font-medium text-white">Part #1</h4>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <Input
                placeholder="Front brake pads"
                className="h-12 rounded-xl bg-brand-panel px-4 text-base"
              />
            </div>

            <Input
              placeholder="BC1259"
              className="h-12 rounded-xl bg-brand-panel px-4 text-base"
            />

            <Input
              type="number"
              defaultValue={1}
              className="h-12 rounded-xl bg-brand-panel px-4 text-base"
            />

            <div className="md:col-span-2">
              <Textarea
                rows={2}
                placeholder="Any specific requirements or preferences..."
                className="resize-none rounded-xl bg-brand-panel px-4 py-3 text-base"
              />
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-6">
        <Label className="mb-2 block text-sm font-medium text-white">
          Attach Documents (Optional)
        </Label>

        <div className="cursor-pointer rounded-xl border-2 border-dashed border-border p-8 text-center transition-colors hover:border-primary">
          <p className="mb-1 text-brand-muted">Drop files here or click to upload</p>
          <p className="text-sm text-brand-placeholder">PDF, PNG, JPG up to 10MB</p>
        </div>
      </div>
    </Card>
  );
}
