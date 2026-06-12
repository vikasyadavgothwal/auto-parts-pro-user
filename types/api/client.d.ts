export type ApiQueryValue = string | number | boolean | null | undefined;

export type ApiScope = "public" | "private";

export type ApiQuery = Record<string, ApiQueryValue>;

export type ApiRequestOptions<Body = unknown> = Omit<
  RequestInit,
  "body" | "headers"
> & {
  scope?: ApiScope;
  query?: ApiQuery;
  headers?: HeadersInit;
  token?: string;
  body?: Body | RequestInit["body"] | null;
};

export type ApiErrorPayload = {
  status: number;
  statusText: string;
  data?: unknown;
};
