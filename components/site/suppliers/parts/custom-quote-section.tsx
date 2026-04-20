import Link from "next/link"
import { FileTextIcon, MessageIcon } from "@/components/icons/site-icons"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function SupplierCustomQuoteSection() {
  return (
    <div className="mx-auto md:mt-12 mt-0 md:mb-0 mb-10 max-w-7xl px-4 sm:px-6 lg:mb-16">
      <Card className="rounded-2xl border-primary/30 bg-gradient-to-br from-brand-panel to-brand-surface p-6 text-center sm:p-8">
        <div className="mx-auto max-w-2xl">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <FileTextIcon className="h-8 w-8 text-primary" />
          </div>
          <h3 className="mb-2 text-2xl font-bold text-white">
            Can&apos;t find the right part?
          </h3>
          <p className="mb-6 text-brand-muted">
            Submit a Request for Quote and get personalized offers directly from
            Premium Auto Parts Inc.
          </p>
          <Button
            asChild
            className="h-auto rounded-sm px-8 py-3 font-medium hover:bg-brand-primary-hover"
          >
            <Link href="/rfq">
              <MessageIcon className="h-5 w-5 " />
              Request Custom Quote
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  )
}
