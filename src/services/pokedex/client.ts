import type { PokedexResponse } from "./types";

export async function getPokedex(): Promise<PokedexResponse> {
  const response = await fetch("/api/pokedex", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch pokedex: ${response.status}`);
  }

  return response.json();
}
