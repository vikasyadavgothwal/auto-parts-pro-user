"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";

import { SiteCartProvider } from "@/components/site/cart/cart-provider";
import { SessionKeepalive } from "@/components/site/session-keepalive";

export function Providers({ children }: { children: ReactNode }) {
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
      <SessionKeepalive />
      <SiteCartProvider>{children}</SiteCartProvider>
    </QueryClientProvider>
  );
}
