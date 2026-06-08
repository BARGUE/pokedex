import { PokemonTypeItem } from "../pokedex/types";

export async function getTypesList(): Promise<PokemonTypeItem[]> {
  const response = await fetch("/api/types-list", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch types: ${response.status}`);
  }

  const data = await response.json();
  return data.types ?? [];
}
