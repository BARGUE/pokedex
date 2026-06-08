import type { ItemDetailResponse } from "./types";

export async function getItemDetail(): Promise<ItemDetailResponse> {
  const response = await fetch("/api/item-detail", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch item detail: ${response.status}`);
  }

  return response.json();
}
