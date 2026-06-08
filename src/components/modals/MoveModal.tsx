"use client";

import { motion } from "framer-motion";
import { Zap, Target, RotateCcw, Swords, Wand2, X } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/src/components/ui/dialog";
import { getMoveCategory } from "@/src/lib/utils";
import { TypeBadge } from "../pokedex/TypeBadge";
import { Skeleton } from "../ui/skeleton";
import { PokemonMove } from "@/src/services/pokemon/moves/types";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { translations } from "@/src/lib/i18n";

interface MoveModalProps {
  movePokemon: PokemonMove | null;
  isOpen: boolean;
  onClose: () => void;
}

function titleCaseSlug(slug: string) {
  return slug
    .split("-")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

export function MoveModal({ movePokemon, isOpen, onClose }: MoveModalProps) {
  const { language, t } = useLanguage();
  const isLoading = false;
  const move = movePokemon;

  const displayName =
    move?.localized?.[language]?.name ??
    move?.localized?.en?.name ??
    move?.localized?.fr?.name ??
    (move?.key ? titleCaseSlug(move.key) : "") ??
    "";

  const description =
    (move?.localized?.[language]?.flavorEntries?.[0]?.flavor_text ??
      move?.localized?.en?.flavorEntries?.[0]?.flavor_text ??
      move?.localized?.fr?.flavorEntries?.[0]?.flavor_text) ?? null;

  const effectShort =
    (move?.localized?.[language]?.effect?.short ??
      move?.localized?.en?.effect?.short ??
      move?.localized?.fr?.effect?.short) ?? null;

  const category = move ? getMoveCategory(move.stats?.damageClass) : null;
  const categoryLabel =
    category && move?.stats?.damageClass
      ? move.stats.damageClass === "physical"
        ? t(translations.physical)
        : move.stats.damageClass === "special"
          ? t(translations.special)
          : move.stats.damageClass === "status"
            ? t(translations.status)
            : category.label
      : category?.label ?? null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-[#171c26] border-[#29303d] max-w-md">
        <DialogClose asChild>
          <button
            aria-label={t(translations.close)}
            className="absolute right-4 top-4 w-9 h-9 rounded-full flex items-center justify-center text-[#8f96a3] hover:text-[#f0f2f4] hover:bg-[#252b37] outline-none focus:outline-none focus:ring-0 active:border active:border-red-500"
          >
            <X className="w-5 h-5" />
          </button>
        </DialogClose>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-[#f0f2f4]">
            {isLoading ? (
              <Skeleton className="h-8 w-48" />
            ) : move ? (
              <>
                <span className="font-display text-2xl">{displayName}</span>
                {move.stats?.type && <TypeBadge type={move.stats.type} size="sm" />}
              </>
            ) : (
              <span className="font-display text-2xl">—</span>
            )}
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <div className="grid grid-cols-3 gap-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          </div>
        ) : move ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {category && (
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-[#f0f2f4] text-sm font-medium ${category.color}`}
                >
                  {move.stats?.damageClass === "physical" && (
                    <Swords className="w-4 h-4 inline mr-1" />
                  )}
                  {move.stats?.damageClass === "special" && (
                    <Wand2 className="w-4 h-4 inline mr-1" />
                  )}
                  {categoryLabel}
                </span>
              </div>
            )}

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-[#252b37] rounded-xl p-4 text-center">
                <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Zap className="w-5 h-5 text-red-400" />
                </div>
                <p className="text-[#8f96a3] text-xs mb-1">{t(translations.power)}</p>
                <p className="font-display text-xl font-bold text-[#f0f2f4]">
                  {Number.isFinite(move.stats?.power) && (move.stats?.power ?? 0) > 0 ? move.stats.power : "—"}
                </p>
              </div>

              <div className="bg-[#252b37] rounded-xl p-4 text-center">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Target className="w-5 h-5 text-blue-400" />
                </div>
                <p className="text-[#8f96a3] text-xs mb-1">{t(translations.accuracy)}</p>
                <p className="font-display text-xl font-bold text-[#f0f2f4]">
                  {Number.isFinite(move.stats?.accuracy) && (move.stats?.accuracy ?? 0) > 0 ? `${move.stats.accuracy}%` : "—"}
                </p>
              </div>

              <div className="bg-[#252b37] rounded-xl p-4 text-center">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <RotateCcw className="w-5 h-5 text-green-400" />
                </div>
                <p className="text-[#8f96a3] text-xs mb-1">PP</p>
                <p className="font-display text-xl font-bold text-[#f0f2f4]">
                  {Number.isFinite(move.stats?.pp) && (move.stats?.pp ?? 0) > 0 ? move.stats.pp : "—"}
                </p>
              </div>
            </div>

            {description && (
              <div className="bg-[#252b37] rounded-xl p-4">
                <p className="text-[#8f96a3] text-sm leading-relaxed">
                  {description.replace(/\n/g, " ")}
                </p>
              </div>
            )}

            {effectShort && (
              <div className="bg-primary/10 rounded-xl p-4 border border-primary/20">
                <p className="text-sm font-medium text-primary mb-1">{t(translations.effect)}</p>
                <p className="text-[#8f96a3] text-sm leading-relaxed">
                  {effectShort.replace(/\n/g, " ")}
                </p>
              </div>
            )}
          </motion.div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
