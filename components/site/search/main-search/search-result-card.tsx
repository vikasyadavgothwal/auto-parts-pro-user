"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  FitmentConfirmedIcon,
  FitmentLikelyIcon,
  FitmentRejectedIcon,
  RatingStarIcon,
  SellerPackageIcon,
} from "@/components/icons/site-icons";
import { Checkbox } from "@/components/ui/checkbox";
import { buttonVariants } from "@/components/ui/button";
import { getCurrentUser, siteAuthenticatedFetch } from "@/lib/current-user";
import { cn } from "@/lib/utils";
import type {
  SearchProduct,
  SearchProductBadgeType,
} from "@/types/site/search";

type SavedStatusPayload = {
  ok?: boolean;
  saved?: boolean;
  watchForPriceDrops?: boolean;
  watchForStockReturns?: boolean;
  message?: string;
};

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

function SearchRatingStars({ rating }: { rating: number }) {
  const filledStars = Math.floor(rating);
  return (
    <div className="flex">
      {Array.from({ length: 5 }).map((_, index) => {
        const filled = index < filledStars;
        return (
          <RatingStarIcon
            key={index}
            filled={filled}
            className={`h-4 w-4 ${filled ? "text-[#F59E0B]" : "text-[#2A2A2A]"}`}
          />
        );
      })}
    </div>
  );
}

type SearchResultCardProps = {
  product: SearchProduct;
};

export function SearchResultCard({ product }: SearchResultCardProps) {
  const partUid = String(product.id);
  const productHref = product.href;
  const BadgeIcon = badgeIcons[product.badgeType];
  const imageCandidates = useMemo(
    () =>
      Array.from(
        new Set([...(product.images ?? []), product.image].filter(Boolean)),
      ),
    [product.image, product.images],
  );
  const [imageIndex, setImageIndex] = useState(0);
  const displayImage = imageCandidates[imageIndex] ?? product.image;
  const ratingValue = product.rating ? Number(product.rating) : null;
  const hasReviews =
    typeof ratingValue === "number" && Number.isFinite(ratingValue) && Boolean(product.reviews);
  const [canSave, setCanSave] = useState(false);
  const [saved, setSaved] = useState(false);
  const [watchForPriceDrops, setWatchForPriceDrops] = useState(false);
  const [watchForStockReturns, setWatchForStockReturns] = useState(false);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadSavedStatus() {
      const user = await getCurrentUser();
      const isUser = user?.activeRole === "User" && user.roles.includes("User");
      if (!mounted) return;
      setCanSave(Boolean(partUid && isUser));
      if (!partUid || !isUser) return;

      const response = await siteAuthenticatedFetch(
        `/api/saved-parts?partUid=${encodeURIComponent(partUid)}`,
        { credentials: "include", cache: "no-store" },
      );
      const payload = (await response.json().catch(() => null)) as
        | SavedStatusPayload
        | null;
      if (!mounted || !response.ok || !payload?.ok) return;

      setSaved(Boolean(payload.saved));
      setWatchForPriceDrops(Boolean(payload.watchForPriceDrops));
      setWatchForStockReturns(Boolean(payload.watchForStockReturns));
    }

    void loadSavedStatus();
    return () => {
      mounted = false;
    };
  }, [partUid]);

  const updateSavedPart = async (nextSaved: boolean, options?: { price?: boolean; stock?: boolean }) => {
    if (!partUid || pending) return;
    setPending(true);
    setMessage("");

    try {
      if (!nextSaved) {
        const response = await siteAuthenticatedFetch("/api/saved-parts", {
          method: "DELETE",
          credentials: "include",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ partUid }),
        });
        const payload = (await response.json().catch(() => null)) as
          | SavedStatusPayload
          | null;
        if (!response.ok || payload?.ok === false) {
          throw new Error(payload?.message || "Unable to update saved part.");
        }
        setSaved(false);
        setWatchForPriceDrops(false);
        setWatchForStockReturns(false);
        return;
      }

      const response = await siteAuthenticatedFetch("/api/saved-parts", {
        method: "POST",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          partUid,
          watchForPriceDrops: options?.price ?? watchForPriceDrops,
          watchForStockReturns: options?.stock ?? watchForStockReturns,
        }),
      });
      const payload = (await response.json().catch(() => null)) as
        | SavedStatusPayload
        | null;
      if (!response.ok || !payload?.ok) {
        throw new Error(payload?.message || "Unable to update saved part.");
      }
      setSaved(true);
      setWatchForPriceDrops(Boolean(payload.watchForPriceDrops));
      setWatchForStockReturns(Boolean(payload.watchForStockReturns));
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to update saved part.");
    } finally {
      setPending(false);
    }
  };

  const toggleWatchForPriceDrops = () => {
    const nextValue = !watchForPriceDrops;
    void updateSavedPart(true, { price: nextValue, stock: watchForStockReturns });
    setMessage(
      nextValue
        ? "You will be notified on lower price drops."
        : "Price watch removed.",
    );
  };

  const toggleWatchForStockReturns = () => {
    const nextValue = !watchForStockReturns;
    void updateSavedPart(true, { price: watchForPriceDrops, stock: nextValue });
    setMessage(
      nextValue
        ? "You will be notified when stock returns."
        : "Stock watch removed.",
    );
  };

  return (
    <article className="group relative">
      <div
        className={cn(
          "h-full overflow-hidden rounded-xl border-2 bg-[#1A1A1A] transition-all",
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

        <Link href={productHref} className="block">
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
                "absolute top-4 left-4 flex items-center gap-2 rounded-xl border px-3 py-1.5 backdrop-blur-sm",
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
              {hasReviews ? (
                <div className="flex items-center gap-2">
                  <SearchRatingStars rating={ratingValue} />
                  <span className="text-sm font-medium text-white">
                    {product.rating}
                  </span>
                  <span className="text-sm text-[#9CA3AF]">
                    {product.reviews}
                  </span>
                </div>
              ) : null}
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

              <span className={cn(buttonVariants(), "rounded-xl px-6 py-5")}>View Details</span>
            </div>
          </div>
        </Link>

        {canSave ? (
          <div className="space-y-2 border-t border-[#2A2A2A] bg-[#1A1A1A] p-4">
            <button
              type="button"
              onClick={() => void updateSavedPart(!saved)}
              disabled={pending}
              className="w-full rounded-xl border border-[#2A2A2A] bg-[#0F0F0F] px-4 py-2 text-sm text-white hover:border-[#DC2626] hover:text-[#DC2626]"
            >
              {pending ? "Saving..." : saved ? "Saved" : "Save this part"}
            </button>

            <label className="flex items-center gap-2 text-sm text-[#9CA3AF]">
              <Checkbox
                checked={watchForPriceDrops}
                disabled={!saved || pending}
                onCheckedChange={() => void toggleWatchForPriceDrops()}
              />
              <span>Watch for lower price</span>
            </label>

            <label className="flex items-center gap-2 text-sm text-[#9CA3AF]">
              <Checkbox
                checked={watchForStockReturns}
                disabled={!saved || pending}
                onCheckedChange={() => void toggleWatchForStockReturns()}
              />
              <span>Watch for stock return</span>
            </label>
            {message ? <p className="text-xs text-[#9CA3AF]">{message}</p> : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}
