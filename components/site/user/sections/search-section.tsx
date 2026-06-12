import Link from "next/link"
import { SearchIcon } from "@/components/icons/site-icons"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getPublicText, type TextPair } from "@/lib/public-content"

export function SearchSection({ config }: { config?: TextPair }) {
  const heading = getPublicText(config?.heading)
  const subheading = getPublicText(config?.subheading)

  return (
    <section className="bg-brand-surface py-10">
      <div className="site-container">
        {heading || subheading ? (
          <div className="mb-8 text-center">
            {heading ? (
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                {heading}
              </h2>
            ) : null}
            {subheading ? (
              <p className="mx-auto mt-3 max-w-3xl text-lg text-brand-muted">
                {subheading}
              </p>
            ) : null}
          </div>
        ) : null}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-1">
              <Label className="mb-2 block text-sm font-medium text-brand-muted">
                Vehicle Identification Number (VIN)
              </Label>
              <Input
                type="text"
                placeholder="Enter 17-digit Vehicle Identification Number (VIN) (e.g., 1HGBH41JXMN109186)"
                className="h-14 bg-brand-panel px-5 text-base rounded-sm"
              />
            </div>

            <div className="flex items-end">
              <Button
                asChild
                className="h-14 w-full rounded-full px-8 text-base font-medium hover:bg-brand-primary-hover md:w-auto"
              >
                <Link href="/search">
                  <SearchIcon className="size-5 text-white" />
                  <span>Search</span>
                </Link>
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-1">
              <Label className="mb-2 block text-sm font-medium text-brand-muted">
                Vehicle Part Number
              </Label>
              <Input
                type="text"
                placeholder="Enter Vehicle Part Number (e.g., BP-1234)"
                className="h-14 bg-brand-panel px-5 text-base rounded-sm"
              />
            </div>

            <div className="flex items-end">
              <Button
                asChild
                className="h-14 w-full rounded-full px-8 text-base font-medium hover:bg-brand-primary-hover md:w-auto"
              >
                <Link href="/search2">
                  <SearchIcon className="size-5 text-white" />
                  <span>Search</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
