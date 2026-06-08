import type { TypeDamageResponse } from "./types";

export async function getType(name: string): Promise<TypeDamageResponse[]> {
  const response = await fetch(`/api/type/${name}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch type: ${response.status}`);
  }

  const data = await response.json();
  return data.types ?? [];
}
