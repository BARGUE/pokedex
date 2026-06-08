"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Ruler, Weight } from "lucide-react";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { translations } from "@/src/lib/i18n";
import type { Language } from "@/src/contexts/LanguageContext";
import { TypeBadge } from "@/src/components/pokedex/TypeBadge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/src/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import { getTypeColor, getPokemonImage, formatPokemonId } from "@/src/lib/utils";
import type { PokemonListItem } from "@/src/services/pokemon/list/types";
import type { PokemonDetailResponse } from "@/src/services/pokemon/detail/types";
import Image from "next/image";

const STAT_KEYS = [
  "hp",
  "attack",
  "defense",
  "special-attack",
  "special-defense",
  "speed",
] as const;

const STAT_TRANSLATION_KEYS: Record<(typeof STAT_KEYS)[number], keyof typeof translations> = {
  hp: "hp",
  attack: "attack",
  defense: "defense",
  "special-attack": "specialAttack",
  "special-defense": "specialDefense",
  speed: "speed",
};

function getStatLabel(statKey: (typeof STAT_KEYS)[number], t: (r: Record<Language, string>) => string): string {
  const key = STAT_TRANSLATION_KEYS[statKey];
  return key ? t(translations[key] as Record<Language, string>) : statKey;
}

function getStatValue(detail: PokemonDetailResponse | null | undefined, statKey: string): number {
  const stat = detail?.pokemonStats?.stats?.find(
    (s) => s.name === statKey
  );
  return stat?.base_stat ?? 0;
}

function formatPokemonDisplayName(
  name: string,
  detail: PokemonDetailResponse | null | undefined,
  language: Language
): string {
  if (detail?.pokemon?.display_name) {
    return detail.pokemon.display_name[language] ?? detail.pokemon.display_name.en ?? name;
  }
  return name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, " ");
}

function formatListPokemonName(item: PokemonListItem | undefined, language: Language): string {
  if (item?.display_name) return item.display_name[language] ?? item.display_name.en ?? item.name;
  return item?.name
    ? item.name.charAt(0).toUpperCase() + item.name.slice(1).replace(/-/g, " ")
    : "";
}

function buildCompareUrl(selectedNames: (string | null)[]): string {
  const params = new URLSearchParams();
  selectedNames.forEach((name) => {
    if (name) params.append("pokemon", name);
  });
  const q = params.toString();
  return q ? `/compare?${q}` : "/compare";
}

interface CompareClientProps {
  initialPokemonList: PokemonListItem[];
  initialDetails: (PokemonDetailResponse | null)[];
  initialSelectedNames: (string | null)[];
}

export function CompareClient({
  initialPokemonList,
  initialDetails,
  initialSelectedNames,
}: CompareClientProps) {
  const { language, t } = useLanguage();
  const router = useRouter();
  const [openPopover, setOpenPopover] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const selectedPokemon = initialSelectedNames;
  const details = initialDetails;

  const filteredPokemon =
    initialPokemonList
      ?.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase())) ?? [];

  const handleSelectPokemon = (index: number, name: string) => {
    const next = [...selectedPokemon];
    next[index] = name;
    setOpenPopover(null);
    setSearchQuery("");
    router.push(buildCompareUrl(next));
  };

  const handleRemovePokemon = (index: number) => {
    const next = [...selectedPokemon];
    next[index] = null;
    router.push(buildCompareUrl(next));
  };

  const activeCount = selectedPokemon.filter(Boolean).length;

  const getStatComparison = (statKey: (typeof STAT_KEYS)[number]) => {
    const values = selectedPokemon.map((name, i) =>
      name ? getStatValue(details[i], statKey) : 0
    );
    const max = Math.max(...values, 0);
    return values.map((v) => v === max && max > 0);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 pt-[72px] min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-8 px-6 mb-12"
      >
        <h1
          className="text-4xl md:text-5xl font-bold mb-2 font-display"
          style={{
            background: "linear-gradient(135deg, hsl(220 80% 60%), hsl(280 80% 60%))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {t(translations.comparePokemon)}
        </h1>
        <p className="text-[#8f96a3] text-lg">
          {t(translations.selectUpTo3)}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {selectedPokemon.map((name, index) => {
          const detail = details[index];
          const pokemon = detail?.pokemon;
          const displayName = name
            ? formatPokemonDisplayName(name, detail, language)
            : "";

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {name && detail && pokemon ? (
                <div className="relative bg-[#0f131a] rounded-2xl p-6 border border-[#29303d] overflow-hidden">
                  <div
                    className={`absolute inset-0 ${getTypeColor(pokemon.species?.types?.[0]?.key ?? "normal")} opacity-10`}
                  />
                  <button
                    onClick={() => handleRemovePokemon(index)}
                    className="absolute top-3 right-3 w-8 h-8 text-[#8f96a3] rounded-full bg-[#29303d] hover:bg-destructive hover:text-destructive-foreground flex items-center justify-center transition-colors z-10"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="relative text-center">
                    <Image
                      src={getPokemonImage(pokemon)}
                      alt={displayName}
                      className="w-32 h-32 mx-auto object-contain drop-shadow-lg"
                      width={128}
                      height={128}
                    />
                    <p className="text-[#8f96a3] text-sm mt-2">
                      {formatPokemonId(pokemon.id)}
                    </p>
                    <h3 className="font-display text-xl font-bold text-[#f0f2f4]">
                      {displayName}
                    </h3>
                    <div className="flex justify-center gap-2 mt-2">
                      {pokemon.species?.types?.map((tp) => (
                        <TypeBadge key={tp.key} type={tp.key} size="sm" />
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <div className="bg-[#29303d] rounded-lg p-2">
                        <Ruler className="w-4 h-4 text-[#8f96a3] mx-auto mb-1" />
                        <p className="text-xs text-[#8f96a3]">
                          {t(translations.height)}
                        </p>
                        <p className="font-semibold text-[#f0f2f4]">
                          {(pokemon.height / 10).toFixed(1)}m
                        </p>
                      </div>
                      <div className="bg-[#29303d] rounded-lg p-2">
                        <Weight className="w-4 h-4 text-[#8f96a3] mx-auto mb-1" />
                        <p className="text-xs text-[#8f96a3]">
                          {t(translations.weight)}
                        </p>
                        <p className="font-semibold text-[#f0f2f4]">
                          {(pokemon.weight / 10).toFixed(1)}kg
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Popover
                  open={openPopover === index}
                  onOpenChange={(open) => setOpenPopover(open ? index : null)}
                >
                  <PopoverTrigger asChild>
                    <button className="w-full h-64 bg-[#0f131a] rounded-2xl border-2 border-dashed border-[#29303d] hover:border-primary/50 transition-all flex flex-col items-center justify-center gap-3 group">
                      <div className="w-16 h-16 rounded-full bg-[#29303d] group-hover:bg-primary/20 flex items-center justify-center transition-colors">
                        <Plus className="w-8 h-8 text-[#8f96a3] group-hover:text-primary" />
                      </div>
                      <span className="text-[#8f96a3] group-hover:text-[#f0f2f4] transition-colors">
                        {t(translations.addPokemon)}
                      </span>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-72 p-0 rounded-2xl bg-[#0f131a] border border-[#29303d] shadow-lg"
                    align="center"
                  >
                    <Command className="rounded-2xl bg-[#0f131a] [&_[cmdk-input-wrapper]]:border-[#29303d] [&_[cmdk-item][data-selected=true]]:bg-[#29303d] [&_[cmdk-item][data-selected=true]]:text-[#f0f2f4]">
                      <CommandInput
                        placeholder={t(translations.searchAPokemon)}
                        value={searchQuery}
                        onValueChange={setSearchQuery}
                        className="text-[#f0f2f4] placeholder:text-[#8f96a3]"
                      />
                      <CommandList className="custom-pokeball-scrollbar pr-2">
                        <CommandEmpty className="text-[#8f96a3]">
                          {t(translations.noPokemonFoundSearch)}
                        </CommandEmpty>
                        <CommandGroup>
                          {filteredPokemon.map((p) => (
                            <CommandItem
                              key={p.name}
                              value={p.name}
                              onSelect={() => handleSelectPokemon(index, p.name)}
                              className="cursor-pointer text-[#f0f2f4] hover:bg-[#29303d]"
                            >
                              {formatListPokemonName(p, language)}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              )}
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {activeCount >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-[#0f131a] rounded-2xl p-6 border border-[#29303d]"
          >
            <h3 className="font-display text-xl font-semibold text-[#f0f2f4] mb-6 text-center">
              {t(translations.statsComparison)}
            </h3>
            <div className="space-y-4">
              {STAT_KEYS.map((statKey) => {
                const isHighest = getStatComparison(statKey);
                const label = getStatLabel(statKey, t);
                return (
                  <div key={statKey} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[#8f96a3] text-sm w-20">
                        {label}
                      </span>
                      <div className="flex-1 grid grid-cols-3 gap-4">
                        {selectedPokemon.map((name, pIndex) => {
                          const value = getStatValue(details[pIndex], statKey);
                          if (!name)
                            return <div key={pIndex} className="h-6" />;
                          return (
                            <div key={pIndex} className="flex items-center gap-2">
                              <div className="flex-1 h-6 bg-[#29303d] rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${(value / 255) * 100}%` }}
                                  transition={{
                                    duration: 0.5,
                                    delay: pIndex * 0.1,
                                  }}
                                  className={`h-full rounded-full ${isHighest[pIndex]
                                    ? "bg-gradient-to-r from-green-500 to-emerald-500"
                                    : "bg-gradient-to-r from-primary/60 to-primary"
                                    }`}
                                />
                              </div>

                              <div
                                className={`w-10 text-center text-xs font-bold ${isHighest[pIndex] ? "text-green-500" : "text-[#f0f2f4]"
                                  }`}
                              >
                                {value}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="pt-4 border-t border-[#29303d]">
                <div className="flex items-center gap-2">
                  <span className="text-[#f0f2f4] font-semibold text-sm w-20">
                    {t(translations.total)}
                  </span>
                  <div className="flex-1 grid grid-cols-3 gap-4">
                    {selectedPokemon.map((name, pIndex) => {
                      const d = details[pIndex];
                      const total =
                        d?.pokemonStats?.stats?.reduce(
                          (sum, s) => sum + s.base_stat,
                          0
                        ) ?? 0;
                      if (!name) return <div key={pIndex} />;
                      const allTotals = details
                        .map((detail) =>
                          detail?.pokemonStats?.stats?.reduce(
                            (sum, s) => sum + s.base_stat,
                            0
                          ) ?? 0
                        )
                        .filter((_, i) => selectedPokemon[i] !== null);
                      const isMax =
                        total === Math.max(...allTotals) && total > 0;
                      return (
                        <div key={pIndex} className="text-center">
                          <span
                            className={`font-display text-2xl font-bold ${isMax ? "text-green-500" : "text-[#f0f2f4]"
                              }`}
                          >
                            {total}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
