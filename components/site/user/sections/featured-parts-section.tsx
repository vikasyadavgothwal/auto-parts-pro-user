import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SectionHeading } from "@/components/site/shared/section-heading"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
const products = [
  {
    id: 1,
    category: "BRAKES",
    name: "ACDelco Professional Brake Pads",
    price: "$89.99",
    image:
      "https://images.unsplash.com/photo-1656597631995-9fa0e1072279?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
  {
    id: 2,
    category: "FILTERS",
    name: "Bosch Oil Filter Premium",
    price: "$24.99",
    image:
      "https://images.unsplash.com/photo-1764869427688-3e97480f4b82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
  {
    id: 3,
    category: "IGNITION",
    name: "Denso Spark Plug Set",
    price: "$42.99",
    image:
      "https://images.unsplash.com/photo-1759832217256-244b5bc54882?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
  {
    id: 4,
    category: "SUSPENSION",
    name: "Monroe Shock Absorber",
    price: "$156.00",
    image:
      "https://images.unsplash.com/photo-1729545321223-e597f91a25d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
]

export function FeaturedPartsSection() {
  return (
    <section className="bg-brand-surface py-24">
      <div className="site-container">
        <SectionHeading
          eyebrow="Featured Parts"
          title="Top-Rated Products"
          description="Best-selling parts from verified suppliers"
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
                  <h3 className="mb-2 text-sm font-semibold text-white">
                    {product.name}
                  </h3>
                  <p className="text-lg font-bold text-primary">{product.price}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            asChild
            className="h-auto rounded-lg px-8 py-4 text-base font-medium hover:bg-brand-primary-hover"
          >
            <Link href="/search">
              <span>View All Parts</span>
              <ArrowRight className="size-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
