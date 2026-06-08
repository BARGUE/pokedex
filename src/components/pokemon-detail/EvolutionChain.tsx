"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { PokemonEvolutionItem } from "@/src/services/pokemon/evolution/types";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { translations } from "@/src/lib/i18n";

interface EvolutionChainProps {
  pokemonEvolution: PokemonEvolutionItem[];
}

export function EvolutionChainDisplay({ pokemonEvolution }: EvolutionChainProps) {
  const { t } = useLanguage();

  if (!pokemonEvolution.length) {
    return (
      <div className="flex items-center justify-center gap-4 py-8">
        <p className="text-sm text-gray-400">{t(translations.noEvolutionFound)}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 py-4">
      {pokemonEvolution.map((evolution: PokemonEvolutionItem, idx: number) => {

        const href = `/pokemon/${evolution.id ?? evolution.name}`;
        const imgSrc = evolution.images?.official ?? "/images/mark-unknown.png";
        const displayName = evolution.display_name ? t(evolution.display_name) : evolution.name;

        return (
          <div key={evolution.name} className="flex items-center gap-4">
            <Link href={href}>
              <motion.div
                className="flex flex-col items-center gap-2 group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-20 h-20 bg-[#252b37] rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <Image
                    width={80}
                    height={80}
                    src={imgSrc}
                    alt={displayName}
                    className="w-16 h-16 object-contain"
                  />
                </div>

                <span className="text-sm font-medium text-gray-400 capitalize">
                  {displayName}
                </span>
              </motion.div>
            </Link>

            {idx < pokemonEvolution.length - 1 && (
              <ChevronRight className="text-[#8f96a3] w-6 h-6" />
            )}
          </div>
        );
      })}
    </div>
  );
}
