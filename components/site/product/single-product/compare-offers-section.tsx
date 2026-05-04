import Image from "next/image";
import Link from "next/link";
import {
  FitmentConfirmedIcon,
  ShieldIcon,
  TruckIcon,
} from "@/components/icons/site-icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ProductOffer } from "@/types/site/product";
import { RatingStars } from "./rating-stars";

type CompareOffersSectionProps = {
  offers: readonly ProductOffer[];
};
function OfferCard({ offer }: { offer: ProductOffer }) {
  return (
    <Card
      className={cn(
        "overflow-hidden rounded-2xl border-2 transition-all",
        offer.recommended
          ? "border-primary bg-white shadow-xl shadow-blue-500/20 ring-2 ring-primary"
          : "border-[#E5E7EB] bg-white ",
      )}
    >
      {offer.recommended && (
        <div className="flex h-10 items-center justify-center bg-primary px-4 text-center">
          <span className="flex items-center gap-2 text-sm font-semibold text-white">
            <FitmentConfirmedIcon className="h-4 w-4" />
            BEST VALUE - Recommended Offer
          </span>
        </div>
      )}

      <CardContent
        className={cn("p-4 sm:p-6", offer.recommended ? "pt-6" : "pt-4")}
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
            <div className="text-sm text-[#64748B]">{offer.condition}</div>
          </div>

          <div>
            <div className="inline-flex items-center gap-2 rounded-xl bg-green-50 px-3 py-1.5 text-sm font-medium text-green-700">
              {offer.stock}
            </div>
          </div>

          <div className="flex items-center gap-2 text-[#0F172A]">
            <TruckIcon className="h-4 w-4 text-[#64748B]" />
            <div>
              <div className="font-medium">{offer.shipping}</div>
              <div className="text-xs text-[#64748B]">{offer.shippingTime}</div>
            </div>
          </div>

          <div>
            <Button
              className={cn(
                "h-12 w-full rounded-full font-medium",
                offer.recommended
                  ? "bg-primary text-white"
                  : "bg-primary text-white  border border-gray-200",
              )}
            >
             {offer.recommended ? "Add to Cart" : "Select Offer"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function CompareOffersSection({ offers }: CompareOffersSectionProps) {
  return (
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
          <OfferCard key={offer.seller} offer={offer} />
        ))}
      </div>

      <Card className="mt-8 rounded-2xl border border-[#E5E7EB] bg-gradient-to-br from-slate-50 to-blue-50 shadow-none">
        <CardContent className="p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h4 className="mb-2 text-2xl font-thin text-[#0F172A]">
                Can&apos;t find the right offer?
              </h4>
              <p className="text-[#64748B]">
                Submit a Request for Quote and get personalized offers from our
                supplier network.
              </p>
            </div>

            <Button
              asChild
              variant="outline"
              className="rounded-full border-2 border-primary bg-white px-8 py-6 font-medium text-primary"
            >
              <Link href="/request-quote">Request Custom Quote</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
