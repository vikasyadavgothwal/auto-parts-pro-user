"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { HeartIcon, ShareIcon } from "@/components/icons/site-icons";
import { Button } from "@/components/ui/button";
import { getCurrentUser, siteAuthenticatedFetch } from "@/lib/current-user";

type SavedStatusPayload = {
  ok?: boolean;
  saved?: boolean;
  watchForPriceDrops?: boolean;
  watchForStockReturns?: boolean;
  message?: string;
};

type ProductActionsProps = {
  partUid?: string;
  title: string;
};

const buttonClass =
  "h-12 flex-1 border-[#2A2A2A] bg-[#1A1A1A] p-3 text-white hover:border-[#DC2626] hover:bg-[#1A1A1A] md:p-0";

export function ProductActions({ partUid, title }: ProductActionsProps) {
  const resolvedPartUid = useMemo(() => partUid?.trim() || "", [partUid]);
  const [canSave, setCanSave] = useState(false);
  const [saved, setSaved] = useState(false);
  const [watchForPriceDrops, setWatchForPriceDrops] = useState(false);
  const [watchForStockReturns, setWatchForStockReturns] = useState(false);
  const [pending, setPending] = useState(false);

  const shareUrl = useMemo(
    () =>
      typeof window === "undefined"
        ? ""
        : resolvedPartUid
          ? `${window.location.origin}/product/${encodeURIComponent(resolvedPartUid)}`
          : window.location.href,
    [resolvedPartUid],
  );

  useEffect(() => {
    let mounted = true;

    async function loadSavedStatus() {
      const user = await getCurrentUser();
      if (!mounted) return;
      const isUser = user?.activeRole === "User" && user.roles.includes("User");
      setCanSave(Boolean(resolvedPartUid && isUser));
      if (!resolvedPartUid || !isUser) return;

      const response = await siteAuthenticatedFetch(
        `/api/saved-parts?partUid=${encodeURIComponent(resolvedPartUid)}`,
        { credentials: "include", cache: "no-store" },
      );
      const payload = (await response.json().catch(() => null)) as
        | SavedStatusPayload
        | null;

      if (!mounted || !response.ok || !payload?.ok) {
        return;
      }

      setSaved(Boolean(payload.saved));
      setWatchForPriceDrops(Boolean(payload.watchForPriceDrops));
      setWatchForStockReturns(Boolean(payload.watchForStockReturns));
    }

    void loadSavedStatus();
    return () => {
      mounted = false;
    };
  }, [resolvedPartUid]);

  const updateSavedPart = async (
    nextSaved: boolean,
    patch?: { price?: boolean; stock?: boolean },
    successMessage?: string,
  ) => {
    if (!resolvedPartUid || pending) return;
    setPending(true);

    try {
      if (!nextSaved) {
        const response = await siteAuthenticatedFetch("/api/saved-parts", {
          method: "DELETE",
          credentials: "include",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ partUid: resolvedPartUid }),
        });
        const payload = (await response.json().catch(() => null)) as
          | SavedStatusPayload
          | null;
      if (!response.ok || payload?.ok === false) {
        throw new Error(payload?.message || "Unable to update saved part.");
      }
      setSaved(false);
      setWatchForPriceDrops(false);
      setWatchForStockReturns(false);
      toast.success(successMessage ?? "Part removed from saved parts.");
      return;
    }

      const response = await siteAuthenticatedFetch("/api/saved-parts", {
        method: "POST",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          partUid: resolvedPartUid,
          watchForPriceDrops:
            patch?.price ?? watchForPriceDrops,
          watchForStockReturns:
            patch?.stock ?? watchForStockReturns,
        }),
      });
      const payload = (await response.json().catch(() => null)) as
        | SavedStatusPayload
        | null;
      if (!response.ok || !payload?.ok) {
        throw new Error(payload?.message || "Unable to update saved part.");
      }

      setSaved(true);
      setWatchForPriceDrops(Boolean(payload.watchForPriceDrops));
      setWatchForStockReturns(Boolean(payload.watchForStockReturns));
      toast.success(successMessage ?? "Part saved successfully.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to update saved part.");
    } finally {
      setPending(false);
    }
  };

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


  return (
    <div className="space-y-2">
      <div className="flex flex-col gap-3 sm:flex-row">
        {canSave ? (
          <Button
            type="button"
            variant="outline"
            disabled={pending}
            onClick={() => void updateSavedPart(!saved)}
            className={`${buttonClass} ${saved ? "border-[#DC2626] bg-primary" : ""}`}
          >
            <HeartIcon className="mr-2 h-5 w-5" />
            {pending ? "Saving..." : saved ? "Saved" : "Save"}
          </Button>
        ) : null}
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
