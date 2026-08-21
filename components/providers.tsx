"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";

import { SiteCartProvider } from "@/components/site/cart/cart-provider";
import { LanguageProvider } from "@/components/site/language/language-provider";
import { SessionKeepalive } from "@/components/site/session-keepalive";
import type { SiteLanguage } from "@/lib/language-preference";

export function Providers({
  children,
  initialLanguage,
}: {
  children: ReactNode;
  initialLanguage?: SiteLanguage;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider initialLanguage={initialLanguage}>
        <SessionKeepalive />
        <SiteCartProvider>{children}</SiteCartProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}
