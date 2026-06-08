import { getPokemonStats } from "@/src/services/pokemon/stats/api";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const stats = await getPokemonStats(id);
    return NextResponse.json({ stats });
  } catch (error) {
    console.error("[api/pokemon/[id]/stats]", error);
    return NextResponse.json(
      { error: "Failed to fetch Pokemon stats" },
      { status: 500 }
    );
  }
}
