"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { MobileFilterDrawer } from "@/components/site/shared/mobile-filter-drawer";
import type { SearchProduct } from "@/types/site/search";
import { FiltersSidebar, SearchFiltersPanel, type PriceBounds, type SearchFilterKey, type SearchFilterState } from "./filters-sidebar";
import { SearchResultsGrid } from "./search-results-grid";
import { SearchToolbar, type SearchSort } from "./search-toolbar";

const emptyFilters = (): SearchFilterState => ({ fitment: [], brands: [], prices: [], availability: [] });
const pageSize = 6;
const encodePriceRange = (value: PriceBounds) => `${value.min}-${value.max}`;
const parsePriceRange = (value: string | undefined, fallback: PriceBounds): PriceBounds => {
  const [min, max] = (value ?? "").split("-").map(Number);
  return Number.isFinite(min) && Number.isFinite(max) ? { min, max } : fallback;
};
const samePriceRange = (left: PriceBounds, right: PriceBounds) =>
  left.min === right.min && left.max === right.max;
const clampPriceRange = (value: PriceBounds, bounds: PriceBounds): PriceBounds => {
  const min = Math.max(bounds.min, Math.min(value.min, bounds.max));
  const max = Math.max(min, Math.min(value.max, bounds.max));
  return { min, max };
};
const splitBrands = (value: string | null | undefined) =>
  (value ?? "").split(/[,/|]+/).map((brand) => brand.trim()).filter(Boolean);
const brandKey = (value: string) => value.toLowerCase();
const brandAlias = (value: string) => {
  const key = brandKey(value);
  if (key === "vw") return "volkswagen";
  return key;
};
const productMatchesBrand = (product: SearchProduct, selectedBrands: Set<string>) => {
  const brands = splitBrands(product.brandName);
  if (!brands.length) return false;
  if (brands.length === 1) return selectedBrands.has(brandKey(brands[0]));

  const text = `${product.title} ${product.partNo}`.toLowerCase();
  return brands.some((brand) => {
    const key = brandKey(brand);
    return selectedBrands.has(key) && (text.includes(key) || text.includes(brandAlias(brand)));
  });
};

type SearchContentProps = { products: SearchProduct[]; queryLabel: string; emptyMessage?: string };

export function SearchContent({ products, queryLabel, emptyMessage = "No matching products were found in the marketplace DB." }: SearchContentProps) {
  const resultsTopRef = useRef<HTMLDivElement | null>(null);
  const [showFilters, setShowFilters] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<SearchFilterState>(emptyFilters);
  const [sort, setSort] = useState<SearchSort>("best");
  const [page, setPage] = useState(1);
  const priceBounds = useMemo<PriceBounds>(() => {
    const prices = products
      .map((product) => product.unitPrice)
      .filter((price): price is number => typeof price === "number" && Number.isFinite(price));
    if (!prices.length) return { min: 0, max: 0 };
    return { min: Math.floor(Math.min(...prices)), max: Math.ceil(Math.max(...prices)) };
  }, [products]);
  const selectedPrice = useMemo(
    () => clampPriceRange(parsePriceRange(filters.prices[0], priceBounds), priceBounds),
    [filters.prices, priceBounds],
  );
  const availableBrands = useMemo(() => {
    const brands = new Map<string, string>();
    for (const product of products) {
      for (const brand of splitBrands(product.brandName)) {
        if (!brands.has(brandKey(brand))) brands.set(brandKey(brand), brand);
      }
    }
    return Array.from(brands.values()).slice(0, 5);
  }, [products]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1280px)");
    const handleChange = (event: MediaQueryListEvent) => { if (event.matches) setMobileFiltersOpen(false); };
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  const toggleFilter = (key: SearchFilterKey, value: string) => {
    setPage(1);
    setFilters((current) => ({ ...current, [key]: current[key].includes(value) ? current[key].filter((item) => item !== value) : [...current[key], value] }));
  };
  const changePriceRange = (value: PriceBounds) => {
    const next = clampPriceRange(value, priceBounds);
    setPage(1);
    setFilters((current) => ({
      ...current,
      prices: samePriceRange(next, priceBounds) ? [] : [encodePriceRange(next)],
    }));
  };
  const visibleProducts = useMemo(() => {
    const selectedBrands = new Set(filters.brands.map(brandKey));
    const hasPriceFilter = filters.prices.length > 0;
    const filtered = products.filter((product) =>
      (!filters.fitment.length || filters.fitment.includes(product.badgeType)) &&
      (!selectedBrands.size || productMatchesBrand(product, selectedBrands)) &&
      (!hasPriceFilter || (typeof product.unitPrice === "number" && product.unitPrice >= selectedPrice.min && product.unitPrice <= selectedPrice.max)) &&
      (!filters.availability.includes("in-stock") || (product.totalStock ?? 0) > 0)
    );
    if (sort === "price-low") return [...filtered].sort((a, b) => (a.unitPrice ?? Number.POSITIVE_INFINITY) - (b.unitPrice ?? Number.POSITIVE_INFINITY));
    if (sort === "price-high") return [...filtered].sort((a, b) => (b.unitPrice ?? Number.NEGATIVE_INFINITY) - (a.unitPrice ?? Number.NEGATIVE_INFINITY));
    if (sort === "name") return [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    return filtered;
  }, [filters, products, selectedPrice, sort]);
  const totalPages = Math.max(1, Math.ceil(visibleProducts.length / pageSize));
  const pagedProducts = visibleProducts.slice((page - 1) * pageSize, page * pageSize);
  const filterProps = { brands: availableBrands, priceBounds, priceValue: selectedPrice, filters, onToggle: toggleFilter, onPriceChange: changePriceRange, onClear: () => { setPage(1); setFilters(emptyFilters()); } };
  const goToPage = (nextPage: number) => {
    setPage(Math.min(totalPages, Math.max(1, nextPage)));
    resultsTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-4 sm:py-4 lg:px-4"><div className="flex flex-col gap-8 xl:flex-row">
    {showFilters ? <div className="hidden xl:block"><FiltersSidebar {...filterProps} /></div> : null}
    <div ref={resultsTopRef} className="min-w-0 flex-1 scroll-mt-24">
      <SearchToolbar showFilters={showFilters} resultsCount={visibleProducts.length} query={queryLabel} sort={sort} onSortChange={(value) => { setPage(1); setSort(value); }} onOpenMobileFilters={() => setMobileFiltersOpen(true)} onToggleDesktopFilters={() => setShowFilters((current) => !current)} />
      {visibleProducts.length ? <>
        <SearchResultsGrid products={pagedProducts} showFilters={showFilters} />
        <div className="mt-8 flex flex-col gap-3 text-sm text-[#9CA3AF] sm:flex-row sm:items-center sm:justify-between">
          <p>Showing {(page - 1) * pageSize + 1}-{Math.min(page * pageSize, visibleProducts.length)} of {visibleProducts.length}</p>
          <div className="flex items-center gap-2">
            <button type="button" disabled={page <= 1} onClick={() => goToPage(page - 1)} className="rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] px-4 py-2 text-white transition-colors hover:border-[#DC2626] disabled:cursor-not-allowed disabled:opacity-50">Previous</button>
            <span>Page {page} of {totalPages}</span>
            <button type="button" disabled={page >= totalPages} onClick={() => goToPage(page + 1)} className="rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] px-4 py-2 text-white transition-colors hover:border-[#DC2626] disabled:cursor-not-allowed disabled:opacity-50">Next</button>
          </div>
        </div>
      </> : <div className="rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] p-8 text-center text-[#9CA3AF]">{products.length ? "No products match the selected filters. Clear filters and try again." : emptyMessage}</div>}
    </div>
  </div><MobileFilterDrawer open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen} title="Filters"><SearchFiltersPanel {...filterProps} showHeader={false} /></MobileFilterDrawer></div>;
}
