"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import {
  canOptimizeSiteImageSrc,
  getImageOptimizationSizes,
  resolveSiteImageSrc,
} from "@/lib/site-image";

type ProductGalleryProps = {
  images: readonly string[];
  title: string;
};

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [failedImages, setFailedImages] = useState<Set<string>>(
    () => new Set(),
  );
  const visibleImages = images
    .slice(0, 5)
    .filter((image) => !failedImages.has(image))
    .map((image) => resolveSiteImageSrc(image, "/home.jpg"));
  const safeSelectedImage = Math.min(
    selectedImage,
    Math.max(visibleImages.length - 1, 0),
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
          <Image
            src={primaryImage}
            alt={title}
            fill
            quality={78}
            sizes={getImageOptimizationSizes("hero")}
            className="h-full w-full object-cover"
            unoptimized={!canOptimizeSiteImageSrc(primaryImage)}
            onError={() => markImageFailed(primaryImage)}
          />
        </div>
      </Card>

      <div className="grid grid-cols-4 gap-2 sm:gap-4">
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
                  : "border-[#2A2A2A] hover:border-[#DC2626]/50",
              )}
            >
              <div className="relative aspect-square">
                <Image
                  src={image}
                  alt={`Product view ${index + 1}`}
                  fill
                  quality={78}
                  sizes={getImageOptimizationSizes("card")}
                  className="h-full w-full object-cover"
                  unoptimized={!canOptimizeSiteImageSrc(image)}
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
