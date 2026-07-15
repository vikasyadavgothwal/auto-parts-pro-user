"use client";

import { useQuery } from "@tanstack/react-query";
import {
  publicContentQueryOptions,
  type LegalPublicContentSlug,
} from "@/lib/public-content";
import { sanitizePublicHtml } from "@/lib/sanitize-public-html";

export function LegalContentPage({
  slug,
}: {
  slug: LegalPublicContentSlug;
}) {
  const { data, error, isError, isLoading } = useQuery(
    publicContentQueryOptions(slug),
  );
  const html = data?.data?.trim();
  const sanitizedHtml = html ? sanitizePublicHtml(html) : "";

  return (
    <main className="bg-background text-foreground">
      <section className="site-container">
        <article className="mt-10 max-w-full rounded-lg border border-border bg-card p-6 text-sm leading-7 text-[#E5E7EB] md:p-8 md:text-base [&_a]:text-primary [&_blockquote]:border-l-2 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_h1]:mb-4 [&_h1]:mt-6 [&_h1]:text-3xl [&_h1]:font-semibold [&_h2]:mb-3 [&_h2]:mt-6 [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:mb-2 [&_h3]:mt-5 [&_h3]:text-xl [&_h3]:font-semibold [&_li]:mt-1 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:my-3 [&_strong]:text-white [&_ul]:list-disc [&_ul]:pl-6">
          {isLoading ? (
            <p className="text-brand-muted">Loading content...</p>
          ) : isError ? (
            <p className="text-destructive">
              {error instanceof Error
                ? error.message
                : "Unable to load this page content."}
            </p>
          ) : sanitizedHtml ? (
            <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
          ) : (
            <p className="text-brand-muted">No content available.</p>
          )}
        </article>
      </section>
    </main>
  );
}
