import { RequestQuotePage } from "@/components/site/rfq/request-quote-page";
import { PublicSectionContentBoundary } from "@/components/site/public-content/public-section-content-boundary";

export const dynamic = "force-dynamic";

export default function RFQPage() {
  return (
    <PublicSectionContentBoundary slug="rfq">
      <RequestQuotePage />
    </PublicSectionContentBoundary>
  );
}
