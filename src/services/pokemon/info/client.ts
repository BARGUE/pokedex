import type { PokemonDetail } from "./types";

export async function getPokemonInfo(
  idOrName: string | number
): Promise<PokemonDetail> {
  const response = await fetch(`/api/pokemon/${idOrName}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon: ${response.status}`);
  }

  const data = await response.json();
  return data.pokemon ?? [];
}
