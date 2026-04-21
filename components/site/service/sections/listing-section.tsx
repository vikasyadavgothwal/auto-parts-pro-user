"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownChevronIcon,
  FilterSlidersIcon,
  MapPinIcon,
  RatingStarIcon,
} from "@/components/icons/site-icons";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { garages } from "@/lib/data/service";

type FilterKey =
  | "serviceTypes"
  | "availability"
  | "certifications"
  | "priceRanges";

type FilterState = Record<FilterKey, string[]>;

type GarageFilterDetails = {
  availability: string[];
  certifications: string[];
  nextAvailable: string;
};

const checkboxClassName =
  "h-4 w-4 border-blue-500 bg-white data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500";

const serviceTypeOptions = [
  "Oil Change",
  "Brake Service",
  "Tire Rotation",
  "Battery Service",
  "Engine Diagnostics",
  "Transmission Service",
  "AC Service",
  "Wheel Alignment",
];

const availabilityOptions = ["Available Today", "Available This Week"];

const certificationOptions = [
  "ASE Certified",
  "AAA Approved",
  "Manufacturer Certified",
];

const priceRangeOptions = [
  "Under $50",
  "$50 - $100",
  "$100 - $200",
  "Over $200",
];

const garageFilterDetails: Record<string, GarageFilterDetails> = {
  "1": {
    availability: ["Available Today", "Available This Week"],
    certifications: ["ASE Certified", "AAA Approved"],
    nextAvailable: "Today at 2:00 PM",
  },
  "2": {
    availability: ["Available This Week"],
    certifications: ["Manufacturer Certified"],
    nextAvailable: "This week",
  },
  "3": {
    availability: ["Available Today", "Available This Week"],
    certifications: ["AAA Approved"],
    nextAvailable: "Today at 4:30 PM",
  },
  "4": {
    availability: ["Available Today", "Available This Week"],
    certifications: ["ASE Certified", "Manufacturer Certified"],
    nextAvailable: "Today at 1:15 PM",
  },
};

const defaultGarageFilterDetails: GarageFilterDetails = {
  availability: ["Available Today", "Available This Week"],
  certifications: [],
  nextAvailable: "Today at 2:00 PM",
};

const filterSections: {
  key: FilterKey;
  title: string;
  items: string[];
}[] = [
  {
    key: "serviceTypes",
    title: "Service Type",
    items: serviceTypeOptions,
  },
  {
    key: "availability",
    title: "Availability",
    items: availabilityOptions,
  },
  {
    key: "certifications",
    title: "Certifications",
    items: certificationOptions,
  },
  {
    key: "priceRanges",
    title: "Price Range",
    items: priceRangeOptions,
  },
];

const createInitialFilters = (): FilterState => ({
  serviceTypes: [],
  availability: ["Available Today"],
  certifications: [],
  priceRanges: [],
});

const createEmptyFilters = (): FilterState => ({
  serviceTypes: [],
  availability: [],
  certifications: [],
  priceRanges: [],
});

function getGarageFilterDetails(garageId: string) {
  return garageFilterDetails[garageId] ?? defaultGarageFilterDetails;
}

function getPriceValue(price: string) {
  return Number(price.replace(/[^0-9.]/g, ""));
}

function matchesPriceRange(price: string, priceRange: string) {
  const priceValue = getPriceValue(price);

  switch (priceRange) {
    case "Under $50":
      return priceValue < 50;
    case "$50 - $100":
      return priceValue >= 50 && priceValue <= 100;
    case "$100 - $200":
      return priceValue > 100 && priceValue <= 200;
    case "Over $200":
      return priceValue > 200;
    default:
      return true;
  }
}

function hasSelectedMatch(selectedItems: string[], availableItems: string[]) {
  return (
    selectedItems.length === 0 ||
    selectedItems.some((selectedItem) => availableItems.includes(selectedItem))
  );
}

export function ServicesListingSection() {
  const [showFilters, setShowFilters] = useState(true);
  const [filters, setFilters] = useState<FilterState>(() =>
    createInitialFilters()
  );

  const filteredGarages = useMemo(
    () =>
      garages.filter((garage) => {
        const details = getGarageFilterDetails(garage.id);

        return (
          hasSelectedMatch(filters.serviceTypes, garage.specialties) &&
          hasSelectedMatch(filters.availability, details.availability) &&
          hasSelectedMatch(filters.certifications, details.certifications) &&
          (filters.priceRanges.length === 0 ||
            filters.priceRanges.some((priceRange) =>
              matchesPriceRange(garage.price, priceRange)
            ))
        );
      }),
    [filters]
  );

  function handleFilterChange(
    filterKey: FilterKey,
    item: string,
    checked: boolean
  ) {
    setFilters((currentFilters) => {
      const currentItems = currentFilters[filterKey];
      const nextItems = checked
        ? Array.from(new Set([...currentItems, item]))
        : currentItems.filter((currentItem) => currentItem !== item);

      return {
        ...currentFilters,
        [filterKey]: nextItems,
      };
    });
  }

  function handleClearFilters() {
    setFilters(createEmptyFilters());
  }

  return (
    <section className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-8 lg:flex-row">
        {showFilters ? (
          <FiltersSidebar
            filters={filters}
            onClearFilters={handleClearFilters}
            onFilterChange={handleFilterChange}
          />
        ) : null}

        <div className="min-w-0 flex-1">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setShowFilters((current) => !current)}
                className="flex items-center gap-2 rounded-sm border border-[#2A2A2A] bg-[#1A1A1A] px-4 py-2 text-white transition-colors hover:border-[#DC2626]"
              >
                <FilterSlidersIcon className="h-4 w-4" />
                <span className="text-sm">
                  {showFilters ? "Hide Filters" : "Show Filters"}
                </span>
              </button>

              <p className="text-sm text-brand-muted">
                Showing{" "}
                <span className="font-medium text-white">
                  {filteredGarages.length}
                </span>{" "}
                garages near you
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-brand-muted">Sort by:</span>
              <button
                type="button"
                className="flex items-center gap-2 rounded-sm border border-[#2A2A2A] bg-[#1A1A1A] px-4 py-2 text-white transition-colors hover:border-[#DC2626]"
              >
                <span className="text-sm">Best Match</span>
                <DropdownChevronIcon className="h-4 w-4" />
              </button>
            </div>
          </div>

          {filteredGarages.length > 0 ? (
            <div className="space-y-6">
              {filteredGarages.map((garage) => (
                <GarageCard
                  key={garage.id}
                  {...garage}
                  nextAvailable={
                    getGarageFilterDetails(garage.id).nextAvailable
                  }
                />
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <h3 className="text-xl font-semibold text-white">
                No garages match these filters
              </h3>
              <p className="mt-2 text-sm text-brand-muted">
                Clear filters to see all available garages near you.
              </p>
              <Button
                type="button"
                onClick={handleClearFilters}
                className="mt-5 rounded-sm hover:bg-brand-primary-hover"
              >
                Clear filters
              </Button>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}

function FiltersSidebar({
  filters,
  onClearFilters,
  onFilterChange,
}: {
  filters: FilterState;
  onClearFilters: () => void;
  onFilterChange: (filterKey: FilterKey, item: string, checked: boolean) => void;
}) {
  return (
    <aside className="w-full transition-all duration-300 lg:w-80 lg:shrink-0">
      <div className="rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] p-6 lg:sticky lg:top-28">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Filters</h3>
          <button
            type="button"
            onClick={onClearFilters}
            className="text-sm text-[#DC2626] hover:underline"
          >
            Clear all
          </button>
        </div>

        {filterSections.map((section, index) => (
          <div key={section.key}>
            <FilterGroup
              title={section.title}
              items={section.items}
              checkedItems={filters[section.key]}
              onCheckedChange={(item, checked) =>
                onFilterChange(section.key, item, checked)
              }
            />

            {index < filterSections.length - 1 ? (
              <div className="my-6 border-t border-[#2A2A2A]" />
            ) : null}
          </div>
        ))}
      </div>
    </aside>
  );
}

function FilterGroup({
  title,
  items,
  checkedItems,
  onCheckedChange,
}: {
  title: string;
  items: string[];
  checkedItems: string[];
  onCheckedChange: (item: string, checked: boolean) => void;
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
                checked={checkedItems.includes(item)}
                onCheckedChange={(checked) =>
                  onCheckedChange(item, checked === true)
                }
                className={checkboxClassName}
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
  nextAvailable,
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
  nextAvailable: string;
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

          <Card className="mb-4 rounded-sm border border-[#2A2A2A] bg-[#0A0A0A] shadow-none">
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
                  {nextAvailable}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mb-4 flex flex-wrap gap-2">
            {specialties.map((specialty) => (
              <Badge
                key={specialty}
                variant="secondary"
                className="rounded-sm bg-border px-3 py-1 text-xs text-white"
              >
                {specialty}
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              className="h-11 flex-1 rounded-sm hover:bg-brand-primary-hover"
            >
              <Link href={`/garage`}>View Details &amp; Book</Link>
            </Button>

            <Button
              variant="secondary"
              className="h-11 rounded-sm bg-border px-6 text-white hover:bg-brand-surface-strong"
            >
              Get Quote
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
