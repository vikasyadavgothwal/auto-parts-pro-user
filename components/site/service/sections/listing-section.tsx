"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  AwardIcon,
  Clock3Icon,
  FilterSlidersIcon,
  MapPinIcon,
  RatingStarIcon,
} from "@/components/icons/site-icons";
import { MobileFilterDrawer } from "@/components/site/shared/mobile-filter-drawer";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { formatGaragePrice } from "@/lib/public-garages";
import type { PublicGarageSummary } from "@/types/site/garages";

type FilterKey =
  | "serviceTypes"
  | "availability"
  | "certifications"
  | "priceRanges";

type FilterState = Record<FilterKey, string[]>;
type GarageSort = "best" | "rating" | "price-low" | "price-high" | "experience";

type GaragePagination = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

type ServicesListingSectionProps = {
  garages: PublicGarageSummary[];
  pagination: GaragePagination;
  searchParams: {
    q: string;
    service: string;
    location: string;
  };
};

const checkboxClassName =
  "h-4 w-4 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500";

const fallbackServiceTypeOptions = [
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

const fallbackCertificationOptions = [
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

const createInitialFilters = (): FilterState => ({
  serviceTypes: [],
  availability: [],
  certifications: [],
  priceRanges: [],
});

function getPriceValue(price: number | null) {
  return typeof price === "number" ? price : Number.NaN;
}

function matchesPriceRange(price: number | null, priceRange: string) {
  const priceValue = getPriceValue(price);
  if (!Number.isFinite(priceValue)) return false;

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

function paginationHref(
  page: number,
  searchParams: ServicesListingSectionProps["searchParams"],
) {
  const params = new URLSearchParams();
  if (searchParams.q) params.set("q", searchParams.q);
  if (searchParams.service) params.set("service", searchParams.service);
  if (searchParams.location) params.set("location", searchParams.location);
  if (page > 1) params.set("page", String(page));
  const query = params.toString();
  return query ? `/services?${query}` : "/services";
}

export function ServicesListingSection({
  garages,
  pagination,
  searchParams,
}: ServicesListingSectionProps) {
  const [showFilters, setShowFilters] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>(() =>
    createInitialFilters(),
  );
  const [sort, setSort] = useState<GarageSort>("best");

  useEffect(() => {
    const desktopMediaQuery = window.matchMedia("(min-width: 1024px)");

    function handleDesktopChange(event: MediaQueryListEvent) {
      if (event.matches) {
        setMobileFiltersOpen(false);
      }
    }

    desktopMediaQuery.addEventListener("change", handleDesktopChange);

    return () =>
      desktopMediaQuery.removeEventListener("change", handleDesktopChange);
  }, []);

  const serviceTypeOptions = useMemo(() => {
    const values = garages.flatMap((garage) => garage.specialties);
    return values.length
      ? Array.from(new Set(values))
      : fallbackServiceTypeOptions;
  }, [garages]);

  const certificationOptions = useMemo(() => {
    const values = garages.flatMap((garage) => garage.certifications);
    return values.length
      ? Array.from(new Set(values))
      : fallbackCertificationOptions;
  }, [garages]);

  const filterSections: {
    key: FilterKey;
    title: string;
    items: string[];
  }[] = useMemo(
    () => [
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
    ],
    [certificationOptions, serviceTypeOptions],
  );

  const filteredGarages = useMemo(() => {
      const filtered = garages.filter((garage) => {
        const availability = [
          ...(garage.availableToday ? ["Available Today"] : []),
          ...(garage.availableThisWeek ? ["Available This Week"] : []),
        ];

        return (
          hasSelectedMatch(filters.serviceTypes, garage.specialties) &&
          hasSelectedMatch(filters.availability, availability) &&
          hasSelectedMatch(filters.certifications, garage.certifications) &&
          (filters.priceRanges.length === 0 ||
            filters.priceRanges.some((priceRange) =>
              matchesPriceRange(garage.startingPrice, priceRange),
            ))
        );
      });
      if (sort === "rating") return [...filtered].sort((a, b) => b.ratingAverage - a.ratingAverage || b.reviewCount - a.reviewCount);
      if (sort === "price-low") return [...filtered].sort((a, b) => (a.startingPrice ?? Number.POSITIVE_INFINITY) - (b.startingPrice ?? Number.POSITIVE_INFINITY));
      if (sort === "price-high") return [...filtered].sort((a, b) => (b.startingPrice ?? Number.NEGATIVE_INFINITY) - (a.startingPrice ?? Number.NEGATIVE_INFINITY));
      if (sort === "experience") return [...filtered].sort((a, b) => b.yearsExperience - a.yearsExperience);
      return filtered;
    }, [filters, garages, sort]);

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
    setFilters(createInitialFilters());
  }

  return (
    <section className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-8 lg:flex-row">
        {showFilters ? (
          <div className="hidden lg:block">
            <FiltersSidebar
              filters={filters}
              sections={filterSections}
              onClearFilters={handleClearFilters}
              onFilterChange={handleFilterChange}
            />
          </div>
        ) : null}

        <div className="min-w-0 flex-1">
          <div className="mb-6 flex justify-between">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="flex items-center gap-2 rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] px-4 py-2 text-white transition-colors hover:border-[#DC2626] lg:hidden"
              >
                <FilterSlidersIcon className="h-4 w-4" />
                <span className="text-sm">Show Filters</span>
              </button>

              <button
                type="button"
                onClick={() => setShowFilters((current) => !current)}
                className="hidden items-center gap-2 rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] px-4 py-2 text-white transition-colors hover:border-[#DC2626] lg:flex"
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
                of{" "}
                <span className="font-medium text-white">
                  {pagination.total}
                </span>{" "}
                garages
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-brand-muted">Sort by:</span>
              <select aria-label="Sort garages" value={sort} onChange={(event) => setSort(event.target.value as GarageSort)} className="rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] px-4 py-2 text-sm text-white outline-none hover:border-[#DC2626] focus:border-[#DC2626]"><option value="best">Best Match</option><option value="rating">Highest Rated</option><option value="price-low">Price: Low to High</option><option value="price-high">Price: High to Low</option><option value="experience">Most Experienced</option></select>
            </div>
          </div>

          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"></div>

          {filteredGarages.length > 0 ? (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                {filteredGarages.map((garage) => (
                  <GarageCard key={garage.id} garage={garage} />
                ))}
              </div>

              <PaginationControls
                pagination={pagination}
                searchParams={searchParams}
              />
            </>
          ) : (
            <Card className="p-8 text-center">
              <h3 className="text-xl font-semibold text-white">
                No garages match this search
              </h3>
              <p className="mt-2 text-sm text-brand-muted">
                Try a different garage name, city, service, or filter.
              </p>
              <Link
                href="/services"
                className={cn(buttonVariants(), "mt-5 rounded-xl")}
              >
                Clear search
              </Link>
            </Card>
          )}
        </div>
      </div>

      <MobileFilterDrawer
        open={mobileFiltersOpen}
        onOpenChange={setMobileFiltersOpen}
        title="Filters"
        headerAction={
          <button
            type="button"
            onClick={handleClearFilters}
            className="text-sm text-[#DC2626] hover:underline"
          >
            Clear all
          </button>
        }
      >
        <ServiceFiltersContent
          filters={filters}
          sections={filterSections}
          onFilterChange={handleFilterChange}
        />
      </MobileFilterDrawer>
    </section>
  );
}

function GarageRatingStars({ rating }: { rating: number }) {
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
  sections,
  onClearFilters,
  onFilterChange,
}: {
  filters: FilterState;
  sections: { key: FilterKey; title: string; items: string[] }[];
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

        <ServiceFiltersContent
          filters={filters}
          sections={sections}
          onFilterChange={onFilterChange}
        />
      </div>
    </aside>
  );
}

function ServiceFiltersContent({
  filters,
  sections,
  onFilterChange,
}: {
  filters: FilterState;
  sections: { key: FilterKey; title: string; items: string[] }[];
  onFilterChange: (
    filterKey: FilterKey,
    item: string,
    checked: boolean,
  ) => void;
}) {
  return (
    <>
      {sections.map((section, index) => (
        <div key={section.key}>
          <FilterGroup
            title={section.title}
            items={section.items}
            checkedItems={filters[section.key]}
            onCheckedChange={(item, checked) =>
              onFilterChange(section.key, item, checked)
            }
          />

          {index < sections.length - 1 ? (
            <div className="my-6 border-t border-[#2A2A2A]" />
          ) : null}
        </div>
      ))}
    </>
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

function PaginationControls({
  pagination,
  searchParams,
}: {
  pagination: GaragePagination;
  searchParams: ServicesListingSectionProps["searchParams"];
}) {
  if (pagination.totalPages <= 1) return null;

  const pages = Array.from(
    { length: pagination.totalPages },
    (_, index) => index + 1,
  );

  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
      <Link
        href={paginationHref(Math.max(1, pagination.page - 1), searchParams)}
        aria-disabled={pagination.page <= 1}
        className={cn(
          buttonVariants({ variant: "outline" }),
          "rounded-xl border-[#2A2A2A] bg-[#1A1A1A] text-white",
          pagination.page <= 1 && "pointer-events-none opacity-50",
        )}
      >
        Previous
      </Link>

      {pages.map((page) => (
        <Link
          key={page}
          href={paginationHref(page, searchParams)}
          className={cn(
            buttonVariants({
              variant: page === pagination.page ? "default" : "outline",
            }),
            "rounded-xl",
            page !== pagination.page &&
              "border-[#2A2A2A] bg-[#1A1A1A] text-white",
          )}
        >
          {page}
        </Link>
      ))}

      <Link
        href={paginationHref(
          Math.min(pagination.totalPages, pagination.page + 1),
          searchParams,
        )}
        aria-disabled={pagination.page >= pagination.totalPages}
        className={cn(
          buttonVariants({ variant: "outline" }),
          "rounded-xl border-[#2A2A2A] bg-[#1A1A1A] text-white",
          pagination.page >= pagination.totalPages &&
            "pointer-events-none opacity-50",
        )}
      >
        Next
      </Link>
    </div>
  );
}

function GarageCard({ garage }: { garage: PublicGarageSummary }) {
  const price = formatGaragePrice(garage.startingPrice, garage.currency);
  const certifications =
    garage.certifications.length > 0
      ? garage.certifications
      : ["Verified Garage"];
  const image =
    garage.image ||
    "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=900&h=675&fit=crop";
  const location = [
    garage.address,
    garage.city,
    garage.state,
    garage.country,
    garage.pincode,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="group relative">
      <Link
        href={`/garage/${encodeURIComponent(garage.id)}`}
        className="block h-full overflow-hidden rounded-xl border-2 border-[#2A2A2A] bg-[#1A1A1A] transition-all hover:border-[#DC2626]/50 hover:shadow-xl hover:shadow-[#DC2626]/10"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-[#0A0A0A]">
          <div
            className="h-full w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
            style={{ backgroundImage: `url("${image}")` }}
            aria-label={garage.name}
          />

          <div className="absolute top-4 left-4 flex items-center gap-2 rounded-xl border border-[#10B981]/30 bg-[#10B981] px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
            <Clock3Icon className="h-4 w-4" />
            <span>Verified</span>
          </div>

          <div className="absolute bottom-4 left-4 rounded-xl border border-white/10 bg-black/45 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
            Starting at {price}
          </div>
        </div>

        <div className="p-6">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              {certifications.slice(0, 3).map((certification, index) => (
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
              <GarageRatingStars rating={garage.ratingAverage} />
              <span className="text-sm font-medium text-white">{garage.ratingAverage.toFixed(1)}</span>
              <span className="text-sm text-[#9CA3AF]">({garage.reviewCount})</span>
            </div>
          </div>

          <h3 className="mb-2 line-clamp-2 text-xl font-semibold text-white transition-colors group-hover:text-[#DC2626]">
            {garage.name}
          </h3>

          <div className="mb-4 flex items-center gap-2 text-sm text-[#9CA3AF]">
            <MapPinIcon className="h-4 w-4 shrink-0" />
            <span className="line-clamp-1">
              {location || "Location not added"}
            </span>
          </div>

          <span className="mb-2 block text-sm font-medium text-[#9CA3AF]">
            Specialties:
          </span>
          <div className="mb-4 flex flex-wrap gap-2">
            {(garage.specialties.length
              ? garage.specialties
              : ["General Service"]
            )
              .slice(0, 3)
              .map((specialty) => (
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
                <div className="font-semibold text-white">
                  {garage.jobCompletedNumber.toLocaleString()}+
                </div>
              </div>

              <div>
                <div className="mb-1 flex items-center gap-1 text-xs text-[#9CA3AF]">
                  <Clock3Icon className="h-3.5 w-3.5" />
                  <span>Response</span>
                </div>
                <div className="font-semibold text-white">
                  {garage.responseTime || "Contact"}
                </div>
              </div>

              <div>
                <div className="mb-1 text-xs text-[#9CA3AF]">Experience</div>
                <div className="font-semibold text-[#10B981]">
                  {garage.yearsExperience} yrs
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between border-t border-[#2A2A2A] pt-4">
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-white">{price}</p>
              <p className="text-xs text-[#9CA3AF]">Starting at</p>
            </div>

            <span
              className={cn(buttonVariants(), "rounded-xl px-5 py-5 text-sm")}
            >
              Book Now
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
