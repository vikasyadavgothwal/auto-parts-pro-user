
import {
  AnalyticsIcon,
  CreditCardIcon,
  SupportIcon,
  ShieldCheckIcon,
  SparklesIcon,
  TimerIcon,
  TrendingIcon,
  UsersIcon,
  ZapIcon,
  SellerPackageIcon,
} from "@/components/icons/site-icons"
import type { BusinessFeature } from "@/types/site/business"
import type { BusinessPlan } from "@/types/site/business"
 export const fleetFeatures = [
  "Bulk ordering with custom pricing",
  "Fleet-specific inventory management",
  "Predictive maintenance alerts",
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
    price: "$49",
    suffix: "/month",
    buttonText: "Start Free Trial",
    popular: true,
    features: [
      "12% discount on all orders",
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
  {
    title: "Extended Warranty",
    description: "Business-grade protection plans",
    icon: ShieldCheckIcon,
  },
  {
    title: "API Integration",
    description: "Connect directly to your systems",
    icon: ZapIcon,
  },
  {
    title: "Analytics Dashboard",
    description: "Track spending and optimize costs",
    icon: AnalyticsIcon,
  },
  {
    title: "24/7 Business Support",
    description: "Always available when you need us",
    icon: SupportIcon,
  },
  {
    title: "Custom Invoicing",
    description: "Flexible billing and NET terms",
    icon: SparklesIcon,
  },
  {
    title: "Fleet Cards Accepted",
    description: "WEX, Voyager, and more",
    icon: CreditCardIcon,
  },
]


export const metrics = [
  {
    label: "Monthly Savings",
    value: "$12,450",
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
