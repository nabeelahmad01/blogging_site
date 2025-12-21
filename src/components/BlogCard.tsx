import Link from 'next/link';
import { Calendar, Eye, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

interface BlogCardProps {
    post: {
        id: string;
        title: string;
        slug: string;
        excerpt: string;
        featuredImg?: string | null;
        views: number;
        createdAt: Date;
        category: {
            name: string;
            slug: string;
        };
    };
    featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
    return (
        <article className="card" style={{
            display: 'flex',
            flexDirection: 'column',
        }}>
            {/* Image */}
            <Link href={`/blog/${post.slug}`} style={{ display: 'block', overflow: 'hidden' }}>
                <div style={{
                    height: featured ? '280px' : '200px',
                    background: post.featuredImg
                        ? `url(${post.featuredImg}) center/cover`
                        : 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))',
                    transition: 'transform 0.3s ease',
                }} className="blog-card-image" />
            </Link>

            {/* Content */}
            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Category */}
                <Link
                    href={`/blog?category=${post.category.slug}`}
                    className="badge"
                    style={{ alignSelf: 'flex-start', marginBottom: '0.75rem', textDecoration: 'none' }}
                >
                    {post.category.name}
                </Link>

                {/* Title */}
                <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h3 style={{
                        fontSize: featured ? '1.5rem' : '1.25rem',
                        marginBottom: '0.75rem',
                        lineHeight: 1.4,
                        transition: 'color 0.2s ease',
                    }} className="blog-card-title">
                        {post.title}
                    </h3>
                </Link>

                {/* Excerpt */}
                <p style={{
                    color: 'var(--muted)',
                    fontSize: '0.9rem',
                    lineHeight: 1.7,
                    flex: 1,
                    marginBottom: '1rem',
                }}>
                    {post.excerpt.length > 120 ? post.excerpt.substring(0, 120) + '...' : post.excerpt}
                </p>

                {/* Meta */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '1rem',
                    borderTop: '1px solid var(--border)',
                    fontSize: '0.8rem',
                    color: 'var(--muted)',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <Calendar size={14} />
                            {format(new Date(post.createdAt), 'MMM dd, yyyy')}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <Eye size={14} />
                            {post.views} views
                        </span>
                    </div>
                    <Link
                        href={`/blog/${post.slug}`}
                        style={{
                            color: 'var(--primary)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            fontWeight: 500,
                            textDecoration: 'none',
                        }}
                    >
                        Read <ArrowRight size={14} />
                    </Link>
                </div>
            </div>

            <style jsx>{`
        .blog-card-image:hover {
          transform: scale(1.05);
        }
        .blog-card-title:hover {
          color: var(--primary);
        }
      `}</style>
        </article>
    );
}
