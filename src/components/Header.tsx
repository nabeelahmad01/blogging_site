"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, Search, Moon, Sun } from "lucide-react";
import SearchModal from "./SearchModal";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Check for saved theme preference or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // Keyboard shortcut for search (Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header
        style={{
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--border)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
        className="header"
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1rem 1.5rem",
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none" }}>
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
            >
              <Image
                src="/images/logo.png"
                alt="InsightHub Logo"
                width={40}
                height={40}
                style={{ borderRadius: "0.75rem" }}
              />
              <span
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 800,
                  background:
                    "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                InsightHub
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2rem",
            }}
            className="desktop-nav"
          >
            <Link href="/" className="nav-link">
              Home
            </Link>
            <Link href="/blog" className="nav-link">
              Blog
            </Link>
            <Link href="/about" className="nav-link">
              About
            </Link>
            <Link href="/contact" className="nav-link">
              Contact
            </Link>
          </nav>

          {/* Search, Theme Toggle */}
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            className="desktop-nav"
          >
            <button
              onClick={() => setIsSearchOpen(true)}
              className="btn btn-outline"
              style={{ padding: "0.5rem 0.75rem" }}
              title="Search (Ctrl+K)"
            >
              <Search size={18} />
            </button>
            <button
              onClick={toggleTheme}
              className="btn btn-outline"
              style={{ padding: "0.5rem 0.75rem" }}
              title="Toggle theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            className="mobile-buttons"
          >
            <button
              onClick={() => setIsSearchOpen(true)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0.5rem",
              }}
            >
              <Search size={24} />
            </button>
            <button
              onClick={toggleTheme}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0.5rem",
              }}
            >
              {isDark ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="mobile-menu-toggle"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0.5rem",
              }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className="mobile-menu"
            style={{
              padding: "1rem 1.5rem 1.5rem",
              borderTop: "1px solid var(--border)",
            }}
          >
            <nav
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <Link
                href="/"
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/blog"
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/about"
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        )}

        <style jsx>{`
          @media (max-width: 768px) {
            .desktop-nav {
              display: none !important;
            }
            .mobile-buttons {
              display: flex !important;
            }
          }
          @media (min-width: 769px) {
            .mobile-menu {
              display: none !important;
            }
            .mobile-buttons {
              display: none !important;
            }
          }
        `}</style>
      </header>

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
