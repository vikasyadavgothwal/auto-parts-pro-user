import Image from "next/image"
import Link from "next/link"
import { SectionHeading } from "@/components/site/shared/section-heading"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { products } from "@/lib/data/user"
import {
  getPublicText,
  type HomeFeaturedPartsConfig,
} from "@/lib/public-content"

export function FeaturedPartsSection({
  config,
}: {
  config?: HomeFeaturedPartsConfig
}) {
  const heading = getPublicText(config?.heading)
  const subheading = getPublicText(config?.subheading)
  const buttonText = getPublicText(config?.buttonText)
  const buttonSlug = getPublicText(config?.buttonSlug)

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
          {products.map((product) => (
            // <Link key={product.id} href={`/product/${product.id}`} className="group">
            <Link key={product.id} href={`/product`} className="group">
              <Card className="h-full overflow-hidden transition-all hover:border-primary">
                <div className="relative aspect-[4/3] overflow-hidden bg-border">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  <div className="absolute left-3 top-3">
                    <Badge className="rounded bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                      {product.category}
                    </Badge>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="mb-2 text-xl font-inter text-white">
                    {product.name}
                  </h3>
                  <p className="text-lg font-inter text-primary">{product.price}</p>
                </div>
              </Card>
            </Link>
          ))}
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
