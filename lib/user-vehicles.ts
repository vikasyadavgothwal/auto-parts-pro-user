export type UserVehicleRecord = {
  id: string;
  year: string;
  make: string;
  model: string;
  vin: string;
  mileage: string;
  status: string;
  primary: boolean;
};

const VEHICLE_STORAGE_KEY = "autopartspro.vehicles";

const defaultVehicles: UserVehicleRecord[] = [
  {
    id: "vehicle-camry",
    year: "2019",
    make: "Toyota",
    model: "Camry",
    vin: "JT2BF22K6X0123456",
    mileage: "45234",
    status: "Active",
    primary: true,
  },
  {
    id: "vehicle-accord",
    year: "2021",
    make: "Honda",
    model: "Accord",
    vin: "1HGCV1F16LA012345",
    mileage: "22150",
    status: "Active",
    primary: false,
  },
];

const text = (value: unknown) => (typeof value === "string" ? value.trim() : "");

const normalizeVehicle = (
  vehicle: Partial<UserVehicleRecord>,
  index: number,
): UserVehicleRecord | null => {
  const year = text(vehicle.year);
  const make = text(vehicle.make);
  const model = text(vehicle.model);
  const vin = text(vehicle.vin).toUpperCase();

  if (!year || !make || !model) {
    return null;
  }

  return {
    id: text(vehicle.id) || `vehicle-${index + 1}`,
    year,
    make,
    model,
    vin,
    mileage: text(vehicle.mileage),
    status: text(vehicle.status) || "Active",
    primary: Boolean(vehicle.primary),
  };
};

export function readUserVehiclesFromStorage() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedVehicles = window.localStorage.getItem(VEHICLE_STORAGE_KEY);
    if (!storedVehicles) {
      return defaultVehicles;
    }

    const parsed = JSON.parse(storedVehicles);
    if (!Array.isArray(parsed)) {
      return defaultVehicles;
    }

    const vehicles = parsed
      .map((vehicle, index) => normalizeVehicle(vehicle, index))
      .filter((vehicle): vehicle is UserVehicleRecord => Boolean(vehicle));

    return vehicles.length ? vehicles : defaultVehicles;
  } catch {
    return defaultVehicles;
  }
}

export const vehicleDisplayName = (vehicle: UserVehicleRecord) =>
  [vehicle.year, vehicle.make, vehicle.model].filter(Boolean).join(" ");
