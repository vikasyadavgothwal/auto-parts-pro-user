import {
  CircleCheckIcon,
  HeartIcon,
  ShareIcon,
  ShieldIcon,
} from "@/components/icons/site-icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { ProductHighlight } from "@/types/site/product";
import { RatingStars } from "./rating-stars";

type ProductOverviewProps = {
  title: string;
  partNumber: string;
  rating: number;
  reviewCount: number;
  keyFeatures: readonly string[];
  highlights: readonly ProductHighlight[];
};

export function ProductOverview({
  title,
  partNumber,
  rating,
  reviewCount,
  keyFeatures,
  highlights,
}: ProductOverviewProps) {
  return (
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
          {title}
        </h1>

        <div className="mb-4 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <RatingStars rating={rating} />
            <span className="text-lg font-semibold text-white">{rating}</span>
            <span className="text-sm text-[#9CA3AF]">
              ({reviewCount} reviews)
            </span>
          </div>
        </div>

        <p className="mb-6 text-lg leading-relaxed text-[#9CA3AF]">
          Part #: <span className="font-medium text-white">{partNumber}</span>
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
        {highlights.map(({ icon: Icon, label }) => (
          <Card
            key={label}
            className="rounded-xl border border-[#2A2A2A] bg-[#1A1A1A]"
          >
            <CardContent className="p-4 text-center">
              <Icon className="mx-auto mb-2 h-6 w-6 text-[#DC2626]" />
              <p className="text-xs text-[#9CA3AF]">{label}</p>
            </CardContent>
          </Card>
        ))}
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
  );
}
