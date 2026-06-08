import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { PokemonCard } from '../pokedex/PokemonCard';
import { PokemonListItem } from '@/src/services/pokemon/list/types';
import { useState } from 'react';

interface CategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    subtitle: string;
    pokemonList: PokemonListItem[];
    gradient: string;
    iconColor: string;
    icon: React.ElementType;
}

export function CategoryModal({
    isOpen,
    onClose,
    title,
    subtitle,
    pokemonList,
    gradient,
    iconColor,
    icon: Icon,
}: CategoryModalProps) {
    const [globalShiny, setGlobalShiny] = useState(false);
    const [shinyPokemon, setShinyPokemon] = useState<Set<string>>(new Set());

    const handleShinyToggle = (name: string, isShiny: boolean) => {
        const newSet = new Set(shinyPokemon);
        if (isShiny) {
            newSet.add(name);
        } else {
            newSet.delete(name);
        }
        setShinyPokemon(newSet);
    };

    const handleGlobalShinyToggle = () => {
        if (!globalShiny) {
            const allNames = new Set(pokemonList.map((p) => p.name));
            setShinyPokemon(allNames);
        } else {
            setShinyPokemon(new Set());
        }
        setGlobalShiny(!globalShiny);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed inset-4 md:inset-8 lg:inset-16 z-50 flex items-center justify-center pointer-events-none"
                    >
                        <div className="relative w-full h-full max-w-6xl max-h-fit pointer-events-auto mt-[73px]">
                            <motion.button
                                onClick={onClose}
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                                className="absolute -top-3 -right-3 z-[60] w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg shadow-red-500/30 border-2 border-white/20"
                            >
                                <X className="w-6 h-6 text-[#f0f2f4]" />
                            </motion.button>

                            <div className="w-full h-full bg-gradient-to-b from-[#1a1a35] to-[#0f0f23] rounded-3xl border border-white/10 shadow-2xl shadow-black/50 overflow-hidden">

                                <div className="relative px-6 md:px-8 pt-6 md:pt-8 pb-4 border-b border-white/5">
                                    <div className={`absolute top-0 right-0 w-64 h-64 rounded-full bg-gradient-to-br ${gradient} opacity-10 blur-3xl -translate-y-1/2 translate-x-1/2`} />

                                    <div className="relative flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center`}>
                                                <Icon className={`w-6 h-6 ${iconColor}`} />
                                            </div>
                                            <div>
                                                <h2 className={`text-2xl md:text-3xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r ${gradient}`}>
                                                    {title}
                                                </h2>
                                                <p className="text-[#f0f2f4]/40 text-sm">{subtitle} • {pokemonList.length} Pokémon</p>
                                            </div>
                                        </div>

                                        <motion.button
                                            onClick={handleGlobalShinyToggle}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${globalShiny
                                                ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-[#f0f2f4] shadow-lg shadow-yellow-500/30'
                                                : 'bg-white/5 text-[#f0f2f4]/70 border border-white/10 hover:border-yellow-500/50 hover:text-yellow-400'
                                                }`}
                                        >
                                            <motion.span
                                                animate={{ rotate: globalShiny ? 360 : 0 }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                ✨
                                            </motion.span>
                                            Shiny
                                        </motion.button>
                                    </div>
                                </div>

                                <div className="overflow-y-auto h-[calc(100%-100px)] p-6 md:p-8 custom-pokeball-scrollbar">
                                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3 md:gap-4">
                                        {pokemonList.map((pokemon, i) => (
                                            <motion.div
                                                key={pokemon.name}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: Math.min(i * 0.02, 0.5) }}
                                            >
                                                <PokemonCard
                                                    pokemon={pokemon}
                                                    index={i}
                                                    compact
                                                    globalShiny={globalShiny}
                                                    onShinyToggle={handleShinyToggle}
                                                    isShiny={shinyPokemon.has(pokemon.name)}
                                                />
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
