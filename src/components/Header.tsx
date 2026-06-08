"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LanguageToggle } from "./LanguageToggle";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { translations } from "@/src/lib/i18n";

interface HeaderProps {
  isGoBack?: boolean;
  navigation?: boolean;
  prevId?: number;
  nextId?: number;
}

export function Header({ isGoBack = false, navigation = false, prevId, nextId }: HeaderProps) {
  const { t } = useLanguage();
  const router = useRouter();

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#0f131a]/70 border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <motion.div
          className="flex items-center gap-3"
          whileHover={{ scale: 1.02 }}
        >
          {isGoBack && (
            <motion.button
              onClick={() => router.back()}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-[#252542] flex items-center justify-center text-[#f0f2f4] hover:bg-[#353560] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>
          )}
          <Link href='/' className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/30" />
              <div className="absolute bottom-0 left-0 right-0 h-1/2 rounded-b-full bg-white/90" />
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-[#1a1a35] -translate-y-1/2" />
              <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-white border-2 border-[#1a1a35] rounded-full -translate-x-1/2 -translate-y-1/2" />
            </div>
            <span className="text-xl font-display font-bold text-[#f0f2f4]">
              {t(translations.pokedex)}
            </span>
          </Link>
        </motion.div>

        {navigation ? (
          <div className="flex items-center gap-2">
            <LanguageToggle />
            {prevId && (
              <>
                <Link href={`/pokemon/${prevId}`}>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-full bg-[#252542] flex items-center justify-center text-[#f0f2f4] hover:bg-[#353560] transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </motion.button>
                </Link>
              </>
            )}
            <Link href={`/pokemon/${nextId}`}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-[#252542] flex items-center justify-center text-[#f0f2f4] hover:bg-[#353560] transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-6">
            <LanguageToggle />
            <Link href="/pokedex">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2 bg-gradient-to-r from-red-500 to-red-600 rounded-full text-[#f0f2f4] font-semibold text-sm shadow-lg shadow-red-500/25"
              >
                {t(translations.open)}
              </motion.button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
