import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Heart } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer style={{
            background: 'var(--card)',
            borderTop: '1px solid var(--border)',
            marginTop: '4rem',
        }}>
            <div className="container" style={{ padding: '4rem 1.5rem 2rem' }}>
                {/* Main Footer Content */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '2rem',
                    marginBottom: '3rem',
                }}>
                    {/* Brand */}
                    <div>
                        <h3 style={{
                            fontSize: '1.5rem',
                            fontWeight: 800,
                            marginBottom: '1rem',
                            background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}>
                            BlogHub
                        </h3>
                        <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                            Your daily source for insightful articles, tutorials, and tips on technology,
                            lifestyle, and personal growth.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                            <a href="#" className="footer-link" style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                background: 'var(--secondary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="footer-link" style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                background: 'var(--secondary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Twitter size={18} />
                            </a>
                            <a href="#" className="footer-link" style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                background: 'var(--secondary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="footer-link" style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                background: 'var(--secondary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Linkedin size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 style={{ marginBottom: '1rem', fontWeight: 600 }}>Quick Links</h4>
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <Link href="/" className="footer-link">Home</Link>
                            <Link href="/blog" className="footer-link">All Posts</Link>
                            <Link href="/about" className="footer-link">About Us</Link>
                            <Link href="/contact" className="footer-link">Contact</Link>
                        </nav>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 style={{ marginBottom: '1rem', fontWeight: 600 }}>Categories</h4>
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <Link href="/blog?category=technology" className="footer-link">Technology</Link>
                            <Link href="/blog?category=lifestyle" className="footer-link">Lifestyle</Link>
                            <Link href="/blog?category=business" className="footer-link">Business</Link>
                            <Link href="/blog?category=health" className="footer-link">Health</Link>
                        </nav>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 style={{ marginBottom: '1rem', fontWeight: 600 }}>Legal</h4>
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <Link href="/privacy-policy" className="footer-link">Privacy Policy</Link>
                            <Link href="/terms-of-service" className="footer-link">Terms of Service</Link>
                        </nav>
                        <div style={{ marginTop: '1.5rem' }}>
                            <h5 style={{ marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>Newsletter</h5>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="input"
                                    style={{ padding: '0.5rem 0.75rem', fontSize: '0.875rem' }}
                                />
                                <button className="btn btn-primary" style={{ padding: '0.5rem' }}>
                                    <Mail size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div style={{
                    borderTop: '1px solid var(--border)',
                    paddingTop: '2rem',
                    textAlign: 'center',
                    color: 'var(--muted)',
                    fontSize: '0.875rem',
                }}>
                    <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>
                        © {currentYear} BlogHub. Made with <Heart size={14} fill="var(--primary)" color="var(--primary)" /> All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
