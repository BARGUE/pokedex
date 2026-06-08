"use client";

import { motion } from "framer-motion";
import { TypeBadge } from "@/src/components/pokedex/TypeBadge";
import {
  formatPokemonId,
  getPokemonImage,
  getTypeColor,
} from "@/src/lib/utils";
import { PokemonDetail, PokemonSpeciesItem, PokemonTypeItem } from "@/src/services/pokemon/info/types";
import { useState } from "react";
import { PokemonSpecies } from "./PokemonSpecies";
import { PokemonMetaCards } from "./PokemonMetaCards";
import { AbilityModal } from "@/src/components/modals/AbilityModal";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { PokemonAbilities, PokemonAbilityItem } from "@/src/services/pokemon/abilities/types";

export function PokemonHero({
  pokemon,
  species,
  primaryType,
  speciesLocalized,
}: {
  pokemon: PokemonDetail;
  species: PokemonAbilities;
  primaryType: string;
  speciesLocalized: PokemonSpeciesItem["localized"] | null;
}) {
  const { t, language } = useLanguage();
  const [selectedAbility, setSelectedAbility] = useState<PokemonAbilityItem | null>(null);

  const genus = speciesLocalized?.[language]?.genus ?? speciesLocalized?.fr?.genus ?? speciesLocalized?.en?.genus ?? null;
  const description = speciesLocalized?.[language]?.flavor ?? speciesLocalized?.fr?.flavor ?? speciesLocalized?.en?.flavor ?? null;
  const displayName = pokemon.display_name ? t(pokemon.display_name) : pokemon.name;

  return (
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 pt-8">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="relative">
        <div className={`absolute inset-0 ${getTypeColor(primaryType)} opacity-20 rounded-3xl blur-2xl`} />
        <div className="relative aspect-square flex items-center justify-center p-8 bg-[#252542]/50 rounded-3xl border border-white/5">
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            src={getPokemonImage(pokemon)}
            alt={displayName}
            className="w-full max-w-md h-auto object-contain drop-shadow-2xl"
          />
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
        <div>
          <p className="text-gray-500 font-medium text-lg">{formatPokemonId(pokemon.id)}</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-[#f0f2f4] mb-2">
            {displayName}
          </h1>
          {genus && <p className="text-gray-400 text-lg">{genus}</p>}
        </div>

        <div className="flex gap-2">
          {(pokemon.species?.types ?? []).map((type: PokemonTypeItem) => (
            <TypeBadge key={type.key} type={type.key} size="lg" />
          ))}
        </div>

        {description && (
          <p className="text-gray-300 text-lg leading-relaxed">{description}</p>
        )}
        <div className="space-y-6">
          <PokemonMetaCards pokemon={pokemon} t={t} />
          <PokemonSpecies abilities={species.abilities} onSelect={setSelectedAbility} t={t} language={language} />
        </div>
        <AbilityModal
          ability={selectedAbility as PokemonAbilityItem}
          isOpen={!!selectedAbility}
          onClose={() => setSelectedAbility(null)}
        />
      </motion.div>
    </div>
  );
}
