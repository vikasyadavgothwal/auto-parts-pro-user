import Link from "next/link"

import { cn } from "@/lib/utils"
import type { BrandLogoProps } from "@/types/site/shared"

export function BrandLogo({
  href = "/",
  className,
  textClassName,
  accentClassName,
  markClassName,
  showMark = false,
}: BrandLogoProps) {
  return (
    <Link href={href} className={cn("inline-flex items-center gap-3", className)}>
      {showMark ? (
        <span
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-xl font-bold text-primary-foreground",
            markClassName
          )}
        >
          A
        </span>
      ) : null}

      <span className={cn("text-2xl font-bold text-white", textClassName)}>
        AutoParts<span className={cn("text-primary", accentClassName)}>Pro</span>
      </span>
    </Link>
  )
}
