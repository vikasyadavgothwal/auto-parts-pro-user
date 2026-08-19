import { NextRequest, NextResponse } from 'next/server';
import { z } from "zod";
import type { VinSearchRequest } from '@/types/api/vin-search';

export const dynamic = 'force-dynamic';

const VIN_SEARCH_PATH = '/api/v1/vin-search';
const VIN_SCHEMA = z
  .string()
  .trim()
  .toUpperCase()
  .length(17, 'VIN must contain exactly 17 valid characters.')
  .regex(/^[A-HJ-NPR-Z0-9]{17}$/, 'VIN must contain exactly 17 valid characters.');
const VIN_SEARCH_REQUEST_SCHEMA = z.object({
  vin: VIN_SCHEMA,
});

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, '');

const getBackendBaseUrl = () => {
  const value =
    process.env.BACKEND_URL?.trim() ||
    process.env.NEXT_PUBLIC_BACKEND_URL?.trim() ||
    '';

  if (!value) {
    throw new Error('Missing API base URL. Set BACKEND_URL or NEXT_PUBLIC_BACKEND_URL.');
  }

  return trimTrailingSlash(value);
};

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
    const body = (await request.json()) as unknown;
    const parsed = VIN_SEARCH_REQUEST_SCHEMA.safeParse(body);
    if (!parsed.success) {
      return null;
    }

    return parsed.data;
  } catch {
    return null;
  }
};

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = await parseRequestBody(request);

  if (!body) {
    return NextResponse.json(
      { error: 'VIN must contain exactly 17 valid characters.' },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(`${getBackendBaseUrl()}${VIN_SEARCH_PATH}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      cache: 'no-store',
    });
    const payload = await readJsonBody(response);

    return NextResponse.json(payload, {
      status: response.status || 200,
    });
  } catch {
    return NextResponse.json(
      { error: 'Unable to verify VIN right now. Please try again.' },
      { status: 502 },
    );
  }
}
