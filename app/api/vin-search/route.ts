import { NextRequest, NextResponse } from "next/server";
import type { VinSearchRequest } from "@/types/api/vin-search";

export const dynamic = "force-dynamic";

const VIN_SEARCH_PATH = "/api/vin-search";

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

const getBackendBaseUrl = () => {
  const value =
    process.env.BACKEND_URL ||
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    "http://localhost:3000";

  return trimTrailingSlash(value);
};

const normalizeVin = (value: unknown) =>
  typeof value === "string" ? value.trim().toUpperCase() : "";

const readJsonBody = async (response: Response): Promise<unknown> => {
  try {
    return await response.json();
  } catch {
    return null;
  }
};

const parseRequestBody = async (
  request: NextRequest,
): Promise<VinSearchRequest | null> => {
  try {
    const body = (await request.json()) as Partial<VinSearchRequest> | null;
    const vin = normalizeVin(body?.vin);

    if (!vin) {
      return null;
    }

    return { vin };
  } catch {
    return null;
  }
};

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = await parseRequestBody(request);

  if (!body) {
    return NextResponse.json(
      { error: "VIN is required." },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(`${getBackendBaseUrl()}${VIN_SEARCH_PATH}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    const payload = await readJsonBody(response);

    return NextResponse.json(payload, {
      status: response.status || 200,
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to verify VIN right now. Please try again." },
      { status: 502 },
    );
  }
}
