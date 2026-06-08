"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/src/components/ui/carousel";
import { getGenerationColor, pokemonGames, sortGamesByDate } from "@/src/lib/pokemonGames";
import { Language } from "@/src/contexts/LanguageContext";
import { translations } from "@/src/lib/i18n";
import GameCard from "@/src/components/games/GameCard";

export default function GamesSection({ t }: { t: (translations: Record<Language, string>) => string }) {
  const [currentGen, setCurrentGen] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  const { generations, gamesByGeneration, sortedGames } = useMemo(() => {
    const sorted = sortGamesByDate(pokemonGames);

    const byGen = sorted.reduce((acc, game) => {
      const gen = game.generation;
      if (!acc[gen]) acc[gen] = [];
      acc[gen].push(game);
      return acc;
    }, {} as Record<number, typeof pokemonGames>);

    const gens = Object.keys(byGen).map(Number).sort((a, b) => a - b);

    return { generations: gens, gamesByGeneration: byGen, sortedGames: sorted };
  }, []);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => setCurrentGen(api.selectedScrollSnap());
    api.on("select", onSelect);
    onSelect();

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    < div className="py-20 px-6">
      {/* Stats jeux */}
      <section className="relative ">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-[#f0f2f4] mb-12 text-center">
            {t(translations.allGamesByGeneration)}
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { value: sortedGames.length, label: t(translations.games), color: "from-red-500 to-red-600" },
              { value: generations.length, label: t(translations.generations), color: "from-blue-500 to-indigo-600" },
              { value: "1996", label: t(translations.beginning), color: "from-yellow-500 to-orange-500" },
              { value: 6, label: t(translations.consoles), color: "from-green-500 to-emerald-600" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative group"
              >
                <div
                  className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl blur-xl -z-10"
                  style={{ background: `linear-gradient(135deg, var(--tw-gradient-stops))` }}
                />
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
                  <div
                    className={`text-4xl md:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r ${stat.color}`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-[#f0f2f4]/50 text-sm font-medium mt-2">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Carousel */}
      <section id="games" className="relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <p className="text-[#f0f2f4]/50 max-w-lg mx-auto">
              {t(translations.navigateBetweenGenerations)}
            </p>
          </motion.div>

          <div className="flex justify-center items-center gap-4 mb-8">
            <motion.button
              whileHover={{ scale: 1.1, x: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => api?.scrollPrev()}
              disabled={currentGen === 0}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#f0f2f4]/70 hover:text-[#f0f2f4] hover:bg-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm font-medium hidden sm:inline">{t(translations.previous)}</span>
            </motion.button>

            <div className="flex items-center gap-2 md:px-6 px-3 py-3 rounded-2xl bg-white/5 border border-white/10 md:flex-row flex-col">
              <span
                className={`text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r ${getGenerationColor(
                  generations[currentGen]
                )}`}
              >
                {t(translations.generation)} {generations[currentGen]}
              </span>
              <span className="text-[#f0f2f4]/30 text-sm ml-2">
                {gamesByGeneration[generations[currentGen]]?.length} {t(translations.games)}
              </span>
            </div>

            <motion.button
              whileHover={{ scale: 1.1, x: 3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => api?.scrollNext()}
              disabled={currentGen === generations.length - 1}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#f0f2f4]/70 hover:text-[#f0f2f4] hover:bg-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <span className="text-sm font-medium hidden sm:inline">{t(translations.next)}</span>
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        <Carousel
          setApi={setApi}
          opts={{ align: "start", loop: false }}
          className="w-full"
        >
          <CarouselContent className="-ml-0 items-start">
            {generations.map((gen) => (
              <CarouselItem key={gen} className="pl-0">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-0">
                  <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-wrap justify-center gap-3 sm:gap-4 p-3 sm:p-6">
                      {gamesByGeneration[gen].map((game, i) => (
                        <GameCard key={game.id} game={game} index={i} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>
    </div>
  );
}
