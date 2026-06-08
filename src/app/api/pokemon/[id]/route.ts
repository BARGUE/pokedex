import { getPokemonInfo } from "@/src/services/pokemon/info/api";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const pokemon = await getPokemonInfo(id);
    return NextResponse.json({ pokemon });
  } catch (error) {
    console.error("[api/pokemon/[id]]", error);
    return NextResponse.json(
      { error: "Failed to fetch Pokemon" },
      { status: 500 }
    );
  }
}
