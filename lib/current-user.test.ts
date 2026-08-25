import { afterEach, describe, expect, it } from "vitest";

import { dashboardPlansUrlForRole, dashboardUrlForRole } from "./dashboard-url";

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

  it.each([
    [
      "Supplier",
      "NEXT_PUBLIC_SUPPLIER_DASHBOARD_URL",
      "https://supplier.example.com/dashboard",
      "https://supplier.example.com/plans",
    ],
    [
      "Garage",
      "NEXT_PUBLIC_GARAGE_DASHBOARD_URL",
      "https://garage.example.com/garage_dashboard/dashboard",
      "https://garage.example.com/garage_dashboard/plans",
    ],
    [
      "Fleet",
      "NEXT_PUBLIC_FLEET_DASHBOARD_URL",
      "https://fleet.example.com/fleet",
      "https://fleet.example.com/fleet/plans",
    ],
  ])(
    "routes %s pricing actions to the plans page",
    (role, envKey, envUrl, expectedUrl) => {
      process.env[envKey] = envUrl;

      expect(dashboardPlansUrlForRole(role, "autoparts.example.com")).toBe(
        expectedUrl,
      );
    },
  );

  it.each([
    ["Supplier", "https://supplier.websitedesignersdubai.ae/plans"],
    ["Garage", "https://garage.websitedesignersdubai.ae/plans"],
    ["Fleet", "https://fleet.websitedesignersdubai.ae/plans"],
  ])("does not route %s pricing actions to localhost on deployed hosts", (role, expectedUrl) => {
    const url = dashboardPlansUrlForRole(role, "autopartspro.example.com");

    expect(url).toBe(expectedUrl);
    expect(url).not.toContain("localhost");
  });
});
