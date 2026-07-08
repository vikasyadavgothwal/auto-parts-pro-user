"use client";

/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type ProductGalleryProps = {
  images: readonly string[];
  title: string;
};

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [failedImages, setFailedImages] = useState<Set<string>>(
    () => new Set()
  );
  const visibleImages = images.filter((image) => !failedImages.has(image));
  const safeSelectedImage = Math.min(
    selectedImage,
    Math.max(visibleImages.length - 1, 0)
  );
  const primaryImage = visibleImages[safeSelectedImage] ?? visibleImages[0];

  if (!primaryImage) {
    return null;
  }

  const markImageFailed = (image: string) => {
    setFailedImages((currentFailedImages) => {
      const nextFailedImages = new Set(currentFailedImages);
      nextFailedImages.add(image);
      return nextFailedImages;
    });
    setSelectedImage(0);
  };

  return (
    <div>
      <Card className="mb-4 overflow-hidden rounded-xl border border-[#2A2A2A] bg-[#1A1A1A]">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
          <img
            src={primaryImage}
            alt={title}
            className="h-full w-full object-cover"
            onError={() => markImageFailed(primaryImage)}
          />
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {visibleImages.map((image, index) => {
          const isActive = safeSelectedImage === index;

          return (
            <button
              key={image}
              type="button"
              aria-pressed={isActive}
              onClick={() => setSelectedImage(index)}
              className={cn(
                "overflow-hidden rounded-xl border-2 transition-all",
                isActive
                  ? "border-[#DC2626] ring-2 ring-[#DC2626]/20"
                  : "border-[#2A2A2A] hover:border-[#DC2626]/50"
              )}
            >
              <div className="relative aspect-square">
                <img
                  src={image}
                  alt={`Product view ${index + 1}`}
                  className="h-full w-full object-cover"
                  onError={() => markImageFailed(image)}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
