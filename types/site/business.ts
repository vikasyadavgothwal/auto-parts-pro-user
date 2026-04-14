import type { LucideIcon } from "lucide-react"

export type BusinessFeature = {
  title: string
  description: string
  icon: LucideIcon
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
