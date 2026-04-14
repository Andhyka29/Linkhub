import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idStr } = await params;
    const id = parseInt(idStr);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const body = await request.json();
    const { title, url, category } = body;

    const updateData: { title?: string; url?: string; category?: string | null } = {};
    
    if (title !== undefined) updateData.title = title;
    if (url !== undefined) {
      let validUrl = url;
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        validUrl = "https://" + url;
      }
      updateData.url = validUrl;
    }
    if (category !== undefined) updateData.category = category || null;

    const link = await prisma.link.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(link);
  } catch (error: unknown) {
    console.error("Error updating link:", error);
    if (error && typeof error === "object" && "name" in error && error.name === "NotFoundError") {
      return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }
    if (error && typeof error === "object" && "code" in error && error.code === "P2002") {
      return NextResponse.json({ error: "URL already exists" }, { status: 409 });
    }
    return NextResponse.json({ error: "Failed to update link" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idStr } = await params;
    const id = parseInt(idStr);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await prisma.link.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Error deleting link:", error);
    if (error && typeof error === "object" && "name" in error && error.name === "NotFoundError") {
      return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }
    return NextResponse.json({ error: "Failed to delete link" }, { status: 500 });
  }
}