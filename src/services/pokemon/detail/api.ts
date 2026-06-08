import { calculateWeaknesses } from "@/src/lib/utils";
import { getPokemonInfo } from "@/src/services/pokemon/info/api";
import { getPokemonStats } from "@/src/services/pokemon/stats/api";
import { getPokemonMoves } from "@/src/services/pokemon/moves/api";
import { getPokemonEvolution } from "@/src/services/pokemon/evolution/api";
import { getPokemonEncounters } from "@/src/services/pokemon/encounters/api";
import { getPokemonAbilities } from "@/src/services/pokemon/abilities/api";
import { PokemonTypeItem } from "@/src/services/pokemon/info/types";
import { PokemonDetailResponse } from "./types";

export async function getPokemonDetail(
  idOrName: string | number
): Promise<PokemonDetailResponse> {
  const [pokemon, pokemonStats, pokemonAbilities, pokemonMoves, pokemonEvolution, pokemonEncounters] =
    await Promise.all([
      getPokemonInfo(idOrName),
      getPokemonStats(idOrName),
      getPokemonAbilities(idOrName),
      getPokemonMoves(idOrName),
      getPokemonEvolution(idOrName),
      getPokemonEncounters(idOrName),
    ]);
  const types = pokemon.species.types.map((t: PokemonTypeItem) => t.key);
  const pokemonWeaknesses = await calculateWeaknesses(types);
  return {
    pokemon,
    pokemonStats,
    species: pokemonAbilities,
    pokemonMoves,
    pokemonEvolution,
    pokemonEncounters,
    pokemonWeaknesses,
  };
}
