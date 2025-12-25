"use client";

import { useState, useEffect } from "react";
import { List } from "lucide-react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Extract headings from content - improved regex to handle nested elements
    const headingRegex = /<h([2-3])([^>]*)>([\s\S]*?)<\/h[2-3]>/gi;
    const extractedHeadings: Heading[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = parseInt(match[1]);
      const attrs = match[2];
      // Strip HTML tags from heading text
      const rawText = match[3].replace(/<[^>]*>/g, "").trim();

      // Try to get id from attributes
      const idMatch = attrs.match(/id=["']([^"']*)["']/);
      const id =
        idMatch?.[1] ||
        rawText
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");

      if (rawText) {
        extractedHeadings.push({ id, text: rawText, level });
      }
    }

    setHeadings(extractedHeadings);
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0% -35% 0%" }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) {
    return null; // Don't show TOC for very short articles
  }

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div className="card" style={{ padding: "1.5rem" }}>
      <h3
        style={{
          marginBottom: "1rem",
          fontSize: "1rem",
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <List size={18} />
        Table of Contents
      </h3>
      <nav>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {headings.map((heading) => (
            <li key={heading.id} style={{ marginBottom: "0.5rem" }}>
              <button
                onClick={() => scrollToHeading(heading.id)}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  padding: "0.5rem 0.75rem",
                  paddingLeft: heading.level === 3 ? "1.5rem" : "0.75rem",
                  border: "none",
                  background:
                    activeId === heading.id
                      ? "var(--secondary)"
                      : "transparent",
                  borderRadius: "0.375rem",
                  color:
                    activeId === heading.id ? "var(--primary)" : "var(--muted)",
                  fontSize: heading.level === 3 ? "0.8125rem" : "0.875rem",
                  fontWeight: activeId === heading.id ? 600 : 400,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  if (activeId !== heading.id) {
                    e.currentTarget.style.background = "var(--secondary)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeId !== heading.id) {
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                {heading.text}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
