"use client";

import { motion } from "framer-motion";
import { ArrowBigUpDash, MapPin, Shield, Swords } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { StatBar } from "@/src/components/pokemon-detail/StatBar";
import { WeaknessChart } from "@/src/components/pokemon-detail/WeaknessChart";
import { MovesList } from "@/src/components/pokemon-detail/MovesList";
import { LocationList } from "@/src/components/pokemon-detail/LocationList";
import { EvolutionChainDisplay } from "@/src/components/pokemon-detail/EvolutionChain";
import { PokemonEncounters } from "@/src/services/pokemon/encounters/types";
import { PokemonEvolution } from "@/src/services/pokemon/evolution/types";
import { PokemonMoves } from "@/src/services/pokemon/moves/types";
import { PokemonStats } from "@/src/services/pokemon/stats/types";
import { PokemonStatsItem } from "@/src/services/pokemon/stats/types";
import { WeaknessResult } from "@/src/services/pokemon/type/types";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { translations } from "@/src/lib/i18n";

export function PokemonDetailClient({
  pokemonStats,
  pokemonWeaknesses,
  pokemonMoves,
  pokemonEvolution,
  pokemonEncounters
}: {
  pokemonStats: PokemonStats;
  pokemonWeaknesses: WeaknessResult;
  pokemonMoves: PokemonMoves;
  pokemonEvolution: PokemonEvolution;
  pokemonEncounters: PokemonEncounters;
}) {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mt-12"
    >
      <Tabs defaultValue="stats" className="w-full">
        <TabsList className="w-full max-w-2xl mx-auto grid grid-cols-5 mb-8 bg-[#171c26] rounded-full p-1 border border-[#29303d]">
          <TabsTrigger
            value="stats"
            className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-red-600 data-[state=active]:text-[#f0f2f4] text-[#8f96a3] text-xs sm:text-sm"
          >
            {t(translations.stats)}
          </TabsTrigger>

          <TabsTrigger
            value="weakness"
            className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-red-600 data-[state=active]:text-[#f0f2f4] text-[#8f96a3] text-xs sm:text-sm"
          >
            <Shield className="w-4 h-4 sm:mr-1" />
            <span className="hidden sm:inline">{t(translations.weaknesses)}</span>
          </TabsTrigger>

          <TabsTrigger
            value="moves"
            className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-red-600 data-[state=active]:text-[#f0f2f4] text-[#8f96a3] text-xs sm:text-sm"
          >
            <Swords className="w-4 h-4 sm:mr-1" />
            <span className="hidden sm:inline">{t(translations.attacks)}</span>
          </TabsTrigger>

          <TabsTrigger
            value="locations"
            className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-red-600 data-[state=active]:text-[#f0f2f4] text-[#8f96a3] text-xs sm:text-sm"
          >
            <MapPin className="w-4 h-4 sm:mr-1" />
            <span className="hidden sm:inline">{t(translations.locations)}</span>
          </TabsTrigger>

          <TabsTrigger
            value="evolution"
            className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-red-600 data-[state=active]:text-[#f0f2f4] text-[#8f96a3] text-xs sm:text-sm"
          >
            <ArrowBigUpDash className="w-4 h-4 sm:mr-1" />
            {t(translations.evolution)}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="stats">
          <div className="bg-[#171c26] rounded-2xl p-6 md:p-8 max-w-2xl mx-auto border border-[#29303d]">
            <h3 className="font-display text-xl font-semibold text-[#f0f2f4] mb-6">
              {t(translations.baseStats)}
            </h3>

            <div className="space-y-4">
              {pokemonStats.stats.map((stat: PokemonStatsItem) => (
                <StatBar key={stat.name} name={stat.name} value={stat.base_stat} />
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-[#29303d]">
              <div className="flex justify-between items-center">
                <span className="text-[#8f96a3] font-medium">{t(translations.total)}</span>
                <span className="font-display text-2xl font-bold text-[#f0f2f4]">
                  {pokemonStats.stats.reduce((sum: number, s: PokemonStatsItem) => sum + s.base_stat, 0)}
                </span>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="weakness">
          <div className="bg-[#171c26] rounded-2xl p-6 md:p-8 max-w-2xl mx-auto border border-[#29303d]">
            <h3 className="font-display text-xl font-semibold text-[#f0f2f4] mb-6 text-center">
              {t(translations.weaknessesAndResistances)}
            </h3>
            <WeaknessChart weaknesses={pokemonWeaknesses} />
          </div>
        </TabsContent>

        <TabsContent value="moves">
          <div className="bg-[#171c26] rounded-2xl p-6 md:p-8 max-w-2xl mx-auto border border-[#29303d]">
            <MovesList pokemonMoves={pokemonMoves}
            />
          </div>
        </TabsContent>

        <TabsContent value="locations">
          <div className="bg-[#171c26] rounded-2xl p-6 md:p-8 max-w-2xl mx-auto border border-[#29303d]">
            <h3 className="font-display text-xl font-semibold text-[#f0f2f4] mb-6 text-center">
              {t(translations.locationsTitle)}
            </h3>
            <LocationList pokemonEncounters={pokemonEncounters.encounters.encountersByVersion} />
          </div>
        </TabsContent>

        <TabsContent value="evolution">
          <div className="bg-[#171c26] rounded-2xl p-6 md:p-8 max-w-2xl mx-auto border border-[#29303d]">
            <h3 className="font-display text-xl font-semibold text-[#f0f2f4] mb-6 text-center">
              {t(translations.evolutionChain)}
            </h3>
            <EvolutionChainDisplay pokemonEvolution={pokemonEvolution.evolution} />
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
