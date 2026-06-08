import type { PokemonStats } from "./types";

export async function getPokemonStats(
  idOrName: string | number
): Promise<PokemonStats> {
  const response = await fetch(`/api/pokemon/${idOrName}/stats`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon stats: ${response.status}`);
  }

  const data = await response.json();
  return data.stats ?? [];
}
