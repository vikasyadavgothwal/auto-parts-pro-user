export const stepOrder= ["service", "vehicle", "datetime", "review"];
export const servicesnew = [
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
];
export const vehicles = [
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
];
export const availableDates = [
  { date: "2026-03-28", label: "Today", availability: "limited" },
  { date: "2026-03-29", label: "Tomorrow", availability: "available" },
  { date: "2026-03-30", label: "Mon, Mar 30", availability: "available" },
  { date: "2026-03-31", label: "Tue, Mar 31", availability: "available" },
  { date: "2026-04-01", label: "Wed, Apr 1", availability: "limited" },
] as const;