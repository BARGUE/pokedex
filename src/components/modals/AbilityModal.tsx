import { motion } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { PokemonAbilityItem, PokemonAbilityLanguage } from "@/src/services/pokemon/abilities/types";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { translations } from "@/src/lib/i18n";

interface AbilityModalProps {
  ability: PokemonAbilityItem;
  isOpen: boolean;
  onClose: () => void;
}

function getTextForLang<T>(
  lang: PokemonAbilityLanguage,
  get: (l: PokemonAbilityLanguage) => T | undefined
): T | undefined {
  return get(lang) ?? get(lang === "fr" ? "en" : "fr");
}

export function AbilityModal({ ability, isOpen, onClose }: AbilityModalProps) {
  const { language, t } = useLanguage();
  if (!ability) return null;

  const lang = language as PokemonAbilityLanguage;
  const name =
    ability.localized?.[lang]?.name ??
    ability.localized?.en?.name ??
    ability.localized?.fr?.name ??
    ability.key;

  const isHidden = ability.isHidden;

  const shortEffect =
    getTextForLang(lang, (l) => ability.localized?.[l]?.effect?.short) ??
    ability.localized?.en?.effect?.short ??
    ability.localized?.fr?.effect?.short ??
    "";

  const longEffect =
    getTextForLang(lang, (l) => ability.localized?.[l]?.effect?.long) ??
    ability.localized?.en?.effect?.long ??
    ability.localized?.fr?.effect?.long ??
    "";

  const description =
    getTextForLang(lang, (l) => ability.flavorText?.[l]) ??
    ability.flavorText?.en ??
    ability.flavorText?.fr ??
    "";

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-[#171c26] border-[#29303d] max-w-md">
        <DialogClose asChild>
          <button
            aria-label="Fermer"
            className="absolute right-4 top-4 w-9 h-9 rounded-full flex items-center justify-center text-[#8f96a3] hover:text-[#f0f2f4] hover:bg-[#252b37] outline-none focus:outline-none focus:ring-0 active:border active:border-red-500"
          >
            <X className="w-5 h-5" />
          </button>
        </DialogClose>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-[#f0f2f4]">
            <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-yellow-400" />
            </div>

            <div>
              <span className="text-[#f0f2f4] font-display text-2xl">{name}</span>
              {isHidden && (
                <span className="ml-2 text-xs bg-[#252b37] text-[#8f96a3] px-2 py-0.5 rounded-full">
                  {t(translations.hiddenAbility)}
                </span>
              )}
            </div>
          </DialogTitle>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {shortEffect && (
            <div className="bg-[#ee2b2b1a] rounded-xl p-4 border border-[#ee2b2b33]">
              <p className="text-[#f0f2f4]/80 font-medium leading-relaxed">
                {shortEffect}
              </p>
            </div>
          )}

          {description && (
            <div className="bg-[#252b37] rounded-xl p-4">
              <p className="text-sm font-medium text-[#8f96a3] mb-2">
                {t(translations.inGameDescription)}
              </p>
              <p className="text-[#f0f2f4]/80 text-sm leading-relaxed">
                {description.replace(/\n|\f/g, " ").trim()}
              </p>
            </div>
          )}

          {longEffect && longEffect !== shortEffect && (
            <div className="bg-[#252b37] rounded-xl p-4">
              <p className="text-sm font-medium text-[#8f96a3] mb-2">
                {t(translations.detailedEffect)}
              </p>
              <p className="text-[#f0f2f4]/80 text-sm leading-relaxed whitespace-pre-line">
                {longEffect}
              </p>
            </div>
          )}
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
