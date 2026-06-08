import { getItemDetail } from "@/src/services/item-detail/api";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await getItemDetail();
    return NextResponse.json(data);
  } catch (error) {
    console.error("[api/item-detail]", error);
    return NextResponse.json(
      { error: "Failed to fetch item detail" },
      { status: 500 }
    );
  }
}
