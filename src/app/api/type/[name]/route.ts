import { getType } from "@/src/services/pokemon/type/api";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params;
    const types = await getType(name);
    return NextResponse.json({ types });
  } catch (error) {
    console.error("[api/type/[name]]", error);
    return NextResponse.json(
      { error: "Failed to fetch type" },
      { status: 500 }
    );
  }
}
