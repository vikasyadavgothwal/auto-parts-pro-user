"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { HeartIcon, ShareIcon } from "@/components/icons/site-icons";
import { Button } from "@/components/ui/button";
import { siteAuthenticatedFetch } from "@/lib/current-user";

type ProductActionsProps = {
  partUid?: string;
  title: string;
};

const buttonClass =
  "h-12 flex-1 border-[#2A2A2A] bg-[#1A1A1A] p-3 text-white hover:border-[#DC2626] hover:bg-[#1A1A1A] md:p-0";

export function ProductActions({ partUid, title }: ProductActionsProps) {
  const resolvedPartUid = useMemo(() => partUid?.trim() || "", [partUid]);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const shareUrl = useMemo(
    () =>
      typeof window === "undefined"
        ? ""
        : resolvedPartUid
          ? `${window.location.origin}/product/${encodeURIComponent(resolvedPartUid)}`
          : window.location.href,
    [resolvedPartUid],
  );

  const shareProduct = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title, url: shareUrl });
        return;
      }
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Product link copied.");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }
      toast.error("Unable to share this product.");
    }
  };

  useEffect(() => {
    if (!resolvedPartUid) return;
    let active = true;
    void siteAuthenticatedFetch(`/api/saved-parts?partUid=${encodeURIComponent(resolvedPartUid)}`, {
      cache: "no-store",
      headers: { accept: "application/json" },
    })
      .then((response) => response.ok ? response.json() : null)
      .then((payload) => {
        if (active && payload?.saved === true) setSaved(true);
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, [resolvedPartUid]);

  const toggleSaved = async () => {
    if (!resolvedPartUid) {
      toast.error("Product is not available to save.");
      return;
    }
    setSaving(true);
    try {
      const response = await siteAuthenticatedFetch("/api/saved-parts", {
        method: saved ? "DELETE" : "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ partUid: resolvedPartUid }),
      });
      if (response.status === 401 || response.status === 403) {
        toast.error("Sign in with a User account to save parts.");
        return;
      }
      const payload = await response.json().catch(() => null);
      if (!response.ok || payload?.ok === false || payload?.success === false) {
        toast.error(payload?.message ?? "Unable to update saved part.");
        return;
      }
      setSaved(!saved);
      toast.success(saved ? "Part removed from saved parts." : "Part saved.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          type="button"
          variant="outline"
          onClick={toggleSaved}
          disabled={saving || !resolvedPartUid}
          className={buttonClass}
        >
          <HeartIcon className={`mr-2 h-5 w-5 ${saved ? "fill-[#DC2626] text-[#DC2626]" : ""}`} />
          {saving ? "Saving..." : saved ? "Saved" : "Save this part"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={shareProduct}
          className={buttonClass}
        >
          <ShareIcon className="mr-2 h-5 w-5" />
          Share
        </Button>
      </div>
    </div>
  );
}
