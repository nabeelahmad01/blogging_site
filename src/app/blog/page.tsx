import Link from 'next/link';
import { Search, Filter } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import BlogCard from '@/components/BlogCard';
import AdPlaceholder from '@/components/AdPlaceholder';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'All Articles - InsightHub',
    description: 'Browse all our articles on technology, lifestyle, business, and more.',
};

async function getPosts(category?: string, search?: string) {
    try {
        const posts = await prisma.post.findMany({
            where: {
                published: true,
                ...(category && { category: { slug: category } }),
                ...(search && {
                    OR: [
                        { title: { contains: search } },
                        { content: { contains: search } },
                    ],
                }),
            },
            include: { category: true },
            orderBy: { createdAt: 'desc' },
        });
        return posts;
    } catch {
        return [];
    }
}

async function getCategories() {
    try {
        const categories = await prisma.category.findMany({
            include: { _count: { select: { posts: true } } },
        });
        return categories;
    } catch {
        return [];
    }
}

export default async function BlogPage({
    searchParams,
}: {
    searchParams: Promise<{ category?: string; search?: string }>;
}) {
    const params = await searchParams;
    const posts = await getPosts(params.category, params.search);
    const categories = await getCategories();

    return (
        <>
            {/* Hero */}
            <section style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '4rem 0',
                textAlign: 'center',
            }}>
                <div className="container">
                    <h1 style={{ color: 'white', marginBottom: '0.5rem' }}>
                        {params.category
                            ? `${params.category.charAt(0).toUpperCase() + params.category.slice(1)} Articles`
                            : 'All Articles'
                        }
                    </h1>
                    <p style={{ color: 'rgba(255,255,255,0.9)' }}>
                        {params.search ? `Search results for "${params.search}"` : 'Explore our collection of articles'}
                    </p>
                </div>
            </section>

            <div className="container" style={{ padding: '2rem 1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '3rem' }}>
                    {/* Main Content */}
                    <div>
                        {/* Search Bar */}
                        <form action="/blog" method="get" style={{ marginBottom: '2rem' }}>
                            <div className="search-container">
                                <Search size={20} />
                                <input
                                    type="text"
                                    name="search"
                                    placeholder="Search articles..."
                                    defaultValue={params.search}
                                    className="input"
                                />
                            </div>
                        </form>

                        {/* Posts */}
                        {posts.length > 0 ? (
                            <>
                                <div className="blog-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
                                    {posts.map((post) => (
                                        <BlogCard key={post.id} post={post} />
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div style={{
                                textAlign: 'center',
                                padding: '4rem 2rem',
                                background: 'var(--secondary)',
                                borderRadius: '1rem',
                            }}>
                                <Filter size={48} color="var(--muted)" style={{ marginBottom: '1rem' }} />
                                <h3 style={{ marginBottom: '0.5rem' }}>No Articles Found</h3>
                                <p style={{ color: 'var(--muted)', marginBottom: '1.5rem' }}>
                                    {params.search
                                        ? `No articles match "${params.search}"`
                                        : 'No articles published yet in this category.'
                                    }
                                </p>
                                <Link href="/blog" className="btn btn-primary">
                                    View All Articles
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <aside style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {/* Ad */}
                        <AdPlaceholder size="square" />

                        {/* Categories */}
                        <div className="card" style={{ padding: '1.5rem' }}>
                            <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem' }}>Categories</h3>
                            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <Link
                                    href="/blog"
                                    className="nav-link"
                                    style={{
                                        padding: '0.75rem 1rem',
                                        borderRadius: '0.5rem',
                                        background: !params.category ? 'var(--secondary)' : 'transparent',
                                        display: 'block',
                                    }}
                                >
                                    All Categories
                                </Link>
                                {categories.map((cat) => (
                                    <Link
                                        key={cat.id}
                                        href={`/blog?category=${cat.slug}`}
                                        className="nav-link"
                                        style={{
                                            padding: '0.75rem 1rem',
                                            borderRadius: '0.5rem',
                                            background: params.category === cat.slug ? 'var(--secondary)' : 'transparent',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <span>{cat.name}</span>
                                        <span style={{
                                            background: 'var(--primary)',
                                            color: 'white',
                                            padding: '0.125rem 0.5rem',
                                            borderRadius: '9999px',
                                            fontSize: '0.75rem',
                                        }}>
                                            {cat._count.posts}
                                        </span>
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        {/* Ad */}
                        <AdPlaceholder size="square" />
                    </aside>
                </div>
            </div>

            <style>{`
        @media (max-width: 900px) {
          .container > div {
            grid-template-columns: 1fr !important;
          }
          aside {
            order: -1;
          }
        }
      `}</style>
        </>
    );
}

