"use client";

import { useState } from "react";
import { brands, prices, products } from "@/lib/data/search";
import { FiltersSidebar } from "./filters-sidebar";
import { SearchResultsGrid } from "./search-results-grid";
import { SearchToolbar } from "./search-toolbar";

const searchQuery = "Brake Pads";
const defaultSortLabel = "Best Match";

export function SearchContent() {
  const [showFilters, setShowFilters] = useState(true);

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-4 sm:py-4 lg:px-4">
      <div className="flex flex-col gap-8 xl:flex-row">
        {showFilters ? <FiltersSidebar brands={brands} prices={prices} /> : null}

        <div className="min-w-0 flex-1">
          <SearchToolbar
            showFilters={showFilters}
            resultsCount={products.length}
            query={searchQuery}
            sortLabel={defaultSortLabel}
            onToggleFilters={() => setShowFilters((current) => !current)}
          />

          <SearchResultsGrid products={products} showFilters={showFilters} />
        </div>
      </div>
    </div>
  );
}
