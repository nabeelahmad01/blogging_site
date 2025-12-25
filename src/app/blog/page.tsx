import Link from "next/link";
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import BlogCard from "@/components/BlogCard";
import AdPlaceholder from "@/components/AdPlaceholder";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Articles - InsightHub",
  description:
    "Browse all our articles on technology, lifestyle, business, and more.",
};

const POSTS_PER_PAGE = 9;

async function getPosts(category?: string, search?: string, page: number = 1) {
  try {
    const skip = (page - 1) * POSTS_PER_PAGE;

    const where = {
      published: true,
      ...(category && { category: { slug: category } }),
      ...(search && {
        OR: [
          { title: { contains: search } },
          { content: { contains: search } },
        ],
      }),
    };

    const [posts, totalCount] = await Promise.all([
      prisma.post.findMany({
        where,
        include: { category: true },
        orderBy: { createdAt: "desc" },
        skip,
        take: POSTS_PER_PAGE,
      }),
      prisma.post.count({ where }),
    ]);

    const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);

    return { posts, totalCount, totalPages, currentPage: page };
  } catch {
    return { posts: [], totalCount: 0, totalPages: 0, currentPage: 1 };
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
  searchParams: Promise<{ category?: string; search?: string; page?: string }>;
}) {
  const params = await searchParams;
  const page = parseInt(params.page || "1", 10);
  const { posts, totalCount, totalPages, currentPage } = await getPosts(
    params.category,
    params.search,
    page
  );
  const categories = await getCategories();

  // Build query string for pagination links
  const buildUrl = (pageNum: number) => {
    const queryParts = [];
    if (params.category) queryParts.push(`category=${params.category}`);
    if (params.search) queryParts.push(`search=${params.search}`);
    queryParts.push(`page=${pageNum}`);
    return `/blog?${queryParts.join("&")}`;
  };

  return (
    <>
      {/* Hero */}
      <section
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          padding: "4rem 0",
          textAlign: "center",
        }}
      >
        <div className="container">
          <h1 style={{ color: "white", marginBottom: "0.5rem" }}>
            {params.category
              ? `${
                  params.category.charAt(0).toUpperCase() +
                  params.category.slice(1)
                } Articles`
              : "All Articles"}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.9)" }}>
            {params.search
              ? `Search results for "${params.search}"`
              : `${totalCount} articles to explore`}
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: "2rem 1.5rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 300px",
            gap: "3rem",
          }}
          className="blog-page-layout"
        >
          {/* Main Content */}
          <div>
            {/* Search Bar */}
            <form action="/blog" method="get" style={{ marginBottom: "2rem" }}>
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
                <div
                  className="blog-grid"
                  style={{
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(300px, 1fr))",
                  }}
                >
                  {posts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "0.5rem",
                      marginTop: "3rem",
                      flexWrap: "wrap",
                    }}
                  >
                    {/* Previous Button */}
                    {currentPage > 1 ? (
                      <Link
                        href={buildUrl(currentPage - 1)}
                        className="btn btn-outline"
                        style={{
                          padding: "0.5rem 1rem",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.25rem",
                        }}
                      >
                        <ChevronLeft size={18} /> Previous
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="btn btn-outline"
                        style={{
                          padding: "0.5rem 1rem",
                          opacity: 0.5,
                          cursor: "not-allowed",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.25rem",
                        }}
                      >
                        <ChevronLeft size={18} /> Previous
                      </button>
                    )}

                    {/* Page Numbers */}
                    <div style={{ display: "flex", gap: "0.25rem" }}>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (pageNum) => {
                          // Show first, last, current, and adjacent pages
                          if (
                            pageNum === 1 ||
                            pageNum === totalPages ||
                            (pageNum >= currentPage - 1 &&
                              pageNum <= currentPage + 1)
                          ) {
                            return (
                              <Link
                                key={pageNum}
                                href={buildUrl(pageNum)}
                                className={
                                  pageNum === currentPage
                                    ? "btn btn-primary"
                                    : "btn btn-outline"
                                }
                                style={{
                                  padding: "0.5rem 0.875rem",
                                  minWidth: "40px",
                                  textAlign: "center",
                                }}
                              >
                                {pageNum}
                              </Link>
                            );
                          }
                          // Show ellipsis
                          if (
                            pageNum === currentPage - 2 ||
                            pageNum === currentPage + 2
                          ) {
                            return (
                              <span
                                key={pageNum}
                                style={{
                                  padding: "0.5rem",
                                  color: "var(--muted)",
                                }}
                              >
                                ...
                              </span>
                            );
                          }
                          return null;
                        }
                      )}
                    </div>

                    {/* Next Button */}
                    {currentPage < totalPages ? (
                      <Link
                        href={buildUrl(currentPage + 1)}
                        className="btn btn-outline"
                        style={{
                          padding: "0.5rem 1rem",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.25rem",
                        }}
                      >
                        Next <ChevronRight size={18} />
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="btn btn-outline"
                        style={{
                          padding: "0.5rem 1rem",
                          opacity: 0.5,
                          cursor: "not-allowed",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.25rem",
                        }}
                      >
                        Next <ChevronRight size={18} />
                      </button>
                    )}
                  </div>
                )}

                {/* Page Info */}
                {totalPages > 1 && (
                  <p
                    style={{
                      textAlign: "center",
                      marginTop: "1rem",
                      color: "var(--muted)",
                      fontSize: "0.875rem",
                    }}
                  >
                    Page {currentPage} of {totalPages} • Showing {posts.length}{" "}
                    of {totalCount} articles
                  </p>
                )}
              </>
            ) : (
              <div
                style={{
                  textAlign: "center",
                  padding: "4rem 2rem",
                  background: "var(--secondary)",
                  borderRadius: "1rem",
                }}
              >
                <Filter
                  size={48}
                  color="var(--muted)"
                  style={{ marginBottom: "1rem" }}
                />
                <h3 style={{ marginBottom: "0.5rem" }}>No Articles Found</h3>
                <p style={{ color: "var(--muted)", marginBottom: "1.5rem" }}>
                  {params.search
                    ? `No articles match "${params.search}"`
                    : "No articles published yet in this category."}
                </p>
                <Link href="/blog" className="btn btn-primary">
                  View All Articles
                </Link>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
          >
            {/* Ad */}
            <AdPlaceholder size="square" />

            {/* Categories */}
            <div className="card" style={{ padding: "1.5rem" }}>
              <h3 style={{ marginBottom: "1rem", fontSize: "1.125rem" }}>
                Categories
              </h3>
              <nav
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <Link
                  href="/blog"
                  className="nav-link"
                  style={{
                    padding: "0.75rem 1rem",
                    borderRadius: "0.5rem",
                    background: !params.category
                      ? "var(--secondary)"
                      : "transparent",
                    display: "block",
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
                      padding: "0.75rem 1rem",
                      borderRadius: "0.5rem",
                      background:
                        params.category === cat.slug
                          ? "var(--secondary)"
                          : "transparent",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>{cat.name}</span>
                    <span
                      style={{
                        background: "var(--primary)",
                        color: "white",
                        padding: "0.125rem 0.5rem",
                        borderRadius: "9999px",
                        fontSize: "0.75rem",
                      }}
                    >
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
                    .blog-page-layout {
                        grid-template-columns: 1fr !important;
                    }
                    .blog-page-layout aside {
                        order: -1;
                    }
                }
            `}</style>
    </>
  );
}
