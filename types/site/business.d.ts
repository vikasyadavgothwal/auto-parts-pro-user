import type { AppIconComponent } from "@/types/icons"

export type BusinessFeature = {
  title: string
  description: string
  icon: AppIconComponent
}

export type BusinessPlan = {
  name: string
  description: string
  price: string
  suffix?: string
  buttonText: string
  popular?: boolean
  features: string[]
}
