export type BookingActiveStep = "service" | "vehicle" | "datetime" | "review";
export type BookingStep = BookingActiveStep | "confirmed";

export type BookingService = {
  id: string;
  name: string;
  price: number;
  currency?: string;
  duration: string;
  description: string;
};

export type BookingCustomerVehicle = {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  year: string;
  make: string;
  model: string;
  vin: string;
  notes: string;
};

export type BookingVehicle = {
  id: string;
  year: string;
  make: string;
  model: string;
  vin: string;
};

export type BookingDateAvailability = "available" | "limited" | "unavailable";

export type BookingDateOption = {
  date: string;
  label: string;
  availability: BookingDateAvailability;
};

export type BookingTimePeriod = "morning" | "afternoon" | "evening";

export type BookingTimeSlots = Record<BookingTimePeriod, readonly string[]>;

export type BookingSelection = {
  serviceId: string;
  vehicleId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  vehicleYear: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleVin: string;
  notes: string;
  date: string;
  time: string;
};

export type GarageBookingResult = {
  id: string;
  publicId: string;
  bookingDate: string;
  bookingTime: string;
  status: string;
};
