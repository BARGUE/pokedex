import { motion } from "framer-motion";
import { Calendar, Gamepad2 } from "lucide-react";
import { PokemonGame, getPlatformColor } from "@/src/lib/pokemonGames";
import Link from "next/link";
import Image from "next/image";

interface GameCardProps {
  game: PokemonGame;
  index: number;
}

const GameCard = ({ game, index }: GameCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Link href={`/game/${game.id}`} className="block">
        <motion.div
          className="
            group relative
            w-44 sm:w-48 md:w-52
            rounded-2xl overflow-hidden
            bg-[#252542]
            border border-white/10
            hover:border-yellow-400/50
            transition-all duration-300
          "
          whileHover={{ scale: 1.03, y: -5 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/0 to-red-500/0 group-hover:from-yellow-400/10 group-hover:to-red-500/10 transition-all duration-500" />

          <div className="absolute top-3 left-3 z-10">
            <div
              className={`px-2 py-1 rounded-full bg-gradient-to-r ${getPlatformColor(
                game.platform
              )} text-[#f0f2f4] text-xs font-bold shadow-lg`}
            >
              Gen {game.generation}
            </div>
          </div>

          <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-[#1a1a2e] to-[#252542]">
            <Image
              src={game.coverImage}
              alt={game.name}
              width={200}
              height={200}
              className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#252542] via-transparent to-transparent opacity-60" />
          </div>

          <div className="relative p-4 space-y-3 min-h-[140px]">
            <h3 className="text-[#f0f2f4] font-bold text-sm leading-tight line-clamp-2 group-hover:text-yellow-400 transition-colors">
              {game.name}
            </h3>

            <div className="flex flex-col gap-2 text-xs text-gray-400">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-yellow-400" />
                <span>{formatDate(game.releaseDate)}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <Gamepad2 className="w-3.5 h-3.5 text-red-400" />
                <span>{game.platform}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-white/10 text-[#f0f2f4]/80 text-xs">
                {game.region}
              </span>

              {game.newPokemonCount && game.newPokemonCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-yellow-400/20 text-yellow-400 text-xs">
                  +{game.newPokemonCount} Pokémon
                </span>
              )}
            </div>
          </div>

          <div
            className={`h-1 bg-gradient-to-r ${getPlatformColor(
              game.platform
            )} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
          />
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default GameCard;
