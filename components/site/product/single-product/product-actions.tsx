"use client";

import { useEffect, useMemo, useState } from "react";

import { HeartIcon, ShareIcon } from "@/components/icons/site-icons";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
  const [canSave, setCanSave] = useState(false);
  const [saved, setSaved] = useState(false);
  const [watchForPriceDrops, setWatchForPriceDrops] = useState(false);
  const [watchForStockReturns, setWatchForStockReturns] = useState(false);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");

  const shareUrl = useMemo(
    () =>
      typeof window === "undefined"
        ? ""
        : partUid
          ? `${window.location.origin}/product/${encodeURIComponent(partUid)}`
          : window.location.href,
    [partUid],
  );

  useEffect(() => {
    let mounted = true;

    async function loadSavedStatus() {
      const user = await getCurrentUser();
      if (!mounted) return;
      const isUser = user?.activeRole === "User" && user.roles.includes("User");
      setCanSave(Boolean(partUid && isUser));
      if (!partUid || !isUser) return;

      const response = await siteAuthenticatedFetch(
        `/api/saved-parts?partUid=${encodeURIComponent(partUid)}`,
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
  }, [partUid]);

  const updateSavedPart = async (nextSaved: boolean, patch?: { price?: boolean; stock?: boolean }) => {
    if (!partUid || pending) return;
    setPending(true);
    setMessage("");

    try {
      if (!nextSaved) {
        const response = await siteAuthenticatedFetch("/api/saved-parts", {
          method: "DELETE",
          credentials: "include",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ partUid }),
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
        setMessage("Removed from saved parts.");
        return;
      }

      const response = await siteAuthenticatedFetch("/api/saved-parts", {
        method: "POST",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          partUid,
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
      setMessage("Saved to your dashboard.");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Unable to update saved part.",
      );
    } finally {
      setPending(false);
    }
  };

  const toggleWatchForPriceDrops = async () => {
    const nextValue = !watchForPriceDrops;
    await updateSavedPart(true, { price: nextValue, stock: watchForStockReturns });
    setMessage(
      nextValue
        ? "You will be notified on lower price drops."
        : "Price watch removed.",
    );
  };

  const toggleWatchForStockReturns = async () => {
    const nextValue = !watchForStockReturns;
    await updateSavedPart(true, { price: watchForPriceDrops, stock: nextValue });
    setMessage(
      nextValue
        ? "You will be notified when stock returns."
        : "Stock watch removed.",
    );
  };

  useEffect(() => {
    if (!message) return;
    const timeout = window.setTimeout(() => setMessage(""), 5000);
    return () => window.clearTimeout(timeout);
  }, [message]);

  const shareProduct = async () => {
    setMessage("");
    try {
      if (navigator.share) {
        await navigator.share({ title, url: shareUrl });
        return;
      }
      await navigator.clipboard.writeText(shareUrl);
      setMessage("Product link copied.");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }
      setMessage("Unable to share this product.");
    }
  };

  const watchSection = canSave ? (
    <div className="space-y-2 rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] p-3">
      <p className="text-xs text-[#9CA3AF]">Alerts for this saved part</p>
      <label className="flex items-center gap-2 text-sm text-[#9CA3AF]">
        <Checkbox
          checked={watchForPriceDrops}
          disabled={!saved || pending}
          onCheckedChange={() => void toggleWatchForPriceDrops()}
        />
        <span>Watch for lower price</span>
      </label>
      <label className="flex items-center gap-2 text-sm text-[#9CA3AF]">
        <Checkbox
          checked={watchForStockReturns}
          disabled={!saved || pending}
          onCheckedChange={() => void toggleWatchForStockReturns()}
        />
        <span>Watch for stock return</span>
      </label>
      {!saved ? <p className="text-xs text-[#9CA3AF]">Save first to enable alerts.</p> : null}
    </div>
  ) : null;

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
      {watchSection}
      {message ? <p className="text-sm text-[#9CA3AF]">{message}</p> : null}
    </div>
  );
}
