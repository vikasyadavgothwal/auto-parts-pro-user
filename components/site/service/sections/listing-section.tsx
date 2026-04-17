import Image from "next/image";
import Link from "next/link";
import {
  FilterIcon,
  MapPinIcon,
  RatingStarIcon,
} from "@/components/icons/site-icons";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { garages } from "@/lib/Data/ServiceData";
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
                <span className="font-medium text-white">4</span> garages near
                you
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
  );
}

function FilterGroup({
  title,
  items,
  defaultChecked = [],
}: {
  title: string;
  items: string[];
  defaultChecked?: number[];
}) {
  return (
    <div>
      <h4 className="mb-3 text-sm font-medium text-white">{title}</h4>

      <div className="space-y-2">
        {items.map((item, index) => {
          const checkboxId = `${title}-${index}`
            .toLowerCase()
            .replace(/\s+/g, "-");

          return (
            <label
              key={item}
              htmlFor={checkboxId}
              className="group flex cursor-pointer items-center gap-3"
            >
              <Checkbox
                id={checkboxId}
                defaultChecked={defaultChecked.includes(index)}
              />
              <span className="text-sm text-brand-muted group-hover:text-white">
                {item}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
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
  id: string;
  title: string;
  rating: string;
  reviews: string;
  price: string;
  distance: string;
  address: string;
  image: string;
  specialties: string[];
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

          <Card className="mb-4 rounded-lg border border-[#2A2A2A] bg-[#0A0A0A] shadow-none">
            <CardContent className="grid grid-cols-3 gap-4 p-4">
              <div>
                <div className="mb-1 text-xs text-[#9CA3AF]">
                  Jobs Completed
                </div>
                <div className="font-semibold text-white">2,340</div>
              </div>

              <div>
                <div className="mb-1 text-xs text-[#9CA3AF]">Response Time</div>
                <div className="font-semibold text-white">&lt; 15 min</div>
              </div>

              <div>
                <div className="mb-1 text-xs text-[#9CA3AF]">
                  Next Available
                </div>
                <div className="font-semibold text-[#10B981]">
                  Today at 2:00 PM
                </div>
              </div>
            </CardContent>
          </Card>

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
              <Link href={`/garage`}>View Details &amp; Book</Link>
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
  );
}
