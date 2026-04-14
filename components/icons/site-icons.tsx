import {
  CheckCircle2,
  ChevronDown,
  CircleX,
  Package,
  SlidersHorizontal,
  Star,
  TriangleAlert,
} from "lucide-react"

import type { AppIconProps, RatingStarIconProps } from "@/types/icons"

export function FitmentConfirmedIcon(props: AppIconProps) {
  return <CheckCircle2 {...props} />
}

export function FitmentLikelyIcon(props: AppIconProps) {
  return <TriangleAlert {...props} />
}

export function FitmentRejectedIcon(props: AppIconProps) {
  return <CircleX {...props} />
}

export function SellerPackageIcon(props: AppIconProps) {
  return <Package {...props} />
}

export function FilterSlidersIcon(props: AppIconProps) {
  return <SlidersHorizontal {...props} />
}

export function DropdownChevronIcon(props: AppIconProps) {
  return <ChevronDown {...props} />
}

export function RatingStarIcon({
  filled = false,
  ...props
}: RatingStarIconProps) {
  return <Star fill={filled ? "currentColor" : "none"} {...props} />
}
