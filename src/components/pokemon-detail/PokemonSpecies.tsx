"use client";

import { Sparkles } from "lucide-react";
import { PokemonAbilityItem } from "@/src/services/pokemon/abilities/types";
import { Language } from "@/src/contexts/LanguageContext";
import { translations } from "@/src/lib/i18n";

export function PokemonSpecies({
  abilities,
  onSelect,
  t,
  language,
}: {
  abilities: PokemonAbilityItem[];
  onSelect: (ability: PokemonAbilityItem) => void;
  t: (translations: Record<Language, string>) => string;
  language: Language;
}) {

  return (
    <div className="bg-[#171c26] rounded-2xl p-6 border border-white/5">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-yellow-400" />
        <h3 className="font-display text-lg font-semibold text-[#f0f2f4]">{t(translations.abilities)}</h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {abilities.map((ability: PokemonAbilityItem) => {
          const displayName =
            ability.localized?.[language]?.name ?? ability.key;
          return (
            <button
              onClick={() => onSelect(ability)}
              key={ability.key}
              className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-all ${ability.isHidden
                ? "bg-[#252b37] text-[#8f96a3] border border-[#29303d] hover:bg-[#353560]"
                : "bg-red-500/20 text-red-300 hover:bg-red-500/30"
                }`}
            >
              {displayName}
              {ability.isHidden && ` (${t(translations.hidden)})`}
            </button>
          );
        })}
      </div>
    </div>
  );
}
