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
import {
  ListingPagination,
  type ListingPaginationLink,
} from "@/components/site/service/sections/listing-pagination";
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

  const paginationLinks = useMemo<ListingPaginationLink[]>(() => {
    if (pagination.totalPages <= 1) return [];

    const pageLinks: ListingPaginationLink[] = Array.from(
      { length: pagination.totalPages },
      (_, index) => {
        const page = index + 1;
        return {
          key: `page-${page}`,
          label: String(page),
          href: paginationHref(page, searchParams),
          isCurrent: page === pagination.page,
        };
      },
    );

    return [
      {
        key: "previous",
        label: "Previous",
        href: paginationHref(Math.max(1, pagination.page - 1), searchParams),
        isDisabled: pagination.page <= 1,
      },
      ...pageLinks,
      {
        key: "next",
        label: "Next",
        href: paginationHref(
          Math.min(pagination.totalPages, pagination.page + 1),
          searchParams,
        ),
        isDisabled: pagination.page >= pagination.totalPages,
      },
    ];
  }, [pagination, searchParams]);

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
            filteredCount={filteredGarages.length}
            totalCount={pagination.total}
            sort={sort}
            onOpenMobileFilters={() => setMobileFiltersOpen(true)}
            onToggleFilters={() => setShowFilters((current) => !current)}
            onSortChange={setSort}
          />

          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"></div>

          <ListingGrid garages={filteredGarages} />
          <ListingPagination
            links={filteredGarages.length > 0 ? paginationLinks : []}
          />
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
