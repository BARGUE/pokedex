import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { selected } = (await req.json()) as { selected: (string | null)[] };

    const res = NextResponse.json({ ok: true });
    res.cookies.set("compare_selected", JSON.stringify(selected.slice(0, 3)), {
        path: "/",
        httpOnly: true, // important
        sameSite: "lax",
    });
    return res;
}
