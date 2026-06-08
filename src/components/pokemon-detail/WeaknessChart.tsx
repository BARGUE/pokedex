"use client";

import { motion } from "framer-motion";
import { Shield, ShieldAlert, ShieldCheck } from "lucide-react";
import { TypeBadge } from "@/src/components/pokedex/TypeBadge";
import { WeaknessResult } from "@/src/services/pokemon/type/types";
import { translations } from "@/src/lib/i18n";
import { useLanguage } from "@/src/contexts/LanguageContext";

interface WeaknessChartProps {
  weaknesses: WeaknessResult;
}

export function WeaknessChart({ weaknesses }: WeaknessChartProps) {
  const { t } = useLanguage();

  if (!weaknesses) {
    return (
      <div className="bg-[#252b37] rounded-2xl p-4 text-center">
        <Shield className="w-8 h-8 text-[#8f96a3] mx-auto mb-2" />
        <p className="text-[#8f96a3]">{t(translations.errorLoadingWeaknesses)}</p>
      </div>
    );
  }

  const { weak, resist, immune } = weaknesses;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {weak.length > 0 && (
        <div className="bg-red-500/10 rounded-2xl p-4 border border-red-500/20">
          <div className="flex items-center gap-2 mb-3">
            <ShieldAlert className="w-5 h-5 text-red-400" />
            <h4 className="font-display font-semibold text-[#f0f2f4]">{t(translations.weaknessesLabel)}</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {weak.map(({ type, multiplier }) => (
              <div key={type} className="flex items-center gap-1">
                <TypeBadge type={type} size="sm" />
                <span className="text-red-400 text-xs font-bold">×{multiplier}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {resist.length > 0 && (
        <div className="bg-green-500/10 rounded-2xl p-4 border border-green-500/20">
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck className="w-5 h-5 text-green-400" />
            <h4 className="font-display font-semibold text-[#f0f2f4]">{t(translations.resistances)}</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {resist.map(({ type, multiplier }) => (
              <div key={type} className="flex items-center gap-1">
                <TypeBadge type={type} size="sm" />
                <span className="text-green-400 text-xs font-bold">×{multiplier}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {immune.length > 0 && (
        <div className="bg-purple-500/10 rounded-2xl p-4 border border-purple-500/20">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-5 h-5 text-purple-400" />
            <h4 className="font-display font-semibold text-[#f0f2f4]">{t(translations.immunities)}</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {immune.map((type) => (
              <div key={type} className="flex items-center gap-1">
                <TypeBadge type={type} size="sm" />
                <span className="text-purple-400 text-xs font-bold">×0</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {weak.length === 0 && resist.length === 0 && immune.length === 0 && (
        <div className="bg-[#252b37] rounded-2xl p-4 text-center">
          <Shield className="w-8 h-8 text-[#8f96a3] mx-auto mb-2" />
          <p className="text-[#8f96a3]">{t(translations.noWeaknessOrResistance)}</p>
        </div>
      )}
    </motion.div>
  );
}
