"use client";

import { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { brands, prices , products } from "@/lib/data/Search";

export default function SearchPage() {
  const [showFilters, setShowFilters] = useState(true);

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <MainHeader />
      <VehicleChangeSection />

      <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-4 sm:py-4 lg:px-4">
        <div className="flex flex-col gap-8 xl:flex-row">
          {showFilters && (
            <aside className="w-full xl:w-70 xl:shrink-0 transition-all duration-300">
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
          )}

          <div className="min-w-0 flex-1">
            <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 rounded-sm border border-[#2A2A2A] bg-[#1A1A1A] px-4 py-2 text-white transition-colors hover:border-[#DC2626]"
                >
                  <FilterSlidersIcon className="h-4 w-4" />
                  <span className="text-sm">
                    {showFilters ? "Hide Filters" : "Show Filters"}
                  </span>
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

            <div
              className={`grid grid-cols-1 gap-6 md:grid-cols-3 ${
                showFilters ? "2xl:grid-cols-3" : "xl:grid-cols-4 2xl:grid-cols-4"
              }`}
            >
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

                          {/* <button className="rounded-lg bg-[#DC2626] px-6 py-2.5 font-medium text-white transition-all hover:bg-[#B91C1C]">
                            View Details
                          </button> */}
                          <Button  className="px-6 py-5 rounded-sm">
                            View Details
                          </Button>
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
