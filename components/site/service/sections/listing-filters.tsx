"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { MobileFilterDrawer } from "@/components/site/shared/mobile-filter-drawer";

export type FilterKey =
  | "serviceTypes"
  | "availability"
  | "certifications"
  | "priceRanges";

export type FilterState = Record<FilterKey, string[]>;

export type FilterSection = {
  key: FilterKey;
  title: string;
  items: string[];
};

const checkboxClassName =
  "h-4 w-4 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500";

type FilterChangeHandler = (
  filterKey: FilterKey,
  item: string,
  checked: boolean,
) => void;

export function ListingFilters({
  filters,
  sections,
  onClearFilters,
  onFilterChange,
}: {
  filters: FilterState;
  sections: FilterSection[];
  onClearFilters: () => void;
  onFilterChange: FilterChangeHandler;
}) {
  return (
    <aside className="w-full transition-all duration-300 lg:w-80 lg:shrink-0">
      <div className="rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] p-6 lg:sticky lg:top-28">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Filters</h3>
          <button
            type="button"
            onClick={onClearFilters}
            className="text-sm text-[#DC2626] hover:underline"
          >
            Clear all
          </button>
        </div>

        <ServiceFiltersContent
          filters={filters}
          sections={sections}
          onFilterChange={onFilterChange}
        />
      </div>
    </aside>
  );
}

export function ListingMobileFilters({
  open,
  filters,
  sections,
  onOpenChange,
  onClearFilters,
  onFilterChange,
}: {
  open: boolean;
  filters: FilterState;
  sections: FilterSection[];
  onOpenChange: (open: boolean) => void;
  onClearFilters: () => void;
  onFilterChange: FilterChangeHandler;
}) {
  return (
    <MobileFilterDrawer
      open={open}
      onOpenChange={onOpenChange}
      title="Filters"
      headerAction={
        <button
          type="button"
          onClick={onClearFilters}
          className="text-sm text-[#DC2626] hover:underline"
        >
          Clear all
        </button>
      }
    >
      <ServiceFiltersContent
        filters={filters}
        sections={sections}
        onFilterChange={onFilterChange}
      />
    </MobileFilterDrawer>
  );
}

function ServiceFiltersContent({
  filters,
  sections,
  onFilterChange,
}: {
  filters: FilterState;
  sections: FilterSection[];
  onFilterChange: FilterChangeHandler;
}) {
  return (
    <>
      {sections.map((section, index) => (
        <div key={section.key}>
          <FilterGroup
            title={section.title}
            items={section.items}
            checkedItems={filters[section.key]}
            onCheckedChange={(item, checked) =>
              onFilterChange(section.key, item, checked)
            }
          />

          {index < sections.length - 1 ? (
            <div className="my-6 border-t border-[#2A2A2A]" />
          ) : null}
        </div>
      ))}
    </>
  );
}

function FilterGroup({
  title,
  items,
  checkedItems,
  onCheckedChange,
}: {
  title: string;
  items: string[];
  checkedItems: string[];
  onCheckedChange: (item: string, checked: boolean) => void;
}) {
  return (
    <div>
      <h4 className="mb-3 text-sm font-medium text-white">{title}</h4>

      <div className="space-y-2">
        {items.map((item, index) => {
          const checkboxId = `${title}-${index}`
            .toLowerCase()
            .replace(/\s+/g, "-");

          return (
            <label
              key={item}
              htmlFor={checkboxId}
              className="group flex cursor-pointer items-center gap-3"
            >
              <Checkbox
                id={checkboxId}
                checked={checkedItems.includes(item)}
                onCheckedChange={(checked) =>
                  onCheckedChange(item, checked === true)
                }
                className={checkboxClassName}
              />
              <span className="text-sm text-brand-muted group-hover:text-white">
                {item}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
