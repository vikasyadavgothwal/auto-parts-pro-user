import {
  DropdownChevronIcon,
  FilterSlidersIcon,
} from "@/components/icons/site-icons";

type SearchToolbarProps = {
  showFilters: boolean;
  resultsCount: number;
  query: string;
  sortLabel: string;
  onOpenMobileFilters: () => void;
  onToggleDesktopFilters: () => void;
};

export function SearchToolbar({
  showFilters,
  resultsCount,
  query,
  sortLabel,
  onOpenMobileFilters,
  onToggleDesktopFilters,
}: SearchToolbarProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <button
          type="button"
          onClick={onOpenMobileFilters}
          className="flex items-center gap-2 w-max rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] px-4 py-2 text-white transition-colors hover:border-[#DC2626] xl:hidden"
        >
          <FilterSlidersIcon className="h-4 w-4" />
          <span className="text-sm">Show Filters</span>
        </button>

        <button
          type="button"
          onClick={onToggleDesktopFilters}
          className="hidden items-center gap-2 rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] px-4 py-2 text-white transition-colors hover:border-[#DC2626] xl:flex"
        >
          <FilterSlidersIcon className="h-4 w-4" />
          <span className="text-sm">
            {showFilters ? "Hide Filters" : "Show Filters"}
          </span>
        </button>

        <p className="text-sm text-[#9CA3AF]">
          Showing <span className="font-medium text-white">{resultsCount}</span>{" "}
          results for
          <span className="font-medium text-white"> {query}</span>
        </p>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-[#9CA3AF]">Sort by:</span>
        <button
          type="button"
          className="flex items-center gap-2 rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] px-4 py-2 text-white transition-colors hover:border-[#DC2626]"
        >
          <span className="text-sm">{sortLabel}</span>
          <DropdownChevronIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
