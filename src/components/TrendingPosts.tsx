import Link from "next/link";
import { TrendingUp, Eye } from "lucide-react";
import { prisma } from "@/lib/prisma";

async function getTrendingPosts() {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      orderBy: { views: "desc" },
      take: 5,
      select: {
        id: true,
        title: true,
        slug: true,
        views: true,
        category: { select: { name: true } },
      },
    });
    return posts;
  } catch {
    return [];
  }
}

export default async function TrendingPosts() {
  const posts = await getTrendingPosts();

  if (posts.length === 0) {
    return null;
  }

  return (
    <div className="card" style={{ padding: "1.5rem" }}>
      <h3
        style={{
          marginBottom: "1.25rem",
          fontSize: "1.125rem",
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <TrendingUp size={20} style={{ color: "var(--primary)" }} />
        Trending Posts
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {posts.map((post, index) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            style={{
              display: "flex",
              gap: "1rem",
              textDecoration: "none",
              color: "inherit",
              padding: "0.75rem",
              margin: "-0.75rem",
              borderRadius: "0.5rem",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "var(--secondary)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            <span
              style={{
                fontSize: "1.5rem",
                fontWeight: 800,
                color: "var(--primary)",
                opacity: 0.5,
                width: "2rem",
                textAlign: "center",
              }}
            >
              {index + 1}
            </span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <span
                style={{
                  fontSize: "0.7rem",
                  color: "var(--primary)",
                  fontWeight: 600,
                  textTransform: "uppercase",
                }}
              >
                {post.category.name}
              </span>
              <h4
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  lineHeight: 1.4,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {post.title}
              </h4>
              <span
                style={{
                  fontSize: "0.75rem",
                  color: "var(--muted)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem",
                  marginTop: "0.25rem",
                }}
              >
                <Eye size={12} />
                {post.views.toLocaleString()} views
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
