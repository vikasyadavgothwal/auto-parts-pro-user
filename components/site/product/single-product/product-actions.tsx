"use client";

import { useMemo } from "react";
import { toast } from "sonner";

import { ShareIcon } from "@/components/icons/site-icons";
import { Button } from "@/components/ui/button";

type ProductActionsProps = {
  partUid?: string;
  title: string;
};

const buttonClass =
  "h-12 flex-1 border-[#2A2A2A] bg-[#1A1A1A] p-3 text-white hover:border-[#DC2626] hover:bg-[#1A1A1A] md:p-0";

export function ProductActions({ partUid, title }: ProductActionsProps) {
  const resolvedPartUid = useMemo(() => partUid?.trim() || "", [partUid]);

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


  return (
    <div className="space-y-2">
      <div className="flex flex-col gap-3 sm:flex-row">
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
