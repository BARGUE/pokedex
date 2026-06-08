"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { Skeleton } from "@/src/components/ui/skeleton";
import { X } from "lucide-react";
import type { ItemDetail } from "@/src/services/item-detail/types";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { translations } from "@/src/lib/i18n";
import type { Language } from "@/src/contexts/LanguageContext";
import Image from "next/image";

export function ItemModal({
  open,
  onOpenChange,
  item,
  loading,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: ItemDetail | null;
  loading: boolean;
}) {
  const { language, t } = useLanguage();

  const getItemLabel = (it: ItemDetail, lang: Language) =>
    it.localized?.[lang]?.name || it.localized?.en?.name || it.localized?.fr?.name || it.key;

  const getItemEffect = (it: ItemDetail, lang: Language) =>
    it.localized?.[lang]?.effect?.short ||
    it.localized?.[lang]?.flavor ||
    it.localized?.en?.effect?.short ||
    it.localized?.fr?.effect?.short ||
    it.localized?.en?.flavor ||
    it.localized?.fr?.flavor ||
    t(translations.noDescription);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#0f131a] border-[#29303d] max-w-md">
        <DialogClose asChild>
          <button
            aria-label={t(translations.close)}
            className="absolute right-4 top-4 w-9 h-9 rounded-full flex items-center justify-center text-[#8f96a3] hover:text-[#f0f2f4] hover:bg-[#252b37] outline-none focus:outline-none focus:ring-0"
          >
            <X className="w-5 h-5" />
          </button>
        </DialogClose>

        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-[#f0f2f4]">
            {loading ? (
              <Skeleton className="h-8 w-48" />
            ) : item ? (
              <>
                {item.assets?.sprite && (
                  <Image
                    src={item.assets.sprite}
                    alt={getItemLabel(item, language)}
                    className="w-12 h-12 object-contain"
                    width={200}
                    height={200}
                  />
                )}
                <span className="font-display text-2xl">{getItemLabel(item, language)}</span>
              </>
            ) : (
              <span className="font-display text-2xl">{t(translations.item)}</span>
            )}
          </DialogTitle>
        </DialogHeader>

        {item && (
          <div className="space-y-4">
            {item.cost != null && item.cost > 0 && (
              <div className="bg-[#252b37] rounded-xl p-4 flex items-center justify-between">
                <span className="text-[#8f96a3]">{t(translations.price)}</span>
                <span className="font-bold text-[#f0f2f4]">₽{item.cost.toLocaleString()}</span>
              </div>
            )}

            <div className="bg-[#252b37] rounded-xl p-4">
              <p className="text-[#8f96a3] text-sm mb-1">{t(translations.effect)}</p>
              <p className="text-[#f0f2f4]">{getItemEffect(item, language)}</p>
            </div>

            {item.categoryKey && (
              <div className="bg-[#252b37] rounded-xl p-4">
                <p className="text-[#8f96a3] text-sm mb-1">{t(translations.category)}</p>
                <p className="text-[#f0f2f4] capitalize">{item.categoryKey.replace(/-/g, " ")}</p>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
