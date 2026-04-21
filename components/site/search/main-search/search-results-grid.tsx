import { cn } from "@/lib/utils";
import type { SearchProduct } from "@/types/site/search";
import { SearchResultCard } from "./search-result-card";

type SearchResultsGridProps = {
  products: readonly SearchProduct[];
  showFilters: boolean;
};

export function SearchResultsGrid({
  products,
  showFilters,
}: SearchResultsGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6 md:grid-cols-3",
        showFilters ? "2xl:grid-cols-3" : "xl:grid-cols-4 2xl:grid-cols-4"
      )}
    >
      {products.map((product) => (
        <SearchResultCard key={product.id} product={product} />
      ))}
    </div>
  );
}
