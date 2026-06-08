"use client"

import { motion } from "framer-motion";
import { Calendar, Gamepad2, MapPin, Sparkles, Star, Users, Zap } from "lucide-react";
import { getGameById, getPlatformColor, getGenerationColor, pokemonGames } from "@/src/lib/pokemonGames";
import { Button } from "@/src/components/ui/button";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Header } from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import { useRouter } from "next/navigation";
import Image from "next/image";

const GamePage = () => {
    const params = useParams();
    const game = params.name ? getGameById(params.name) : undefined;
    const router = useRouter();
    if (!game) {
        return (
            <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-[#f0f2f4] mb-4">Jeu non trouvé</h1>
                    <Link href="/">
                        <Button variant="outline" className="border-yellow-400 text-yellow-400 hover:bg-yellow-400/10">
                            Retour à l&apos;accueil
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const sameGenerationGames = pokemonGames.filter(
        (g) =>
            g.generation === game.generation &&
            (g.id ?? g.name) !== (game.id ?? game.name)
    );
    return (
        <div className="min-h-screen bg-[#1a1a2e] relative overflow-hidden">
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-20 left-20 w-96 h-96 rounded-full bg-gradient-to-br from-yellow-400/10 to-transparent blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-gradient-to-br from-red-500/10 to-transparent blur-3xl"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 8, repeat: Infinity, delay: 2 }}
                />
            </div>

            <Header isGoBack />

            <div className="relative z-10 container mx-auto px-4 pt-[72px]">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 pt-8">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative space-y-6"
                    >
                        <div className="relative">
                            <div
                                className={`absolute inset-0 bg-gradient-to-br ${getGenerationColor(
                                    game.generation
                                )} rounded-3xl blur-3xl opacity-30`}
                            />
                            <div className="relative bg-[#252542] rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
                                <div className="w-full">
                                    <Image
                                        src={game.mapImage}
                                        alt={game.name}
                                        className="w-full h-full object-contain"
                                        width={200}
                                        height={200}
                                    />
                                </div>
                            </div>
                        </div>

                        {sameGenerationGames.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="bg-[#252542] rounded-3xl border border-white/10 shadow-2xl p-6"
                            >
                                <div className="grid grid-cols-4 gap-3">
                                    {sameGenerationGames.map((g) => (
                                        <Link
                                            key={g.id ?? g.name}
                                            href={`/game/${g.id ?? g.name}`}
                                        >
                                            <div className="group cursor-pointer rounded-2xl border border-white/10 overflow-hidden bg-[#1f1f35] hover:border-yellow-400/40 transition">
                                                <Image
                                                    src={g.coverImage}
                                                    alt={g.name}
                                                    className="w-full min-w-[160px] h-auto min-h-[160px] object-contain group-hover:scale-[1.05] transition-transform"
                                                    width={200}
                                                    height={200}
                                                />

                                                <div className="px-2 py-2">
                                                    <p className="text-xs text-gray-300 truncate">
                                                        {g.name}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="space-y-6"
                    >
                        <div className="space-y-2">
                            <div
                                className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${getGenerationColor(
                                    game.generation
                                )} text-[#f0f2f4] text-sm font-bold`}
                            >
                                Génération {game.generation}
                            </div>
                            <div
                                className={`inline-block ml-2 px-3 py-1 rounded-full bg-gradient-to-r ${getPlatformColor(
                                    game.platform
                                )} text-[#f0f2f4] text-sm font-bold shadow-lg`}
                            >
                                {game.platform}
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-[#f0f2f4] leading-tight">
                                {game.name}
                            </h1>
                            {game.japaneseName && <p className="text-gray-400 text-lg">{game.japaneseName}</p>}
                        </div>

                        <p className="text-gray-300 text-lg leading-relaxed">{game.description}</p>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-[#252542] rounded-2xl p-4 border border-white/10">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 rounded-full bg-yellow-400/20 flex items-center justify-center">
                                        <Calendar className="w-5 h-5 text-yellow-400" />
                                    </div>
                                    <span className="text-gray-400 text-sm">Date de sortie</span>
                                </div>
                                <p className="text-[#f0f2f4] font-bold">{formatDate(game.releaseDate)}</p>
                            </div>

                            <div className="bg-[#252542] rounded-2xl p-4 border border-white/10">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 rounded-full bg-red-400/20 flex items-center justify-center">
                                        <MapPin className="w-5 h-5 text-red-400" />
                                    </div>
                                    <span className="text-gray-400 text-sm">Région</span>
                                </div>
                                <p className="text-[#f0f2f4] font-bold">{game.region}</p>
                            </div>

                            <div className="bg-[#252542] rounded-2xl p-4 border border-white/10">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center">
                                        <Gamepad2 className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <span className="text-gray-400 text-sm">Plateforme</span>
                                </div>
                                <p className="text-[#f0f2f4] font-bold">{game.platform}</p>
                            </div>

                            <div className="bg-[#252542] rounded-2xl p-4 border border-white/10">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 rounded-full bg-purple-400/20 flex items-center justify-center">
                                        <Users className="w-5 h-5 text-purple-400" />
                                    </div>
                                    <span className="text-gray-400 text-sm">Pokémon total</span>
                                </div>
                                <p className="text-[#f0f2f4] font-bold">{game.totalPokemon || "N/A"}</p>
                            </div>
                        </div>

                        <div className="bg-[#252542] rounded-2xl p-6 border border-white/10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-[#f0f2f4]" />
                                </div>
                                <h2 className="text-xl font-bold text-[#f0f2f4]">Caractéristiques</h2>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {game.features.map((feature, index) => (
                                    <motion.span
                                        key={feature}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.3 + index * 0.05 }}
                                        className="px-3 py-1.5 rounded-full bg-white/10 text-[#f0f2f4] text-sm hover:bg-yellow-400/20 hover:text-yellow-400 transition-colors cursor-default"
                                    >
                                        {feature}
                                    </motion.span>
                                ))}
                            </div>
                        </div>

                        {game.starters && game.starters.length > 0 && (
                            <div className="bg-[#252542] rounded-2xl p-6 border border-white/10">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                                        <Star className="w-5 h-5 text-[#f0f2f4]" />
                                    </div>
                                    <h2 className="text-xl font-bold text-[#f0f2f4]">Starters</h2>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {game.starters.map((starter, index) => (
                                        <motion.span
                                            key={starter}
                                            onClick={() => {
                                                router.push(`/pokemon/${starter.toLowerCase()}`);
                                            }}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.4 + index * 0.1 }}
                                            className="px-4 py-2 cursor-pointer rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 font-medium text-sm border border-green-500/30"
                                        >
                                            {starter}
                                        </motion.span>
                                    )
                                    )}
                                </div>
                            </div>
                        )}

                        {game.legendaries && game.legendaries.length > 0 && (
                            <div className="bg-[#252542] rounded-2xl p-6 border border-white/10">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                                        <Zap className="w-5 h-5 text-[#f0f2f4]" />
                                    </div>
                                    <h2 className="text-xl font-bold text-[#f0f2f4]">Légendaires</h2>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {game.legendaries.map((legendary, index) => (
                                        <motion.span
                                            key={legendary}
                                            onClick={() => {
                                                router.push(`/pokemon/${legendary.toLowerCase()}`);
                                            }}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.5 + index * 0.05 }}
                                            className="px-4 py-2 rounded-full cursor-pointer bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 font-medium text-sm border border-purple-500/30"
                                        >
                                            {legendary}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default GamePage;
