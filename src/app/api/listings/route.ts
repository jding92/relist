import { NextRequest, NextResponse } from 'next/server';

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.title || !data.description || !data.price || !data.platforms?.length || !data.images?.length) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields' 
        }, 
        { status: 400 }
      );
    }

    // Here you would typically:
    // 1. Save the listing to your database
    // 2. Create listings on selected platforms
    // 3. Store platform-specific listing IDs

    // For now, we'll just mock a successful response
    return NextResponse.json({
      success: true,
      listing: {
        id: Date.now().toString(),
        ...data,
        createdAt: new Date().toISOString(),
      }
    });

  } catch (error) {
    console.error('Create listing error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create listing' 
      },
      { status: 500 }
    );
  }
} 