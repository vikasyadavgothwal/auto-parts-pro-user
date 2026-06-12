import type { Metadata } from "next";
import { LegalContentRoute } from "@/components/site/legal/legal-content-route";
import { LEGAL_CONTENT_PAGE_COPY } from "@/lib/public-content";

export const dynamic = "force-dynamic";

const page = LEGAL_CONTENT_PAGE_COPY["terms-of-services"];

export const metadata: Metadata = {
  title: `${page.title} | Auto Parts Pro`,
  description: page.description,
};

export default function TermsOfServicesPage() {
  return <LegalContentRoute slug="terms-of-services" />;
}
