import Link from "next/link";
import { ArrowRight, Sparkles, TrendingUp, Users, Zap } from "lucide-react";
import { prisma } from "@/lib/prisma";
import BlogCard from "@/components/BlogCard";
import AdPlaceholder from "@/components/AdPlaceholder";
import NewsletterForm from "@/components/NewsletterForm";

async function getLatestPosts() {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      include: { category: true },
      orderBy: { createdAt: "desc" },
      take: 6,
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

export default async function Home() {
  const posts = await getLatestPosts();
  const categories = await getCategories();

  return (
    <>
      {/* Hero Section */}
      <section
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          padding: "5rem 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div
          className="container"
          style={{ position: "relative", textAlign: "center" }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "rgba(255,255,255,0.2)",
              padding: "0.5rem 1rem",
              borderRadius: "9999px",
              marginBottom: "1.5rem",
              backdropFilter: "blur(10px)",
            }}
          >
            <Sparkles size={16} color="white" />
            <span
              style={{ color: "white", fontSize: "0.875rem", fontWeight: 500 }}
            >
              Welcome to InsightHub
            </span>
          </div>

          <h1
            style={{
              color: "white",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 800,
              marginBottom: "1.5rem",
              lineHeight: 1.2,
            }}
          >
            Discover Insights That
            <br />
            <span style={{ opacity: 0.9 }}>Transform Your World</span>
          </h1>

          <p
            style={{
              color: "rgba(255,255,255,0.9)",
              fontSize: "1.25rem",
              maxWidth: "600px",
              margin: "0 auto 2rem",
              lineHeight: 1.7,
            }}
          >
            Your daily destination for insightful articles, tutorials, and tips
            on technology, lifestyle, and personal growth.
          </p>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/blog"
              className="btn"
              style={{
                background: "white",
                color: "#667eea",
                padding: "1rem 2rem",
                fontSize: "1rem",
              }}
            >
              Explore Articles{" "}
              <ArrowRight size={18} style={{ marginLeft: "0.5rem" }} />
            </Link>
            <Link
              href="/about"
              className="btn"
              style={{
                background: "transparent",
                border: "2px solid white",
                color: "white",
                padding: "1rem 2rem",
                fontSize: "1rem",
              }}
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        style={{
          background: "var(--card)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="container" style={{ padding: "3rem 1.5rem" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "2rem",
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "1rem",
                  background: "linear-gradient(135deg, #667eea, #764ba2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "0.5rem",
                }}
              >
                <TrendingUp size={28} color="white" />
              </div>
              <h3 style={{ fontSize: "2rem", fontWeight: 800 }}>
                {posts.length}+
              </h3>
              <p style={{ color: "var(--muted)" }}>Articles Published</p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "1rem",
                  background: "linear-gradient(135deg, #f093fb, #f5576c)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "0.5rem",
                }}
              >
                <Users size={28} color="white" />
              </div>
              <h3 style={{ fontSize: "2rem", fontWeight: 800 }}>5K+</h3>
              <p style={{ color: "var(--muted)" }}>Monthly Readers</p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "1rem",
                  background: "linear-gradient(135deg, #4facfe, #00f2fe)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "0.5rem",
                }}
              >
                <Zap size={28} color="white" />
              </div>
              <h3 style={{ fontSize: "2rem", fontWeight: 800 }}>
                {categories.length}
              </h3>
              <p style={{ color: "var(--muted)" }}>Categories</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Placeholder */}
      <div className="container" style={{ padding: "1.5rem" }}>
        <AdPlaceholder size="horizontal" />
      </div>

      {/* Latest Posts Section */}
      <section style={{ padding: "4rem 0" }}>
        <div className="container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "2rem",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <div>
              <h2 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                Latest Articles
              </h2>
              <p style={{ color: "var(--muted)" }}>
                Fresh insights from our community
              </p>
            </div>
            <Link href="/blog" className="btn btn-outline">
              View All <ArrowRight size={16} />
            </Link>
          </div>

          {posts.length > 0 ? (
            <div className="blog-grid">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "4rem 2rem",
                background: "var(--secondary)",
                borderRadius: "1rem",
              }}
            >
              <Sparkles
                size={48}
                color="var(--primary)"
                style={{ marginBottom: "1rem" }}
              />
              <h3 style={{ marginBottom: "0.5rem" }}>No Articles Yet</h3>
              <p style={{ color: "var(--muted)", marginBottom: "1.5rem" }}>
                Be the first to publish! Head to the admin dashboard to create
                your first post.
              </p>
              <Link href="/admin" className="btn btn-primary">
                Create First Post
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      {categories.length > 0 && (
        <section style={{ padding: "4rem 0", background: "var(--secondary)" }}>
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <h2 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                Browse by Category
              </h2>
              <p style={{ color: "var(--muted)" }}>
                Find articles that match your interests
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "1rem",
              }}
            >
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/blog?category=${category.slug}`}
                  className="card"
                  style={{
                    padding: "1.5rem",
                    textAlign: "center",
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <h4 style={{ marginBottom: "0.25rem" }}>{category.name}</h4>
                  <p style={{ color: "var(--muted)", fontSize: "0.875rem" }}>
                    {category._count.posts} articles
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <section style={{ padding: "5rem 0" }}>
        <div className="container">
          <div
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              borderRadius: "1.5rem",
              padding: "3rem",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                opacity: 0.1,
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
            <div style={{ position: "relative" }}>
              <h2
                style={{
                  color: "white",
                  fontSize: "2rem",
                  marginBottom: "1rem",
                }}
              >
                Stay Updated
              </h2>
              <p
                style={{
                  color: "rgba(255,255,255,0.9)",
                  marginBottom: "2rem",
                  maxWidth: "500px",
                  margin: "0 auto 2rem",
                }}
              >
                Subscribe to our newsletter and never miss a new article. Get
                insights delivered straight to your inbox.
              </p>
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
