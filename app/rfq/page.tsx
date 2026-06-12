import { RequestQuotePage } from "@/components/site/rfq/request-quote-page";
import { PublicSectionContentBoundary } from "@/components/site/public-content/public-section-content-boundary";
import { getPublicContentMetadata } from "@/lib/public-seo";

export const dynamic = "force-dynamic";

export const generateMetadata = () =>
  getPublicContentMetadata("rfq", {
    title: "RFQ | Auto Parts Pro",
    description: "Request auto parts quotes from verified suppliers.",
  });

export default function RFQPage() {
  return (
    <PublicSectionContentBoundary slug="rfq">
      <RequestQuotePage />
    </PublicSectionContentBoundary>
  );
}
