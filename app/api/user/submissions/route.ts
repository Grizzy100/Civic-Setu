import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { reports, likes, users } from "@/lib/db/schema";
import { eq, desc, asc, sql } from "drizzle-orm";
import { z } from "zod";

const QuerySchema = z.object({
  sortBy: z.enum(["recent", "oldest", "most_liked", "least_liked"]).default("recent"),
  limit: z.coerce.number().min(1).max(50).default(10),
  offset: z.coerce.number().min(0).default(0),
});

export async function GET(req: Request) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const parseResult = QuerySchema.safeParse(Object.fromEntries(searchParams.entries()));

    if (!parseResult.success) {
      return NextResponse.json(
        { errors: parseResult.error.flatten().fieldErrors, message: "Invalid query params" },
        { status: 400 }
      );
    }

    const { sortBy, limit, offset } = parseResult.data;

    // Find internal UUID user
    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, clerkId));

    if (!existingUser) {
      return NextResponse.json({ reports: [], totalCount: 0 });
    }

    // Like count subquery
    const likeCount = sql<number>`(
      SELECT COUNT(*) FROM ${likes} WHERE ${likes.reportId} = ${reports.id}
    )`.as("likeCount");

    // Sorting
    let orderBy;
    switch (sortBy) {
      case "oldest":
        orderBy = asc(reports.createdAt);
        break;
      case "most_liked":
        orderBy = desc(likeCount);
        break;
      case "least_liked":
        orderBy = asc(likeCount);
        break;
      default:
        orderBy = desc(reports.createdAt); // recent
    }

    // Query reports
    const rows = await db
      .select({
        id: reports.id,
        description: reports.description,
        category: reports.category,
        imageUrl: reports.imageUrl,
        status: reports.status,
        createdAt: reports.createdAt,
        locationText: reports.locationText,
        likeCount,
      })
      .from(reports)
      .where(eq(reports.userId, existingUser.id))
      .orderBy(orderBy)
      .limit(limit)
      .offset(offset);

    return NextResponse.json({ reports: rows }, { status: 200 });
  } catch (err: any) {
    console.error("Error in My Reports route:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
