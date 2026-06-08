import { getPokemonList } from "../pokemon/list/api";
import { getTypesList } from "../types-list/api";
import type { PokedexResponse } from "./types";

export async function getPokedex(): Promise<PokedexResponse> {
  const [pokemon, types] = await Promise.all([
    getPokemonList(),
    getTypesList(),
  ]);
  return { pokemon, types };
}
