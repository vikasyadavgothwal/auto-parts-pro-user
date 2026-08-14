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

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TARGET_PRICE_PATTERN = /^\d+(?:\.\d{1,2})?$/;
const IMPORT_MIME_TYPES: Record<string, Set<string>> = {
  csv: new Set(["text/csv", "application/csv", "text/plain", "application/vnd.ms-excel"]),
  xls: new Set(["application/vnd.ms-excel", "application/octet-stream"]),
  xlsx: new Set([
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/zip",
    "application/octet-stream",
  ]),
};

export const hasMeaningfulText = (
  value: string,
  minimum: number,
  maximum: number,
) => {
  const normalized = value.trim();
  return (
    normalized.length >= minimum &&
    normalized.length <= maximum &&
    /[\p{L}\p{N}]/u.test(normalized)
  );
};

export const isValidRfqEmail = (value: string) => {
  const normalized = value.trim();
  return (
    normalized.length <= RFQ_EMAIL_MAX_LENGTH && EMAIL_PATTERN.test(normalized)
  );
};

export const isValidRfqTargetPrice = (value: string) => {
  if (!value) return true;
  if (!TARGET_PRICE_PATTERN.test(value)) return false;
  const amount = Number(value);
  return Number.isFinite(amount) && amount >= 0 && amount <= RFQ_MAX_TARGET_PRICE;
};

export const validateRfqImportFile = (
  file: Pick<File, "name" | "size" | "type">,
) => {
  const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
  const acceptedMimeTypes = IMPORT_MIME_TYPES[extension];

  if (!acceptedMimeTypes) {
    return "Choose a CSV, XLS, or XLSX file.";
  }
  if (file.size <= 0) {
    return "The selected import file is empty.";
  }
  if (file.size > RFQ_IMPORT_MAX_BYTES) {
    return "The import file must be 5 MB or smaller.";
  }
  if (file.type && !acceptedMimeTypes.has(file.type.toLowerCase())) {
    return "The selected file type does not match its extension.";
  }

  return "";
};
