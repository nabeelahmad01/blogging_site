import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

// Configure Cloudinary (if credentials are available)
const useCloudinary = !!(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
);

if (useCloudinary) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 5MB.' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Try Cloudinary first if configured
    if (useCloudinary) {
      try {
        const base64 = `data:${file.type};base64,${buffer.toString('base64')}`;
        const result = await cloudinary.uploader.upload(base64, {
          folder: 'blog-images',
          resource_type: 'image',
        });
        return NextResponse.json({ 
          url: result.secure_url, 
          filename: result.public_id 
        });
      } catch (cloudinaryError) {
        console.error('Cloudinary upload failed, falling back to local:', cloudinaryError);
        // Fall through to local storage
      }
    }

    // Fallback: Save to local public/uploads folder
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const extension = file.name.split('.').pop();
    const filename = `${timestamp}-${Math.random().toString(36).substring(7)}.${extension}`;
    const filepath = path.join(uploadDir, filename);

    await writeFile(filepath, buffer);

    // Return the public URL
    const url = `/uploads/${filename}`;
    return NextResponse.json({ url, filename });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}
