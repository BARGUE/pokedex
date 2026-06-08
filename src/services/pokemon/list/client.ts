import type { PokemonListItem } from "./types";

export async function getPokemonList(): Promise<PokemonListItem[]> {
  const response = await fetch("/api/pokemon", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon list: ${response.status}`);
  }

  const data = await response.json();
  return data.pokemon_list ?? [];
}
