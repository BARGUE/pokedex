import { PokemonEvolution } from "./types";

export async function getPokemonEvolution(
  idOrName: string | number
): Promise<PokemonEvolution> {
  const response = await fetch(`/api/pokemon/${idOrName}/evolution`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon evolution: ${response.status}`);
  }

  const data = await response.json();
  return data.evolution ?? { evolution: [] };
}
