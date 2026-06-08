"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Swords, Search } from "lucide-react";
import { MoveModal } from "@/src/components/modals/MoveModal";
import { Input } from "@/src/components/ui/input";
import { useLanguage, type Language } from "@/src/contexts/LanguageContext";
import { translations } from "@/src/lib/i18n";
import type { PokemonMove, PokemonMoves } from "@/src/services/pokemon/moves/types";

interface MovesListProps {
  pokemonMoves?: PokemonMoves;
}

function getMoveName(move: PokemonMove, lang: Language): string {
  return (
    move.localized?.[lang]?.name ??
    move.localized?.en?.name ??
    move.localized?.fr?.name ??
    move.key ?? "???"
  );
}

export function MovesList({ pokemonMoves }: MovesListProps) {
  const { language, t } = useLanguage();
  const [selectedMove, setSelectedMove] = useState<PokemonMove | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const moves = useMemo(
    () => (Array.isArray(pokemonMoves?.moves) ? pokemonMoves.moves : []),
    [pokemonMoves]
  );

  const filteredMoves = useMemo(() => {
    let list = moves;
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter((m: PokemonMove) => {
        const name = getMoveName(m, language).toLowerCase();
        return name.includes(q) || (m.key ?? "").toLowerCase().includes(q);
      });
    }
    return [...list].sort((a: PokemonMove, b: PokemonMove) => {
      const an = getMoveName(a, language).toLowerCase();
      const bn = getMoveName(b, language).toLowerCase();
      return an.localeCompare(bn);
    });
  }, [moves, searchQuery, language]);

  if (!pokemonMoves) {
    return (
      <div className="space-y-3">
        <div className="flex gap-3 mb-4">
          <div className="h-10 flex-1 rounded-md bg-[#252b37] animate-pulse" />
          <div className="h-10 w-32 rounded-md bg-[#252b37] animate-pulse" />
        </div>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-12 w-full rounded-xl bg-[#252b37] animate-pulse" />
        ))}
      </div>
    );
  }

  if (moves.length === 0) {
    return (
      <div className="text-center py-8">
        <Swords className="w-10 h-10 text-[#8f96a3] mx-auto mb-3" />
        <p className="text-[#8f96a3]">{t(translations.noMoveFound)}</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        <h3 className="font-display text-xl font-semibold text-[#f0f2f4] mb-6">
          {t(translations.learnedMoves)} ({moves.length})
        </h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8f96a3]" />
            <Input
              type="text"
              placeholder={t(translations.searchMove)}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-[#252b37] border-[#252b37] text-[#8f96a3]
              focus-visible:ring-offset-0"
            />
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto space-y-2 pr-2 custom-pokeball-scrollbar">
          {filteredMoves.map((move: PokemonMove, index: number) => {
            const displayName = getMoveName(move, language);
            const type = move.stats?.type ?? "unknown";
            const damageClass = move.stats?.damageClass ?? "unknown";
            const power = typeof move.stats?.power === "number" ? move.stats.power : null;
            const accuracy = typeof move.stats?.accuracy === "number" ? move.stats.accuracy : null;
            const pp = typeof move.stats?.pp === "number" ? move.stats.pp : null;

            return (
              <motion.button
                key={move.key ?? `${displayName}-${index}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: Math.min(index * 0.02, 0.3) }}
                onClick={() => setSelectedMove(move ?? null)}
                className="w-full flex items-center justify-between p-3 bg-[#252b37] hover:bg-[#353560] rounded-xl transition-colors text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <Swords className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-[#f0f2f4]">{displayName}</span>
                    <span className="text-xs text-[#8f96a3] capitalize">
                      {type} • {damageClass}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {power !== null && (
                    <span className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded-full">
                      Pui {power}
                    </span>
                  )}
                  {accuracy !== null && (
                    <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">
                      {accuracy}%
                    </span>
                  )}
                  {pp !== null && <span className="text-xs text-[#8f96a3]">PP {pp}</span>}
                </div>
              </motion.button>
            );
          })}

          {filteredMoves.length === 0 && (
            <div className="text-center py-8">
              <Swords className="w-10 h-10 text-[#8f96a3] mx-auto mb-3" />
              <p className="text-[#8f96a3]">{t(translations.noMoveFound)}</p>
            </div>
          )}
        </div>
      </div>

      <MoveModal
        movePokemon={selectedMove}
        isOpen={!!selectedMove}
        onClose={() => setSelectedMove(null)}
      />
    </>
  );
}
