import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us - BlogHub',
    description: 'Get in touch with the BlogHub team. We\'d love to hear from you!',
};

export default function ContactPage() {
    return (
        <>
            {/* Hero */}
            <section style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '5rem 0',
                textAlign: 'center',
                color: 'white',
            }}>
                <div className="container">
                    <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem' }}>Contact Us</h1>
                    <p style={{ fontSize: '1.25rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}>
                        Have a question or feedback? We'd love to hear from you!
                    </p>
                </div>
            </section>

            <section style={{ padding: '5rem 0' }}>
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '3rem',
                    }}>
                        {/* Contact Form */}
                        <div className="card" style={{ padding: '2rem' }}>
                            <h2 style={{ marginBottom: '1.5rem' }}>Send us a Message</h2>
                            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                                        Your Name
                                    </label>
                                    <input type="text" className="input" placeholder="John Doe" required />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                                        Email Address
                                    </label>
                                    <input type="email" className="input" placeholder="john@example.com" required />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                                        Subject
                                    </label>
                                    <input type="text" className="input" placeholder="How can we help?" required />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                                        Message
                                    </label>
                                    <textarea className="textarea" placeholder="Your message here..." required />
                                </div>

                                <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                                    <Send size={18} /> Send Message
                                </button>
                            </form>
                        </div>

                        {/* Contact Info */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div>
                                <h2 style={{ marginBottom: '1rem' }}>Get in Touch</h2>
                                <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
                                    Whether you have a question about our content, want to collaborate, or just want to
                                    say hello, we're here for you. Fill out the form or reach out directly through our
                                    contact information below.
                                </p>
                            </div>

                            <div className="card" style={{ padding: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                    <div style={{
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '0.75rem',
                                        background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                    }}>
                                        <Mail size={24} color="white" />
                                    </div>
                                    <div>
                                        <h4 style={{ marginBottom: '0.25rem' }}>Email</h4>
                                        <p style={{ color: 'var(--muted)' }}>contact@bloghub.com</p>
                                    </div>
                                </div>
                            </div>

                            <div className="card" style={{ padding: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                    <div style={{
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '0.75rem',
                                        background: 'linear-gradient(135deg, #f093fb, #f5576c)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                    }}>
                                        <Phone size={24} color="white" />
                                    </div>
                                    <div>
                                        <h4 style={{ marginBottom: '0.25rem' }}>Phone</h4>
                                        <p style={{ color: 'var(--muted)' }}>+1 (555) 123-4567</p>
                                    </div>
                                </div>
                            </div>

                            <div className="card" style={{ padding: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                    <div style={{
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '0.75rem',
                                        background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                    }}>
                                        <MapPin size={24} color="white" />
                                    </div>
                                    <div>
                                        <h4 style={{ marginBottom: '0.25rem' }}>Location</h4>
                                        <p style={{ color: 'var(--muted)' }}>123 Blog Street, Content City</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
