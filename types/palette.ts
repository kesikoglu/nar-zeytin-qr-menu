export type PaletteColor = {
  id: string;
  hex: string;
  locked: boolean;
};

export type SavedPalette = {
  id: string;
  name: string;
  colors: string[];
  createdAt: string;
};

export type GenerationMode =
  | "random"
  | "monochromatic"
  | "analogous"
  | "complementary"
  | "split-complementary"
  | "triadic"
  | "tetradic"
  | "pastel"
  | "vibrant"
  | "dark"
  | "warm"
  | "cool";

export type ExportFormat = "css" | "scss" | "json" | "hex";
