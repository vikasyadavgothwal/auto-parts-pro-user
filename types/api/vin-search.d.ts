export type VinSearchRequest = {
  vin: string;
}

export type VinSearchVehicle = {
  fullVin: string;
  modelYearFromVin: string;
  epc: string;
}

export type VinSearchSuccess = {
  ok: true;
  vehicle: VinSearchVehicle;
  raw: unknown;
}

export type VinSearchError = {
  ok: false;
  error: string;
  raw?: unknown;
}

export type VinSearchResult = VinSearchSuccess | VinSearchError;

export type VinSearchApiRecord = {
  VIN?: unknown;
  "Model year"?: unknown;
  "Make name"?: unknown;
  full_vin?: unknown;
  fullVin?: unknown;
  year?: unknown;
  model_year_from_vin?: unknown;
  modelYearFromVin?: unknown;
  make?: unknown;
  make_name?: unknown;
  "make name"?: unknown;
  epc?: unknown;
  model?: unknown;
}

export type VinSearchBackendResponse = {
  code?: number;
  msg?: string;
  data?:
    | VinSearchApiRecord
    | VinSearchApiRecord[]
    | Record<string, unknown>
    | null
    | string;
  error?: string;
}
