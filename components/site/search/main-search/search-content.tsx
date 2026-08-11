"use client";

import { useEffect, useMemo, useState } from "react";
import { MobileFilterDrawer } from "@/components/site/shared/mobile-filter-drawer";
import type { SearchProduct } from "@/types/site/search";
import { FiltersSidebar, SearchFiltersPanel, type PriceRangeOption, type SearchFilterKey, type SearchFilterState } from "./filters-sidebar";
import { SearchResultsGrid } from "./search-results-grid";
import { SearchToolbar, type SearchSort } from "./search-toolbar";

const emptyFilters = (): SearchFilterState => ({ fitment: [], brands: [], prices: [], availability: [] });
const formatRangeAmount = (value: number) => `AED ${value.toFixed(value % 1 === 0 ? 0 : 2)}`;
const buildPriceRanges = (products: SearchProduct[]): PriceRangeOption[] => {
  const values = products
    .map((product) => product.unitPrice)
    .filter((price): price is number => typeof price === "number" && Number.isFinite(price));

  if (!values.length) return [];

  const min = Math.floor(Math.min(...values));
  const max = Math.ceil(Math.max(...values));

  if (min === max) {
    return [{ label: formatRangeAmount(min), value: `${min}-${max}`, min, max }];
  }

  const rangeCount = Math.min(4, max - min + 1);
  const step = Math.ceil((max - min + 1) / rangeCount);

  return Array.from({ length: rangeCount }, (_, index) => {
    const rangeMin = min + index * step;
    const rangeMax = Math.min(max, rangeMin + step - 1);
    return {
      label: `${formatRangeAmount(rangeMin)} - ${formatRangeAmount(rangeMax)}`,
      value: `${rangeMin}-${rangeMax}`,
      min: rangeMin,
      max: rangeMax,
    };
  }).filter((range) => range.min <= range.max);
};
const matchesPrice = (price: number | null | undefined, range: PriceRangeOption | undefined) => {
  return typeof price === "number" && range !== undefined && price >= range.min && price <= range.max;
};

type SearchContentProps = { products: SearchProduct[]; queryLabel: string; emptyMessage?: string };

export function SearchContent({ products, queryLabel, emptyMessage = "No matching products were found in the marketplace DB." }: SearchContentProps) {
  const [showFilters, setShowFilters] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<SearchFilterState>(emptyFilters);
  const [sort, setSort] = useState<SearchSort>("best");
  const availableBrands = useMemo(() => Array.from(new Set(products.map((product) => product.brandName).filter((brand): brand is string => Boolean(brand)))).sort((a, b) => a.localeCompare(b)), [products]);
  const availablePrices = useMemo(() => buildPriceRanges(products), [products]);
  const priceRangeByValue = useMemo(() => new Map(availablePrices.map((range) => [range.value, range])), [availablePrices]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1280px)");
    const handleChange = (event: MediaQueryListEvent) => { if (event.matches) setMobileFiltersOpen(false); };
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  const toggleFilter = (key: SearchFilterKey, value: string) => setFilters((current) => ({ ...current, [key]: current[key].includes(value) ? current[key].filter((item) => item !== value) : [...current[key], value] }));
  const visibleProducts = useMemo(() => {
    const filtered = products.filter((product) =>
      (!filters.fitment.length || filters.fitment.includes(product.badgeType)) &&
      (!filters.brands.length || (product.brandName ? filters.brands.includes(product.brandName) : false)) &&
      (!filters.prices.length || filters.prices.some((range) => matchesPrice(product.unitPrice, priceRangeByValue.get(range)))) &&
      (!filters.availability.includes("in-stock") || (product.totalStock ?? 0) > 0)
    );
    if (sort === "price-low") return [...filtered].sort((a, b) => (a.unitPrice ?? Number.POSITIVE_INFINITY) - (b.unitPrice ?? Number.POSITIVE_INFINITY));
    if (sort === "price-high") return [...filtered].sort((a, b) => (b.unitPrice ?? Number.NEGATIVE_INFINITY) - (a.unitPrice ?? Number.NEGATIVE_INFINITY));
    if (sort === "name") return [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    return filtered;
  }, [filters, priceRangeByValue, products, sort]);
  const filterProps = { brands: availableBrands, prices: availablePrices, filters, onToggle: toggleFilter, onClear: () => setFilters(emptyFilters()) };

  return <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-4 sm:py-4 lg:px-4"><div className="flex flex-col gap-8 xl:flex-row">
    {showFilters ? <div className="hidden xl:block"><FiltersSidebar {...filterProps} /></div> : null}
    <div className="min-w-0 flex-1">
      <SearchToolbar showFilters={showFilters} resultsCount={visibleProducts.length} query={queryLabel} sort={sort} onSortChange={setSort} onOpenMobileFilters={() => setMobileFiltersOpen(true)} onToggleDesktopFilters={() => setShowFilters((current) => !current)} />
      {visibleProducts.length ? <SearchResultsGrid products={visibleProducts} showFilters={showFilters} /> : <div className="rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] p-8 text-center text-[#9CA3AF]">{products.length ? "No products match the selected filters. Clear filters and try again." : emptyMessage}</div>}
    </div>
  </div><MobileFilterDrawer open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen} title="Filters"><SearchFiltersPanel {...filterProps} showHeader={false} /></MobileFilterDrawer></div>;
}
