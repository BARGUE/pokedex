import { getPokemonEncounters } from "@/src/services/pokemon/encounters/api";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const encounters = await getPokemonEncounters(id);
    return NextResponse.json({ encounters });
  } catch (error) {
    console.error("[api/pokemon/[id]/encounters]", error);
    return NextResponse.json(
      { error: "Failed to fetch Pokemon encounters" },
      { status: 500 }
    );
  }
}
