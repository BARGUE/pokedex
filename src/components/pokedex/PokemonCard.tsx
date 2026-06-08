"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Skeleton } from "@/src/components/ui/skeleton";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { PokemonListItem } from "@/src/services/pokedex/types";
import { getPokemonTypeKeys } from "@/src/services/pokemon/type/types";
import { formatPokemonId, getPokemonImage, getTypeColor } from "@/src/lib/utils";

interface PokemonCardProps {
  pokemon: PokemonListItem;
  index: number;
  compact?: boolean;
  globalShiny?: boolean;
  onShinyToggle?: (name: string, isShiny: boolean) => void;
  isShiny?: boolean;
}

export function PokemonCard({
  pokemon,
  index,
  compact = false,
  globalShiny = false,
  onShinyToggle,
  isShiny = false
}: PokemonCardProps) {
  const { t } = useLanguage();
  const [localShiny, setLocalShiny] = useState(false);

  const showShiny = onShinyToggle ? isShiny : (localShiny || globalShiny);

  const handleShinyToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onShinyToggle) onShinyToggle(pokemon.name, !isShiny);
    else setLocalShiny(!localShiny);
  };

  if (!pokemon) {
    return (
      <div className={`bg-card rounded-2xl ${compact ? "p-2" : "p-4"} shadow-card`}>
        <Skeleton className="aspect-square w-full rounded-xl mb-2" />
      </div>
    );
  }

  const typeKeys = getPokemonTypeKeys(pokemon);
  const primaryType = typeKeys[0] ?? "normal";
  const typeItems = pokemon.species?.types ?? [];
  const displayName = pokemon.display_name ? t(pokemon.display_name) : pokemon.name;

  const href = `/pokemon/${pokemon.id ?? pokemon.name}`;

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05, duration: 0.3 }}
      >
        <Link href={href}>
          <motion.div whileHover={{ y: -6, scale: 1.08 }} whileTap={{ scale: 0.95 }} className="group relative cursor-pointer">
            <div className={`absolute inset-0 ${getTypeColor(primaryType)} rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300`} />

            <div className={`relative ${getTypeColor(primaryType)} bg-opacity-20 rounded-2xl p-2 overflow-hidden border border-white/10 group-hover:border-white/20 transition-all duration-300`}>
              <motion.button
                onClick={handleShinyToggle}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`absolute top-1.5 right-1.5 z-10 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${showShiny
                    ? "bg-gradient-to-br from-yellow-400 to-amber-500 border-yellow-300 shadow-[0_0_10px_rgba(251,191,36,0.6)]"
                    : "bg-transparent border-white/30 hover:border-white/60"
                  }`}
              >
                {showShiny && <Sparkles className="w-2.5 h-2.5 text-[#f0f2f4]" />}
              </motion.button>

              <div className="relative aspect-square flex items-center justify-center p-1">
                <motion.img
                  key={showShiny ? "shiny" : "default"}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  src={getPokemonImage(pokemon, showShiny)}
                  alt={displayName}
                  onError={(e) => ((e.currentTarget as HTMLImageElement).src = "/images/mark-unknown.png")}
                  className="w-full h-full object-contain drop-shadow-lg"
                  loading="lazy"
                />
              </div>

              <p className="text-center text-xs font-display font-semibold text-[#f0f2f4]/90 truncate mt-1 px-1">
                {displayName}
              </p>
            </div>
          </motion.div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05, duration: 0.3 }}>
      <Link href={href}>
        <motion.div whileHover={{ y: -8, scale: 1.02 }} whileTap={{ scale: 0.98 }} className="bg-[#171c26] rounded-2xl p-4 shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer group overflow-hidden relative">
          <motion.button
            onClick={handleShinyToggle}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className={`absolute top-3 right-3 z-10 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${showShiny
                ? "bg-gradient-to-br from-yellow-400 to-amber-500 border-yellow-300 shadow-[0_0_10px_rgba(251,191,36,0.6)]"
                : "bg-transparent border-white/30 hover:border-white/60"
              }`}
          >
            {showShiny && <Sparkles className="w-3 h-3 text-[#f0f2f4]" />}
          </motion.button>

          <div className={`absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-10 ${getTypeColor(primaryType)}`} />

          <div className="relative aspect-square mb-4 flex items-center justify-center">
            <motion.img
              key={showShiny ? "shiny" : "default"}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              src={getPokemonImage(pokemon, showShiny)}
              alt={displayName}
              onError={(e) => ((e.currentTarget as HTMLImageElement).src = "/images/mark-unknown.png")}
              className="w-4/5 h-4/5 object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
              loading="lazy"
            />
          </div>

          <p className="text-[#8f96a3] text-sm font-medium">
            {pokemon.id ? formatPokemonId(pokemon.id) : ""}
          </p>

          <h3 className="font-display text-lg font-semibold text-[#f0f2f4] mb-2">
            {displayName}
          </h3>

          <div className="flex gap-2">
            {typeItems.map((typeItem) => (
              <span
                key={typeItem.key}
                className={`${getTypeColor(typeItem.key)} text-[#f0f2f4] text-xs font-medium px-2.5 py-1 rounded-full capitalize`}
              >
                {t(typeItem.name)}
              </span>
            ))}
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
