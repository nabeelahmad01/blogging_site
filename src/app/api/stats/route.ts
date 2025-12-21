import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET dashboard stats
export async function GET() {
    try {
        const [totalPosts, publishedPosts, categories] = await Promise.all([
            prisma.post.count(),
            prisma.post.count({ where: { published: true } }),
            prisma.category.count(),
        ]);

        const viewsResult = await prisma.post.aggregate({
            _sum: { views: true },
        });

        return NextResponse.json({
            totalPosts,
            publishedPosts,
            totalViews: viewsResult._sum.views || 0,
            totalCategories: categories,
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        return NextResponse.json({
            totalPosts: 0,
            publishedPosts: 0,
            totalViews: 0,
            totalCategories: 0,
        });
    }
}
