"use client";

import { motion } from "framer-motion";
import CategoryCard from "./CategoryCard";
import { Language } from "@/src/contexts/LanguageContext";
import { translations } from "@/src/lib/i18n";
import { PokemonListItem } from "@/src/services/pokemon/list/types";

type Category = {
  slug: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  list: PokemonListItem[];
  color: string;
  bgColor: string;
  iconColor: string;
};

export default function CategorySection({
  categories,
  onSelect,
  t,
}: {
  categories: Category[];
  onSelect: (cat: Category) => void;
  t: (translations: Record<Language, string>) => string;
}) {
  return (
    <section className="relative py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-[#f0f2f4] mb-4">
            {t(translations.exploreByCategory)}
          </h2>
          <p className="text-[#f0f2f4]/50 max-w-lg mx-auto">
            {t(translations.exploreByCategorySubtitle)}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.slug} category={cat} index={i} onSelect={() => onSelect(cat)} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
