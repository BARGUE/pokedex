import { getPokemonMoves } from "@/src/services/pokemon/moves/api";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const moves = await getPokemonMoves(id);
    return NextResponse.json({ moves });
  } catch (error) {
    console.error("[api/pokemon/[id]/moves]", error);
    return NextResponse.json(
      { error: "Failed to fetch Pokemon moves" },
      { status: 500 }
    );
  }
}
