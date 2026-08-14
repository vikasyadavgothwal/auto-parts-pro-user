"use client";

import { useEffect, useMemo, useState } from "react";

import {
  ListingFilters,
  ListingMobileFilters,
  type FilterKey,
  type FilterSection,
  type FilterState,
} from "@/components/site/service/sections/listing-filters";
import { ListingGrid } from "@/components/site/service/sections/listing-grid";
import {
  ListingHeader,
  type GarageSort,
} from "@/components/site/service/sections/listing-header";
import type { PublicGarageSummary } from "@/types/site/garages";

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

type PriceRangeOption = { label: string; value: string; min: number; max: number };

const createInitialFilters = (): FilterState => ({
  serviceTypes: [],
  availability: [],
  certifications: [],
  priceRanges: [],
});

function getPriceValue(price: number | null) {
  return typeof price === "number" ? price / 100 : Number.NaN;
}

function formatPriceRangeAmount(value: number) {
  return `AED ${value.toFixed(value % 1 === 0 ? 0 : 2)}`;
}

function buildPriceRangeOptions(garages: PublicGarageSummary[]): PriceRangeOption[] {
  const values = garages
    .map((garage) => getPriceValue(garage.startingPrice))
    .filter((price) => Number.isFinite(price));

  if (!values.length) return [];

  const min = Math.floor(Math.min(...values));
  const max = Math.ceil(Math.max(...values));

  if (min === max) {
    return [{ label: formatPriceRangeAmount(min), value: `${min}-${max}`, min, max }];
  }

  const rangeCount = Math.min(4, max - min + 1);
  const step = Math.ceil((max - min + 1) / rangeCount);

  return Array.from({ length: rangeCount }, (_, index) => {
    const rangeMin = min + index * step;
    const rangeMax = Math.min(max, rangeMin + step - 1);
    return {
      label: `${formatPriceRangeAmount(rangeMin)} - ${formatPriceRangeAmount(rangeMax)}`,
      value: `${rangeMin}-${rangeMax}`,
      min: rangeMin,
      max: rangeMax,
    };
  }).filter((range) => range.min <= range.max);
}

function matchesPriceRange(price: number | null, priceRange: PriceRangeOption | undefined) {
  const priceValue = getPriceValue(price);
  return Number.isFinite(priceValue) && priceRange !== undefined && priceValue >= priceRange.min && priceValue <= priceRange.max;
}

function compareTopGarages(a: PublicGarageSummary, b: PublicGarageSummary) {
  return (
    b.reviewCount - a.reviewCount ||
    b.jobCompletedNumber - a.jobCompletedNumber ||
    b.ratingAverage - a.ratingAverage ||
    b.yearsExperience - a.yearsExperience
  )
}

function hasSelectedMatch(selectedItems: string[], availableItems: string[]) {
  return (
    selectedItems.length === 0 ||
    selectedItems.some((selectedItem) => availableItems.includes(selectedItem))
  );
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
  const hasSearchOrLocationFilter =
    Boolean(searchParams.q) || Boolean(searchParams.service) || Boolean(searchParams.location);
  const hasClientFilters = useMemo(
    () =>
      filters.serviceTypes.length > 0 ||
      filters.availability.length > 0 ||
      filters.certifications.length > 0 ||
      filters.priceRanges.length > 0,
    [filters],
  );
  const shouldShowAll = hasSearchOrLocationFilter || hasClientFilters;

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
  const priceRangeOptions = useMemo(() => buildPriceRangeOptions(garages), [garages]);
  const priceRangeByValue = useMemo(
    () => new Map(priceRangeOptions.map((range) => [range.value, range])),
    [priceRangeOptions],
  );

  const filterSections: FilterSection[] = useMemo(
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
        items: priceRangeOptions.map((range) => ({
          label: range.label,
          value: range.value,
        })),
      },
    ],
    [certificationOptions, priceRangeOptions, serviceTypeOptions],
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
            matchesPriceRange(garage.startingPrice, priceRangeByValue.get(priceRange)),
          ))
      );
    });

    if (sort === "rating") {
      return [...filtered].sort(
        (a, b) => b.ratingAverage - a.ratingAverage || b.reviewCount - a.reviewCount,
      );
    }
    if (sort === "price-low") {
      return [...filtered].sort(
        (a, b) =>
          (a.startingPrice ?? Number.POSITIVE_INFINITY) -
          (b.startingPrice ?? Number.POSITIVE_INFINITY),
      );
    }
    if (sort === "price-high") {
      return [...filtered].sort(
        (a, b) =>
          (b.startingPrice ?? Number.NEGATIVE_INFINITY) -
          (a.startingPrice ?? Number.NEGATIVE_INFINITY),
      );
    }
    if (sort === "experience") {
      return [...filtered].sort((a, b) => b.yearsExperience - a.yearsExperience);
    }

    return [...filtered].sort(compareTopGarages);
  }, [filters, garages, priceRangeByValue, sort]);
  const displayedGarages = useMemo(
    () => (shouldShowAll ? filteredGarages : filteredGarages.slice(0, 6)),
    [filteredGarages, shouldShowAll],
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
    setFilters(createInitialFilters());
  }

  return (
    <section className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-8 lg:flex-row">
        {showFilters ? (
          <div className="hidden lg:block">
            <ListingFilters
              filters={filters}
              sections={filterSections}
              onClearFilters={handleClearFilters}
              onFilterChange={handleFilterChange}
            />
          </div>
        ) : null}

        <div className="min-w-0 flex-1">
          <ListingHeader
            showFilters={showFilters}
            filteredCount={displayedGarages.length}
            totalCount={pagination.total}
            sort={sort}
            onOpenMobileFilters={() => setMobileFiltersOpen(true)}
            onToggleFilters={() => setShowFilters((current) => !current)}
            onSortChange={setSort}
          />

          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"></div>

          <ListingGrid garages={displayedGarages} />
        </div>
      </div>

      <ListingMobileFilters
        open={mobileFiltersOpen}
        filters={filters}
        sections={filterSections}
        onOpenChange={setMobileFiltersOpen}
        onClearFilters={handleClearFilters}
        onFilterChange={handleFilterChange}
      />
    </section>
  );
}
