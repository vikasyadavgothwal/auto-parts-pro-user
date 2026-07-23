type DashboardRole = "User" | "Supplier" | "Garage" | "Fleet";

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

const envUrl = (value: string | undefined, fallback: string) =>
  trimTrailingSlash(value?.trim() || fallback);

const localDashboardUrls: Record<DashboardRole, string> = {
  User: "/user_dashboard",
  Supplier: "http://localhost:3004/dashboard",
  Garage: "http://localhost:3003/garage_dashboard",
  Fleet: "http://localhost:4001/fleet",
};

const localHostnames = new Set(["localhost", "127.0.0.1", "::1"]);

export const dashboardUrlForRole = (
  role: string | null | undefined,
  hostname = typeof window === "undefined" ? "" : window.location.hostname,
) => {
  const normalizedRole = (role || "User") as DashboardRole;

  if (localHostnames.has(hostname.toLowerCase())) {
    return localDashboardUrls[normalizedRole] ?? localDashboardUrls.User;
  }

  const urls: Record<DashboardRole, string> = {
    User: "/user_dashboard",
    Supplier: envUrl(
      process.env.NEXT_PUBLIC_SUPPLIER_DASHBOARD_URL,
      "https://supplier.websitedesignersdubai.ae/dashboard",
    ),
    Garage: envUrl(
      process.env.NEXT_PUBLIC_GARAGE_DASHBOARD_URL,
      "https://garage.websitedesignersdubai.ae/garage_dashboard",
    ),
    Fleet: envUrl(
      process.env.NEXT_PUBLIC_FLEET_DASHBOARD_URL,
      "https://fleet.websitedesignersdubai.ae/fleet",
    ),
  };

  return urls[normalizedRole] ?? urls.User;
};
