"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeftIcon,
  CheckCircleIcon,
  CircleCheckIcon,
  HeartIcon,
  MessageIcon,
  RatingStarIcon,
  ShieldIcon,
  ShareIcon,
  TruckIcon,
  WrenchIcon,
  FitmentConfirmedIcon,
} from "@/components/icons/site-icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  RatingStarsProps,
} from "@/types/site/product";
import { productImages ,  keyFeatures , highlights ,offers , } from "@/lib/Data/ProductData";
function RatingStars({
  rating,
  size = "h-5 w-5",
}: RatingStarsProps) {
  const fullStars = Math.floor(rating);

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => {
        const filled = index < fullStars;
        return (
          <RatingStarIcon
            key={index}
            filled={filled}
            className={`${size} ${filled ? "fill-[#F59E0B] text-[#F59E0B]" : "text-[#2A2A2A]"}`}
          />
        );
      })}
    </div>
  );
}

export function AutoPartsMarketplacePage() {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="mx-auto max-w-[1440px] px-4 py-5 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          asChild
          className="h-auto px-0 text-[#9CA3AF] hover:bg-transparent hover:text-white"
        >
          <Link href="/search" className="inline-flex items-center gap-2">
            <ChevronLeftIcon className="h-4 w-4" />
            <span className="text-sm">Back to search results</span>
          </Link>
        </Button>
      </div>

      <div className="mx-auto max-w-[1200px] px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mb-14 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <Card className="mb-4 overflow-hidden rounded-2xl border border-[#2A2A2A] bg-[#1A1A1A] p-4 sm:p-6 lg:p-8">
              <div className="relative aspect-square overflow-hidden rounded-xl">
                <Image
                  src={productImages[selectedImage]}
                  alt="Bosch QuietCast Premium Ceramic Brake Pads"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </Card>

            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {productImages.map((image, index) => {
                const active = selectedImage === index;
                return (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setSelectedImage(index)}
                    className={`overflow-hidden rounded-xl border-2 transition-all ${
                      active
                        ? "border-[#DC2626] ring-2 ring-[#DC2626]/20"
                        : "border-[#2A2A2A] hover:border-[#DC2626]/50"
                    }`}
                  >
                    <div className="relative aspect-square">
                      <Image
                        src={image}
                        alt={`Product view ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="mb-6">
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <Badge className="rounded-lg border border-[#10B981]/20 bg-[#10B981]/10 px-3 py-1 text-sm font-medium text-[#10B981] hover:bg-[#10B981]/10">
                  OEM Quality
                </Badge>
                <span className="inline-flex items-center gap-1 text-sm text-[#9CA3AF]">
                  <ShieldIcon className="h-4 w-4" />
                  Verified Seller
                </span>
              </div>

              <h1 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                Bosch QuietCast Premium Ceramic Brake Pads
              </h1>

              <div className="mb-4 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <RatingStars rating={4.9} />
                  <span className="text-lg font-semibold text-white">4.9</span>
                  <span className="text-sm text-[#9CA3AF]">(512 reviews)</span>
                </div>
              </div>

              <p className="mb-6 text-lg leading-relaxed text-[#9CA3AF]">
                Part #:{" "}
                <span className="font-medium text-white">Bosch BC1259</span>
              </p>
            </div>

            <Card className="mb-8 rounded-2xl border border-[#2A2A2A] bg-[#1A1A1A] p-0">
              <CardContent className="p-5 sm:p-6">
                <h3 className="mb-4 text-lg font-semibold text-white">
                  Key Features
                </h3>
                <ul className="space-y-3">
                  {keyFeatures.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CircleCheckIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#DC2626]" />
                      <span className="text-[#9CA3AF]">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
              {highlights.map((item) => {
                const Icon = item.icon;
                return (
                  <Card
                    key={item.label}
                    className="rounded-xl border border-[#2A2A2A] bg-[#1A1A1A]"
                  >
                    <CardContent className="p-4 text-center">
                      <Icon className="mx-auto mb-2 h-6 w-6 text-[#DC2626]" />
                      <p className="text-xs text-[#9CA3AF]">{item.label}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                variant="outline"
                className="md:h-12 md:p-0 p-3 flex-1 border-[#2A2A2A] bg-[#1A1A1A] text-white hover:border-[#DC2626] hover:bg-[#1A1A1A]"
              >
                <HeartIcon className="mr-2 h-5 w-5" />
                Save
              </Button>
              <Button
                variant="outline"
                className="h-12 flex-1 md:p-0 p-3 border-[#2A2A2A] bg-[#1A1A1A] text-white hover:border-[#DC2626] hover:bg-[#1A1A1A]"
              >
                <ShareIcon className="mr-2 h-5 w-5" />
                Share
              </Button>
            </div>
          </div>
        </div>

        <section className="mb-16">
          <div className="mb-8">
            <h2 className="mb-3 text-2xl font-bold text-white sm:text-3xl">
              Compare Offers
            </h2>
            <p className="text-base text-[#9CA3AF] sm:text-lg">
              Choose from 4 verified suppliers — best offer highlighted
            </p>
          </div>

          <div className="space-y-4">
            {offers.map((offer) => (
              <Card
                key={offer.seller}
                className={`overflow-hidden rounded-2xl border-2 transition-all ${
                  offer.recommended
                    ? "border-[#2563EB] bg-white shadow-xl shadow-blue-500/20 ring-2 ring-[#2563EB]/20"
                    : "border-[#E5E7EB] bg-white hover:border-[#2563EB]/50"
                }`}
              >
                {offer.recommended && (
                  <div className="flex h-10 items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 px-4 text-center">
                    <span className="flex items-center gap-2 text-sm font-semibold text-white">
                      <FitmentConfirmedIcon className="h-4 w-4" />
                      BEST VALUE - Recommended Offer
                    </span>
                  </div>
                )}

                <CardContent
                  className={`p-4 sm:p-6 ${offer.recommended ? "pt-6" : "pt-4"}`}
                >
                  <div className="grid gap-5 lg:grid-cols-[2.2fr_1fr_1fr_1.2fr_1.2fr] lg:items-center">
                    <div className="flex items-center gap-4">
                      <div className="relative h-16 w-16 overflow-hidden rounded-xl border border-[#E5E7EB]">
                        <Image
                          src={offer.logo}
                          alt={offer.seller}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h4 className="mb-1.5 font-semibold text-[#0F172A]">
                          {offer.seller}
                        </h4>

                        <div className="mb-1.5 flex flex-wrap items-center gap-1.5">
                          <div className="inline-flex items-center gap-1 rounded-md bg-green-50 px-2 py-0.5 text-xs text-green-600">
                            <ShieldIcon className="h-3 w-3" />
                            <span>Verified</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 text-xs text-[#64748B]">
                          <div className="flex items-center gap-1">
                            <RatingStars rating={offer.rating} size="h-3 w-3" />
                            <span className="font-medium text-[#0F172A]">
                              {offer.rating}
                            </span>
                            <span>({offer.reviews})</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="text-2xl font-bold text-[#0F172A] sm:text-3xl">
                        {offer.price}
                      </div>
                      <div className="text-sm text-[#64748B]">
                        {offer.condition}
                      </div>
                    </div>

                    <div>
                      <div className="inline-flex items-center gap-2 rounded-lg bg-green-50 px-3 py-1.5 text-sm font-medium text-green-700">
                        {offer.stock}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-[#0F172A]">
                      <TruckIcon className="h-4 w-4 text-[#64748B]" />
                      <div>
                        <div className="font-medium">{offer.shipping}</div>
                        <div className="text-xs text-[#64748B]">
                          {offer.shippingTime}
                        </div>
                      </div>
                    </div>

                    <div>
                      <Button
                        className={`h-12 w-full rounded-xl font-medium ${
                          offer.recommended
                            ? "bg-[#2563EB] text-white hover:bg-[#1D4ED8]"
                            : "bg-[#0F172A] text-white hover:bg-[#1E293B]"
                        }`}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <Card className="mt-8 rounded-2xl border border-[#E5E7EB] bg-gradient-to-br from-slate-50 to-blue-50 shadow-none">
            <CardContent className="p-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h4 className="mb-2 text-xl font-semibold text-[#0F172A]">
                    Can&apos;t find the right offer?
                  </h4>
                  <p className="text-[#64748B]">
                    Submit a Request for Quote and get personalized offers from
                    our supplier network.
                  </p>
                </div>

                <Button
                  asChild
                  variant="outline"
                  className="rounded-xl border-2 border-[#2563EB] bg-white px-8 py-7 font-medium text-[#2563EB] hover:bg-[#2563EB] hover:text-white"
                >
                  <Link href="/request-quote">Request Custom Quote</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
        <section>
          <Card className="mt-8 rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] shadow-none">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <MessageIcon className="mt-1 h-6 w-6 shrink-0 text-[#DC2626]" />

                <div className="flex-1">
                  <h3 className="mb-2 text-lg font-semibold text-white">
                    Need a better price or bulk order?
                  </h3>

                  <p className="mb-4 text-[#9CA3AF]">
                    Request a custom quote from multiple suppliers. They&apos;ll
                    compete for your business.
                  </p>

                  <Button
                    asChild
                    className="bg-[#DC2626] p-6 font-medium text-white hover:bg-[#B91C1C] "
                  >
                    <Link href="/rfq">Request Quote</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
        <section>
          <Card className="mt-8 rounded-xl border border-[#2A2A2A] bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] shadow-none">
            <CardContent className="p-8">
              {/* Header */}
              <div className="mb-6 flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#DC2626]/20 bg-[#DC2626]/10">
                  <WrenchIcon className="h-6 w-6 text-[#DC2626]" />
                </div>

                <div>
                  <h3 className="mb-2 text-2xl font-bold text-white">
                    Need Installation?
                  </h3>

                  <p className="text-[#9CA3AF]">
                    Bundle this part with professional installation from
                    certified garages near you
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="mb-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-[#2A2A2A] bg-[#0A0A0A] p-5">
                  <div className="mb-3 flex items-center gap-3">
                    <CheckCircleIcon className="h-5 w-5 text-[#10B981]" />
                    <span className="font-semibold text-white">
                      Expert Installation
                    </span>
                  </div>

                  <p className="text-sm text-[#9CA3AF]">
                    ASE-certified mechanics with specialized training
                  </p>
                </div>

                <div className="rounded-xl border border-[#2A2A2A] bg-[#0A0A0A] p-5">
                  <div className="mb-3 flex items-center gap-3">
                    <CheckCircleIcon className="h-5 w-5 text-[#10B981]" />
                    <span className="font-semibold text-white">
                      Same-Day Service
                    </span>
                  </div>

                  <p className="text-sm text-[#9CA3AF]">
                    Schedule installation as early as part delivery
                  </p>
                </div>
              </div>

              {/* CTA */}
              <Button
                asChild
                className="bg-[#DC2626] p-6 font-medium text-white hover:bg-[#B91C1C]"
              >
                <Link href="/services" className="flex items-center gap-2">
                  <WrenchIcon className="h-5 w-5" />
                  Find Installation Services
                </Link>
              </Button>
            </CardContent>
          </Card>
        </section>
        <section className="mt-8">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Description */}
            <Card className="rounded-2xl border border-[#2A2A2A] bg-[#1A1A1A] shadow-none">
              <CardContent className="p-8">
                <h3 className="mb-4 text-2xl font-semibold text-white">
                  Description
                </h3>
                <p className="leading-relaxed text-[#9CA3AF]">
                  Bosch QuietCast Premium Ceramic Brake Pads deliver exceptional
                  stopping power with ultra-quiet operation. Engineered with a
                  proprietary ceramic formula and multi-layered shims for
                  superior noise dampening. Perfect for daily driving and light
                  towing applications.
                </p>
              </CardContent>
            </Card>

            {/* Specifications */}
            <Card className="rounded-2xl  border border-[#2A2A2A] bg-[#1A1A1A] shadow-none">
              <CardContent className="p-8">
                <h3 className="mb-4 text-2xl font-semibold text-white">
                  Specifications
                </h3>

                <dl className="space-y-3">
                  <div className="flex justify-between border-b border-[#2A2A2A] py-2">
                    <dt className="text-[#9CA3AF]">Part Number</dt>
                    <dd className="font-medium text-white">BC1259</dd>
                  </div>

                  <div className="flex justify-between border-b border-[#2A2A2A] py-2">
                    <dt className="text-[#9CA3AF]">Manufacturer</dt>
                    <dd className="font-medium text-white">Bosch</dd>
                  </div>

                  <div className="flex justify-between border-b border-[#2A2A2A] py-2">
                    <dt className="text-[#9CA3AF]">Position</dt>
                    <dd className="font-medium text-white">Front</dd>
                  </div>

                  <div className="flex justify-between border-b border-[#2A2A2A] py-2">
                    <dt className="text-[#9CA3AF]">Material</dt>
                    <dd className="font-medium text-white">Ceramic</dd>
                  </div>

                  <div className="flex justify-between border-b border-[#2A2A2A] py-2">
                    <dt className="text-[#9CA3AF]">Hardware Included</dt>
                    <dd className="font-medium text-white">Yes</dd>
                  </div>

                  <div className="flex justify-between border-b border-[#2A2A2A] py-2">
                    <dt className="text-[#9CA3AF]">Warranty</dt>
                    <dd className="font-medium text-white">Limited Lifetime</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
}
