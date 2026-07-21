import type { ComponentProps, ComponentType } from "react";
import { FitmentConfirmedIcon, FitmentLikelyIcon } from "@/components/icons/site-icons";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

export type SearchFilterKey = "fitment" | "brands" | "prices" | "availability";
export type SearchFilterState = Record<SearchFilterKey, string[]>;

type FilterOption = { label: string; value: string; icon?: ComponentType<ComponentProps<"svg">>; iconClassName?: string };
type FilterSectionProps = { title: string; options: readonly FilterOption[]; selected: string[]; onToggle: (value: string) => void };

const checkboxClassName = "h-4 w-4 data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500";
const fitmentOptions: FilterOption[] = [
  { label: "Confirmed Fit", value: "fit", icon: FitmentConfirmedIcon, iconClassName: "text-[#10B981]" },
  { label: "Likely Fit", value: "likely", icon: FitmentLikelyIcon, iconClassName: "text-[#F59E0B]" },
];
const availabilityOptions: FilterOption[] = [{ label: "In Stock Only", value: "in-stock" }];

function FilterSection({ title, options, selected, onToggle }: FilterSectionProps) {
  return <div className="mb-6"><h4 className="mb-3 text-sm font-medium text-white">{title}</h4><div className="space-y-2">{options.map(({ label, value, icon: Icon, iconClassName }) => <label key={value} className="group flex cursor-pointer items-center gap-3"><Checkbox checked={selected.includes(value)} onCheckedChange={() => onToggle(value)} className={checkboxClassName} /><div className="flex flex-1 items-center gap-2">{Icon ? <Icon className={`h-4 w-4 ${iconClassName}`} /> : null}<span className="text-sm text-[#9CA3AF] group-hover:text-white">{label}</span></div></label>)}</div></div>;
}

type SearchFiltersPanelProps = {
  brands: readonly string[];
  prices: readonly string[];
  filters: SearchFilterState;
  onToggle: (key: SearchFilterKey, value: string) => void;
  onClear: () => void;
  showHeader?: boolean;
  className?: string;
};

export function SearchFiltersPanel({ brands, prices, filters, onToggle, onClear, showHeader = true, className }: SearchFiltersPanelProps) {
  return <div className={cn(className)}>
    {showHeader ? <div className="mb-6 flex items-center justify-between"><h3 className="text-lg font-semibold text-white">Filters</h3><button type="button" onClick={onClear} className="text-sm text-[#DC2626] hover:underline">Clear all</button></div> : null}
    <FilterSection title="Fitment Status" options={fitmentOptions} selected={filters.fitment} onToggle={(value) => onToggle("fitment", value)} />
    <div className="my-6 border-t border-[#2A2A2A]" />
    <FilterSection title="Brand" options={brands.map((brand) => ({ label: brand, value: brand }))} selected={filters.brands} onToggle={(value) => onToggle("brands", value)} />
    <div className="my-6 border-t border-[#2A2A2A]" />
    <FilterSection title="Price Range" options={prices.map((price) => ({ label: price, value: price }))} selected={filters.prices} onToggle={(value) => onToggle("prices", value)} />
    <div className="my-6 border-t border-[#2A2A2A]" />
    <FilterSection title="Availability" options={availabilityOptions} selected={filters.availability} onToggle={(value) => onToggle("availability", value)} />
    {!showHeader ? <button type="button" onClick={onClear} className="text-sm text-[#DC2626] hover:underline">Clear all filters</button> : null}
  </div>;
}

export function FiltersSidebar(props: Omit<SearchFiltersPanelProps, "className">) {
  return <aside className="w-full transition-all duration-300 xl:w-70 xl:shrink-0"><div className="rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] p-6 xl:sticky xl:top-28"><SearchFiltersPanel {...props} /></div></aside>;
}
