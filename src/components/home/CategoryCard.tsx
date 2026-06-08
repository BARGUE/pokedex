"use client";

import { Language } from "@/src/contexts/LanguageContext";
import { translations } from "@/src/lib/i18n";
import { PokemonListItem } from "@/src/services/pokemon/list/types";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function CategoryCard({
  category,
  index,
  onSelect,
  t,
}: {
  category: {
    slug: string;
    title: string;
    subtitle: string;
    icon: React.ElementType;
    list: PokemonListItem[];
    color: string;
    bgColor: string;
    iconColor: string;
  };
  index: number;
  onSelect: () => void;
  t: (translations: Record<Language, string>) => string;
}) {
  const Icon = category.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <motion.div
        onClick={onSelect}
        whileHover={{ y: -8, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 overflow-hidden cursor-pointer h-full"
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
        />

        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${category.bgColor} mb-4`}>
          <Icon className={`w-6 h-6 ${category.iconColor}`} />
        </div>

        <h3 className="text-lg font-display font-bold text-[#f0f2f4] mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/80 transition-all">
          {category.title}
        </h3>
        <p className="text-[#f0f2f4]/40 text-sm mb-3">{category.subtitle}</p>

        <div className="flex items-center justify-between">
          <span className={`text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r ${category.color}`}>
            {category.list.length} {t(translations.pokemon)}
          </span>
          <ChevronRight className="w-4 h-4 text-[#f0f2f4]/30 group-hover:text-[#f0f2f4]/70 group-hover:translate-x-1 transition-all" />
        </div>
      </motion.div>
    </motion.div>
  );
}
