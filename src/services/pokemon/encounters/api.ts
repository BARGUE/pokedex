import { PokemonEncounters } from "./types";

const API_URL =
  process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "";

async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    next: { revalidate: 60 },
  });
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${path}`);
  }
  return response.json();
}

export async function getPokemonEncounters(
  idOrName: string | number
): Promise<PokemonEncounters> {
  const data = await apiGet<{ encounters: PokemonEncounters }>(
    `/pokemon/${idOrName}/encounters`
  );
  return data.encounters ?? [];
}
