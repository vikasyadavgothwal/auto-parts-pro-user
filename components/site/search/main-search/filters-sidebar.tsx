import type { ComponentProps, ComponentType } from "react";
import {
  FitmentConfirmedIcon,
  FitmentLikelyIcon,
} from "@/components/icons/site-icons";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

type FilterOption = {
  label: string;
  defaultChecked?: boolean;
  icon?: ComponentType<ComponentProps<"svg">>;
  iconClassName?: string;
};

type FilterSectionProps = {
  title: string;
  options: readonly FilterOption[];
};

const checkboxClassName =
  "h-4 w-4   data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500";

const fitmentOptions: FilterOption[] = [
  {
    label: "Confirmed Fit",
    defaultChecked: true,
    icon: FitmentConfirmedIcon,
    iconClassName: "text-[#10B981]",
  },
  {
    label: "Likely Fit",
    icon: FitmentLikelyIcon,
    iconClassName: "text-[#F59E0B]",
  },
] as const;

const availabilityOptions: FilterOption[] = [
  {
    label: "In Stock Only",
    defaultChecked: true,
  },
] as const;

function FilterSection({ title, options }: FilterSectionProps) {
  return (
    <div className="mb-6">
      <h4 className="mb-3 text-sm font-medium text-white">{title}</h4>
      <div className="space-y-2">
        {options.map(({ label, defaultChecked, icon: Icon, iconClassName }) => (
          <label
            key={label}
            className="group flex cursor-pointer items-center gap-3"
          >
            <Checkbox defaultChecked={defaultChecked} className={checkboxClassName} />
            <div className="flex flex-1 items-center gap-2">
              {Icon ? <Icon className={`h-4 w-4 ${iconClassName}`} /> : null}
              <span className="text-sm text-[#9CA3AF] group-hover:text-white">
                {label}
              </span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
type FiltersSidebarProps = {
  brands: readonly string[];
  prices: readonly string[];
};

type SearchFiltersPanelProps = FiltersSidebarProps & {
  showHeader?: boolean;
  className?: string;
};

export function SearchFiltersPanel({
  brands,
  prices,
  showHeader = true,
  className,
}: SearchFiltersPanelProps) {
  return (
    <div className={cn(className)}>
      {showHeader ? (
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Filters</h3>
          <button type="button" className="text-sm text-[#DC2626] hover:underline">
            Clear all
          </button>
        </div>
      ) : null}

      <FilterSection title="Fitment Status" options={fitmentOptions} />
      <div className="my-6 border-t border-[#2A2A2A]" />

      <FilterSection
        title="Brand"
        options={brands.map((brand) => ({ label: brand }))}
      />
      <div className="my-6 border-t border-[#2A2A2A]" />

      <FilterSection
        title="Price Range"
        options={prices.map((price) => ({ label: price }))}
      />
      <div className="my-6 border-t border-[#2A2A2A]" />

      <FilterSection title="Availability" options={availabilityOptions} />
    </div>
  );
}

export function FiltersSidebar({
  brands,
  prices,
}: FiltersSidebarProps) {
  return (
    <aside className="w-full xl:w-70 xl:shrink-0 transition-all duration-300">
      <div className="rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] p-6 xl:sticky xl:top-28">
        <SearchFiltersPanel brands={brands} prices={prices} />
      </div>
    </aside>
  );
}
