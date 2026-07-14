/* eslint-disable @next/next/no-img-element */

import Link from "next/link"
import { SectionHeading } from "@/components/site/shared/section-heading"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  getPublicText,
  type HomeFeaturedPartsConfig,
} from "@/lib/public-content"
import { formatPrice } from "@/lib/marketplace"
import type { MarketplaceProductSummary } from "@/types/site/marketplace"

export function FeaturedPartsSection({
  config,
  products,
}: {
  config?: HomeFeaturedPartsConfig
  products: MarketplaceProductSummary[]
}) {
  const heading = getPublicText(config?.heading)
  const subheading = getPublicText(config?.subheading)
  const buttonText = getPublicText(config?.buttonText)
  const buttonSlug = getPublicText(config?.buttonSlug)
  const productsWithOffers = products.filter((product) => product.offerCount > 0)
  const visibleProducts = (
    productsWithOffers.length >= 4 ? productsWithOffers : products
  ).slice(0, 4)

  return (
    <section className="bg-brand-surface pb-10">
      <div className="site-container">
        {heading || subheading ? (
          <SectionHeading
            eyebrow="Featured Parts"
            title={heading}
            description={subheading}
            className="mb-16"
          />
        ) : null}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {visibleProducts.length ? (
            visibleProducts.map((product) => (
              <Link
                key={product.partUid}
                href={`/product/${encodeURIComponent(product.partUid)}`}
                className="group"
              >
                <Card className="h-full overflow-hidden rounded-sm border-border bg-brand-panel transition-all hover:border-primary">
                  <div className="relative aspect-[4/3] overflow-hidden bg-border">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    <div className="absolute left-3 top-3">
                      <Badge className="rounded bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                        {product.category || "Auto Part"}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="mb-2 line-clamp-2 text-xl font-inter text-white transition-colors group-hover:text-primary">
                      {product.title}
                    </h3>
                    <p className="text-sm text-brand-muted">
                      {product.offerCount === 1
                        ? "1 verified supplier"
                        : `${product.offerCount} verified suppliers`}
                    </p>
                    <p className="mt-2 text-lg font-inter text-primary">
                      {formatPrice(product.minPrice, product.currency)}
                    </p>
                  </div>
                </Card>
              </Link>
            ))
          ) : (
            <div className="rounded-sm border border-border bg-brand-panel p-6 text-sm text-brand-muted md:col-span-2 lg:col-span-4">
              Featured marketplace products will appear here when supplier
              inventory is available.
            </div>
          )}
        </div>

        {buttonText && buttonSlug ? (
          <div className="my-12 text-center">
            <Button
              asChild
              className="h-auto rounded-full px-8 py-4 text-base font-medium hover:bg-brand-primary-hover"
            >
              <Link href={buttonSlug}>
                <span>{buttonText}</span>
              </Link>
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  )
}
