import { describe, expect, it } from "vitest";

import { sanitizePublicHtml } from "./sanitize-public-html";

describe("sanitizePublicHtml", () => {
  it("removes executable markup and unsafe URL schemes", () => {
    const html = sanitizePublicHtml(
      '<h2 onclick="alert(1)">Terms</h2><script>alert(1)</script><a href="javascript:alert(1)">bad</a>',
    );

    expect(html).toBe("<h2>Terms</h2><a>bad</a>");
  });

  it("preserves supported legal formatting and secures new tabs", () => {
    const html = sanitizePublicHtml(
      '<p><strong>Approved</strong></p><a href="https://example.com" target="_blank">Read</a>',
    );

    expect(html).toContain("<strong>Approved</strong>");
    expect(html).toContain('rel="noopener noreferrer"');
  });
});
