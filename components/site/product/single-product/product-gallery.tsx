"use client";

import { useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type ProductGalleryProps = {
  images: readonly string[];
  title: string;
};

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const primaryImage = images[selectedImage] ?? images[0];

  if (!primaryImage) {
    return null;
  }

  return (
    <div>
      <Card className="mb-4 overflow-hidden rounded-2xl border border-[#2A2A2A] bg-[#1A1A1A] p-4 sm:p-6 lg:p-8">
        <div className="relative aspect-square overflow-hidden rounded-xl">
          <Image
            src={primaryImage}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {images.map((image, index) => {
          const isActive = selectedImage === index;

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
                <Image
                  src={image}
                  alt={`Product view ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
