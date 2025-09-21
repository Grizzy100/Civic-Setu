import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, reports } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

// Validation schema
const reportSchema = z.object({
  description: z.string().min(5),
  category: z.enum([
    "pothole",
    "graffiti",
    "streetlight",
    "waste",
    "broken_sidewalk",
    "drainage",
  ]),
  imageUrl: z.string().url().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  locationText: z.string().optional(),
});

// POST: create report
export async function POST(req: Request) {
  const { userId: clerkId } = await auth();
  if (!clerkId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = reportSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ errors: parsed.error.flatten() }, { status: 400 });
    }

    // Look up the internal user UUID
    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, clerkId));

    if (!existingUser) {
      return NextResponse.json({ error: "User not found in DB" }, { status: 404 });
    }

    // Insert new report
    const [newReport] = await db
      .insert(reports)
      .values({
        description: parsed.data.description,
        category: parsed.data.category,
        imageUrl: parsed.data.imageUrl,
        latitude: parsed.data.latitude,
        longitude: parsed.data.longitude,
        locationText: parsed.data.locationText,
        userId: existingUser.id, // UUID from our DB
        status: "pending",
      })
      .returning();

    return NextResponse.json({ report: newReport }, { status: 201 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// GET: fetch reports by current user
export async function GET() {
  const { userId: clerkId } = await auth();
  if (!clerkId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, clerkId));

    if (!existingUser) {
      return NextResponse.json({ reports: [] });
    }

    const userReports = await db
      .select()
      .from(reports)
      .where(eq(reports.userId, existingUser.id));

    return NextResponse.json({ reports: userReports });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
