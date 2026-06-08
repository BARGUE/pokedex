import { motion } from "framer-motion";
import { TypeBadge } from "./TypeBadge";
import { translations } from "@/src/lib/i18n";
import { Language } from "@/src/contexts/LanguageContext";
import { PokemonTypeItem } from "@/src/services/pokedex/types";

interface TypeFilterProps {
    allTypes: PokemonTypeItem[];
    selectedTypes: string[];
    onTypeToggle: (typeKey: string) => void;
    onClear: () => void;
    t: (translations: Record<Language, string>) => string;
}

export function TypeFilter({
    allTypes,
    selectedTypes,
    onTypeToggle,
    onClear,
    t,
}: TypeFilterProps) {
    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-[#171c26] rounded-2xl p-4 border border-[#29303d]"
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-semibold text-[#f0f2f4]">
                    {t(translations.filterByType)}
                </h3>

                {selectedTypes.length > 0 && (
                    <button
                        onClick={onClear}
                        className="text-sm text-gray-400 hover:text-[#f0f2f4] transition-colors"
                    >
                        {t(translations.clear)} ({selectedTypes.length})
                    </button>
                )}
            </div>

            <div className="flex flex-wrap gap-2">
                {allTypes.map((typeItem) => {
                    const isActive = selectedTypes.includes(typeItem.key);

                    return (
                        <motion.button
                            key={typeItem.key}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onTypeToggle(typeItem.key)}
                            className={`
                rounded-full p-[3px] transition-all
                ${isActive
                                    ? "border-2 border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.35)]"
                                    : "border border-transparent opacity-70 hover:opacity-100"
                                }
              `}
                        >
                            <TypeBadge
                                type={typeItem.key}
                                label={t(typeItem.name)}
                                size="sm"
                            />
                        </motion.button>
                    );
                })}
            </div>
        </motion.div>
    );
}
