import { getPokemonList } from "@/src/services/pokemon/list/api";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const pokemon_list = await getPokemonList();
    return NextResponse.json({ pokemon_list });
  } catch (error) {
    console.error("[api/pokemon]", error);
    return NextResponse.json(
      { error: "Failed to fetch Pokemon list" },
      { status: 500 }
    );
  }
}
