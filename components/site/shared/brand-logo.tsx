import Image from "next/image"

import Link from "next/link"

import { cn } from "@/lib/utils"
import {
  canOptimizeSiteImageSrc,
  getImageOptimizationSizes,
  resolveSiteImageSrc,
} from "@/lib/site-image"
import type { BrandLogoProps } from "@/types/site/shared"

const LOGO_DIMENSIONS = {
  width: 260,
  height: 167,
}

export function BrandLogo({
  href = "/",
  className,
  logoClassName,
  textClassName,
  accentClassName,
  markClassName,
  showMark = false,
  logoUrl,
  siteName = "AutoPartsPro",
  isPriority = false,
  imageFetchPriority = "auto",
}: BrandLogoProps) {
  const isDefaultBrand = siteName === "AutoPartsPro" || siteName === "AutoParts Pro"
  const resolvedLogoUrl = logoUrl ? resolveSiteImageSrc(logoUrl) : ""
  const canOptimizeImage = resolvedLogoUrl
    ? canOptimizeSiteImageSrc(resolvedLogoUrl)
    : false

  return (
    <Link href={href} className={cn("inline-flex items-center gap-3", className)}>
      {showMark ? (
        <span
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-xl font-bold text-primary-foreground",
            markClassName,
          )}
        >
          A
        </span>
      ) : null}

      {logoUrl ? (
        <Image
          src={resolvedLogoUrl}
          alt="AutoParts Pro"
          width={LOGO_DIMENSIONS.width}
          height={LOGO_DIMENSIONS.height}
          quality={78}
          priority={isPriority}
          fetchPriority={isPriority ? "high" : imageFetchPriority}
          sizes={getImageOptimizationSizes("logo")}
          className={cn(
            "h-14 w-auto max-w-[260px] object-contain",
            logoClassName,
          )}
          unoptimized={!canOptimizeImage}
        />
      ) : (
        <span className={cn("text-2xl font-bold text-black", textClassName)}>
          {isDefaultBrand ? (
            <>
              AutoParts
              <span className={cn("text-primary", accentClassName)}> Pro</span>
            </>
          ) : (
            siteName
          )}
        </span>
      )}
    </Link>
  )
}
