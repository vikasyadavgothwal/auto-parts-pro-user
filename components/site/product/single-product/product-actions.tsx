"use client";

import { useEffect, useMemo, useState } from "react";

import { HeartIcon, ShareIcon } from "@/components/icons/site-icons";
import { Button } from "@/components/ui/button";
import { getCurrentUser, siteAuthenticatedFetch } from "@/lib/current-user";

type SavedStatusPayload = {
  ok?: boolean;
  saved?: boolean;
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
      const payload = (await response.json().catch(() => null)) as SavedStatusPayload | null;
      if (mounted && response.ok && payload?.ok) {
        setSaved(Boolean(payload.saved));
      }
    }

    void loadSavedStatus();
    return () => {
      mounted = false;
    };
  }, [partUid]);

  const toggleSave = async () => {
    if (!partUid || pending) return;
    setPending(true);
    setMessage("");
    try {
      const response = await siteAuthenticatedFetch("/api/saved-parts", {
        method: saved ? "DELETE" : "POST",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ partUid }),
      });
      const payload = (await response.json().catch(() => null)) as SavedStatusPayload | null;
      if (!response.ok || !payload?.ok) {
        throw new Error(payload?.message || "Unable to update saved part.");
      }
      setSaved(!saved);
      setMessage(saved ? "Removed from saved parts." : "Saved to your dashboard.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to update saved part.");
    } finally {
      setPending(false);
    }
  };

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

  return (
    <div className="space-y-2">
      <div className="flex flex-col gap-3 sm:flex-row">
        {canSave ? (
          <Button
            type="button"
            variant="outline"
            disabled={pending}
            onClick={toggleSave}
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
      {message ? <p className="text-sm text-[#9CA3AF]">{message}</p> : null}
    </div>
  );
}
