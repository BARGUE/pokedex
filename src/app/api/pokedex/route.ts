import { getPokedex } from "@/src/services/pokedex/api";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await getPokedex();
    return NextResponse.json(data);
  } catch (error) {
    console.error("[api/pokedex]", error);
    return NextResponse.json(
      { error: "Failed to fetch pokedex" },
      { status: 500 }
    );
  }
}
