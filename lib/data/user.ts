import type { BenefitItem } from "@/types/site/user";
import {
  DiscountBadgeIcon,
  ShieldCheckIcon,
  TrendingIcon,
  WrenchIcon,
  PackageIcon,
  CogIcon,
  BatteryIcon,
  GaugeIcon,
  CarFrontIcon,
  ZapIcon,
  Clock3Icon,
} from "@/components/icons/site-icons";
import type { Solution } from "@/types/site/user";
import type { Category } from "@/types/site/user";
export const steps = [
  {
    number: "1",
    title: "Enter Your VIN",
    description:
      "Start with your vehicle's VIN for guaranteed fitment or browse by category",
  },
  {
    number: "2",
    title: "Compare Offers",
    description:
      "View real-time prices from multiple verified suppliers side by side",
  },
  {
    number: "3",
    title: "Order or RFQ",
    description:
      "Buy instantly or request custom quotes for bulk orders and special parts",
  },
];
export const features = [
  { title: "Verified OEM Parts", icon: ShieldCheckIcon },
  { title: "Same-Day Shipping", icon: ZapIcon },
  { title: "24/7 Support", icon: Clock3Icon },
];
export const products = [
  {
    id: 1,
    category: "BRAKES",
    name: "ACDelco Professional Brake Pads",
    price: "AED 89.99",
    image:
      "https://images.unsplash.com/photo-1656597631995-9fa0e1072279?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
  {
    id: 2,
    category: "FILTERS",
    name: "ACDelco Professional Brake Pads",
    price: "AED 89.99",
    image:
      "https://images.unsplash.com/photo-1656597631995-9fa0e1072279?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
  {
    id: 3,
    category: "IGNITION",
    name: "ACDelco Professional Brake Pads",
    price: "AED 89.99",
    image:
      "https://images.unsplash.com/photo-1656597631995-9fa0e1072279?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
  {
    id: 4,
    category: "SUSPENSION",
    name: "ACDelco Professional Brake Pads",
    price: "AED 89.99",
    image:
      "https://images.unsplash.com/photo-1656597631995-9fa0e1072279?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
];
export const categories: Category[] = [
  { name: "Engine Parts", count: "12,450 parts", icon: CogIcon  },
  { name: "Suspension", count: "8,320 parts", icon: WrenchIcon },
  { name: "Electrical", count: "15,680 parts", icon: BatteryIcon },
  { name: "Brakes", count: "9,870 parts", icon: PackageIcon },
  { name: "Transmission", count: "6,540 parts", svg: `
<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14 23.3333C16.4753 23.3333 18.8493 22.35 20.5996 20.5996C22.35 18.8493 23.3333 16.4753 23.3333 14C23.3333 11.5246 22.35 9.15064 20.5996 7.4003C18.8493 5.64996 16.4753 4.66663 14 4.66663C11.5246 4.66663 9.15064 5.64996 7.4003 7.4003C5.64996 9.15064 4.66663 11.5246 4.66663 14C4.66663 16.4753 5.64996 18.8493 7.4003 20.5996C9.15064 22.35 11.5246 23.3333 14 23.3333Z" stroke="#DC2626" stroke-width="2.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14 16.3333C14.6188 16.3333 15.2123 16.0875 15.6499 15.6499C16.0875 15.2123 16.3333 14.6188 16.3333 14C16.3333 13.3811 16.0875 12.7876 15.6499 12.35C15.2123 11.9125 14.6188 11.6666 14 11.6666C13.3811 11.6666 12.7876 11.9125 12.35 12.35C11.9125 12.7876 11.6666 13.3811 11.6666 14C11.6666 14.6188 11.9125 15.2123 12.35 15.6499C12.7876 16.0875 13.3811 16.3333 14 16.3333Z" stroke="#DC2626" stroke-width="2.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14 2.33337V4.66671" stroke="#DC2626" stroke-width="2.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14 25.6667V23.3334" stroke="#DC2626" stroke-width="2.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19.8333 24.1033L18.6666 22.085" stroke="#DC2626" stroke-width="2.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.8333 11.9816L8.16663 3.89661" stroke="#DC2626" stroke-width="2.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M24.1033 19.8333L22.085 18.6666" stroke="#DC2626" stroke-width="2.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.89661 8.16663L5.91494 9.33329" stroke="#DC2626" stroke-width="2.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.3334 14H25.6667" stroke="#DC2626" stroke-width="2.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.33337 14H4.66671" stroke="#DC2626" stroke-width="2.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M24.1033 8.16663L22.085 9.33329" stroke="#DC2626" stroke-width="2.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.89661 19.8333L5.91494 18.6666" stroke="#DC2626" stroke-width="2.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19.8333 3.89661L18.6666 5.91494" stroke="#DC2626" stroke-width="2.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.8333 16.0183L8.16663 24.1033" stroke="#DC2626" stroke-width="2.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

` },
  { name: "Body Parts", count: "22,100 parts" , svg: `
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.1667 19.8333H24.5C25.2 19.8333 25.6667 19.3666 25.6667 18.6666V15.1666C25.6667 14.1166 24.85 13.1833 23.9167 12.95C21.8167 12.3666 18.6667 11.6666 18.6667 11.6666C18.6667 11.6666 17.15 10.0333 16.1 8.98329C15.5167 8.51663 14.8167 8.16663 14 8.16663H5.83337C5.13337 8.16663 4.55004 8.63329 4.20004 9.21663L2.56671 12.6C2.41222 13.0506 2.33337 13.5236 2.33337 14V18.6666C2.33337 19.3666 2.80004 19.8333 3.50004 19.8333H5.83337" stroke="#DC2626" stroke-width="2.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.16671 22.1667C9.45537 22.1667 10.5 21.122 10.5 19.8333C10.5 18.5447 9.45537 17.5 8.16671 17.5C6.87804 17.5 5.83337 18.5447 5.83337 19.8333C5.83337 21.122 6.87804 22.1667 8.16671 22.1667Z" stroke="#DC2626" stroke-width="2.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.5 19.8334H17.5" stroke="#DC2626" stroke-width="2.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19.8333 22.1667C21.122 22.1667 22.1667 21.122 22.1667 19.8333C22.1667 18.5447 21.122 17.5 19.8333 17.5C18.5447 17.5 17.5 18.5447 17.5 19.8333C17.5 21.122 18.5447 22.1667 19.8333 22.1667Z" stroke="#DC2626" stroke-width="2.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

` },
];
export const solutions: Solution[] = [
  {
    title: "For Repair Shops",
    description:
      "Volume pricing, dedicated account manager, priority support, and integrated shop management tools.",
    icon: WrenchIcon,
  },
  {
    title: "For Fleet Managers",
    description:
      "Bulk ordering, custom integrations, procurement dashboards, and fleet-specific inventory management.",
    icon: PackageIcon,
  },
];
export const benefits: BenefitItem[] = [
  {
    title: "Guaranteed Fitment",
    description: "VIN-verified compatibility on every part",
    icon: ShieldCheckIcon,
    svg: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M29.068 13.3333C29.6769 16.3217 29.243 19.4286 27.8385 22.1357C26.434 24.8429 24.1439 26.9867 21.35 28.2097C18.5562 29.4328 15.4275 29.661 12.4857 28.8565C9.54397 28.0519 6.96693 26.2632 5.18438 23.7885C3.40183 21.3139 2.52151 18.303 2.69023 15.2578C2.85895 12.2127 4.06652 9.31744 6.11155 7.05488C8.15657 4.79232 10.9155 3.29923 13.9281 2.82459C16.9407 2.34995 20.0251 2.92247 22.6667 4.44665" stroke="#DC2626" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 14.6666L16 18.6666L29.3333 5.33331" stroke="#DC2626" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  },
  {
    title: "Best Price Promise",
    description: "Compare offers from verified suppliers",
    icon: DiscountBadgeIcon,
    svg: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.636 17.1866L22.656 28.5546C22.6786 28.6885 22.6598 28.8261 22.6021 28.949C22.5445 29.0719 22.4506 29.1742 22.3332 29.2424C22.2158 29.3105 22.0804 29.3412 21.945 29.3303C21.8097 29.3193 21.681 29.2674 21.576 29.1813L16.8026 25.5986C16.5722 25.4265 16.2923 25.3335 16.0046 25.3335C15.717 25.3335 15.4371 25.4265 15.2066 25.5986L10.4253 29.18C10.3204 29.2659 10.1918 29.3178 10.0566 29.3287C9.92148 29.3396 9.7862 29.3091 9.66886 29.2411C9.55151 29.1732 9.45767 29.0711 9.39987 28.9484C9.34206 28.8258 9.32302 28.6884 9.34531 28.5546L11.364 17.1866" stroke="#DC2626" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16 18.6667C20.4183 18.6667 24 15.085 24 10.6667C24 6.24841 20.4183 2.66669 16 2.66669C11.5817 2.66669 8 6.24841 8 10.6667C8 15.085 11.5817 18.6667 16 18.6667Z" stroke="#DC2626" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
  },
  {
    title: "Real-Time Inventory",
    description: "Live stock updates across 500+ suppliers",
    icon: TrendingIcon,
    svg: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M29.3333 9.33331L18 20.6666L11.3333 14L2.66663 22.6666" stroke="#DC2626" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M21.3334 9.33331H29.3334V17.3333" stroke="#DC2626" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
  },
];
