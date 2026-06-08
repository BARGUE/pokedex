import { Language } from "@/src/contexts/LanguageContext";
import { translations } from "@/src/lib/i18n";
import { PokemonDetail } from "@/src/services/pokemon/info/types";
import { Ruler, Weight } from "lucide-react";

export function PokemonMetaCards({ pokemon, t }: { pokemon: PokemonDetail, t: (translations: Record<Language, string>) => string }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-[#171c26] rounded-2xl p-4 flex items-center gap-4 border border-white/5">
        <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
          <Ruler className="w-6 h-6 text-red-400" />
        </div>
        <div>
          <p className="text-gray-500 text-sm">{t(translations.height)}</p>
          <p className="font-display text-xl font-semibold text-[#f0f2f4]">
            {(pokemon.height / 10).toFixed(1)} m
          </p>
        </div>
      </div>

      <div className="bg-[#171c26] rounded-2xl p-4 flex items-center gap-4 border border-white/5">
        <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
          <Weight className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <p className="text-gray-500 text-sm">{t(translations.weight)}</p>
          <p className="font-display text-xl font-semibold text-[#f0f2f4]">
            {(pokemon.weight / 10).toFixed(1)} kg
          </p>
        </div>
      </div>
    </div>
  );
}
