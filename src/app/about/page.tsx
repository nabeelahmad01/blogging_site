import { Users, Target, Heart, Award } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Us - InsightHub',
    description: 'Learn more about InsightHub and our mission to provide quality content.',
};

export default function AboutPage() {
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
                    <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem' }}>About InsightHub</h1>
                    <p style={{ fontSize: '1.25rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}>
                        Your trusted source for insightful articles, tutorials, and tips on technology,
                        lifestyle, and personal growth.
                    </p>
                </div>
            </section>

            {/* Story Section */}
            <section style={{ padding: '5rem 0' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Our Story</h2>
                    <p style={{ fontSize: '1.125rem', lineHeight: 1.8, color: 'var(--muted)', marginBottom: '1.5rem' }}>
                        InsightHub was founded with a simple mission: to create a platform where knowledge meets inspiration.
                        We believe that quality content has the power to transform lives, spark new ideas, and help
                        people grow both personally and professionally.
                    </p>
                    <p style={{ fontSize: '1.125rem', lineHeight: 1.8, color: 'var(--muted)', marginBottom: '1.5rem' }}>
                        Every article we publish is crafted with care, researched thoroughly, and designed to provide
                        real value to our readers. Whether you're looking to learn something new, stay updated with
                        the latest trends, or simply find inspiration, you'll find it here at InsightHub.
                    </p>
                    <p style={{ fontSize: '1.125rem', lineHeight: 1.8, color: 'var(--muted)' }}>
                        We're committed to building a community of curious minds who love to learn, share, and grow
                        together. Thank you for being part of our journey.
                    </p>
                </div>
            </section>

            {/* Values Section */}
            <section style={{ padding: '5rem 0', background: 'var(--secondary)' }}>
                <div className="container">
                    <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Our Values</h2>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '2rem',
                    }}>
                        <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                            <div style={{
                                width: '70px',
                                height: '70px',
                                borderRadius: '1rem',
                                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1.5rem',
                            }}>
                                <Award size={32} color="white" />
                            </div>
                            <h3 style={{ marginBottom: '0.75rem' }}>Quality First</h3>
                            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                                We prioritize quality over quantity. Every piece of content is thoroughly researched and
                                carefully crafted to provide maximum value.
                            </p>
                        </div>

                        <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                            <div style={{
                                width: '70px',
                                height: '70px',
                                borderRadius: '1rem',
                                background: 'linear-gradient(135deg, #f093fb, #f5576c)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1.5rem',
                            }}>
                                <Users size={32} color="white" />
                            </div>
                            <h3 style={{ marginBottom: '0.75rem' }}>Community Focused</h3>
                            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                                Our readers are at the heart of everything we do. We create content that addresses real
                                questions and solves real problems.
                            </p>
                        </div>

                        <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                            <div style={{
                                width: '70px',
                                height: '70px',
                                borderRadius: '1rem',
                                background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1.5rem',
                            }}>
                                <Target size={32} color="white" />
                            </div>
                            <h3 style={{ marginBottom: '0.75rem' }}>Always Learning</h3>
                            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                                We're constantly learning and evolving. We stay updated with the latest trends to bring
                                you fresh and relevant content.
                            </p>
                        </div>

                        <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                            <div style={{
                                width: '70px',
                                height: '70px',
                                borderRadius: '1rem',
                                background: 'linear-gradient(135deg, #fa709a, #fee140)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1.5rem',
                            }}>
                                <Heart size={32} color="white" />
                            </div>
                            <h3 style={{ marginBottom: '0.75rem' }}>Passion Driven</h3>
                            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                                We write about topics we're passionate about. This passion shines through in every article
                                we publish.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

