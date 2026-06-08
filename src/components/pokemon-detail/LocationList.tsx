import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import {
  formatLocationAreaKey,
  formatLevelRanges,
  formatVersionName,
} from "@/src/lib/utils";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { translations } from "@/src/lib/i18n";
import { EncounterItem, VersionEncounter } from "@/src/services/pokemon/encounters/types";

interface LocationListProps {
  pokemonEncounters: VersionEncounter[];
}

export function LocationList({ pokemonEncounters }: LocationListProps) {
  const { t } = useLanguage();

  if (pokemonEncounters.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-[#252b37] rounded-2xl p-6 text-center border border-white/5"
      >
        <MapPin className="w-10 h-10 text-[#f0f2f4]/40 mx-auto mb-3" />
        <p className="text-[#f0f2f4]/70">
          {t(translations.notFoundWild)}
        </p>
        <p className="text-[#f0f2f4]/50 text-sm mt-2">
          {t(translations.obtainedBy)}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-pokeball-scrollbar"
    >
      {pokemonEncounters.map((version: VersionEncounter) => (
        <div
          key={version.versionKey}
          className="bg-[#252b37] rounded-xl p-4 border border-white/5"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
              <MapPin className="w-4 h-4 text-red-300" />
            </div>
            <h4 className="font-display font-semibold text-[#f0f2f4]">
              Pokémon {formatVersionName(version.versionKey)}
            </h4>
          </div>

          <div className="space-y-2">
            {version.encountersByVersion.map((location: EncounterItem) => (
              <div
                key={location.locationAreaKey}
                className="flex justify-between items-center text-sm gap-3"
              >
                <span className="text-[#f0f2f4]/90">
                  {formatLocationAreaKey(location.locationAreaKey)}
                </span>
                <span className="text-[#f0f2f4]/50 text-xs whitespace-nowrap">
                  {formatLevelRanges(location.levelRanges)} {location.chance}%
                </span>
              </div>
            ))}

            {version.encountersByVersion.length > 5 && (
              <p className="text-[#f0f2f4]/50 text-xs text-center pt-2">
                +{version.encountersByVersion.length - 5} {t(translations.otherLocations)}
              </p>
            )}
          </div>
        </div>
      ))}
    </motion.div>
  );
}
