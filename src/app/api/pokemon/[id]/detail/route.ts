import { NextResponse } from "next/server";
import { getPokemonDetail } from "@/src/services/pokemon/detail/api";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");
  if (!name) return NextResponse.json({ error: "Missing name" }, { status: 400 });

  try {
    const detail = await getPokemonDetail(name);
    return NextResponse.json(detail);
  } catch {
    return NextResponse.json(null, { status: 200 });
  }
}
