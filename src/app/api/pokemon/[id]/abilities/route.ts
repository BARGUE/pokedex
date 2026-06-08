import { getPokemonAbilities } from "@/src/services/pokemon/abilities/api";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const abilities = await getPokemonAbilities(id);
    return NextResponse.json({ abilities });
  } catch (error) {
    console.error("[api/pokemon/[id]/abilities]", error);
    return NextResponse.json(
      { error: "Failed to fetch Pokemon abilities" },
      { status: 500 }
    );
  }
}
