import { PlusIcon } from "@/components/icons/site-icons"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {MainHeader} from "@/components/site/header"

const companyFields = [
  ["Company Name *", "Your Company LLC"],
  ["Contact Name *", "John Doe"],
  ["Email *", "john@company.com"],
  ["Phone *", "+1 (555) 123-4567"],
] as const

const vehicleFields = ["Year *", "Make *", "Model *", "Trim"] as const

export function RequestQuotePage() {
  return (
    <div className="min-h-screen bg-brand-surface">
      <MainHeader />
      <div className="mx-auto max-w-4xl md:px-8 px-4 py-16">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-bold text-white">Request a Quote</h1>
          <p className="text-xl text-brand-muted">
            Get personalized offers from multiple verified suppliers
          </p>
        </div>

        <form className="space-y-8">
          <Card className="rounded-2xl p-8">
            <h2 className="mb-6 text-2xl font-semibold text-white">
              Company Information
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              {companyFields.map(([label, placeholder]) => (
                <div key={label}>
                  <Label className="mb-2 block text-sm font-medium text-white">
                    {label}
                  </Label>

                  <Input
                    required
                    placeholder={placeholder}
                    className="h-12 rounded-xl bg-brand-surface px-4 text-base"
                  />
                </div>
              ))}
            </div>
          </Card>

          <Card className="rounded-2xl p-8">
            <h2 className="mb-6 text-2xl font-semibold text-white">
              Vehicle Information
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="md:col-span-2">
                <Label className="mb-2 block text-sm font-medium text-white">
                  VIN (Optional)
                </Label>
                <Input
                  placeholder="1HGBH41JXMN109186"
                  className="h-12 rounded-xl bg-brand-surface px-4 text-base"
                />
              </div>

              {vehicleFields.map((label) => (
                <div key={label}>
                  <Label className="mb-2 block text-sm font-medium text-white">
                    {label}
                  </Label>

                  <Input className="h-12 rounded-xl bg-brand-surface px-4 text-base" />
                </div>
              ))}
            </div>
          </Card>

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
                <p className="text-sm text-brand-placeholder">
                  PDF, PNG, JPG up to 10MB
                </p>
              </div>
            </div>
          </Card>

          <div className="flex justify-center">
            <Button
              type="submit"
              className="rounded-xl px-10 py-8 rounded-md text-lg font-medium hover:bg-brand-primary-hover"
            >
              Submit Quote Request
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
