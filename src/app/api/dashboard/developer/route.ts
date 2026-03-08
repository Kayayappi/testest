import { NextRequest, NextResponse } from "next/server";
import { getAcquisitionsByUserSlug, getDeveloperProfileByUserSlug } from "@/lib/queries";

export async function GET(req: NextRequest) {
  const userSlug = req.nextUrl.searchParams.get("userSlug");
  if (!userSlug) {
    return NextResponse.json({ error: "userSlug required" }, { status: 400 });
  }

  const [acquisitions, profile] = await Promise.all([
    getAcquisitionsByUserSlug(userSlug),
    getDeveloperProfileByUserSlug(userSlug),
  ]);

  return NextResponse.json({ acquisitions, profile });
}
