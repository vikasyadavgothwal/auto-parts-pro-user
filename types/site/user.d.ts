import type { AppIconComponent } from "@/types/icons"

export type BenefitItem = {
  title: string
  description: string
  icon: AppIconComponent
}

export type Category = {
  name: string
  count: string
  icon?: AppIconComponent
}

export type Solution = {
  title: string
  description: string
  icon: AppIconComponent
}
