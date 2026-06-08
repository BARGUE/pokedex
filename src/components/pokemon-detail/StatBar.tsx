import { motion } from "framer-motion";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { translations } from "@/src/lib/i18n";

interface StatBarProps {
  name: string;
  value: number;
  maxValue?: number;
  color?: string;
}
export function StatBar({ name, value, maxValue = 255 }: StatBarProps) {
  const { t } = useLanguage();
  
  const statLabels: Record<string, string> = {
    hp: t(translations.hp),
    attack: t(translations.attack),
    defense: t(translations.defense),
    "special-attack": t(translations.specialAttack),
    "special-defense": t(translations.specialDefense),
    speed: t(translations.speed),
  };
  
  const statColors: Record<string, string> = {
    hp: "bg-pokemon-grass",
    attack: "bg-pokemon-fire",
    defense: "bg-pokemon-ground",
    "special-attack": "bg-pokemon-psychic",
    "special-defense": "bg-pokemon-dragon",
    speed: "bg-pokemon-electric",
  };
  
  const percentage = (value / maxValue) * 100;
  const label = statLabels[name] || name;
  const colorClass = statColors[name] || "bg-primary";

  return (
    <div className="flex items-center gap-4">
      <span className="w-24 text-sm font-medium text-[#8f96a3] capitalize">
        {label}
      </span>
      <span className="w-10 text-sm font-semibold text-[#f0f2f4] text-right">
        {value}
      </span>
      <div className="flex-1 h-3 bg-[#252b37] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full ${colorClass} rounded-full`}
        />
      </div>
    </div>
  );
}
