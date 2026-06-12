
import { LegalContentRoute } from "@/components/site/legal/legal-content-route";
import { getPublicContentMetadata } from "@/lib/public-seo";

export const dynamic = "force-dynamic";

export const generateMetadata = () =>
  getPublicContentMetadata("cookies-settings", {
    title: "Cookies Settings | Auto Parts Pro",
    description: "Cookie settings for Auto Parts Pro.",
  });


export default function CookiesSettingsPage() {
  return <LegalContentRoute slug="cookies-settings" />;
}
