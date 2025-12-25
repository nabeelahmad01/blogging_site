import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, Eye, ArrowLeft, User } from "lucide-react";
import { format } from "date-fns";
import { prisma } from "@/lib/prisma";
import ShareButtons from "@/components/ShareButtons";
import AdPlaceholder from "@/components/AdPlaceholder";
import BlogCard from "@/components/BlogCard";
import { Metadata } from "next";

async function getPost(slug: string) {
  try {
    const post = await prisma.post.update({
      where: { slug },
      data: { views: { increment: 1 } },
      include: { category: true },
    });
    return post;
  } catch {
    return null;
  }
}

async function getRelatedPosts(categoryId: string, currentSlug: string) {
  try {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
        categoryId,
        NOT: { slug: currentSlug },
      },
      include: { category: true },
      take: 3,
    });
    return posts;
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug },
  });

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: `${post.title} - InsightHub`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      images: post.featuredImg ? [post.featuredImg] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post || !post.published) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.categoryId, post.slug);
  const postUrl = `${
    process.env.NEXT_PUBLIC_SITE_URL || "https://yourblog.com"
  }/blog/${post.slug}`;

  return (
    <>
      {/* Hero */}
      <section
        style={{
          background: post.featuredImg
            ? `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${post.featuredImg}) center/cover`
            : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          padding: "5rem 0",
          color: "white",
        }}
      >
        <div className="container">
          <Link
            href="/blog"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "rgba(255,255,255,0.8)",
              marginBottom: "1.5rem",
              textDecoration: "none",
            }}
          >
            <ArrowLeft size={16} /> Back to Blog
          </Link>

          <span className="badge" style={{ marginBottom: "1rem" }}>
            {post.category.name}
          </span>

          <h1
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 800,
              marginBottom: "1.5rem",
              lineHeight: 1.2,
              maxWidth: "800px",
            }}
          >
            {post.title}
          </h1>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2rem",
              flexWrap: "wrap",
              opacity: 0.9,
            }}
          >
            <span
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <User size={16} /> Admin
            </span>
            <span
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <Calendar size={16} />{" "}
              {format(new Date(post.createdAt), "MMMM dd, yyyy")}
            </span>
            <span
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <Eye size={16} /> {post.views} views
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="container" style={{ padding: "3rem 1.5rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 300px",
            gap: "3rem",
          }}
        >
          {/* Main Content */}
          <article>
            {/* Ad before content */}
            <AdPlaceholder size="horizontal" />

            {/* Article Content */}
            <div
              className="blog-content"
              style={{ marginTop: "2rem" }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            {post.tags && (
              <div
                style={{
                  marginTop: "2rem",
                  paddingTop: "2rem",
                  borderTop: "1px solid var(--border)",
                }}
              >
                <span style={{ fontWeight: 600, marginRight: "1rem" }}>
                  Tags:
                </span>
                {post.tags.split(",").map((tag) => (
                  <span
                    key={tag}
                    className="badge badge-secondary"
                    style={{
                      marginRight: "0.5rem",
                      display: "inline-flex",
                      marginBottom: "10px",
                    }}
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            )}

            {/* Share */}
            <div
              style={{
                marginTop: "2rem",
                paddingTop: "2rem",
                borderTop: "1px solid var(--border)",
              }}
            >
              <ShareButtons url={postUrl} title={post.title} />
            </div>

            {/* FAQs Section */}
            {post.faqs &&
              (() => {
                try {
                  const faqsList = JSON.parse(post.faqs) as Array<{
                    question: string;
                    answer: string;
                  }>;
                  if (faqsList.length > 0) {
                    return (
                      <div
                        style={{
                          marginTop: "2rem",
                          paddingTop: "2rem",
                          borderTop: "1px solid var(--border)",
                        }}
                      >
                        <h2
                          style={{ marginBottom: "1.5rem", fontSize: "1.5rem" }}
                        >
                          Frequently Asked Questions
                        </h2>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                          }}
                        >
                          {faqsList.map((faq, index) => (
                            <details
                              key={index}
                              style={{
                                background: "var(--secondary)",
                                borderRadius: "0.75rem",
                                overflow: "hidden",
                              }}
                            >
                              <summary
                                style={{
                                  padding: "1rem 1.25rem",
                                  fontWeight: 600,
                                  cursor: "pointer",
                                  listStyle: "none",
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                {faq.question}
                                <span
                                  style={{ marginLeft: "1rem", opacity: 0.5 }}
                                >
                                  +
                                </span>
                              </summary>
                              <div
                                style={{
                                  padding: "0 1.25rem 1rem",
                                  color: "var(--muted)",
                                  lineHeight: 1.7,
                                }}
                              >
                                {faq.answer}
                              </div>
                            </details>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  return null;
                } catch {
                  return null;
                }
              })()}

            {/* Ad after content */}
            <AdPlaceholder size="horizontal" />
          </article>

          {/* Sidebar */}
          <aside
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
          >
            <AdPlaceholder size="square" />

            {/* About Author */}
            <div
              className="card"
              style={{ padding: "1.5rem", textAlign: "center" }}
            >
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
                  margin: "0 auto 1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <User size={32} color="white" />
              </div>
              <h4 style={{ marginBottom: "0.5rem" }}>Blog Author</h4>
              <p style={{ color: "var(--muted)", fontSize: "0.875rem" }}>
                Content creator passionate about sharing knowledge and insights.
              </p>
            </div>

            <AdPlaceholder size="square" />
          </aside>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section style={{ padding: "4rem 0", background: "var(--secondary)" }}>
          <div className="container">
            <h2 style={{ marginBottom: "2rem", textAlign: "center" }}>
              Related Articles
            </h2>
            <div
              className="blog-grid"
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              }}
            >
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      )}

      <style>{`
        @media (max-width: 900px) {
          .container > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
