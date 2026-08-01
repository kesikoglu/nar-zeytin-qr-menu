import { describe, expect, it } from "vitest";
import { contrastRatio, contrastResults, createInitialPalette, generatePalette, isValidHex, normalizeHex, validatePalette } from "@/lib/color";

describe("color utilities", () => {
  it("validates and normalizes HEX values", () => {
    expect(isValidHex("#fff")).toBe(true);
    expect(isValidHex("2563EB")).toBe(true);
    expect(isValidHex("#zzzzzz")).toBe(false);
    expect(normalizeHex("fff")).toBe("#FFFFFF");
  });

  it("calculates WCAG contrast guidance", () => {
    const ratio = contrastRatio("#000000", "#FFFFFF");
    expect(ratio).toBe(21);
    expect(contrastResults(ratio).normalAAA).toBe(true);
    expect(contrastResults(2.9).largeAA).toBe(false);
  });

  it("starts with the default three-color palette", () => {
    expect(createInitialPalette().map((color) => color.hex)).toEqual(["#B31A25", "#FFFFFF", "#3A3EC7"]);
  });

  it("preserves locked colors while generating", () => {
    const palette = createInitialPalette(5);
    const locked = { ...palette[2], locked: true, hex: "#123456" };
    const next = generatePalette([palette[0], palette[1], locked, palette[3], palette[4]], "triadic", "#2563EB");
    expect(next[2].hex).toBe("#123456");
    expect(next).toHaveLength(5);
  });

  it("validates palette size and color values", () => {
    expect(validatePalette(["#000000"])).toBe(false);
    expect(validatePalette(["#000000", "#FFFFFF"])).toBe(true);
    expect(validatePalette(Array.from({ length: 9 }, () => "#000000"))).toBe(false);
    expect(validatePalette(["#000000", "nope"])).toBe(false);
  });
});
