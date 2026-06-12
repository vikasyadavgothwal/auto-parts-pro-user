import type { ComponentProps, ComponentType } from "react"

export type AppIconProps = ComponentProps<"svg">
export type AppIconComponent = ComponentType<AppIconProps>

export type RatingStarIconProps = AppIconProps & {
  filled?: boolean
}
