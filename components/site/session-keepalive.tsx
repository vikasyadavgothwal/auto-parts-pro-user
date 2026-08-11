"use client";

import { useEffect } from "react";

import { refreshSiteSession } from "@/lib/current-user";

export function SessionKeepalive() {
  useEffect(() => {
    let lastRefresh = Date.now();

    const refreshIfActive = () => {
      if (document.visibilityState === "hidden") return;
      const now = Date.now();
      if (now - lastRefresh < 60_000) return;
      lastRefresh = now;
      void refreshSiteSession().catch(() => false);
    };

    window.addEventListener("focus", refreshIfActive);
    document.addEventListener("visibilitychange", refreshIfActive);

    return () => {
      window.removeEventListener("focus", refreshIfActive);
      document.removeEventListener("visibilitychange", refreshIfActive);
    };
  }, []);

  return null;
}
