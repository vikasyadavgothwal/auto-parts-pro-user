
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
    price: "AED 49",
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
]


export const metrics = [
  {
    label: "Monthly Savings",
    value: "AED 12,450",
    caption: "↑ 23% vs last month",
    icon: AnalyticsIcon,
    svg : `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.3337 5.83325L11.2503 12.9166L7.08366 8.74992L1.66699 14.1666" stroke="#DC2626" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.333 5.83325H18.333V10.8333" stroke="#DC2626" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`
  },
  {
    label: "Active Vehicles",
    value: "247",
    icon:  SparklesIcon,
    svg : `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.16667 18.1084C9.42003 18.2547 9.70744 18.3317 10 18.3317C10.2926 18.3317 10.58 18.2547 10.8333 18.1084L16.6667 14.7751C16.9198 14.6289 17.13 14.4188 17.2763 14.1658C17.4225 13.9127 17.4997 13.6257 17.5 13.3334V6.66675C17.4997 6.37448 17.4225 6.08742 17.2763 5.83438C17.13 5.58134 16.9198 5.37122 16.6667 5.22508L10.8333 1.89175C10.58 1.74547 10.2926 1.66846 10 1.66846C9.70744 1.66846 9.42003 1.74547 9.16667 1.89175L3.33333 5.22508C3.08022 5.37122 2.86998 5.58134 2.72372 5.83438C2.57745 6.08742 2.5003 6.37448 2.5 6.66675V13.3334C2.5003 13.6257 2.57745 13.9127 2.72372 14.1658C2.86998 14.4188 3.08022 14.6289 3.33333 14.7751L9.16667 18.1084Z" stroke="#DC2626" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10 18.3333V10" stroke="#DC2626" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.74121 5.83325L9.99954 9.99992L17.2579 5.83325" stroke="#DC2626" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.25 3.55835L13.75 7.85002" stroke="#DC2626" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`
  },
  {
    label: "Parts in Stock",
    value: "1,234",
    icon: SellerPackageIcon,
    svg : `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.5 2.5V15.8333C2.5 16.2754 2.67559 16.6993 2.98816 17.0118C3.30072 17.3244 3.72464 17.5 4.16667 17.5H17.5" stroke="#DC2626" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15 14.1667V7.5" stroke="#DC2626" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.833 14.1667V4.16675" stroke="#DC2626" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.66699 14.1667V11.6667" stroke="#DC2626" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`
  },
]
