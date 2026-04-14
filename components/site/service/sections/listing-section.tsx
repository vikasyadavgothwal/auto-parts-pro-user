import Image from "next/image"
import Link from "next/link"
import {
  FilterIcon,
  MapPinIcon,
  RatingStarIcon,
} from "@/components/icons/site-icons"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

const garages = [
  {
    id: "1",
    title: "Premium Auto Care",
    rating: "4.9",
    reviews: "328",
    price: "$49.99",
    distance: "2.3 miles away",
    address: "1234 Main St, San Francisco, CA",
    image:
      "https://images.unsplash.com/photo-1632053002928-c6c8763bb0c0?w=400&h=300&fit=crop",
    specialties: ["Brake Service", "Engine Diagnostics", "Oil Change"],
  },
  {
    id: "2",
    title: "AutoTech Pro",
    rating: "4.8",
    reviews: "512",
    price: "$44.99",
    distance: "3.7 miles away",
    address: "5678 Oak Ave, San Francisco, CA",
    image:
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&h=300&fit=crop",
    specialties: ["Transmission Service", "AC Service", "Oil Change"],
  },
  {
    id: "3",
    title: "Quick Service Center",
    rating: "4.7",
    reviews: "201",
    price: "$39.99",
    distance: "5.1 miles away",
    address: "9012 Elm St, San Francisco, CA",
    image:
      "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=400&h=300&fit=crop",
    specialties: ["Oil Change", "Tire Rotation", "Battery Service"],
  },
  {
    id: "4",
    title: "Elite Motors Service",
    rating: "5",
    reviews: "89",
    price: "$69.99",
    distance: "1.8 miles away",
    address: "3456 Pine St, San Francisco, CA",
    image:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop",
    specialties: ["Engine Diagnostics", "Transmission Service", "Brake Service"],
  },
]

export function ServicesListingSection() {
  return (
    <section className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-8 lg:flex-row">
        <aside className="lg:w-80 lg:flex-shrink-0">
          <Card className="sticky top-28 p-6">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Filters</h3>
              <button className="text-sm text-primary hover:underline">
                Clear all
              </button>
            </div>

            <FilterGroup
              title="Service Type"
              items={[
                "Oil Change",
                "Brake Service",
                "Tire Rotation",
                "Battery Service",
                "Engine Diagnostics",
                "Transmission Service",
                "AC Service",
                "Wheel Alignment",
              ]}
            />

            <Separator className="my-6" />

            <FilterGroup
              title="Availability"
              items={["Available Today", "Available This Week"]}
              defaultChecked={[0]}
            />

            <Separator className="my-6" />

            <FilterGroup
              title="Certifications"
              items={[
                "ASE Certified",
                "AAA Approved",
                "Manufacturer Certified",
              ]}
            />

            <Separator className="my-6" />

            <FilterGroup
              title="Price Range"
              items={["Under $50", "$50 - $100", "$100 - $200", "Over $200"]}
            />
          </Card>
        </aside>

        <div className="flex-1">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                className="rounded-lg border-border bg-card text-white hover:border-primary"
              >
                <FilterIcon className="h-4 w-4" />
                Filters
              </Button>

              <p className="text-sm text-brand-muted">
                <span className="font-medium text-white">4</span> garages near you
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-brand-muted">Sort by:</span>
              <Button
                variant="outline"
                className="rounded-lg border-border bg-card text-white hover:border-primary"
              >
                Best Match
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            {garages.map((garage) => (
              <GarageCard key={garage.id} {...garage} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function FilterGroup({
  title,
  items,
  defaultChecked = [],
}: {
  title: string
  items: string[]
  defaultChecked?: number[]
}) {
  return (
    <div>
      <h4 className="mb-3 text-sm font-medium text-white">{title}</h4>

      <div className="space-y-2">
        {items.map((item, index) => {
          const checkboxId = `${title}-${index}`.toLowerCase().replace(/\s+/g, "-")

          return (
            <label
              key={item}
              htmlFor={checkboxId}
              className="group flex cursor-pointer items-center gap-3"
            >
              <Checkbox id={checkboxId} defaultChecked={defaultChecked.includes(index)} />
              <span className="text-sm text-brand-muted group-hover:text-white">
                {item}
              </span>
            </label>
          )
        })}
      </div>
    </div>
  )
}

function GarageCard({
  id,
  title,
  rating,
  reviews,
  price,
  distance,
  address,
  image,
  specialties,
}: {
  id: string
  title: string
  rating: string
  reviews: string
  price: string
  distance: string
  address: string
  image: string
  specialties: string[]
}) {
  return (
    <Card className="group overflow-hidden transition-all hover:border-primary">
      <div className="flex flex-col md:flex-row">
        <div className="relative h-64 overflow-hidden bg-border md:h-auto md:w-80">
          <Image
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            width={400}
            height={300}
          />
        </div>

        <div className="flex-1 p-6">
          <div className="mb-3 flex items-start justify-between gap-4">
            <div>
              <Link
                href={`/garage/${id}`}
                className="text-2xl font-bold text-white hover:text-primary"
              >
                {title}
              </Link>

              <div className="mt-2 flex items-center gap-2 text-sm text-brand-muted">
                <RatingStarIcon filled className="h-4 w-4 text-primary" />
                {rating} ({reviews})
              </div>
            </div>

            <div className="text-right">
              <div className="text-sm text-brand-muted">Starting at</div>
              <div className="text-3xl font-bold text-primary">{price}</div>
            </div>
          </div>

          <div className="mb-4 flex items-center gap-2 text-sm text-brand-muted">
            <MapPinIcon className="h-4 w-4" />
            <span>
              {distance} • {address}
            </span>
          </div>

          <div className="mb-4 flex flex-wrap gap-2">
            {specialties.map((specialty) => (
              <Badge
                key={specialty}
                variant="secondary"
                className="rounded-lg bg-border px-3 py-1 text-xs text-white"
              >
                {specialty}
              </Badge>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              className="h-11 flex-1 rounded-lg hover:bg-brand-primary-hover"
            >
              <Link href={`/garage/${id}`}>View Details &amp; Book</Link>
            </Button>

            <Button
              variant="secondary"
              className="h-11 rounded-lg bg-border px-6 text-white hover:bg-brand-surface-strong"
            >
              Get Quote
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
