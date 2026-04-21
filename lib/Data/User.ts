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
    price: "$89.99",
    image:
      "https://images.unsplash.com/photo-1656597631995-9fa0e1072279?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
  {
    id: 2,
    category: "FILTERS",
    name: "Bosch Oil Filter Premium",
    price: "$24.99",
    image:
      "https://images.unsplash.com/photo-1764869427688-3e97480f4b82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
  {
    id: 3,
    category: "IGNITION",
    name: "Denso Spark Plug Set",
    price: "$42.99",
    image:
      "https://images.unsplash.com/photo-1759832217256-244b5bc54882?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
  {
    id: 4,
    category: "SUSPENSION",
    name: "Monroe Shock Absorber",
    price: "$156.00",
    image:
      "https://images.unsplash.com/photo-1729545321223-e597f91a25d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
];
export const categories: Category[] = [
  { name: "Engine Parts", count: "12,450 parts", icon: CogIcon },
  { name: "Suspension", count: "8,320 parts", icon: WrenchIcon },
  { name: "Electrical", count: "15,680 parts", icon: BatteryIcon },
  { name: "Brakes", count: "9,870 parts", icon: PackageIcon },
  { name: "Transmission", count: "6,540 parts", icon: GaugeIcon },
  { name: "Body Parts", count: "22,100 parts", icon: CarFrontIcon },
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
  },
  {
    title: "Best Price Promise",
    description: "Compare offers from verified suppliers",
    icon: DiscountBadgeIcon,
  },
  {
    title: "Real-Time Inventory",
    description: "Live stock updates across 500+ suppliers",
    icon: TrendingIcon,
  },
];