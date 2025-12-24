import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET all posts
export async function GET() {
    try {
        const posts = await prisma.post.findMany({
            include: { category: true },
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
    }
}

// CREATE new post
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { title, slug, excerpt, content, categoryId, tags, featuredImg, published, faqs } = body;

        if (!title || !slug || !excerpt || !content || !categoryId) {
            return NextResponse.json(
                { error: 'Title, slug, excerpt, content, and category are required' },
                { status: 400 }
            );
        }

        // Validate slug format
        const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/--+/g, '-').replace(/^-|-$/g, '');
        
        if (!cleanSlug) {
            return NextResponse.json(
                { error: 'Please provide a valid slug' },
                { status: 400 }
            );
        }

        // Check if slug already exists
        const existingPost = await prisma.post.findUnique({
            where: { slug: cleanSlug }
        });

        if (existingPost) {
            return NextResponse.json(
                { error: 'A post with this slug already exists. Please choose a different slug.' },
                { status: 400 }
            );
        }

        const post = await prisma.post.create({
            data: {
                title,
                slug: cleanSlug,
                excerpt,
                content,
                categoryId,
                tags: tags || null,
                featuredImg: featuredImg || null,
                published: published || false,
                faqs: faqs || null,
            },
            include: { category: true },
        });

        return NextResponse.json(post, { status: 201 });
    } catch (error) {
        console.error('Error creating post:', error);
        return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
    }
}

