import type { Metadata } from "next";
import { LegalContentRoute } from "@/components/site/legal/legal-content-route";
import { LEGAL_CONTENT_PAGE_COPY } from "@/lib/public-content";

export const dynamic = "force-dynamic";

const page = LEGAL_CONTENT_PAGE_COPY["privacy-policy"];

export const metadata: Metadata = {
  title: `${page.title} | Auto Parts Pro`,
  description: page.description,
};

export default function PrivacyPolicyPage() {
  return <LegalContentRoute slug="privacy-policy" />;
}
