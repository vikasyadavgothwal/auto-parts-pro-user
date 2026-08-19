import { z } from "zod";

export const RFQ_COMPANY_NAME_MAX_LENGTH = 120;
export const RFQ_CONTACT_NAME_MAX_LENGTH = 100;
export const RFQ_EMAIL_MAX_LENGTH = 254;
export const RFQ_VEHICLE_TEXT_MAX_LENGTH = 80;
export const RFQ_PART_NAME_MAX_LENGTH = 160;
export const RFQ_PART_NUMBER_MAX_LENGTH = 100;
export const RFQ_PART_NOTES_MAX_LENGTH = 1000;
export const RFQ_MAX_PARTS = 20;
export const RFQ_MAX_TARGET_PRICE = 100_000_000;
export const RFQ_IMPORT_MAX_BYTES = 5 * 1024 * 1024;

const TARGET_PRICE_PATTERN = /^\d+(?:\.\d{1,2})?$/;
const RFQ_IMPORT_FILE_MAX_BYTES_LABEL = "5 MB or smaller";
const IMPORT_MIME_TYPES: Record<string, Set<string>> = {
  csv: new Set(["text/csv", "application/csv", "text/plain", "application/vnd.ms-excel"]),
  xls: new Set(["application/vnd.ms-excel", "application/octet-stream"]),
  xlsx: new Set([
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/zip",
    "application/octet-stream",
  ]),
};

const meaningfulTextSchema = (minimum: number, maximum: number) =>
  z
    .string()
    .trim()
    .min(minimum, `Must contain at least ${minimum} meaningful characters.`)
    .max(maximum, `Must be ${maximum} characters or fewer.`)
    .refine((value) => /[\p{L}\p{N}]/u.test(value), "Must include a letter or number.");

const rfqEmailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .email("Enter a valid email.")
  .max(RFQ_EMAIL_MAX_LENGTH, "Email must be 254 characters or fewer.");
const rfqTargetPriceSchema = z
  .string()
  .trim()
  .refine((value) => {
    if (!value) return true;
    if (!TARGET_PRICE_PATTERN.test(value)) return false;
    const amount = Number(value);
    return Number.isFinite(amount) && amount >= 0 && amount <= RFQ_MAX_TARGET_PRICE;
  }, "Target prices must be valid amounts with no more than 2 decimal places.");

const rfqImportFileSchema = z.object({
  name: z.string(),
  size: z.number(),
  type: z.string(),
}).superRefine((file, context) => {
  const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
  const acceptedMimeTypes = IMPORT_MIME_TYPES[extension];

  if (!acceptedMimeTypes) {
    context.addIssue({
      code: "custom",
      path: ["name"],
      message: "Choose a CSV, XLS, or XLSX file.",
    });
    return;
  }

  if (file.size <= 0) {
    context.addIssue({
      code: "custom",
      path: ["size"],
      message: "The selected import file is empty.",
    });
    return;
  }

  if (file.size > RFQ_IMPORT_MAX_BYTES) {
    context.addIssue({
      code: "custom",
      path: ["size"],
      message: `The import file must be ${RFQ_IMPORT_FILE_MAX_BYTES_LABEL}.`,
    });
    return;
  }

  if (file.type && !acceptedMimeTypes.has(file.type.toLowerCase())) {
    context.addIssue({
      code: "custom",
      path: ["type"],
      message: "The selected file type does not match its extension.",
    });
  }
});

export const hasMeaningfulText = (
  value: string,
  minimum: number,
  maximum: number,
) => {
  return meaningfulTextSchema(minimum, maximum).safeParse(value).success;
};

export const isValidRfqEmail = (value: string) => {
  return rfqEmailSchema.safeParse(value).success;
};

export const isValidRfqTargetPrice = (value: string) => {
  return rfqTargetPriceSchema.safeParse(value).success;
};

export const validateRfqImportFile = (
  file: Pick<File, "name" | "size" | "type">,
) => {
  const result = rfqImportFileSchema.safeParse(file);
  if (result.success) return "";
  return result.error.issues[0]?.message ?? "Choose a valid import file.";
};
