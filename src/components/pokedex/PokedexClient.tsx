"use client";

import { useState, useMemo, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PokemonCard } from "@/src/components/pokedex/PokemonCard";
import { SearchBar } from "@/src/components/pokedex/SearchBar";
import { Filter, Loader2, Sparkles, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { TypeFilter } from "@/src/components/pokedex/TypeFilter";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { translations } from "@/src/lib/i18n";
import { PokemonListItem, PokemonTypeItem } from "@/src/services/pokedex/types";
import { getPokemonTypeKeys } from "@/src/services/pokemon/type/types";

export const GENERATIONS = [
  { id: "generation-i", region: "Kanto" },
  { id: "generation-ii", region: "Johto" },
  { id: "generation-iii", region: "Hoenn" },
  { id: "generation-iv", region: "Sinnoh" },
  { id: "generation-v", region: "Unova" },
  { id: "generation-vi", region: "Kalos" },
  { id: "generation-vii", region: "Alola" },
  { id: "generation-viii", region: "Galar" },
  { id: "generation-ix", region: "Paldea" },
];

type GenerationId = (typeof GENERATIONS)[number]["id"];
const PAGE_SIZE_OPTIONS = [20, 50, 100];

type Props = {
  allPokemon: PokemonListItem[];
  allTypes: PokemonTypeItem[];
};

export default function PokedexClient({ allPokemon, allTypes }: Props) {
  const { t } = useLanguage();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGen, setSelectedGen] = useState<GenerationId | "all">("all");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [showTypeFilter, setShowTypeFilter] = useState(false);

  const [globalShiny, setGlobalShiny] = useState(false);
  const [shinyPokemon, setShinyPokemon] = useState<Set<string>>(new Set());

  const [perPage, setPerPage] = useState<(typeof PAGE_SIZE_OPTIONS)[number]>(20);
  const [page, setPage] = useState(1);

  const isLoading = false;
  const isFetching = false;

  const handleTypeToggle = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
    setPage(1);
  };

  const handleShinyToggle = useCallback((name: string, isShiny: boolean) => {
    setShinyPokemon((prev) => {
      const next = new Set(prev);
      if (isShiny) next.add(name);
      else next.delete(name);
      return next;
    });
  }, []);

  const handleGlobalShinyToggle = () => {
    setGlobalShiny((prev) => {
      const next = !prev;
      if (next) setShinyPokemon(new Set());
      return next;
    });
  };

  const handleItemsPerPageChange = (value: string) => {
    const parsed = Number(value);
    if (PAGE_SIZE_OPTIONS.includes(parsed as (typeof PAGE_SIZE_OPTIONS)[number])) {
      setPerPage(parsed as (typeof PAGE_SIZE_OPTIONS)[number]);
      setPage(1);
    }
  };

  const filteredAll = useMemo(() => {
    let list = allPokemon;

    // ✅ génération
    if (selectedGen !== "all") {
      list = list.filter(
        (p) => p.species?.classification?.generationKey === selectedGen
      );
    }

    // ✅ types
    if (selectedTypes.length > 0) {
      list = list.filter((p) => {
        const pokemonTypes = getPokemonTypeKeys(p);
        return selectedTypes.every((t) => pokemonTypes.includes(t));
      });
    }

    // ✅ search (nom anglais, français ou id)
    const q = searchQuery.toLowerCase().trim();
    if (q) {
      const asNumber = Number(q);
      list = list.filter((p) => {
        const nameEn = (p.display_name?.en ?? p.name ?? "").toLowerCase();
        const nameFr = (p.display_name?.fr ?? "").toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          nameEn.includes(q) ||
          nameFr.includes(q) ||
          (!Number.isNaN(asNumber) && p.id === asNumber)
        );
      });
    }

    return list;
  }, [allPokemon, selectedGen, selectedTypes, searchQuery]);

  const hasActiveFilters = selectedGen !== "all" || selectedTypes.length > 0;

  const totalPages = Math.max(1, Math.ceil(filteredAll.length / perPage));
  const safePage = Math.min(page, totalPages);

  const pageItems = useMemo(() => {
    const startIndex = (safePage - 1) * perPage;
    return filteredAll.slice(startIndex, startIndex + perPage);
  }, [filteredAll, safePage, perPage]);

  const hasPrevious = safePage > 1;
  const hasNext = safePage < totalPages;

  const start = filteredAll.length === 0 ? 0 : (safePage - 1) * perPage + 1;
  const end = Math.min(safePage * perPage, filteredAll.length);

  const handleLoadMore = () => setPage((p) => Math.min(p + 1, totalPages));
  const handleLoadPrevious = () => setPage((p) => Math.max(p - 1, 1));

  return (
    <div className="max-w-6xl mx-auto px-6 pt-[72px] text-center">
      <section className="px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1
            className="text-4xl md:text-5xl font-bold mb-2 font-display"
            style={{
              background: "linear-gradient(135deg, #ef4444, #f97316)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {t(translations.nationalPokedex)}
          </h1>

          <p className="text-gray-400 text-lg mb-6">
            {t(translations.exploreAllPokemon)}
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <SearchBar
              value={searchQuery}
              onChange={(v) => {
                setSearchQuery(v);
                setPage(1);
              }}
              t={t}
            />

            <Select
              value={selectedGen}
              onValueChange={(v) => {
                setSelectedGen(v as GenerationId | "all");
                setPage(1);
              }}
            >
              <SelectTrigger className="w-[160px] h-[52px] bg-[#252b37] border-none text-[#f0f2f4] rounded-full hover:bg-[#353560] transition-colors outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                <SelectValue placeholder={t(translations.region)} />
              </SelectTrigger>
              <SelectContent className="bg-[#252b37] border-[#353560]">
                <SelectItem value="all" className="text-[#f0f2f4] cursor-pointer focus:bg-[#353560]">
                  {t(translations.allGenerations)}
                </SelectItem>
                {GENERATIONS.map((g) => (
                  <SelectItem
                    key={g.id}
                    value={g.id}
                    className="text-[#f0f2f4] cursor-pointer focus:bg-[#353560]"
                  >
                    {g.region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={String(perPage)} onValueChange={handleItemsPerPageChange}>
              <SelectTrigger className="w-[100px] h-[52px] bg-[#252b37] border-none text-[#f0f2f4] rounded-full hover:bg-[#353560] transition-colors outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                <SelectValue placeholder="20" />
              </SelectTrigger>
              <SelectContent className="bg-[#252b37] border-[#353560]">
                {PAGE_SIZE_OPTIONS.map((size) => (
                  <SelectItem
                    key={size}
                    value={String(size)}
                    className="text-[#f0f2f4] cursor-pointer focus:bg-[#353560]"
                  >
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowTypeFilter(!showTypeFilter)}
              className={`flex items-center gap-2 px-5 py-3 h-[52px] rounded-full font-medium transition-all duration-300 ${showTypeFilter
                ? "bg-gradient-to-r from-red-500 to-red-600 text-[#f0f2f4] shadow-[0_0_20px_rgba(239,68,68,0.35)]"
                : "bg-[#252b37] text-gray-300 hover:bg-[#353560]"
                }`}
            >
              <Filter className="w-5 h-5" />
              <span className="hidden sm:inline">{t(translations.types)}</span>

              {selectedTypes.length > 0 && (
                <span
                  className={`ml-1 px-2 py-0.5 rounded-full text-xs font-semibold ${showTypeFilter
                    ? "bg-white/20 text-[#f0f2f4]"
                    : "bg-red-500/20 text-red-200"
                    }`}
                >
                  {selectedTypes.length}
                </span>
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGlobalShinyToggle}
              className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all duration-300 ${globalShiny
                ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-[#f0f2f4] shadow-[0_0_20px_rgba(251,191,36,0.5)]"
                : "bg-[#252b37] text-gray-300 hover:bg-[#353560]"
                }`}
            >
              <Sparkles className={`w-5 h-5 ${globalShiny ? "animate-pulse" : ""}`} />
              <span className="hidden sm:inline">{t(translations.shiny)}</span>
            </motion.button>
          </div>

          <AnimatePresence>
            {showTypeFilter && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="max-w-4xl mx-auto mb-6"
              >
                <TypeFilter
                  allTypes={allTypes}
                  selectedTypes={selectedTypes}
                  onTypeToggle={handleTypeToggle}
                  onClear={() => setSelectedTypes([])}
                  t={t}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {hasActiveFilters && (
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {selectedGen !== "all" && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-500/20 text-red-200 rounded-full text-sm">
                  {GENERATIONS.find((g) => g.id === selectedGen)?.region}
                  <button onClick={() => setSelectedGen("all")} aria-label="Retirer filtre région">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedTypes.map((typeKey) => {
                const typeItem = allTypes.find((item) => item.key === typeKey);
                const label = typeItem?.name ?? { en: typeKey, fr: typeKey };
                return (
                  <span
                    key={typeKey}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-red-500/20 text-red-200 rounded-full text-sm capitalize"
                  >
                    {t(label)}
                    <button
                      onClick={() => handleTypeToggle(typeKey)}
                      aria-label={`Retirer ${t(label)}`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                );
              })}
            </div>
          )}

          <p className="text-gray-500 text-sm">
            {searchQuery
              ? `${filteredAll.length} ${t(translations.results)}${filteredAll.length !== 1 ? t(translations.results) : ""}`
              : `${t(translations.display)} ${start} - ${end} ${t(translations.on)} ${filteredAll.length}`}
          </p>
        </motion.div>
      </section>

      <section className="px-6 pb-12">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-red-500 mb-4" />
            <p className="text-gray-400">{t(translations.loading)}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {pageItems.map((pokemon: PokemonListItem, index: number) => (
                <motion.div
                  key={pokemon.id ?? pokemon.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.02, 0.2) }}
                >
                  <PokemonCard
                    pokemon={pokemon}
                    index={index}
                    globalShiny={globalShiny}
                    isShiny={globalShiny || shinyPokemon.has(pokemon.name)}
                    onShinyToggle={handleShinyToggle}
                  />
                </motion.div>
              ))}
            </div>

            {pageItems.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-400 text-lg">
                  {t(translations.noPokemonFound)} &quot;{searchQuery}&quot;
                </p>
              </div>
            )}

            {filteredAll.length > 0 && totalPages > 1 && (
              <div className="flex flex-col items-center gap-4 mt-12">
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLoadPrevious}
                    disabled={!hasPrevious || isFetching}
                    className="px-6 py-3 rounded-full bg-[#252542] text-[#f0f2f4] font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#353560] transition-colors"
                  >
                    {t(translations.previous)}
                  </motion.button>

                  <span className="text-gray-400">
                    {t(translations.page)} {safePage} {t(translations.on)} {totalPages}
                  </span>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLoadMore}
                    disabled={!hasNext || isFetching}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-[#f0f2f4] font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isFetching && <Loader2 className="w-4 h-4 animate-spin" />}
                    {t(translations.next)}
                  </motion.button>
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
