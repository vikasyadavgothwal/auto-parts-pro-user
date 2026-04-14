import {
  CheckCircle2,
  CircleX,
  Package,
  SlidersHorizontal,
  Star,
  TriangleAlert,
  BarChart3,
  CreditCard,
  Headphones,
  ShieldCheck,
  Sparkles,
  Clock3,
  Timer,
  TrendingUp,
  Users,
  Zap,
  Boxes,
  Check,
  Wrench,
  ChevronLeft,
  Shield,
  CircleCheckBig,
  Truck,
  Heart,
  BadgeDollarSign,
  ArrowRight,
  Battery,
  CarFront,
  Cog,
  Gauge,
  Share2,
  CheckCircle,
  MessageSquare,
  Plus,
  Filter,
  MapPin,
  Search,
  FileText,
  CircleCheck,
  ShoppingCart,
  User,
  Clock,
  Award,
  ChevronUp,
  ChevronDown,
  Calendar,
  Phone,
  Mail,
  ChevronRight , X, Eye, Lock  , Building2
} from "lucide-react"


import type { AppIconProps, RatingStarIconProps } from "@/types/icons"

/* Fitment */
export const FitmentConfirmedIcon = (props: AppIconProps) => <CheckCircle2 {...props} />
export const FitmentLikelyIcon = (props: AppIconProps) => <TriangleAlert {...props} />
export const FitmentRejectedIcon = (props: AppIconProps) => <CircleX {...props} />

/* Seller / UI */
export const SellerPackageIcon = (props: AppIconProps) => <Package {...props} />
export const PackageIcon = (props: AppIconProps) => <Package {...props} />
export const FilterSlidersIcon = (props: AppIconProps) => <SlidersHorizontal {...props} />
export const DropdownChevronIcon = (props: AppIconProps) => <ChevronDown {...props} />
export const ChevronDownIcon = (props: AppIconProps) => <ChevronDown {...props} />
export const ChevronLeftIcon = (props: AppIconProps) => <ChevronLeft {...props} />
export const ChevronUpIcon = (props: AppIconProps) => <ChevronUp {...props} />

/* Ratings */
export const RatingStarFilledIcon = (props: AppIconProps) => (
  <Star fill="currentColor" {...props} />
)
export const RatingStarEmptyIcon = (props: AppIconProps) => <Star fill="none" {...props} />

export function RatingStarIcon({
  filled = false,
  ...props
}: RatingStarIconProps) {
  return <Star fill={filled ? "currentColor" : "none"} {...props} />
}

/* Analytics */
export const AnalyticsIcon = (props: AppIconProps) => <BarChart3 {...props} />
export const TrendingIcon = (props: AppIconProps) => <TrendingUp {...props} />
export const GaugeIcon = (props: AppIconProps) => <Gauge {...props} />

/* Payments / Pricing */
export const CreditCardIcon = (props: AppIconProps) => <CreditCard {...props} />
export const DiscountBadgeIcon = (props: AppIconProps) => <BadgeDollarSign {...props} />

/* Support / Trust */
export const SupportIcon = (props: AppIconProps) => <Headphones {...props} />
export const ShieldCheckIcon = (props: AppIconProps) => <ShieldCheck {...props} />
export const ShieldIcon = (props: AppIconProps) => <Shield {...props} />
export const AwardIcon = (props: AppIconProps) => <Award {...props} />

/* Utility */
export const SparklesIcon = (props: AppIconProps) => <Sparkles {...props} />
export const TimerIcon = (props: AppIconProps) => <Timer {...props} />
export const ClockIcon = (props: AppIconProps) => <Clock {...props} />
export const Clock3Icon = (props: AppIconProps) => <Clock3 {...props} />
export const CalendarIcon = (props: AppIconProps) => <Calendar {...props} />
export const ZapIcon = (props: AppIconProps) => <Zap {...props} />
export const UsersIcon = (props: AppIconProps) => <Users {...props} />

/* Logistics */
export const TruckIcon = (props: AppIconProps) => <Truck {...props} />
export const BoxesIcon = (props: AppIconProps) => <Boxes {...props} />

/* Actions */
export const ArrowRightIcon = (props: AppIconProps) => <ArrowRight {...props} />
export const PlusIcon = (props: AppIconProps) => <Plus {...props} />
export const CheckIcon = (props: AppIconProps) => <Check {...props} />
export const CheckCircleIcon = (props: AppIconProps) => <CheckCircle {...props} />
export const CircleCheckIcon = (props: AppIconProps) => <CircleCheck {...props} />
export const CircleCheckBigIcon = (props: AppIconProps) => <CircleCheckBig {...props} />

/* Automotive */
export const CarFrontIcon = (props: AppIconProps) => <CarFront {...props} />
export const BatteryIcon = (props: AppIconProps) => <Battery {...props} />
export const WrenchIcon = (props: AppIconProps) => <Wrench {...props} />
export const CogIcon = (props: AppIconProps) => <Cog {...props} />

/* Contact / Communication */
export const PhoneIcon = (props: AppIconProps) => <Phone {...props} />
export const MailIcon = (props: AppIconProps) => <Mail {...props} />
export const MessageIcon = (props: AppIconProps) => <MessageSquare {...props} />

/* Social / Misc */
export const ShareIcon = (props: AppIconProps) => <Share2 {...props} />
export const HeartIcon = (props: AppIconProps) => <Heart {...props} />

/* Navigation / Search */
export const FilterIcon = (props: AppIconProps) => <Filter {...props} />
export const MapPinIcon = (props: AppIconProps) => <MapPin {...props} />
export const SearchIcon = (props: AppIconProps) => <Search {...props} />
export const FileTextIcon = (props: AppIconProps) => <FileText {...props} />

/* Commerce */
export const ShoppingCartIcon = (props: AppIconProps) => <ShoppingCart {...props} />
export const UserIcon = (props: AppIconProps) => <User {...props} />
export const ChevronRightIcon = (props: AppIconProps) => <ChevronRight {...props} />;

/* Authentication */
export const CloseIcon = (props: AppIconProps) => <X {...props} />;
export const EyeIcon = (props: AppIconProps) => <Eye {...props} />;
export const LockIcon = (props: AppIconProps) => <Lock {...props} />;
export const BuildingIcon = (props: AppIconProps) => <Building2 {...props} />;