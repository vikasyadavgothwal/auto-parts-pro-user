
import { LegalContentRoute } from "@/components/site/legal/legal-content-route";
import { getPublicContentMetadata } from "@/lib/public-seo";


export const dynamic = "force-dynamic";

export const generateMetadata = () =>
  getPublicContentMetadata("privacy-policy", {
    title: "Privacy Policy | Auto Parts Pro",
    description: "Privacy policy for Auto Parts Pro.",
  });




export default function PrivacyPolicyPage() {
  return <LegalContentRoute slug="privacy-policy" />;
}
