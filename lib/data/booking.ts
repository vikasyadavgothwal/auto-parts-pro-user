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

const formatDateValue = (date: Date) => date.toISOString().slice(0, 10);

const formatDateLabel = (date: Date, offset: number) => {
  if (offset === 0) return "Today";
  if (offset === 1) return "Tomorrow";
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

export const getBookingAvailableDates = (): BookingDateOption[] => {
  const today = new Date();
  today.setHours(12, 0, 0, 0);

  return Array.from({ length: 5 }, (_, offset) => {
    const date = new Date(today);
    date.setDate(today.getDate() + offset);

    return {
      date: formatDateValue(date),
      label: formatDateLabel(date, offset),
      availability: offset === 0 || offset === 4 ? "limited" : "available",
    };
  });
};

export const bookingAvailableDates = getBookingAvailableDates();

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

export const bookingTimeSlots = {
  morning: ["9:00 AM", "9:15 AM", "9:30 AM", "9:45 AM", "10:00 AM", "10:15 AM", "10:30 AM", "10:45 AM", "11:00 AM", "11:15 AM", "11:30 AM", "11:45 AM"],
  afternoon: ["12:00 PM", "12:15 PM", "12:30 PM", "12:45 PM", "1:00 PM", "1:15 PM", "1:30 PM", "1:45 PM", "2:00 PM", "2:15 PM", "2:30 PM", "2:45 PM", "3:00 PM", "3:15 PM"],
  evening: ["3:30 PM", "3:45 PM", "4:00 PM", "4:15 PM", "4:30 PM", "4:45 PM", "5:00 PM", "5:15 PM", "5:30 PM"],
} satisfies BookingTimeSlots;

export const stepOrder = bookingStepOrder;
export const servicesnew = bookingServices;
export const vehicles = bookingVehicles;
export const availableDates = bookingAvailableDates;
export const timeSlots = bookingTimeSlots;
