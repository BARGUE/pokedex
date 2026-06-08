import { getTypesList } from "@/src/services/types-list/api";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const types = await getTypesList();
    return NextResponse.json({ types });
  } catch (error) {
    console.error("[api/types-list]", error);
    return NextResponse.json(
      { error: "Failed to fetch types" },
      { status: 500 }
    );
  }
}
