"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  // ArrowRightIcon,
  AwardIcon,
  Clock3Icon,
  DropdownChevronIcon,
  FilterSlidersIcon,
  MapPinIcon,
  RatingStarIcon,
  // ShieldCheckIcon,
} from "@/components/icons/site-icons";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
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
  "h-4 w-4  data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500";

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
  "Under AED 50",
  "AED 50 - AED 100",
  "AED 100 - AED 200",
  "Over AED 200",
];

const garageFilterDetails: Record<string, GarageFilterDetails> = {
  "1": {
    availability: ["Available Today", "Available This Week"],
    certifications: ["ASE", "BOSH"],
    nextAvailable: "Today at 2:00 PM",
  },
  "2": {
    availability: ["Available This Week"],
    certifications: ["ASE", "BOSH"],
    nextAvailable: "This week",
  },
  "3": {
    availability: ["Available Today", "Available This Week"],
    certifications:["ASE", "BOSH"],
    nextAvailable: "Today at 4:30 PM",
  },
  "4": {
    availability: ["Available Today", "Available This Week"],
    certifications: ["ASE", "BOSH"],
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
    case "Under AED 50":
      return priceValue < 50;
    case "AED 50 - AED 100":
      return priceValue >= 50 && priceValue <= 100;
    case "AED 100 - AED 200":
      return priceValue > 100 && priceValue <= 200;
    case "Over AED 200":
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
    createInitialFilters(),
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
              matchesPriceRange(garage.price, priceRange),
            ))
        );
      }),
    [filters],
  );

  function handleFilterChange(
    filterKey: FilterKey,
    item: string,
    checked: boolean,
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
                className="flex items-center gap-2 rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] px-4 py-2 text-white transition-colors hover:border-[#DC2626]"
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
                className="flex items-center gap-2 rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] px-4 py-2 text-white transition-colors hover:border-[#DC2626]"
              >
                <span className="text-sm">Best Match</span>
                <DropdownChevronIcon className="h-4 w-4" />
              </button>
            </div>
          </div>

          {filteredGarages.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
              {filteredGarages.map((garage) => (
                <GarageCard
                  key={garage.id}
                  {...garage}
                  availability={getGarageFilterDetails(garage.id).availability}
                  certifications={
                    getGarageFilterDetails(garage.id).certifications
                  }
                  nextAvailable={getGarageFilterDetails(garage.id).nextAvailable}
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
                className="mt-5 rounded-xl hover:bg-brand-primary-hover"
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

function GarageRatingStars({ rating }: { rating: string }) {
  const filledStars = Math.round(Number(rating));

  return (
    <div className="flex">
      {Array.from({ length: 5 }).map((_, index) => (
        <RatingStarIcon
          key={index}
          filled={index < filledStars}
          className={cn(
            "h-4 w-4",
            index < filledStars ? "text-[#F59E0B]" : "text-[#2A2A2A]",
          )}
        />
      ))}
    </div>
  );
}

function FiltersSidebar({
  filters,
  onClearFilters,
  onFilterChange,
}: {
  filters: FilterState;
  onClearFilters: () => void;
  onFilterChange: (
    filterKey: FilterKey,
    item: string,
    checked: boolean,
  ) => void;
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
  title,
  rating,
  reviews,
  price,
  distance,
  address,
  image,
  specialties,
  availability,
  certifications,
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
  availability: string[];
  certifications: string[];
  nextAvailable: string;
}) {
  const isAvailableToday = availability.includes("Available Today");
  const garageCertifications =
    certifications.length > 0 ? certifications : ["Verified Garage"];
  const isTopRated = Number(rating) >= 4.9;

  return (
    <div className="group relative">
      <Link
        href="/garage"
        className={cn(
          "block h-full overflow-hidden rounded-xl border-2 bg-[#1A1A1A] transition-all",
          isTopRated
            ? "border-[#DC2626]/60 shadow-xl shadow-[#DC2626]/10"
            : "border-[#2A2A2A] hover:border-[#DC2626]/50 hover:shadow-xl hover:shadow-[#DC2626]/10",
        )}
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-[#0A0A0A]">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />

          <div className="absolute top-4 left-4 flex items-center gap-2 rounded-xl border border-[#10B981]/30 bg-[#10B981] px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
            <Clock3Icon className="h-4 w-4" />
            <span>
              {isAvailableToday ? "Verified" : "Next Slot This Week"}
            </span>
          </div>

          {/* {isTopRated ? (
            <div className="absolute top-4 right-4 rounded-xl bg-gradient-to-r from-[#DC2626] to-[#B91C1C] px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
              Top Rated
            </div>
          ) : null} */}

          <div className="absolute bottom-4 left-4 rounded-xl border border-white/10 bg-black/45 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
            Starting at {price}
          </div>
        </div>

        <div className="p-6">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              {garageCertifications.map((certification, index) => (
                <Badge
                  key={`${certification}-${index}`}
                  variant="secondary"
                  className="rounded-sm border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary"
                >
                  {certification}
                </Badge>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <GarageRatingStars rating={rating} />
              <span className="text-sm font-medium text-white">{rating}</span>
              <span className="text-sm text-[#9CA3AF]">({reviews})</span>
            </div>
          </div>

          <h3 className="mb-2 line-clamp-2 text-xl font-semibold text-white transition-colors group-hover:text-[#DC2626]">
            {title}
          </h3>

          <div className="mb-4 flex items-center gap-2 text-sm text-[#9CA3AF]">
            <MapPinIcon className="h-4 w-4 shrink-0" />
            <span className="line-clamp-1">
              {distance} • {address}
            </span>
          </div>
          <span className="mb-2 block text-sm font-medium  text-[#9CA3AF]">
            Specialties:
          </span>
          <div className="mb-4 flex flex-wrap gap-2">
            {specialties.slice(0, 3).map((specialty) => (
              <Badge
                key={specialty}
                variant="secondary"
                className="rounded-md border border-[#2A2A2A] bg-[#2A2A2A] px-3 py-1 text-xs text-white"
              >
                {specialty}
              </Badge>
            ))}
          </div>

          <Card className="mb-4 rounded-xl border border-[#2A2A2A] bg-[#0A0A0A] shadow-none">
            <CardContent className="grid grid-cols-3 gap-4 p-4">
              <div>
                <div className="mb-1 flex items-center gap-1 text-xs text-[#9CA3AF]">
                  <AwardIcon className="h-3.5 w-3.5" />
                  <span>Jobs</span>
                </div>
                <div className="font-semibold text-white">2,340+</div>
              </div>

              <div>
                <div className="mb-1 flex items-center gap-1 text-xs text-[#9CA3AF]">
                  <Clock3Icon className="h-3.5 w-3.5" />
                  <span>Response</span>
                </div>
                <div className="font-semibold text-white">&lt; 15 min</div>
              </div>

              <div>
                <div className="mb-1 text-xs text-[#9CA3AF]">Next slot</div>
                <div className="font-semibold text-[#10B981]">
                  {nextAvailable}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between border-t border-[#2A2A2A] pt-4">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 ">
                <p className="text-2xl font-bold text-white">{price}</p>
                <p className="text-xs text-[#9CA3AF]">Starting at</p>
              </div>
            </div>

            <span
              className={cn(
                buttonVariants(),
                "rounded-xl px-5 py-5 text-sm",
              )}
            >
             Book Now
              {/* <ArrowRightIcon className="h-4 w-4" /> */}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
