import type { BerryDetail, ItemDetail } from "./types";

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

export async function getItems(): Promise<ItemDetail[]> {
  const data = await apiGet<{ items: ItemDetail[] }>("/items");
  return data.items ?? [];
}

export async function getBerries(): Promise<BerryDetail[]> {
  const data = await apiGet<{ berries: BerryDetail[] }>("/berries");
  return data.berries ?? [];
}

export async function getItemDetail(): Promise<{
  items: ItemDetail[];
  berries: BerryDetail[];
}> {
  const [items, berries] = await Promise.all([
    getItems(),
    getBerries(),
  ]);
  return { items, berries };
}
