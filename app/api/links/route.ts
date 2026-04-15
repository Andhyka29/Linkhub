import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export const revalidate = 0; // atau dynamic = 'force-dynamic'

export async function GET() {
  try {
    const links = await prisma.link.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(links);
  } catch (error) {
    console.error("Error fetching links:", error);
    return NextResponse.json({ error: "Failed to fetch links" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, url, category } = body;

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    let validUrl = url;
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      validUrl = "https://" + url;
    }

    let finalTitle = title;
    if (!finalTitle) {
      try {
        const urlObj = new URL(validUrl);
        finalTitle = urlObj.hostname.replace("www.", "");
      } catch {
        finalTitle = validUrl;
      }
    }

    const link = await prisma.link.create({
      data: {
        title: finalTitle,
        url: validUrl,
        category: category || null,
      },
    });

    return NextResponse.json(link);
  } catch (error: unknown) {
    console.error("Error creating link:", error);
    if (error && typeof error === "object" && "code" in error && error.code === "P2002") {
      return NextResponse.json({ error: "URL already exists" }, { status: 409 });
    }
    return NextResponse.json({ error: "Failed to create link" }, { status: 500 });
  }
}