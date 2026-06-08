"use client";

import { getTypeColor } from "@/src/lib/utils";
import { getTypeLabel } from "@/src/lib/i18n";
import { useLanguage } from "@/src/contexts/LanguageContext";

interface TypeBadgeProps {
  type: string;
  label?: string;
  size?: "sm" | "md" | "lg";
}

export function TypeBadge({ type, label, size = "md" }: TypeBadgeProps) {
  const { language } = useLanguage();
  const displayLabel = label ?? getTypeLabel(type, language);

  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-1.5",
  };

  return (
    <span
      className={`${getTypeColor(
        type
      )} text-[#f0f2f4] font-medium rounded-full ${sizeClasses[size]}`}
    >
      {displayLabel}
    </span>
  );
}
