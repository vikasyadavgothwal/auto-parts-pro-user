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
    ["User", "http://localhost:3002/user_dashboard"],
    ["Supplier", "http://localhost:3004/dashboard"],
    ["Garage", "http://localhost:3003/garage_dashboard"],
    ["Fleet", "http://localhost:4001/fleet"],
  ])("routes local %s sign-in to its local dashboard", (role, expectedUrl) => {
    process.env.NEXT_PUBLIC_USER_DASHBOARD_URL =
      "https://user.websitedesignersdubai.ae/user_dashboard";

    expect(dashboardUrlForRole(role, "localhost")).toBe(expectedUrl);
  });

  it("recognizes loopback addresses as local development", () => {
    expect(dashboardUrlForRole("User", "127.0.0.1")).toBe(
      "http://localhost:3002/user_dashboard",
    );
    expect(dashboardUrlForRole("User", "::1")).toBe(
      "http://localhost:3002/user_dashboard",
    );
  });

  it("keeps configured dashboard URLs outside localhost", () => {
    process.env.NEXT_PUBLIC_USER_DASHBOARD_URL =
      "https://dashboard.example.com/user_dashboard/";

    expect(dashboardUrlForRole("User", "autoparts.example.com")).toBe(
      "https://dashboard.example.com/user_dashboard",
    );
  });
});
