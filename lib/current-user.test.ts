import { afterEach, describe, expect, it } from "vitest";

import { dashboardUrlForRole } from "./dashboard-url";

const dashboardEnvironmentKeys = [
  "NEXT_PUBLIC_USER_DASHBOARD_URL",
  "NEXT_PUBLIC_SUPPLIER_DASHBOARD_URL",
  "NEXT_PUBLIC_GARAGE_DASHBOARD_URL",
  "NEXT_PUBLIC_FLEET_DASHBOARD_URL",
] as const;

afterEach(() => {
  dashboardEnvironmentKeys.forEach((key) => delete process.env[key]);
});

describe("dashboardUrlForRole", () => {
  it.each([
    ["User", "/user_dashboard"],
    ["Supplier", "http://localhost:3004/dashboard"],
    ["Garage", "http://localhost:3003/dashboard"],
    ["Fleet", "http://localhost:4001/dashboard"],
  ])("routes local %s sign-in to its local dashboard", (role, expectedUrl) => {
    process.env.NEXT_PUBLIC_USER_DASHBOARD_URL =
      "https://user.websitedesignersdubai.ae/user_dashboard";

    expect(dashboardUrlForRole(role, "localhost")).toBe(expectedUrl);
  });

  it("recognizes loopback addresses as local development", () => {
    expect(dashboardUrlForRole("User", "127.0.0.1")).toBe(
      "/user_dashboard",
    );
    expect(dashboardUrlForRole("User", "::1")).toBe(
      "/user_dashboard",
    );
  });

  it("keeps User dashboard on the public-site origin", () => {
    process.env.NEXT_PUBLIC_USER_DASHBOARD_URL =
      "https://dashboard.example.com/user_dashboard/";

    expect(dashboardUrlForRole("User", "autoparts.example.com")).toBe(
      "/user_dashboard",
    );
  });
});
