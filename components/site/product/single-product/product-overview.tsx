import {
  CircleCheckIcon,
  SellerPackageIcon,
} from "@/components/icons/site-icons";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { ProductHighlight } from "@/types/site/product";
import { ProductActions } from "./product-actions";
import { RatingStars } from "./rating-stars";

type ProductInfoRow = {
  label: string;
  value: string | null;
};

type ProductInfoBadge = {
  label: string;
  value: string | null;
};

type ProductOverviewProps = {
  partUid?: string;
  title: string;
  partNumber: string;
  rating: number;
  reviewCount: number;
  keyFeatures: readonly string[];
  keyFeaturesTitle?: string;
  productInfoRows?: readonly ProductInfoRow[];
  productInfoBadges?: readonly ProductInfoBadge[];
  highlights: readonly ProductHighlight[];
};

export function ProductOverview({
  partUid,
  title,
  partNumber,
  rating,
  reviewCount,
  keyFeatures,
  keyFeaturesTitle = "Key Features",
  productInfoRows,
  productInfoBadges,
  highlights,
}: ProductOverviewProps) {
  const hasProductInfoRows = Boolean(productInfoRows?.length);
  const visibleProductInfoBadges = (productInfoBadges ?? []).filter((badge) =>
    Boolean(badge.value?.trim()),
  );
  const productInfoValue = (label: string) =>
    productInfoRows?.find((row) => row.label === label)?.value?.trim() || "";
  const shortDescription = productInfoValue("Short Description");
  const description = productInfoValue("Description");
  const productSpecs = (productInfoRows ?? []).filter((row) =>
    ["Manufacturer Part Number (MPN)", "Status"].includes(row.label),
  );

  return (
    <div className="flex flex-col items-normal justify-center">
      <div className="mb-6">
        <div className="mb-3 flex flex-wrap items-center gap-3 justify-between">
          <div className="flex items-center gap-2">
            <SellerPackageIcon className="h-4 w-4 text-[#9CA3AF]" />
            <span className="text-sm text-[#9CA3AF]">ACDelco Authorized</span>
          </div>
          <div className=" flex flex-wrap  items-center gap-4">
            <div className="flex items-center gap-2">
              <RatingStars rating={rating} />
              <span className="text-lg font-semibold text-white">{rating}</span>
              <span className="text-sm text-[#9CA3AF]">
                ({reviewCount} reviews)
              </span>
            </div>
          </div>
        </div>

        <h1 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
          {title}
        </h1>

        <p className="mb-6 text-lg leading-relaxed text-[#9CA3AF]">
          Part #: <span className="font-medium text-white">{partNumber}</span>
        </p>
      </div>

      {hasProductInfoRows ? (
        <section className="mb-8 border-y border-[#2A2A2A] py-6">
          {visibleProductInfoBadges.length > 0 ? (
            <div className="mb-5 flex flex-wrap gap-2">
              {visibleProductInfoBadges.map((badge) => (
                <Badge
                  key={badge.label}
                  variant={badge.label === "Condition" ? "success" : "default"}
                  className="border-[#DC2626]/30 bg-[#DC2626]/10 text-white"
                >
                  <span className="text-[#FCA5A5]">{badge.label}</span>
                  <span>{badge.value}</span>
                </Badge>
              ))}
            </div>
          ) : null}

          {shortDescription ? (
            <p className="mb-4 text-sm leading-6 text-[#D1D5DB]">
              {shortDescription}
            </p>
          ) : null}

          {description ? (
            <div className="mb-5">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#DC2626]">
                Description
              </p>
              <p className="whitespace-pre-line text-sm leading-6 text-[#9CA3AF]">
                {description}
              </p>
            </div>
          ) : null}

          {productSpecs.length > 0 ? (
            <dl className="divide-y divide-[#2A2A2A] border-y border-[#2A2A2A]">
              {productSpecs.map((row) => (
                <div
                  key={row.label}
                  className="grid gap-1 py-3 sm:grid-cols-[220px_1fr] sm:gap-5"
                >
                  <dt className="text-xs font-semibold uppercase tracking-wide text-[#9CA3AF]">
                    {row.label}
                  </dt>
                  <dd className="text-sm font-medium text-white">
                    {row.value?.trim() || "Not provided"}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}
        </section>
      ) : (
        <Card className="mb-8 rounded-2xl border border-[#2A2A2A] bg-[#1A1A1A] p-0">
          <CardContent className="p-5 sm:p-6">
            <h3 className="mb-4 text-lg font-semibold text-white">
              {keyFeaturesTitle}
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
      )}

      <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
        {highlights.map(({ icon: Icon, label, svg }) => (
          <Card
            key={label}
            className="rounded-xl border border-[#2A2A2A] bg-[#1A1A1A]"
          >
            <CardContent className="flex flex-col justify-center p-4 text-center">
              {Icon ? (
                <Icon className="mx-auto mb-2 h-8 w-8 text-[#DC2626]" />
              ) : svg ? (
                <div
                  className="mx-auto mb-2 h-8 w-8 text-[#DC2626]"
                  dangerouslySetInnerHTML={{ __html: svg }}
                />
              ) : null}

              <span className="text-sm text-[#9CA3AF]">{label}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      <ProductActions partUid={partUid} title={title} />
    </div>
  );
}
