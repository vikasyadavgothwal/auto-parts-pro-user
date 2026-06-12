
import { LegalContentRoute } from "@/components/site/legal/legal-content-route";
import { getPublicContentMetadata } from "@/lib/public-seo";


export const dynamic = "force-dynamic";

export const generateMetadata = () =>
  getPublicContentMetadata("terms-of-services", {
    title: "Terms of Services | Auto Parts Pro",
    description: "Terms of services for Auto Parts Pro.",
  });


export default function TermsOfServicesPage() {
  return <LegalContentRoute slug="terms-of-services" />;
}
