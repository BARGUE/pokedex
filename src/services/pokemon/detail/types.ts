import { PokemonAbilities } from "@/src/services/pokemon/abilities/types";
import { PokemonEncounters } from "../encounters/types";
import { PokemonEvolution } from "../evolution/types";
import { PokemonDetail } from "../info/types";
import { PokemonMoves } from "../moves/types";
import { PokemonStats } from "../stats/types";
import { WeaknessResult } from "../type/types";

export type PokemonDetailResponse = {
  pokemon: PokemonDetail;
  pokemonStats: PokemonStats;
  species: PokemonAbilities;
  pokemonMoves: PokemonMoves;
  pokemonEvolution: PokemonEvolution;
  pokemonEncounters: PokemonEncounters;
  pokemonWeaknesses: WeaknessResult;
};
