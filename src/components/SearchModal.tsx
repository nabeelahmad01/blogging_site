"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, X, Loader2 } from "lucide-react";

interface SearchResult {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImg: string | null;
  category: { name: string };
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query || query.length < 2) {
      setResults([]);
      return;
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data);
        }
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(4px)",
        zIndex: 1000,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "10vh 1rem",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "var(--card)",
          borderRadius: "1rem",
          width: "100%",
          maxWidth: "600px",
          maxHeight: "70vh",
          overflow: "hidden",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            padding: "1rem 1.5rem",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <Search size={20} style={{ color: "var(--muted)", flexShrink: 0 }} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search articles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              border: "none",
              background: "transparent",
              fontSize: "1.125rem",
              outline: "none",
              color: "var(--foreground)",
            }}
          />
          {loading && (
            <Loader2
              size={20}
              style={{
                color: "var(--muted)",
                animation: "spin 1s linear infinite",
              }}
            />
          )}
          <button
            onClick={onClose}
            style={{
              background: "var(--secondary)",
              border: "none",
              borderRadius: "0.5rem",
              padding: "0.5rem",
              cursor: "pointer",
              display: "flex",
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Results */}
        <div
          style={{
            maxHeight: "calc(70vh - 70px)",
            overflow: "auto",
            padding: "0.5rem",
          }}
        >
          {query.length < 2 ? (
            <div
              style={{
                padding: "2rem",
                textAlign: "center",
                color: "var(--muted)",
              }}
            >
              Type at least 2 characters to search...
            </div>
          ) : results.length === 0 && !loading ? (
            <div
              style={{
                padding: "2rem",
                textAlign: "center",
                color: "var(--muted)",
              }}
            >
              No articles found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            results.map((result) => (
              <Link
                key={result.id}
                href={`/blog/${result.slug}`}
                onClick={onClose}
                style={{
                  display: "flex",
                  gap: "1rem",
                  padding: "1rem",
                  borderRadius: "0.75rem",
                  textDecoration: "none",
                  color: "inherit",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "var(--secondary)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                {result.featuredImg && (
                  <img
                    src={result.featuredImg}
                    alt=""
                    style={{
                      width: "80px",
                      height: "60px",
                      objectFit: "cover",
                      borderRadius: "0.5rem",
                      flexShrink: 0,
                    }}
                  />
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--primary)",
                      fontWeight: 600,
                      textTransform: "uppercase",
                    }}
                  >
                    {result.category.name}
                  </span>
                  <h4
                    style={{
                      fontSize: "1rem",
                      fontWeight: 600,
                      marginBottom: "0.25rem",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {result.title}
                  </h4>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--muted)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {result.excerpt}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "0.75rem 1.5rem",
            borderTop: "1px solid var(--border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "0.75rem",
            color: "var(--muted)",
          }}
        >
          <span>Press ESC to close</span>
          <span>↵ to select</span>
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
