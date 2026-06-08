import type { PokemonDetailResponse } from "./types";

export async function getPokemonDetail(
  idOrName: string | number
): Promise<PokemonDetailResponse> {
  const response = await fetch(`/api/pokemon/${idOrName}/detail`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon detail: ${response.status}`);
  }

  return response.json();
}
