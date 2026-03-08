import { NextRequest, NextResponse } from "next/server";
import { getDashboardWorksByUserSlug, getArtistProfileByUserSlug } from "@/lib/queries";

export async function GET(req: NextRequest) {
  const userSlug = req.nextUrl.searchParams.get("userSlug");
  if (!userSlug) {
    return NextResponse.json({ error: "userSlug required" }, { status: 400 });
  }

  const [works, profile] = await Promise.all([
    getDashboardWorksByUserSlug(userSlug),
    getArtistProfileByUserSlug(userSlug),
  ]);

  return NextResponse.json({ works, profile });
}
