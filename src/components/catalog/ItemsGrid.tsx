"use client";

import { motion } from "framer-motion";
import { Package } from "lucide-react";
import type { ItemDetail } from "@/src/services/item-detail/types";
import { useLanguage } from "@/src/contexts/LanguageContext";
import type { Language } from "@/src/contexts/LanguageContext";
import Image from "next/image";

export function ItemsGrid({
  items,
  onSelect,
}: {
  items: ItemDetail[];
  onSelect: (key: string) => void;
}) {
  const { language } = useLanguage();
  const getItemLabel = (item: ItemDetail, lang: Language) =>
    item.localized?.[lang]?.name || item.localized?.en?.name || item.localized?.fr?.name || item.key;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {items.map((item, index) => (
        <motion.button
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: Math.min(index * 0.02, 0.5) }}
          onClick={() => onSelect(item.key)}
          className="bg-[#0f131a] hover:bg-[#353560] rounded-xl p-4 border border-[#29303d] transition-all hover:scale-105 text-center group"
        >
          <div className="w-12 h-12 mx-auto mb-2 bg-[#252b37] rounded-lg flex items-center justify-center overflow-hidden">
            {item.assets?.sprite ? (
              <Image
                src={item.assets.sprite}
                alt={getItemLabel(item, language)}
                className="w-10 h-10 object-contain"
                width={200}
                height={200}
              />
            ) : (
              <Package className="w-6 h-6 text-[#8f96a3]" />
            )}
          </div>
          <p className="text-[#f0f2f4] font-medium truncate">{getItemLabel(item, language)}</p>
        </motion.button>
      ))}
    </div>
  );
}
