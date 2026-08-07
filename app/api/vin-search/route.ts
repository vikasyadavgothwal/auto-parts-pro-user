import { NextRequest } from 'next/server';
import { POST as v1POST } from '../v1/vin-search/route';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const response = await v1POST(request);
  response.headers.set(
    'x-api-compatibility-layer',
    'legacy-path;/api/vin-search;canonical;/api/v1/vin-search',
  );
  return response;
}
