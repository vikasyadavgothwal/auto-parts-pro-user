"use client";

import { useEffect, useState } from "react";
import { MobileFilterDrawer } from "@/components/site/shared/mobile-filter-drawer";
import { brands, prices, products } from "@/lib/data/search";
import { FiltersSidebar, SearchFiltersPanel } from "./filters-sidebar";
import { SearchResultsGrid } from "./search-results-grid";
import { SearchToolbar } from "./search-toolbar";

const searchQuery = "Brake Pads";
const defaultSortLabel = "Best Match";

export function SearchContent() {
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
            query={searchQuery}
            sortLabel={defaultSortLabel}
            onOpenMobileFilters={() => setMobileFiltersOpen(true)}
            onToggleDesktopFilters={() =>
              setShowFilters((current) => !current)
            }
          />
          <SearchResultsGrid products={products} showFilters={showFilters} />
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
