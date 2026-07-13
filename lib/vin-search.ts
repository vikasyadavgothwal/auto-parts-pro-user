import type {
  VinSearchApiRecord,
  VinSearchRequest,
  VinSearchResult,
  VinSearchVehicle,
} from "@/types/api/vin-search";

const VIN_SEARCH_PATH = "/api/vin-search";
const INVALID_VIN_MESSAGE =
  "You entered an invalid VIN. Please check the VIN and try again.";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const getText = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

const normalizeFieldName = (value: string) =>
  value.trim().toLowerCase().replace(/[^a-z0-9]/g, "");

const getTextByFieldAliases = (
  record: VinSearchApiRecord,
  aliases: string[],
) => {
  const directRecord = record as Record<string, unknown>;

  for (const alias of aliases) {
    const value = getText(directRecord[alias]);
    if (value) {
      return value;
    }
  }

  const normalized = new Map<string, unknown>();

  for (const [key, value] of Object.entries(directRecord)) {
    normalized.set(normalizeFieldName(key), value);
  }

  for (const alias of aliases) {
    const value = getText(normalized.get(normalizeFieldName(alias)));
    if (value) {
      return value;
    }
  }

  return "";
};

const normalizeVinRecord = (
  value: VinSearchApiRecord,
): VinSearchVehicle | null => {
  const fullVin = getTextByFieldAliases(value, [
    "full_vin",
    "fullVin",
    "VIN",
    "vin",
  ]);

  const modelYearFromVin = getTextByFieldAliases(value, [
    "model_year_from_vin",
    "modelYearFromVin",
    "Model year",
    "model_year",
    "year",
  ]);

  const epc = getTextByFieldAliases(value, [
    "epc",
    "make",
    "make_name",
    "Make name",
    "model",
  ]);

  const modelId = getTextByFieldAliases(value, [
    "model_id",
    "modelId",
    "Model id",
    "Id",
    "id",
    "vehicle_id",
  ]);

  if (!fullVin || !modelYearFromVin || !epc) {
    return null;
  }

  return {
    fullVin,
    modelYearFromVin,
    epc,
    ...(modelId ? { modelId } : {}),
  };
};

const findVinVehicle = (value: unknown): VinSearchVehicle | null => {
  if (Array.isArray(value)) {
    for (const item of value) {
      const vehicle = findVinVehicle(item);
      if (vehicle) {
        return vehicle;
      }
    }

    return null;
  }

  if (!isRecord(value)) {
    return null;
  }

  const currentVehicle = normalizeVinRecord(value);
  if (currentVehicle) {
    return currentVehicle;
  }

  for (const nestedValue of Object.values(value)) {
    const vehicle = findVinVehicle(nestedValue);
    if (vehicle) {
      return vehicle;
    }
  }

  return null;
};

const hasFailureCode = (payload: unknown) => {
  if (!isRecord(payload) || typeof payload.code !== "number") {
    return false;
  }

  return payload.code !== 0;
};

const readResponsePayload = async (response: Response): Promise<unknown> => {
  try {
    return await response.json();
  } catch {
    return null;
  }
};

export async function lookupVin(vin: string): Promise<VinSearchResult> {
  const normalizedVin = vin.trim().toUpperCase();

  if (!normalizedVin) {
    return {
      ok: false,
      error: "Enter a VIN before searching.",
    };
  }

  try {
    const response = await fetch(VIN_SEARCH_PATH, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ vin: normalizedVin } satisfies VinSearchRequest),
    });
    const payload = await readResponsePayload(response);

    if (!response.ok) {
      return {
        ok: false,
        error:
          response.status >= 500
            ? "Unable to verify VIN right now. Please try again."
            : INVALID_VIN_MESSAGE,
        raw: payload,
      };
    }

    if (hasFailureCode(payload)) {
      return {
        ok: false,
        error: INVALID_VIN_MESSAGE,
        raw: payload,
      };
    }

    const vehicle = findVinVehicle(payload);
    if (!vehicle) {
      return {
        ok: false,
        error: INVALID_VIN_MESSAGE,
        raw: payload,
      };
    }

    return {
      ok: true,
      vehicle,
      raw: payload,
    };
  } catch {
    return {
      ok: false,
      error: "Unable to verify VIN right now. Please try again.",
    };
  }
}
