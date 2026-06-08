"use client";

import { motion } from "framer-motion";
import { Cherry } from "lucide-react";
import type { BerryDetail } from "@/src/services/item-detail/types";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { translations } from "@/src/lib/i18n";
import Image from "next/image";

export function BerriesGrid({
  berries,
  onSelect,
}: {
  berries: BerryDetail[];
  onSelect: (berry: BerryDetail) => void;
}) {
  const { t } = useLanguage();

  function displayName(berry: BerryDetail): string {
    const fr = (berry.localized?.fr?.name ?? "").trim();
    const en = (berry.localized?.en?.name ?? "").trim();
    if (fr) return fr;
    if (en) return en;
    return berry.key;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {berries.map((berry, index) => {
        const name = displayName(berry);
        const spriteUrl = berry.assets?.sprite ?? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${berry.itemKey}.png`;

        return (
          <motion.button
            key={berry.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(index * 0.02, 0.5) }}
            onClick={() => onSelect(berry)}
            className="bg-[#0f131a] hover:bg-[#353560] rounded-xl p-4 border border-[#29303d] transition-all hover:scale-105 text-center group"
          >
            <div className="w-12 h-12 mx-auto mb-2 bg-pink-500/10 rounded-lg flex items-center justify-center overflow-hidden">
              <Image
                src={spriteUrl}
                alt={name}
                className="w-10 h-10 object-contain"
                width={200}
                height={200}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.parentElement
                    ?.querySelector(".fallback-icon")
                    ?.classList.remove("hidden");
                }}
              />
              <Cherry className="w-6 h-6 text-pink-500 hidden fallback-icon" />
            </div>
            <p className="text-[#f0f2f4] font-medium truncate">{t(translations.berry)} {name}</p>
          </motion.button>
        );
      })}
    </div>
  );
}
