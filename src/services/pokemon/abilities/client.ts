import type { PokemonAbilities } from "./types";

export async function getPokemonAbilities(
  idOrName: string | number
): Promise<PokemonAbilities> {
  const response = await fetch(`/api/pokemon/${idOrName}/abilities`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon abilities: ${response.status}`);
  }

  const data = await response.json();
  return data.abilities ?? { abilities: [] };
}
