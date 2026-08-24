import Link from "next/link"

import { cn } from "@/lib/utils"
import type { BrandLogoProps } from "@/types/site/shared"

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
}: BrandLogoProps) {
  const isDefaultBrand = siteName === "AutoPartsPro" || siteName === "AutoParts Pro"
  return (
    <Link href={href} className={cn("inline-flex items-center gap-3", className)}>
      {showMark ? (
        <span
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-xl font-bold text-primary-foreground",
            markClassName
          )}
        >
          A
        </span>
      ) : null}

      {logoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={logoUrl} alt="AutoParts Pro" className={cn("h-14 max-w-[260px] object-contain", logoClassName)} />
      ) : (
        <span className={cn("text-2xl font-bold text-black", textClassName)}>
          {isDefaultBrand ? <>AutoParts<span className={cn("text-primary", accentClassName)}> Pro</span></> : siteName}
        </span>
      )}
    </Link>
  )
}
