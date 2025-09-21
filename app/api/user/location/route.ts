// // app/api/user/location/route.ts
// import { auth } from "@clerk/nextjs/server";
// import { db } from "@/lib/db";
// import { users } from "@/lib/db/schema";
// import { eq } from "drizzle-orm";
// import { NextResponse } from "next/server";

// // GET: fetch current user info
// export async function GET() {
//   const { userId } = await auth(); // Clerk returns userId
//   if (!userId) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     const [user] = await db.select().from(users).where(eq(users.id, userId));
//     return NextResponse.json({ user });
//   } catch (err: any) {
//     console.error(err);
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }

// // PATCH: update user's location
// export async function PATCH(req: Request) {
//   const { userId } = await auth();
//   if (!userId) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     const body = await req.json();
//     const { latitude, longitude, locationText } = body;

//     // Update existing user
//     const [existingUser] = await db.select().from(users).where(eq(users.id, userId));

//     let updatedUser;
//     if (existingUser) {
//       [updatedUser] = await db
//         .update(users)
//         .set({ latitude, longitude, locationText })
//         .where(eq(users.id, userId))
//         .returning();
//     } else {
//       // Create user if not exist (unlikely if using Clerk)
//       [updatedUser] = await db
//         .insert(users)
//         .values({ id: userId, latitude, longitude })
//         .returning();
//     }

//     return NextResponse.json({ user: updatedUser });
//   } catch (err: any) {
//     console.error(err);
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }






// app/api/user/location/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

// Types for location data
interface LocationData {
  latitude: number;
  longitude: number;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  accuracy?: number;
}

interface ReverseGeocodeResult {
  formatted_address: string;
  address_components: Array<{
    long_name: string;
    short_name: string;
    types: string[];
  }>;
}

// Reverse geocoding function using OpenStreetMap Nominatim API
async function reverseGeocode(latitude: number, longitude: number): Promise<{
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
      {
        headers: {
          'User-Agent': 'CivicSethu/1.0 (civic-app)',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Geocoding failed');
    }

    const data = await response.json();
    
    return {
      address: data.display_name || 'Unknown address',
      city: data.address?.city || data.address?.town || data.address?.village || 'Unknown city',
      state: data.address?.state || 'Unknown state',
      country: data.address?.country || 'Unknown country',
      postalCode: data.address?.postcode || '',
    };
  } catch (error) {
    console.error('Reverse geocoding error:', error);
    return {
      address: 'Unable to determine address',
      city: 'Unknown city',
      state: 'Unknown state',
      country: 'Unknown country',
      postalCode: '',
    };
  }
}

// POST - Save user location
export async function POST(request: NextRequest) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized - User not authenticated' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { latitude, longitude, accuracy, manual = false, manualAddress } = body;

    // Validate required fields
    if (!latitude || !longitude) {
      return NextResponse.json(
        { error: 'Latitude and longitude are required' },
        { status: 400 }
      );
    }

    // Validate coordinate ranges
    if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
      return NextResponse.json(
        { error: 'Invalid coordinates provided' },
        { status: 400 }
      );
    }

    let locationData: LocationData = {
      latitude,
      longitude,
      accuracy,
    };

    if (manual && manualAddress) {
      // For manual entry, use provided address
      locationData.address = manualAddress;
      locationData.city = 'Manual Entry';
      locationData.state = 'Manual Entry';
      locationData.country = 'Manual Entry';
    } else {
      // Perform reverse geocoding for automatic location
      const geocodeResult = await reverseGeocode(latitude, longitude);
      locationData = {
        ...locationData,
        ...geocodeResult,
      };
    }

    // Here you would typically save to your database
    // For now, we'll just return the processed data
    // Example with Prisma:
    /*
    const userLocation = await prisma.userLocation.upsert({
      where: { userId },
      update: {
        latitude,
        longitude,
        address: locationData.address,
        city: locationData.city,
        state: locationData.state,
        country: locationData.country,
        postalCode: locationData.postalCode,
        accuracy,
        updatedAt: new Date(),
      },
      create: {
        userId,
        latitude,
        longitude,
        address: locationData.address,
        city: locationData.city,
        state: locationData.state,
        country: locationData.country,
        postalCode: locationData.postalCode,
        accuracy,
      },
    });
    */

    return NextResponse.json({
      success: true,
      message: 'Location saved successfully',
      data: {
        userId,
        location: locationData,
        timestamp: new Date().toISOString(),
      },
    });

  } catch (error) {
    console.error('Location API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET - Retrieve user location
export async function GET(request: NextRequest) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized - User not authenticated' },
        { status: 401 }
      );
    }

    // Here you would typically fetch from your database
    // Example with Prisma:
    /*
    const userLocation = await prisma.userLocation.findUnique({
      where: { userId },
    });

    if (!userLocation) {
      return NextResponse.json(
        { error: 'Location not found for user' },
        { status: 404 }
      );
    }
    */

    // Mock response for now
    const mockLocation = {
      userId,
      latitude: 23.3441,
      longitude: 85.3096,
      address: 'Ranchi, Jharkhand, India',
      city: 'Ranchi',
      state: 'Jharkhand',
      country: 'India',
      postalCode: '834001',
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: mockLocation,
    });

  } catch (error) {
    console.error('Get location API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Update user location
export async function PUT(request: NextRequest) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized - User not authenticated' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { latitude, longitude, accuracy } = body;

    if (!latitude || !longitude) {
      return NextResponse.json(
        { error: 'Latitude and longitude are required' },
        { status: 400 }
      );
    }

    // Perform reverse geocoding
    const geocodeResult = await reverseGeocode(latitude, longitude);

    const locationData = {
      latitude,
      longitude,
      accuracy,
      ...geocodeResult,
    };

    // Update in database
    // Similar to POST but update existing record

    return NextResponse.json({
      success: true,
      message: 'Location updated successfully',
      data: {
        userId,
        location: locationData,
        timestamp: new Date().toISOString(),
      },
    });

  } catch (error) {
    console.error('Update location API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}