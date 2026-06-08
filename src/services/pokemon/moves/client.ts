import type { PokemonMoves } from "./types";

export async function getPokemonMoves(
  idOrName: string | number
): Promise<PokemonMoves> {
  const response = await fetch(`/api/pokemon/${idOrName}/moves`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon moves: ${response.status}`);
  }

  const data = await response.json();
  return data.moves ?? [];
}
