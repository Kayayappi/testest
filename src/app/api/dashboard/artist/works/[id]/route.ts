import { NextRequest, NextResponse } from "next/server";
import { getWorkForEdit, updateWork } from "@/lib/queries";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const userSlug = req.nextUrl.searchParams.get("userSlug");
  if (!userSlug) {
    return NextResponse.json({ error: "userSlug required" }, { status: 400 });
  }

  const work = await getWorkForEdit(id, userSlug);
  if (!work) {
    return NextResponse.json({ error: "Work not found" }, { status: 404 });
  }

  return NextResponse.json(work);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const body = await req.json();
    const { userSlug, title, description, coverImageUrl, tags, status, license } = body;

    if (!userSlug || !title) {
      return NextResponse.json({ error: "userSlug and title are required" }, { status: 400 });
    }

    if (!license || !license.commercial || !license.adult || !license.trainingType || !license.redistribution || license.priceJpy === undefined) {
      return NextResponse.json({ error: "All license fields are required" }, { status: 400 });
    }

    if (!["draft", "private", "public"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const result = await updateWork({
      workId: id,
      userSlug,
      title,
      description: description || "",
      coverImageUrl: coverImageUrl || "",
      tags: tags || [],
      status,
      license,
    });

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
