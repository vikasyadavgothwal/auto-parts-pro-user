import type {
  BookingActiveStep,
  BookingDateAvailability,
  BookingSelection,
} from "@/types/site/booking";
export const BOOKING_ROUTES = {
  home: "/",
  bookAnother: "/servicesnew",
} as const;
export const BOOKING_INITIAL_SELECTION: BookingSelection = {
  serviceId: "",
  vehicleId: "",
  date: "",
  time: "",
};
export const BOOKING_STEP_LABELS: Record<BookingActiveStep, string> = {
  service: "Select Service",
  vehicle: "Select Vehicle",
  datetime: "Date & Time",
  review: "Review",
};
export const BOOKING_DATE_AVAILABILITY_LABELS: Record<
  BookingDateAvailability,
  string
> = {
  available: "Available",
  limited: "Limited",
  unavailable: "Full",
};
export const BOOKING_DATE_AVAILABILITY_CLASSES: Record<
  BookingDateAvailability,
  string
> = {
  available: "text-brand-success",
  limited: "text-brand-warning",
  unavailable: "text-primary",
};
export const BOOKING_STEP_MOTION = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
} as const;