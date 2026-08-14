import { describe, expect, it } from "vitest";

import {
  hasMeaningfulText,
  isValidRfqEmail,
  isValidRfqTargetPrice,
  validateRfqImportFile,
} from "./rfq-validation";

describe("RFQ validation", () => {
  it("rejects invalid text, email, prices, and import files", () => {
    expect(hasMeaningfulText("--", 2, 120)).toBe(false);
    expect(hasMeaningfulText("Acme Parts", 2, 120)).toBe(true);
    expect(isValidRfqEmail("buyer@example.com")).toBe(true);
    expect(isValidRfqEmail("buyer@example")).toBe(false);
    expect(isValidRfqTargetPrice("10.25")).toBe(true);
    expect(isValidRfqTargetPrice("1e2")).toBe(false);
    expect(isValidRfqTargetPrice("10.999")).toBe(false);
    expect(
      validateRfqImportFile({ name: "parts.exe", size: 100, type: "application/octet-stream" }),
    ).toBe("Choose a CSV, XLS, or XLSX file.");
    expect(
      validateRfqImportFile({ name: "parts.csv", size: 6 * 1024 * 1024, type: "text/csv" }),
    ).toBe("The import file must be 5 MB or smaller.");
  });
});
