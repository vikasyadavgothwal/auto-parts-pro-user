export type BookingActiveStep = "service" | "vehicle" | "datetime" | "review";
export type BookingStep = BookingActiveStep | "confirmed";

export type BookingService = {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
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
  date: string;
  time: string;
};
