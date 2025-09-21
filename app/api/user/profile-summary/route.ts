import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { reports as reportsTable, users } from '@/lib/db/schema';
import { desc, eq, count } from 'drizzle-orm';

/**
 * GET /api/user/profile-summary
 * Fetches the authenticated user's profile info, their report statistics,
 * and a list of their most recent reports.
 */
export async function GET() {
  try {
    // FIX 1: The auth() function is asynchronous and must be awaited.
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // 1. Fetch user's core profile information
    const [user] = await db
      .select({
        // FIX 2: We must select the user's internal ID to use it in the next query.
        id: users.id,
        name: users.name,
        email: users.email,
        imageUrl: users.imageUrl,
        createdAt: users.createdAt,
      })
      .from(users)
      .where(eq(users.clerkId, clerkId));

    if (!user) {
      return new NextResponse('User not found in database', { status: 404 });
    }

    // 2. Fetch statistics in parallel for efficiency
    const [totalReportsResult, resolvedReportsResult] = await Promise.all([
      // Count total reports submitted by the user
      db
        .select({ value: count() })
        .from(reportsTable)
        .innerJoin(users, eq(reportsTable.userId, users.id))
        .where(eq(users.clerkId, clerkId)),
      // Count reports resolved by admin
      db
        .select({ value: count() })
        .from(reportsTable)
        .innerJoin(users, eq(reportsTable.userId, users.id))
        .where(eq(users.clerkId, clerkId) && eq(reportsTable.status, 'resolved')),
    ]);
    
    const totalReports = totalReportsResult[0].value;
    const resolvedReports = resolvedReportsResult[0].value;

    // 3. Fetch the user's 5 most recent reports using the 'user.id' we selected
    const recentReports = await db.query.reports.findMany({
        where: (reports, { eq }) => eq(reports.userId, user.id),
        orderBy: [desc(reportsTable.createdAt)],
        limit: 5,
        columns: {
            id: true,
            category: true,
            status: true,
            createdAt: true,
        }
    });

    // 4. Combine all data into a single response payload
    return NextResponse.json({
      userProfile: user,
      stats: {
        totalReports,
        resolvedReports,
      },
      recentActivity: recentReports,
    });

  } catch (error) {
    console.error('[API_PROFILE_SUMMARY_GET]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

