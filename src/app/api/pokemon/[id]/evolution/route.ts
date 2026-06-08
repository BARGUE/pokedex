import { getPokemonEvolution } from "@/src/services/pokemon/evolution/api";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const evolution = await getPokemonEvolution(id);
    return NextResponse.json({ evolution });
  } catch (error) {
    console.error("[api/pokemon/[id]/evolution]", error);
    return NextResponse.json(
      { error: "Failed to fetch Pokemon evolution" },
      { status: 500 }
    );
  }
}
