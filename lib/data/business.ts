
import {
  AnalyticsIcon,
  SparklesIcon,
  TimerIcon,
  TrendingIcon,
  UsersIcon,
  SellerPackageIcon,
} from "@/components/icons/site-icons"
import type { BusinessFeature } from "@/types/site/business"
import type { BusinessPlan } from "@/types/site/business"
 export const fleetFeatures = [
  "Bulk ordering with custom pricing",
  "Fleet-specific inventory management (Coming soon)",
  "Predictive maintenance alerts (Coming soon)",
  "Multi-vehicle tracking",
  "Custom reporting & analytics",
  "Integration with fleet management software",
  "Dedicated fleet specialist",
  "Emergency part sourcing",
]
export const plans: BusinessPlan[] = [
  {
    name: "Starter",
    description: "Perfect for independent mechanics",
    price: "Free",
    buttonText: "Get Started",
    features: [
      "5% discount on all orders",
      "Standard shipping rates",
      "Email support",
      "Basic order history",
      "Monthly statements",
    ],
  },
  {
    name: "Professional",
    description: "For established repair shops",
    price: "AED 49",
    suffix: "/month",
    buttonText: "Start Free Trial",
    popular: true,
    features: [
      "12% discount (on first 30 orders)",
      "Free 2-day shipping",
      "Priority phone support",
      "Advanced analytics",
      "NET 30 payment terms",
      "Dedicated account manager",
      "Custom price lists",
    ],
  },
  {
    name: "Enterprise",
    description: "For multi-location operations",
    price: "Custom",
    buttonText: "Contact Sales",
    features: [
      "Custom volume pricing",
      "White-glove service",
      "24/7 priority support",
      "API access",
      "Custom NET terms",
      "Multi-location management",
      "Custom integrations",
      "Training & onboarding",
    ],
  },
]
export const features: BusinessFeature[] = [
  {
    title: "Volume Pricing",
    description: "Scale discounts that grow with your business",
    icon: TrendingIcon,
  },
  {
    title: "Dedicated Account Manager",
    description: "Personal support for your team",
    icon: UsersIcon,
  },
  {
    title: "Priority Processing",
    description: "Fast-track order fulfillment",
    icon: TimerIcon,
  },
]


export const metrics = [
  {
    label: "Monthly Savings",
    value: "AED 12,450",
    caption: "↑ 23% vs last month",
    icon: AnalyticsIcon,
  },
  {
    label: "Active Vehicles",
    value: "247",
    icon:  SparklesIcon,
  },
  {
    label: "Parts in Stock",
    value: "1,234",
    icon: SellerPackageIcon,
  },
]
