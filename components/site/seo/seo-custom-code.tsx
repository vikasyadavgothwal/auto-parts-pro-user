import type { PublicContentSeo } from "@/lib/public-content";

type SeoCustomCodeProps = {
  seo?: PublicContentSeo;
};

export function SeoCustomCode({ seo }: SeoCustomCodeProps) {
  // Arbitrary stored markup or scripts must never execute on the public origin.
  // Standard SEO fields continue to be rendered through Next.js metadata.
  void seo;
  return null;
}
