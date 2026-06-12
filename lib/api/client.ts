import type {
  ApiErrorPayload,
  ApiQuery,
  ApiRequestOptions,
  ApiScope,
} from "@/types/api/client";

export class ApiRequestError extends Error {
  public readonly status: number;
  public readonly statusText: string;
  public readonly data: unknown;

  constructor(message: string, payload: ApiErrorPayload) {
    super(message);
    this.name = "ApiRequestError";
    this.status = payload.status;
    this.statusText = payload.statusText;
    this.data = payload.data;
  }
}

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

const getEnvValue = (key: string) => {
  const value = process.env[key];
  return value ? value.trim() : "";
};

const getPublicApiBaseUrl = () => {
  const value =
    getEnvValue("NEXT_PUBLIC_BACKEND_URL") ||
    getEnvValue("BACKEND_URL") ||
    "http://localhost:3000";
  return trimTrailingSlash(value);
};

const getPrivateApiBaseUrl = () => {
  const value =
    getEnvValue("NEXT_PUBLIC_PRIVATE_BACKEND_URL") ||
    getEnvValue("PRIVATE_API_URL") ||
    getPublicApiBaseUrl();
  return trimTrailingSlash(value);
};

const getBaseUrl = (scope: ApiScope) => {
  if (scope === "private") {
    return getPrivateApiBaseUrl();
  }
  return getPublicApiBaseUrl();
};

const getErrorMessage = (payload: unknown, fallback: string) => {
  if (typeof payload === "object" && payload && "error" in payload) {
    const candidate = payload.error;
    if (typeof candidate === "string") {
      return candidate;
    }
  }

  if (typeof payload === "object" && payload && "message" in payload) {
    const candidate = payload.message;
    if (typeof candidate === "string") {
      return candidate;
    }
  }

  return fallback;
};

const readResponseBody = async (response: Response): Promise<unknown> => {
  try {
    return await response.json();
  } catch {
    return null;
  }
};

const buildUrl = (scope: ApiScope, path: string, query?: ApiQuery) => {
  const baseUrl = getBaseUrl(scope);
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(normalizedPath, baseUrl);

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value === null || value === undefined) {
        continue;
      }
      url.searchParams.set(key, String(value));
    }
  }

  return url;
};

export async function apiRequest<TResponse, TBody = unknown>(
  path: string,
  options: ApiRequestOptions<TBody> = {},
): Promise<TResponse> {
  const {
    scope = "public",
    query,
    headers: rawHeaders,
    token,
    body,
    method,
    ...init
  } = options;

  const headers = new Headers(rawHeaders);

  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  if (!headers.has("Accept")) {
    headers.set("Accept", "application/json");
  }

  if (body !== undefined && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const payloadBody = body === undefined ? undefined : JSON.stringify(body);
  const resolvedMethod =
    method ?? (body === undefined ? "GET" : "POST");

  const response = await fetch(buildUrl(scope, path, query), {
    method: resolvedMethod,
    ...init,
    headers,
    body: payloadBody,
  });

  const responseBody = await readResponseBody(response);

  if (!response.ok) {
    throw new ApiRequestError(
      getErrorMessage(responseBody, `Request failed with status ${response.status}`),
      {
        status: response.status,
        statusText: response.statusText,
        data: responseBody,
      },
    );
  }

  return responseBody as TResponse;
}

export const publicApiRequest = <TResponse, TBody = never>(
  path: string,
  options: ApiRequestOptions<TBody> = {},
) => apiRequest<TResponse, TBody>(path, { ...options, scope: "public" });

export const privateApiRequest = <TResponse, TBody = never>(
  path: string,
  options: ApiRequestOptions<TBody> = {},
) => apiRequest<TResponse, TBody>(path, { ...options, scope: "private" });

export const apiInterpreter = {
  request: apiRequest,
  public: publicApiRequest,
  private: privateApiRequest,
};
