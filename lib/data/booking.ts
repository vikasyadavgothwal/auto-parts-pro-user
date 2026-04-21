import type {
  BookingActiveStep,
  BookingDateOption,
  BookingService,
  BookingTimeSlots,
  BookingVehicle,
} from "@/types/site/booking";

export const bookingStepOrder = [
  "service",
  "vehicle",
  "datetime",
  "review",
] as const satisfies readonly BookingActiveStep[];

export const bookingServices = [
  {
    id: "1",
    name: "Oil Change & Filter",
    price: 49.99,
    duration: "30 min",
    description: "Complete oil change with premium synthetic oil",
  },
  {
    id: "2",
    name: "Brake Pad Replacement",
    price: 199.99,
    duration: "2 hours",
    description: "Front or rear brake pad replacement with inspection",
  },
  {
    id: "3",
    name: "Engine Diagnostics",
    price: 89.99,
    duration: "1 hour",
    description: "Comprehensive computer diagnostics",
  },
] satisfies readonly BookingService[];

export const bookingVehicles = [
  {
    id: "1",
    year: "2018",
    make: "Honda",
    model: "Accord",
    vin: "1HGBH41JXMN109186",
  },
  {
    id: "2",
    year: "2020",
    make: "Toyota",
    model: "Camry",
    vin: "4T1B11HK1LU345678",
  },
] satisfies readonly BookingVehicle[];

export const bookingAvailableDates = [
  { date: "2026-03-28", label: "Today", availability: "limited" },
  { date: "2026-03-29", label: "Tomorrow", availability: "available" },
  { date: "2026-03-30", label: "Mon, Mar 30", availability: "available" },
  { date: "2026-03-31", label: "Tue, Mar 31", availability: "available" },
  { date: "2026-04-01", label: "Wed, Apr 1", availability: "limited" },
] as const satisfies readonly BookingDateOption[];

export const bookingTimeSlots = {
  morning: ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"],
  afternoon: ["12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM"],
  evening: ["3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM"],
} satisfies BookingTimeSlots;

export const stepOrder = bookingStepOrder;
export const servicesnew = bookingServices;
export const vehicles = bookingVehicles;
export const availableDates = bookingAvailableDates;
export const timeSlots = bookingTimeSlots;
