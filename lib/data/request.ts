export const companyFields = [
  ["Company Name *", "Your Company LLC"],
  ["Contact Name *", "John Doe"],
  ["Email *", "john@company.com"],
  ["Phone *", "+1 (555) 123-4567"],
] as const;

export const vehicleFields = [{
  label: "Year *",
  placeholder: "2020",
}, {
  label: "Make *",
  placeholder: "Toyota",
}, {
  label: "Model *",
  placeholder: "Camry",
}, {
  label: "Trim",
  placeholder: "SE",
}] as const;
