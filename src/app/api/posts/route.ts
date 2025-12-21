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
        const { title, excerpt, content, categoryId, tags, featuredImg, published } = body;

        if (!title || !excerpt || !content || !categoryId) {
            return NextResponse.json(
                { error: 'Title, excerpt, content, and category are required' },
                { status: 400 }
            );
        }

        // Generate slug from title
        const slug = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '') + '-' + Date.now().toString(36);

        const post = await prisma.post.create({
            data: {
                title,
                slug,
                excerpt,
                content,
                categoryId,
                tags: tags || null,
                featuredImg: featuredImg || null,
                published: published || false,
            },
            include: { category: true },
        });

        return NextResponse.json(post, { status: 201 });
    } catch (error) {
        console.error('Error creating post:', error);
        return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
    }
}
