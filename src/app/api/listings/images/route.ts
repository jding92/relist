import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

// Add OPTIONS method for CORS preflight requests
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const uploadDir = join(process.cwd(), 'public/uploads');
    
    // Create uploads directory if it doesn't exist
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const imageUrls: string[] = [];
    const files = [];

    // Collect all files from formData
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        files.push(value);
      }
    }

    if (files.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No files uploaded' },
        { status: 400 }
      );
    }

    // Process each file
    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Create unique filename
      const uniqueName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '')}`;
      const filePath = join(uploadDir, uniqueName);
      
      // Save file
      await writeFile(filePath, buffer);
      imageUrls.push(`/uploads/${uniqueName}`);
    }

    return NextResponse.json({ 
      success: true, 
      imageUrls 
    });

  } catch (error) {
    console.error('Image upload error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to upload images' 
      },
      { status: 500 }
    );
  }
} 