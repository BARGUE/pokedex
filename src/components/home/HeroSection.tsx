"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ChevronRight, Scale, HelpCircle, Package } from "lucide-react";
import { Language } from "@/src/contexts/LanguageContext";
import { translations } from "@/src/lib/i18n";

export default function HeroSection({ totalPokemon, t }: { totalPokemon: number, t: (translations: Record<Language, string>) => string }) {
  return (
    <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
      >
        <Sparkles className="w-4 h-4 text-yellow-400" />
        <span className="text-[#f0f2f4]/80 text-sm font-medium">
          {totalPokemon.toLocaleString()} {t(translations.pokemonAvailable)}
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-6xl md:text-8xl lg:text-9xl font-display font-bold leading-none mb-6"
      >
        <span className="text-[#f0f2f4]">{t(translations.heroTitle1)}</span>
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
          {t(translations.heroTitle2)}
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-[#f0f2f4]/50 text-xl md:text-2xl max-w-2xl mx-auto mb-12"
      >
        {t(translations.heroSubtitle)}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <Link href="/pokedex">
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px -15px rgba(239, 68, 68, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl text-[#f0f2f4] font-bold text-lg overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3">
              <svg className="w-6 h-6" viewBox="0 0 100 100" fill="currentColor">
                <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="6" fill="none" />
                <path d="M5 50 H95" stroke="currentColor" strokeWidth="6" />
                <circle cx="50" cy="50" r="15" fill="currentColor" />
              </svg>
              {t(translations.explorePokedex)}
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>

            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700"
              initial={{ x: "100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex flex-wrap items-center justify-center gap-3 mt-8"
      >
        <Link href="/compare">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-[#f0f2f4]/80 hover:text-[#f0f2f4] hover:bg-white/10 transition-all"
          >
            <Scale className="w-4 h-4" />
            {t(translations.comparator)}
          </motion.button>
        </Link>

        <Link href="/quiz">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-[#f0f2f4]/80 hover:text-[#f0f2f4] hover:bg-white/10 transition-all"
          >
            <HelpCircle className="w-4 h-4" />
            {t(translations.quiz)}
          </motion.button>
        </Link>

        <Link href="/items">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-[#f0f2f4]/80 hover:text-[#f0f2f4] hover:bg-white/10 transition-all"
          >
            <Package className="w-4 h-4" />
            {t(translations.itemsAndBerries)}
          </motion.button>
        </Link>
      </motion.div>

      {/* petit “scroll indicator” comme dans ton code */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-[-4rem] left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
        >
          <motion.div className="w-1.5 h-1.5 rounded-full bg-white/50" />
        </motion.div>
      </motion.div>
    </div>
  );
}
