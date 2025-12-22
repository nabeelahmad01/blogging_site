'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Search, PenSquare } from 'lucide-react';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header style={{
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid var(--border)',
            position: 'sticky',
            top: 0,
            zIndex: 100,
        }}>
            <div className="container" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem 1.5rem',
            }}>
                {/* Logo */}
                <Link href="/" style={{ textDecoration: 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))',
                            borderRadius: '0.75rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <PenSquare size={22} color="white" />
                        </div>
                        <span style={{
                            fontSize: '1.5rem',
                            fontWeight: 800,
                            background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}>
                            InsightHub
                        </span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2rem',
                }} className="desktop-nav">
                    <Link href="/" className="nav-link">Home</Link>
                    <Link href="/blog" className="nav-link">Blog</Link>
                    <Link href="/about" className="nav-link">About</Link>
                    <Link href="/contact" className="nav-link">Contact</Link>
                </nav>

                {/* Search & CTA */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }} className="desktop-nav">
                    <Link href="/blog" className="btn btn-outline" style={{ padding: '0.5rem 0.75rem' }}>
                        <Search size={18} />
                    </Link>
                    <Link href="/admin" className="btn btn-primary">
                        Admin
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="mobile-menu-toggle"
                    style={{
                        display: 'none',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '0.5rem',
                    }}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="mobile-menu" style={{
                    padding: '1rem 1.5rem 1.5rem',
                    borderTop: '1px solid var(--border)',
                }}>
                    <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <Link href="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
                        <Link href="/blog" className="nav-link" onClick={() => setIsMenuOpen(false)}>Blog</Link>
                        <Link href="/about" className="nav-link" onClick={() => setIsMenuOpen(false)}>About</Link>
                        <Link href="/contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>Contact</Link>
                        <Link href="/admin" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
                            Admin Dashboard
                        </Link>
                    </nav>
                </div>
            )}

            <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-toggle {
            display: block !important;
          }
        }
        @media (min-width: 769px) {
          .mobile-menu {
            display: none !important;
          }
        }
      `}</style>
        </header>
    );
}

