import { NextRequest, NextResponse } from "next/server";
import { getDashboardWorksByUserSlug, createWork } from "@/lib/queries";

export async function GET(req: NextRequest) {
  const userSlug = req.nextUrl.searchParams.get("userSlug");
  if (!userSlug) {
    return NextResponse.json({ error: "userSlug required" }, { status: 400 });
  }
  const works = await getDashboardWorksByUserSlug(userSlug);
  return NextResponse.json({ works });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userSlug, title, description, coverImageUrl, tags, license } = body;

    if (!userSlug || !title) {
      return NextResponse.json({ error: "userSlug and title are required" }, { status: 400 });
    }

    if (!license || !license.commercial || !license.adult || !license.trainingType || !license.redistribution || license.priceJpy === undefined) {
      return NextResponse.json({ error: "All license fields are required" }, { status: 400 });
    }

    const result = await createWork({
      userSlug,
      title,
      description: description || "",
      coverImageUrl: coverImageUrl || "",
      tags: tags || [],
      license,
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
