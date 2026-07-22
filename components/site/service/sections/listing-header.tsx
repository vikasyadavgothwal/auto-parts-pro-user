"use client";

import { FilterSlidersIcon } from "@/components/icons/site-icons";

export type GarageSort =
  | "best"
  | "rating"
  | "price-low"
  | "price-high"
  | "experience";

export function ListingHeader({
  showFilters,
  filteredCount,
  totalCount,
  sort,
  onOpenMobileFilters,
  onToggleFilters,
  onSortChange,
}: {
  showFilters: boolean;
  filteredCount: number;
  totalCount: number;
  sort: GarageSort;
  onOpenMobileFilters: () => void;
  onToggleFilters: () => void;
  onSortChange: (sort: GarageSort) => void;
}) {
  return (
    <div className="mb-6 flex justify-between">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onOpenMobileFilters}
          className="flex items-center gap-2 rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] px-4 py-2 text-white transition-colors hover:border-[#DC2626] lg:hidden"
        >
          <FilterSlidersIcon className="h-4 w-4" />
          <span className="text-sm">Show Filters</span>
        </button>

        <button
          type="button"
          onClick={onToggleFilters}
          className="hidden items-center gap-2 rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] px-4 py-2 text-white transition-colors hover:border-[#DC2626] lg:flex"
        >
          <FilterSlidersIcon className="h-4 w-4" />
          <span className="text-sm">
            {showFilters ? "Hide Filters" : "Show Filters"}
          </span>
        </button>

        <p className="text-sm text-brand-muted">
          Showing <span className="font-medium text-white">{filteredCount}</span>{" "}
          of <span className="font-medium text-white">{totalCount}</span>{" "}
          garages
        </p>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-brand-muted">Sort by:</span>
        <select
          aria-label="Sort garages"
          value={sort}
          onChange={(event) => onSortChange(event.target.value as GarageSort)}
          className="rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] px-4 py-2 text-sm text-white outline-none hover:border-[#DC2626] focus:border-[#DC2626]"
        >
          <option value="best">Best Match</option>
          <option value="rating">Highest Rated</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="experience">Most Experienced</option>
        </select>
      </div>
    </div>
  );
}
