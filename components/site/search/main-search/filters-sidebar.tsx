import type { ComponentProps, ComponentType } from "react";
import { FitmentConfirmedIcon, FitmentLikelyIcon } from "@/components/icons/site-icons";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

export type SearchFilterKey = "fitment" | "brands" | "prices" | "availability";
export type SearchFilterState = Record<SearchFilterKey, string[]>;
export type PriceBounds = { min: number; max: number };

type FilterOption = { label: string; value: string; icon?: ComponentType<ComponentProps<"svg">>; iconClassName?: string };
type FilterSectionProps = { title: string; options: readonly FilterOption[]; selected: string[]; onToggle: (value: string) => void };

const checkboxClassName = "h-4 w-4 data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500";
const fitmentOptions: FilterOption[] = [
  { label: "Confirmed Fit", value: "fit", icon: FitmentConfirmedIcon, iconClassName: "text-[#10B981]" },
  { label: "Unconfirmed Fit", value: "likely", icon: FitmentLikelyIcon, iconClassName: "text-[#F59E0B]" },
];
const availabilityOptions: FilterOption[] = [{ label: "In Stock Only", value: "in-stock" }];

function FilterSection({ title, options, selected, onToggle }: FilterSectionProps) {
  return <div className="mb-6"><h4 className="mb-3 text-sm font-medium text-white">{title}</h4><div className="space-y-2">{options.map(({ label, value, icon: Icon, iconClassName }) => <label key={value} className="group flex cursor-pointer items-center gap-3"><Checkbox checked={selected.includes(value)} onCheckedChange={() => onToggle(value)} className={checkboxClassName} /><div className="flex flex-1 items-center gap-2">{Icon ? <Icon className={`h-4 w-4 ${iconClassName}`} /> : null}<span className="text-sm text-[#9CA3AF] group-hover:text-white">{label}</span></div></label>)}</div></div>;
}

const formatPrice = (value: number) =>
  `AED ${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

function PriceRangeSlider({
  bounds,
  value,
  onChange,
}: {
  bounds: PriceBounds;
  value: PriceBounds;
  onChange: (value: PriceBounds) => void;
}) {
  const disabled = bounds.max <= bounds.min;
  const step = 1;
  const minPercent = disabled ? 0 : ((value.min - bounds.min) / (bounds.max - bounds.min)) * 100;
  const maxPercent = disabled ? 100 : ((value.max - bounds.min) / (bounds.max - bounds.min)) * 100;

  return (
    <div className="mb-6">
      <h4 className="mb-3 text-sm font-medium text-white">Price Range</h4>
      <div className="mb-3 grid grid-cols-2 gap-3 text-sm text-[#E5E7EB]">
        <span className="min-w-0 truncate">{formatPrice(value.min)}</span>
        <span className="min-w-0 truncate text-right">{formatPrice(value.max)}</span>
      </div>
      <div className="relative h-8">
        <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-[#2A2A2A]" />
        <div
          className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-[#DC2626]"
          style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
        />
        <input
          type="range"
          aria-label="Minimum price"
          min={bounds.min}
          max={bounds.max}
          step={step}
          value={value.min}
          disabled={disabled}
          onChange={(event) =>
            onChange({ min: Math.min(Number(event.target.value), value.max), max: value.max })
          }
          className="pointer-events-none absolute inset-x-0 top-1/2 h-1 w-full -translate-y-1/2 appearance-none bg-transparent accent-[#DC2626] disabled:opacity-50 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#DC2626]"
        />
        <input
          type="range"
          aria-label="Maximum price"
          min={bounds.min}
          max={bounds.max}
          step={step}
          value={value.max}
          disabled={disabled}
          onChange={(event) =>
            onChange({ min: value.min, max: Math.max(Number(event.target.value), value.min) })
          }
          className="pointer-events-none absolute inset-x-0 top-1/2 h-1 w-full -translate-y-1/2 appearance-none bg-transparent accent-[#DC2626] disabled:opacity-50 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#DC2626]"
        />
      </div>
      <div className="mt-1 grid grid-cols-2 gap-3 text-xs text-[#9CA3AF]">
        <span className="min-w-0 truncate">{formatPrice(bounds.min)}</span>
        <span className="min-w-0 truncate text-right">{formatPrice(bounds.max)}</span>
      </div>
    </div>
  );
}

type SearchFiltersPanelProps = {
  brands: readonly string[];
  priceBounds: PriceBounds;
  priceValue: PriceBounds;
  filters: SearchFilterState;
  onToggle: (key: SearchFilterKey, value: string) => void;
  onPriceChange: (value: PriceBounds) => void;
  onClear: () => void;
  showHeader?: boolean;
  className?: string;
};

export function SearchFiltersPanel({ brands, priceBounds, priceValue, filters, onToggle, onPriceChange, onClear, showHeader = true, className }: SearchFiltersPanelProps) {
  return <div className={cn(className)}>
    {showHeader ? <div className="mb-6 flex items-center justify-between"><h3 className="text-lg font-semibold text-white">Filters</h3><button type="button" onClick={onClear} className="text-sm text-[#DC2626] hover:underline">Clear all</button></div> : null}
    <FilterSection title="Fitment Status" options={fitmentOptions} selected={filters.fitment} onToggle={(value) => onToggle("fitment", value)} />
    <div className="my-6 border-t border-[#2A2A2A]" />
    <FilterSection title="Brand" options={brands.map((brand) => ({ label: brand, value: brand }))} selected={filters.brands} onToggle={(value) => onToggle("brands", value)} />
    <div className="my-6 border-t border-[#2A2A2A]" />
    <PriceRangeSlider bounds={priceBounds} value={priceValue} onChange={onPriceChange} />
    <div className="my-6 border-t border-[#2A2A2A]" />
    <FilterSection title="Availability" options={availabilityOptions} selected={filters.availability} onToggle={(value) => onToggle("availability", value)} />
    {!showHeader ? <button type="button" onClick={onClear} className="text-sm text-[#DC2626] hover:underline">Clear all filters</button> : null}
  </div>;
}

export function FiltersSidebar(props: Omit<SearchFiltersPanelProps, "className">) {
  return <aside className="w-full transition-all duration-300 xl:w-70 xl:shrink-0"><div className="rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] p-6 xl:sticky xl:top-28"><SearchFiltersPanel {...props} /></div></aside>;
}
