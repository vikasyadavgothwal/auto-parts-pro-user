import Image from "next/image";
import Link from "next/link";
import {
  DropdownChevronIcon,
  FilterSlidersIcon,
  FitmentConfirmedIcon,
  FitmentLikelyIcon,
  FitmentRejectedIcon,
  RatingStarIcon,
  SellerPackageIcon,
} from "@/components/icons/site-icons";
import { MainHeader } from "@/components/site/header";
import { VehicleChangeSection } from "@/components/site/user/sections/vehicle-change-section";
import type { SearchProduct } from "@/types/site/search";

const products: SearchProduct[] = [
  {
    id: 1,
    href: "/product/1",
    title: "ACDelco Professional Front Disc Brake Pad Set",
    partNo: "ACDelco 17D1259CH",
    seller: "ACDelco Authorized",
    price: "$89.99",
    shipping: "Free 2-Day",
    rating: "4.8",
    reviews: "(234)",
    badge: "Confirmed Fit",
    badgeType: "fit",
    image:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=400&fit=crop",
    highlight: false,
  },
  {
    id: 2,
    href: "/product/2",
    title: "Bosch QuietCast Premium Ceramic Brake Pads",
    partNo: "Bosch BC1259",
    seller: "Bosch Direct",
    price: "$124.99",
    shipping: "Free 2-Day",
    rating: "4.9",
    reviews: "(512)",
    badge: "Confirmed Fit",
    badgeType: "fit",
    image:
      "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=400&h=400&fit=crop",
    highlight: true,
    highlightLabel: "⭐ Best Value",
  },
  {
    id: 3,
    href: "/product/3",
    title: "Wagner ThermoQuiet Ceramic Brake Pad Set",
    partNo: "Wagner QC1259",
    seller: "Wagner Parts",
    price: "$74.99",
    shipping: "Standard",
    rating: "4.6",
    reviews: "(189)",
    badge: "Likely Fit",
    badgeType: "likely",
    image:
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&h=400&fit=crop",
    highlight: false,
  },
  {
    id: 4,
    href: "/product/4",
    title: "Brembo Ceramic Brake Pad Set - Premium",
    partNo: "Brembo P56065N",
    seller: "Brembo Official",
    price: "$159.99",
    shipping: "3-5 Days",
    rating: "5.0",
    reviews: "(87)",
    badge: "Confirmed Fit",
    badgeType: "fit",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=400&fit=crop",
    stockLabel: "Out of Stock",
    highlight: false,
  },
  {
    id: 5,
    href: "/product/5",
    title: "EBC Brakes Yellowstuff Performance Pads",
    partNo: "EBC DP41259R",
    seller: "EBC Brakes",
    price: "$139.99",
    shipping: "Free 2-Day",
    rating: "4.7",
    reviews: "(156)",
    badge: "Confirmed Fit",
    badgeType: "fit",
    image:
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=400&fit=crop",
    highlight: false,
  },
  {
    id: 6,
    href: "/product/6",
    title: "Hawk Performance HPS 5.0 Brake Pads",
    partNo: "Hawk HB1259B",
    seller: "Hawk Performance",
    price: "$129.99",
    shipping: "Free 2-Day",
    rating: "4.8",
    reviews: "(201)",
    badge: "Not Confirmed",
    badgeType: "no",
    image:
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=400&h=400&fit=crop",
    highlight: false,
  },
];
const brands = [
  "ACDelco",
  "Bosch",
  "Brembo",
  "Wagner",
  "EBC Brakes",
  "Hawk Performance",
];

const prices = ["Under $50", "$50 - $100", "$100 - $150", "Over $150"];

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <MainHeader />
      <VehicleChangeSection />

      <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="flex flex-col gap-8 xl:flex-row">
          <aside className="w-full xl:w-80 xl:shrink-0">
            <div className="rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] p-6 xl:sticky xl:top-28">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Filters</h3>
                <button className="text-sm text-[#DC2626] hover:underline">
                  Clear all
                </button>
              </div>

              <div className="mb-6">
                <h4 className="mb-3 text-sm font-medium text-white">
                  Fitment Status
                </h4>
                <div className="space-y-2">
                  <label className="group flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 rounded border-[#2A2A2A] bg-[#0A0A0A] text-[#DC2626] focus:ring-[#DC2626]/20"
                    />
                    <div className="flex flex-1 items-center gap-2">
                      <FitmentConfirmedIcon className="h-4 w-4 text-[#10B981]" />
                      <span className="text-sm text-[#9CA3AF] group-hover:text-white">
                        Confirmed Fit
                      </span>
                    </div>
                  </label>

                  <label className="group flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-[#2A2A2A] bg-[#0A0A0A] text-[#DC2626] focus:ring-[#DC2626]/20"
                    />
                    <div className="flex flex-1 items-center gap-2">
                      <FitmentLikelyIcon className="h-4 w-4 text-[#F59E0B]" />
                      <span className="text-sm text-[#9CA3AF] group-hover:text-white">
                        Likely Fit
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="my-6 border-t border-[#2A2A2A]" />

              <div className="mb-6">
                <h4 className="mb-3 text-sm font-medium text-white">Brand</h4>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <label
                      key={brand}
                      className="group flex cursor-pointer items-center gap-3"
                    >
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-[#2A2A2A] bg-[#0A0A0A] text-[#DC2626] focus:ring-[#DC2626]/20"
                      />
                      <span className="text-sm text-[#9CA3AF] group-hover:text-white">
                        {brand}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="my-6 border-t border-[#2A2A2A]" />

              <div className="mb-6">
                <h4 className="mb-3 text-sm font-medium text-white">
                  Price Range
                </h4>
                <div className="space-y-2">
                  {prices.map((price) => (
                    <label
                      key={price}
                      className="group flex cursor-pointer items-center gap-3"
                    >
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-[#2A2A2A] bg-[#0A0A0A] text-[#DC2626] focus:ring-[#DC2626]/20"
                      />
                      <span className="text-sm text-[#9CA3AF] group-hover:text-white">
                        {price}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="my-6 border-t border-[#2A2A2A]" />

              <div>
                <h4 className="mb-3 text-sm font-medium text-white">
                  Availability
                </h4>
                <label className="group flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 rounded border-[#2A2A2A] bg-[#0A0A0A] text-[#DC2626] focus:ring-[#DC2626]/20"
                  />
                  <span className="text-sm text-[#9CA3AF] group-hover:text-white">
                    In Stock Only
                  </span>
                </label>
              </div>
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <button className="flex items-center gap-2 rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] px-4 py-2 text-white transition-colors hover:border-[#DC2626] xl:hidden">
                  <FilterSlidersIcon className="h-4 w-4" />
                  <span className="text-sm">Filters</span>
                </button>

                <p className="text-sm text-[#9CA3AF]">
                  Showing <span className="font-medium text-white">6</span>{" "}
                  results for
                  <span className="font-medium text-white"> Brake Pads</span>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm text-[#9CA3AF]">Sort by:</span>
                <button className="flex items-center gap-2 rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] px-4 py-2 text-white transition-colors hover:border-[#DC2626]">
                  <span className="text-sm">Best Match</span>
                  <DropdownChevronIcon className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-3">
              {products.map((product) => {
                const isFit = product.badgeType === "fit";
                const isLikely = product.badgeType === "likely";

                return (
                  <div key={product.id} className="group relative">
                    <Link
                      href={product.href}
                      className={`block h-full overflow-hidden rounded-xl border-2 bg-[#1A1A1A] transition-all ${
                        product.highlight
                          ? "border-[#DC2626] shadow-xl shadow-[#DC2626]/20"
                          : "border-[#2A2A2A] hover:border-[#DC2626]/50 hover:shadow-xl hover:shadow-[#DC2626]/10"
                      }`}
                    >
                      {product.highlight && (
                        <div className="absolute top-4 right-4 z-10 rounded-lg bg-gradient-to-r from-[#DC2626] to-[#B91C1C] px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
                          {product.highlightLabel}
                        </div>
                      )}

                      <div className="relative aspect-square overflow-hidden bg-[#0A0A0A]">
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />

                        <div
                          className={`absolute top-4 left-4 flex items-center gap-2 rounded-lg border px-3 py-1.5 backdrop-blur-sm ${
                            isFit
                              ? "border-[#10B981]/30 bg-[#10B981]/10 text-[#10B981]"
                              : isLikely
                                ? "border-[#F59E0B]/30 bg-[#F59E0B]/10 text-[#F59E0B]"
                                : "border-[#DC2626]/30 bg-[#DC2626]/10 text-[#DC2626]"
                          }`}
                        >
                          {isFit ? (
                            <FitmentConfirmedIcon className="h-4 w-4" />
                          ) : isLikely ? (
                            <FitmentLikelyIcon className="h-4 w-4" />
                          ) : (
                            <FitmentRejectedIcon className="h-4 w-4" />
                          )}
                          <span className="text-xs font-medium">
                            {product.badge}
                          </span>
                        </div>

                        {product.stockLabel && (
                          <div className="absolute bottom-4 left-4 rounded-lg border border-[#DC2626]/30 bg-[#DC2626]/10 px-3 py-1.5 text-xs font-medium text-[#DC2626] backdrop-blur-sm">
                            {product.stockLabel}
                          </div>
                        )}
                      </div>

                      <div className="p-6">
                        <div className="mb-3 flex flex-wrap items-center gap-2">
                          <div className="flex items-center gap-2">
                            <SellerPackageIcon className="h-4 w-4 text-[#9CA3AF]" />
                            <span className="text-sm text-[#9CA3AF]">
                              {product.seller}
                            </span>
                          </div>
                        </div>

                        <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-white transition-colors group-hover:text-[#DC2626]">
                          {product.title}
                        </h3>

                        <p className="mb-4 text-sm text-[#9CA3AF]">
                          Part #: {product.partNo}
                        </p>

                        <div className="mb-4 flex items-center gap-2">
                          <div className="flex">
                            <RatingStarIcon
                              filled
                              className="h-4 w-4 text-[#F59E0B]"
                            />
                            <RatingStarIcon
                              filled
                              className="h-4 w-4 text-[#F59E0B]"
                            />
                            <RatingStarIcon
                              filled
                              className="h-4 w-4 text-[#F59E0B]"
                            />
                            <RatingStarIcon
                              filled
                              className="h-4 w-4 text-[#F59E0B]"
                            />
                            <RatingStarIcon className="h-4 w-4 text-[#2A2A2A]" />
                          </div>
                          <span className="text-sm font-medium text-white">
                            {product.rating}
                          </span>
                          <span className="text-sm text-[#9CA3AF]">
                            {product.reviews}
                          </span>
                        </div>

                        <div className="flex items-center justify-between border-t border-[#2A2A2A] pt-4">
                          <div>
                            <p className="text-2xl font-bold text-white">
                              {product.price}
                            </p>
                            <p className="text-xs text-[#9CA3AF]">
                              {product.shipping}
                            </p>
                          </div>

                          <button className="rounded-lg bg-[#DC2626] px-6 py-2.5 font-medium text-white transition-all hover:bg-[#B91C1C]">
                            View Details
                          </button>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
