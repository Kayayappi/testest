import type { LicenseValue, TrainingType } from "@/lib/types";

export function licenseValueText(value: LicenseValue): string {
  switch (value) {
    case "allowed":
      return "許可";
    case "denied":
      return "不可";
    case "consult":
      return "要相談";
  }
}

export function trainingTypeText(type: TrainingType): string {
  switch (type) {
    case "light":
      return "Light — 軽量学習のみ許可";
    case "standard":
      return "Standard — 標準的な学習利用可";
    case "strong":
      return "Strong — 大規模学習も許可";
  }
}
