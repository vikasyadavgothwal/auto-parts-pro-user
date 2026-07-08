"use client";

import { useEffect, useState } from "react";
import { MobileFilterDrawer } from "@/components/site/shared/mobile-filter-drawer";
import { brands, prices } from "@/lib/data/search";
import type { SearchProduct } from "@/types/site/search";
import { FiltersSidebar, SearchFiltersPanel } from "./filters-sidebar";
import { SearchResultsGrid } from "./search-results-grid";
import { SearchToolbar } from "./search-toolbar";

const defaultSortLabel = "Best Match";

type SearchContentProps = {
  products: SearchProduct[];
  queryLabel: string;
  emptyMessage?: string;
};

export function SearchContent({
  products,
  queryLabel,
  emptyMessage = "No matching products were found in the marketplace DB.",
}: SearchContentProps) {
  const [showFilters, setShowFilters] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    const desktopMediaQuery = window.matchMedia("(min-width: 1280px)");

    function handleDesktopChange(event: MediaQueryListEvent) {
      if (event.matches) {
        setMobileFiltersOpen(false);
      }
    }

    desktopMediaQuery.addEventListener("change", handleDesktopChange);

    return () =>
      desktopMediaQuery.removeEventListener("change", handleDesktopChange);
  }, []);

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-4 sm:py-4 lg:px-4">
      <div className="flex flex-col gap-8 xl:flex-row">
        {showFilters ? (
          <div className="hidden xl:block">
            <FiltersSidebar brands={brands} prices={prices} />
          </div>
        ) : null}

        <div className="min-w-0 flex-1">
          <SearchToolbar
            showFilters={showFilters}
            resultsCount={products.length}
            query={queryLabel}
            sortLabel={defaultSortLabel}
            onOpenMobileFilters={() => setMobileFiltersOpen(true)}
            onToggleDesktopFilters={() =>
              setShowFilters((current) => !current)
            }
          />
          {products.length > 0 ? (
            <SearchResultsGrid products={products} showFilters={showFilters} />
          ) : (
            <div className="rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] p-8 text-center text-[#9CA3AF]">
              {emptyMessage}
            </div>
          )}
        </div>
      </div>

      <MobileFilterDrawer
        open={mobileFiltersOpen}
        onOpenChange={setMobileFiltersOpen}
        title="Filters"
      >
        <SearchFiltersPanel
          brands={brands}
          prices={prices}
          showHeader={false}
        />
      </MobileFilterDrawer>
    </div>
  );
}
