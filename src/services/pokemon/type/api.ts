import type { TypeDamageResponse } from "./types";

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

export async function getType(name: string): Promise<TypeDamageResponse[]> {
  const data = await apiGet<{ type: TypeDamageResponse[] }>(`/type/${name}`);
  return data.type ?? [];
}
