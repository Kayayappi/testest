import type { LicenseTerms, LicenseValue, TrainingType } from "@/lib/types";

function valueBadgeClass(value: LicenseValue): string {
  switch (value) {
    case "allowed":
      return "bg-green-100 text-green-800 border-green-300";
    case "denied":
      return "bg-red-100 text-red-800 border-red-300";
    case "consult":
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
  }
}

function valueLabel(value: LicenseValue): string {
  switch (value) {
    case "allowed":
      return "OK";
    case "denied":
      return "NG";
    case "consult":
      return "要相談";
  }
}

function trainingBadgeClass(type: TrainingType): string {
  switch (type) {
    case "light":
      return "bg-blue-100 text-blue-800 border-blue-300";
    case "standard":
      return "bg-purple-100 text-purple-800 border-purple-300";
    case "strong":
      return "bg-orange-100 text-orange-800 border-orange-300";
  }
}

function trainingLabel(type: TrainingType): string {
  switch (type) {
    case "light":
      return "Light";
    case "standard":
      return "Standard";
    case "strong":
      return "Strong";
  }
}

interface LicenseBadgesProps {
  terms: LicenseTerms;
  compact?: boolean;
}

export default function LicenseBadges({ terms, compact = false }: LicenseBadgesProps) {
  const badgeBase = "inline-flex items-center border rounded-full font-medium";
  const size = compact ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs";

  return (
    <div className="flex flex-wrap gap-1.5">
      <span className={`${badgeBase} ${size} ${valueBadgeClass(terms.commercial)}`}>
        商用 {valueLabel(terms.commercial)}
      </span>
      <span className={`${badgeBase} ${size} ${valueBadgeClass(terms.adult)}`}>
        成人 {valueLabel(terms.adult)}
      </span>
      <span className={`${badgeBase} ${size} ${trainingBadgeClass(terms.trainingType)}`}>
        学習 {trainingLabel(terms.trainingType)}
      </span>
      <span className={`${badgeBase} ${size} ${valueBadgeClass(terms.redistribution)}`}>
        再配布 {valueLabel(terms.redistribution)}
      </span>
    </div>
  );
}
