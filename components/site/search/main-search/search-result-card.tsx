"use client";

/* eslint-disable @next/next/no-img-element */

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  FitmentConfirmedIcon,
  FitmentLikelyIcon,
  FitmentRejectedIcon,
  RatingStarIcon,
  SellerPackageIcon,
} from "@/components/icons/site-icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type {
  SearchProduct,
  SearchProductBadgeType,
} from "@/types/site/search";

const badgeClassNames: Record<SearchProductBadgeType, string> = {
  fit: "border-[#10B981]/30 bg-[#10B981] text-white",
  likely: "border-[#F59E0B]/30 bg-[#F59E0B] text-[#F59E0B]",
  no: "border-[#DC2626]/30 bg-[#DC2626]/10 text-[#DC2626]",
};

const badgeIcons: Record<SearchProductBadgeType, typeof FitmentConfirmedIcon> =
  {
    fit: FitmentConfirmedIcon,
    likely: FitmentLikelyIcon,
    no: FitmentRejectedIcon,
  };

function SearchRatingStars() {
  return (
    <div className="flex">
      <RatingStarIcon filled className="h-4 w-4 text-[#F59E0B]" />
      <RatingStarIcon filled className="h-4 w-4 text-[#F59E0B]" />
      <RatingStarIcon filled className="h-4 w-4 text-[#F59E0B]" />
      <RatingStarIcon filled className="h-4 w-4 text-[#F59E0B]" />
      <RatingStarIcon className="h-4 w-4 text-[#2A2A2A]" />
    </div>
  );
}

type SearchResultCardProps = {
  product: SearchProduct;
};

export function SearchResultCard({ product }: SearchResultCardProps) {
  const BadgeIcon = badgeIcons[product.badgeType];
  const imageCandidates = useMemo(
    () =>
      Array.from(
        new Set([...(product.images ?? []), product.image].filter(Boolean))
      ),
    [product.image, product.images]
  );
  const [imageIndex, setImageIndex] = useState(0);
  const displayImage = imageCandidates[imageIndex] ?? product.image;

  return (
    <div className="group relative">
      <Link
        href={product.href}
        className={cn(
          "block h-full overflow-hidden rounded-xl border-2 bg-[#1A1A1A] transition-all",
          product.highlight
            ? "border-[#DC2626] shadow-xl shadow-[#DC2626]/20"
            : "border-[#2A2A2A] hover:border-[#DC2626]/50 hover:shadow-xl hover:shadow-[#DC2626]/10",
        )}
      >
        {product.highlight ? (
          <div className="absolute top-4 right-4 z-10 rounded-xl bg-gradient-to-r from-[#DC2626] to-[#B91C1C] px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
            {product.highlightLabel}
          </div>
        ) : null}

        <div className="relative aspect-square overflow-hidden bg-[#0A0A0A]">
          <img
            src={displayImage}
            alt={product.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => {
              setImageIndex((currentIndex) =>
                currentIndex < imageCandidates.length - 1
                  ? currentIndex + 1
                  : currentIndex
              );
            }}
          />

          <div
            className={cn(
              "absolute top-4 left-4 flex items-center gap-2 rounded-xl border px-3 py-1.5 backdrop-blur-sm   ",
              badgeClassNames[product.badgeType],
            )}
          >
            <BadgeIcon className="h-4 w-4 text-white" />
            <span className="text-xs font-medium text-white">
              {product.badge}
            </span>
          </div>

          {product.stockLabel ? (
            <div className="absolute bottom-4 left-4 rounded-xl border border-[#DC2626]/30 bg-[#DC2626]/10 px-3 py-1.5 text-xs font-medium text-[#DC2626] backdrop-blur-sm">
              {product.stockLabel}
            </div>
          ) : null}
        </div>

        <div className="p-6">
          <div className="mb-3 flex flex-wrap justify-between items-center gap-2">
            <div className="flex items-center gap-2">
              <SellerPackageIcon className="h-4 w-4 text-[#9CA3AF]" />
              <span className="text-sm text-[#9CA3AF]">{product.seller}</span>
            </div>
            <div className=" flex items-center gap-2">
              <SearchRatingStars />
              <span className="text-sm font-medium text-white">
                {product.rating}
              </span>
              <span className="text-sm text-[#9CA3AF]">{product.reviews}</span>
            </div>
          </div>

          <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-white transition-colors group-hover:text-[#DC2626]">
            {product.title}
          </h3>

          <p className="mb-4 text-sm text-[#9CA3AF]">
            Part #: {product.partNo}
          </p>

          <div className="flex items-center justify-between border-t border-[#2A2A2A] pt-4">
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-white">{product.price}</p>
              <p className="text-xs text-[#9CA3AF]">{product.shipping}</p>
            </div>

            <span className={cn(buttonVariants(), "rounded-xl px-6 py-5")}>
              View Details
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
