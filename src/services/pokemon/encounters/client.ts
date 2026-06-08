import { PokemonEncounters } from "./types";

export async function getPokemonEncounters(
  idOrName: string | number
): Promise<PokemonEncounters> {
  const response = await fetch(`/api/pokemon/${idOrName}/encounters`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon encounters: ${response.status}`);
  }

  const data = await response.json();
  return data.encounters ?? [];
}
