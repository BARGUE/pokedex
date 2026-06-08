"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { X } from "lucide-react";
import type { BerryDetail } from "@/src/services/item-detail/types";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { translations, getFlavorLabel } from "@/src/lib/i18n";

function displayName(berry: BerryDetail): string {
  const fr = (berry.localized?.fr?.name ?? "").trim();
  const en = (berry.localized?.en?.name ?? "").trim();
  if (fr) return fr;
  if (en) return en;
  return berry.key;
}

export function BerryModal({
  open,
  onOpenChange,
  berry,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  berry: BerryDetail | null;
}) {
  const { language, t } = useLanguage();

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
            {berry ? (
              <span className="font-display text-2xl">{t(translations.berry)} {displayName(berry)}</span>
            ) : null}
          </DialogTitle>
        </DialogHeader>

        {berry?.agriculture && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#252b37] rounded-xl p-3 text-center">
                <p className="text-[#8f96a3] text-xs">{t(translations.size)}</p>
                <p className="font-bold text-[#f0f2f4]">{berry.agriculture.size} mm</p>
              </div>
              <div className="bg-[#252b37] rounded-xl p-3 text-center">
                <p className="text-[#8f96a3] text-xs">{t(translations.growthTime)}</p>
                <p className="font-bold text-[#f0f2f4]">{berry.agriculture.growthTime}h</p>
              </div>
              <div className="bg-[#252b37] rounded-xl p-3 text-center">
                <p className="text-[#8f96a3] text-xs">{t(translations.maxHarvest)}</p>
                <p className="font-bold text-[#f0f2f4]">{berry.agriculture.maxHarvest}</p>
              </div>
              <div className="bg-[#252b37] rounded-xl p-3 text-center">
                <p className="text-[#8f96a3] text-xs">{t(translations.smoothness)}</p>
                <p className="font-bold text-[#f0f2f4]">{berry.agriculture.smoothness}</p>
              </div>
            </div>

            <div className="bg-[#252b37] rounded-xl p-4">
              <p className="text-[#8f96a3] text-sm mb-2">{t(translations.flavors)}</p>
              <div className="flex flex-wrap gap-2">
                {(berry.flavors ?? [])
                  .filter((f) => f.potency > 0)
                  .sort((a, b) => b.potency - a.potency)
                  .map((f) => (
                    <span
                      key={f.key}
                      className="px-3 py-1 bg-[#252b37] rounded-full text-sm text-[#f0f2f4]"
                    >
                      {getFlavorLabel(f.key, language)} ({f.potency})
                    </span>
                  ))}
              </div>
            </div>

            <div className="bg-[#252b37] rounded-xl p-4">
              <p className="text-[#8f96a3] text-sm mb-1">{t(translations.firmness)}</p>
              <p className="text-[#f0f2f4] capitalize">{berry.agriculture.firmness}</p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
