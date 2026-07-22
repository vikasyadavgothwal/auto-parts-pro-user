"use client";

import Link from "next/link";

import {
  AwardIcon,
  Clock3Icon,
  MapPinIcon,
  RatingStarIcon,
} from "@/components/icons/site-icons";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { formatGaragePrice } from "@/lib/public-garages";
import type { PublicGarageSummary } from "@/types/site/garages";

function GarageRatingStars({ rating }: { rating: number }) {
  const filledStars = Math.round(Number(rating));

  return (
    <div className="flex">
      {Array.from({ length: 5 }).map((_, index) => (
        <RatingStarIcon
          key={index}
          filled={index < filledStars}
          className={cn(
            "h-4 w-4",
            index < filledStars ? "text-[#F59E0B]" : "text-[#2A2A2A]",
          )}
        />
      ))}
    </div>
  );
}

export function ListingItemCard({ garage }: { garage: PublicGarageSummary }) {
  const price = formatGaragePrice(garage.startingPrice, garage.currency);
  const certifications =
    garage.certifications.length > 0
      ? garage.certifications
      : ["Verified Garage"];
  const image =
    garage.image ||
    "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=900&h=675&fit=crop";
  const location = [
    garage.address,
    garage.city,
    garage.state,
    garage.country,
    garage.pincode,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="group relative">
      <Link
        href={`/garage/${encodeURIComponent(garage.id)}`}
        className="block h-full overflow-hidden rounded-xl border-2 border-[#2A2A2A] bg-[#1A1A1A] transition-all hover:border-[#DC2626]/50 hover:shadow-xl hover:shadow-[#DC2626]/10"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-[#0A0A0A]">
          <div
            className="h-full w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
            style={{ backgroundImage: `url("${image}")` }}
            aria-label={garage.name}
          />

          <div className="absolute top-4 left-4 flex items-center gap-2 rounded-xl border border-[#10B981]/30 bg-[#10B981] px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
            <Clock3Icon className="h-4 w-4" />
            <span>Verified</span>
          </div>

          <div className="absolute bottom-4 left-4 rounded-xl border border-white/10 bg-black/45 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
            Starting at {price}
          </div>
        </div>

        <div className="p-6">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              {certifications.slice(0, 3).map((certification, index) => (
                <Badge
                  key={`${certification}-${index}`}
                  variant="secondary"
                  className="rounded-sm border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary"
                >
                  {certification}
                </Badge>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <GarageRatingStars rating={garage.ratingAverage} />
              <span className="text-sm font-medium text-white">
                {garage.ratingAverage.toFixed(1)}
              </span>
              <span className="text-sm text-[#9CA3AF]">
                ({garage.reviewCount})
              </span>
            </div>
          </div>

          <h3 className="mb-2 line-clamp-2 text-xl font-semibold text-white transition-colors group-hover:text-[#DC2626]">
            {garage.name}
          </h3>

          <div className="mb-4 flex items-center gap-2 text-sm text-[#9CA3AF]">
            <MapPinIcon className="h-4 w-4 shrink-0" />
            <span className="line-clamp-1">
              {location || "Location not added"}
            </span>
          </div>

          <span className="mb-2 block text-sm font-medium text-[#9CA3AF]">
            Specialties:
          </span>
          <div className="mb-4 flex flex-wrap gap-2">
            {(garage.specialties.length
              ? garage.specialties
              : ["General Service"]
            )
              .slice(0, 3)
              .map((specialty) => (
                <Badge
                  key={specialty}
                  variant="secondary"
                  className="rounded-md border border-[#2A2A2A] bg-[#2A2A2A] px-3 py-1 text-xs text-white"
                >
                  {specialty}
                </Badge>
              ))}
          </div>

          <Card className="mb-4 rounded-xl border border-[#2A2A2A] bg-[#0A0A0A] shadow-none">
            <CardContent className="grid grid-cols-3 gap-4 p-4">
              <div>
                <div className="mb-1 flex items-center gap-1 text-xs text-[#9CA3AF]">
                  <AwardIcon className="h-3.5 w-3.5" />
                  <span>Jobs</span>
                </div>
                <div className="font-semibold text-white">
                  {garage.jobCompletedNumber.toLocaleString()}+
                </div>
              </div>

              <div>
                <div className="mb-1 flex items-center gap-1 text-xs text-[#9CA3AF]">
                  <Clock3Icon className="h-3.5 w-3.5" />
                  <span>Response</span>
                </div>
                <div className="font-semibold text-white">
                  {garage.responseTime || "Contact"}
                </div>
              </div>

              <div>
                <div className="mb-1 text-xs text-[#9CA3AF]">Experience</div>
                <div className="font-semibold text-[#10B981]">
                  {garage.yearsExperience} yrs
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between border-t border-[#2A2A2A] pt-4">
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-white">{price}</p>
              <p className="text-xs text-[#9CA3AF]">Starting at</p>
            </div>

            <span
              className={cn(buttonVariants(), "rounded-xl px-5 py-5 text-sm")}
            >
              Book Now
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
