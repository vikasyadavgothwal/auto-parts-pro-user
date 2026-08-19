import { z } from "zod"

const CURRENT_YEAR = new Date().getFullYear()
const textWithMeaning = /[\p{L}\p{N}]/u
const vehicleTextPattern = /^[A-Za-z0-9][A-Za-z0-9 .,'/-]*$/
const vinPattern = /^[A-HJ-NPR-Z0-9]{17}$/
const emailSchema = z.string().trim().toLowerCase().email("Enter a valid email address.").max(254, "Email must be 254 characters or fewer.")
export const internationalPhoneSchema = z
  .string()
  .trim()
  .regex(/^\+[1-9]\d{6,14}$/, "Enter a valid phone number with country code.")

const requiredText = (label: string, min: number, max: number) =>
  z.string()
    .trim()
    .min(min, `${label} must contain at least ${min} characters.`)
    .max(max, `${label} must be ${max} characters or fewer.`)
    .refine((value) => textWithMeaning.test(value), `${label} must include a letter or number.`)

const vehicleText = (label: string) =>
  requiredText(label, 2, 80).refine(
    (value) => vehicleTextPattern.test(value),
    `${label} can only include letters, numbers, spaces, and common vehicle punctuation.`,
  )

export const demoRequestSchema = z.object({
  name: requiredText("Name", 2, 100),
  email: emailSchema,
  phone: internationalPhoneSchema,
  company: requiredText("Company", 2, 120),
  message: requiredText("Message", 5, 1500),
})

export const authEmailPasswordSchema = z.object({
  email: emailSchema,
  password: z.string()
    .min(8, "Password must contain 8 to 128 characters.")
    .max(128, "Password must contain 8 to 128 characters."),
})

export const authSignupPasswordSchema = authEmailPasswordSchema.extend({
  password: z.string()
    .min(8, "Password must contain 8 to 128 characters.")
    .max(128, "Password must contain 8 to 128 characters.")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, "Password must include uppercase, lowercase, and number characters."),
  confirmPassword: z.string(),
}).refine((value) => value.password === value.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match.",
})

export const authEmailSchema = z.object({
  email: emailSchema,
})

export const vinSearchSchema = z.object({
  vin: z.string()
    .trim()
    .toUpperCase()
    .length(17, "VIN must contain exactly 17 valid characters.")
    .regex(vinPattern, "VIN must contain exactly 17 valid characters."),
})

export const partSearchSchema = z.object({
  query: requiredText("Part number, OEM number, or part name", 1, 120),
})

export const partNameVehicleSchema = z.object({
  vehicleName: vehicleText("Car name"),
  year: z.string()
    .trim()
    .regex(/^\d{4}$/, "Model year must be a 4-digit year.")
    .refine((value) => {
      const year = Number(value)
      return year >= 1900 && year <= CURRENT_YEAR + 1
    }, `Model year must be between 1900 and ${CURRENT_YEAR + 1}.`),
  make: vehicleText("Make"),
  model: vehicleText("Model"),
})

export const addressSchema = z.object({
  label: requiredText("Address label", 1, 60),
  recipientName: requiredText("Recipient name", 2, 120),
  phone: z.string()
    .trim()
    .regex(/^\+[1-9]\d{6,14}$/, "Enter a valid phone number with country code."),
  addressLine1: requiredText("Address line 1", 3, 255),
  addressLine2: z.string().trim().max(255, "Address line 2 must be 255 characters or fewer."),
  landmark: z.string().trim().max(160, "Landmark must be 160 characters or fewer."),
  city: requiredText("City", 2, 120),
  state: requiredText("State", 2, 120),
  country: requiredText("Country", 2, 120),
  isDefault: z.boolean(),
})

export const rfqPartSchema = z.object({
  vehicleVin: z.string().trim().toUpperCase().optional().default(""),
  partName: requiredText("Part name", 2, 120),
  partNumber: z.string().trim().max(80, "Part number or OEM number must be 80 characters or fewer."),
  quantity: z.coerce.number().int("Quantity must be a whole number.").min(1, "Quantity must be at least 1.").max(10000, "Quantity must be 10,000 or fewer."),
  targetPrice: z.string().trim().optional().default("").refine(
    (value) => !value || /^\d+(\.\d{1,2})?$/.test(value),
    "Target prices must be valid amounts with no more than 2 decimal places.",
  ),
  notes: z.string().trim().max(500, "Additional notes must be 500 characters or fewer per part."),
})

export const rfqFormSchema = z.object({
  companyName: requiredText("Company name", 2, 120),
  contactName: requiredText("Contact name", 2, 120),
  email: emailSchema,
  phone: z.string().trim().min(1, "Phone number is required."),
  selectedVehicleVin: z.string().trim().toUpperCase().optional().default(""),
  selectedVehicleYear: z.string().trim().optional().default(""),
  selectedVehicleMake: z.string().trim().optional().default(""),
  selectedVehicleModel: z.string().trim().optional().default(""),
  parts: z.array(rfqPartSchema).min(1, "Add at least one part.").max(100, "An RFQ can include up to 100 parts."),
}).superRefine((value, context) => {
  const hasSelectedVehicle = Boolean(value.selectedVehicleVin)
  if (hasSelectedVehicle && !vinPattern.test(value.selectedVehicleVin)) {
    context.addIssue({ code: "custom", path: ["selectedVehicleVin"], message: "Selected vehicle VIN must contain exactly 17 valid characters." })
  }
  if (hasSelectedVehicle) {
    const year = Number(value.selectedVehicleYear)
    if (!Number.isInteger(year) || year < 1886 || year > CURRENT_YEAR + 1) {
      context.addIssue({ code: "custom", path: ["selectedVehicleYear"], message: `Vehicle year must be between 1886 and ${CURRENT_YEAR + 1}.` })
    }
    if (!value.selectedVehicleMake) context.addIssue({ code: "custom", path: ["selectedVehicleMake"], message: "Vehicle make is required." })
    if (!value.selectedVehicleModel) context.addIssue({ code: "custom", path: ["selectedVehicleModel"], message: "Vehicle model is required." })
  }
  for (const [index, part] of value.parts.entries()) {
    if (!hasSelectedVehicle && !part.vehicleVin) {
      context.addIssue({ code: "custom", path: ["parts", index, "vehicleVin"], message: "Select a saved vehicle or enter a valid VIN for every part." })
    }
    if (part.vehicleVin && !vinPattern.test(part.vehicleVin)) {
      context.addIssue({ code: "custom", path: ["parts", index, "vehicleVin"], message: "Every VIN must contain exactly 17 valid characters." })
    }
  }
})

export type AddressValidationValue = z.infer<typeof addressSchema>

const isTechnicalValidationMessage = (message: string) =>
  /(?:expected|received|invalid input|invalid_type)/i.test(message);

export const firstZodError = (error: z.ZodError) => {
  const issue = error.issues.find(
    (entry) => !isTechnicalValidationMessage(entry.message),
  );

  return issue?.message ?? "Check the required fields.";
};

export const zodFieldErrors = <Key extends string>(error: z.ZodError) =>
  error.issues.reduce<Partial<Record<Key, string>>>((errors, issue) => {
    const key = issue.path[0]
    if (typeof key === "string" && !errors[key as Key]) {
      errors[key as Key] = issue.message
    }
    return errors
  }, {})
