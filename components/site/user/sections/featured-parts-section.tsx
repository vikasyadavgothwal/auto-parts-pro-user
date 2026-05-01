import Image from "next/image"
import Link from "next/link"
import { ArrowRightIcon } from "@/components/icons/site-icons"
import { SectionHeading } from "@/components/site/shared/section-heading"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { products } from "@/lib/data/user"

export function FeaturedPartsSection() {
  return (
    <section className="bg-brand-surface pb-10">
      <div className="site-container">
        <SectionHeading
          eyebrow="Featured Parts"
          title="Top-Rated Products"
          // description="Best-selling parts from verified suppliers"
          className="mb-16"
        />

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

        <div className="my-12 text-center">
          <Button
            asChild
            className="h-auto rounded-full px-8 py-4 text-base font-medium hover:bg-brand-primary-hover"
          >
            <Link href="/search">
              <span>View All Parts</span>
              <ArrowRightIcon className="size-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
