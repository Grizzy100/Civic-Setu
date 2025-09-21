// app/api/user/location/route.ts
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// GET: fetch current user info
export async function GET() {
  const { userId } = await auth(); // Clerk returns userId
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [user] = await db.select().from(users).where(eq(users.id, userId));
    return NextResponse.json({ user });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PATCH: update user's location
export async function PATCH(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { latitude, longitude, locationText } = body;

    // Update existing user
    const [existingUser] = await db.select().from(users).where(eq(users.id, userId));

    let updatedUser;
    if (existingUser) {
      [updatedUser] = await db
        .update(users)
        .set({ latitude, longitude, locationText })
        .where(eq(users.id, userId))
        .returning();
    } else {
      // Create user if not exist (unlikely if using Clerk)
      [updatedUser] = await db
        .insert(users)
        .values({ id: userId, latitude, longitude })
        .returning();
    }

    return NextResponse.json({ user: updatedUser });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
