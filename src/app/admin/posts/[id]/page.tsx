'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Eye, Trash2 } from 'lucide-react';

interface Category {
    id: string;
    name: string;
    slug: string;
}

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({
        title: '',
        excerpt: '',
        content: '',
        categoryId: '',
        tags: '',
        featuredImg: '',
        published: false,
    });

    useEffect(() => {
        Promise.all([
            fetch('/api/categories').then(res => res.json()),
            fetch(`/api/posts/${id}`).then(res => res.json()),
        ]).then(([categoriesData, postData]) => {
            setCategories(categoriesData);
            setForm({
                title: postData.title || '',
                excerpt: postData.excerpt || '',
                content: postData.content || '',
                categoryId: postData.categoryId || '',
                tags: postData.tags || '',
                featuredImg: postData.featuredImg || '',
                published: postData.published || false,
            });
            setLoading(false);
        }).catch(error => {
            console.error('Error fetching data:', error);
            setLoading(false);
        });
    }, [id]);

    async function handleSubmit(e: React.FormEvent, publish?: boolean) {
        e.preventDefault();

        if (!form.title || !form.excerpt || !form.content || !form.categoryId) {
            alert('Please fill in all required fields');
            return;
        }

        setSaving(true);

        try {
            const res = await fetch(`/api/posts/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...form,
                    published: publish !== undefined ? publish : form.published
                }),
            });

            if (res.ok) {
                router.push('/admin');
            } else {
                const error = await res.json();
                alert(error.error || 'Failed to update post');
            }
        } catch (error) {
            console.error('Error updating post:', error);
            alert('Failed to update post');
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete() {
        if (!confirm('Are you sure you want to delete this post?')) return;

        try {
            const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
            if (res.ok) {
                router.push('/admin');
            }
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    }

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '50vh'
            }}>
                <div className="animate-pulse">Loading...</div>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
            <div style={{ marginBottom: '2rem' }}>
                <Link
                    href="/admin"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: 'var(--muted)',
                        textDecoration: 'none',
                        marginBottom: '1rem',
                    }}
                >
                    <ArrowLeft size={16} /> Back to Dashboard
                </Link>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h1>Edit Post</h1>
                    <button
                        onClick={handleDelete}
                        className="btn btn-outline"
                        style={{ color: 'red' }}
                    >
                        <Trash2 size={18} /> Delete
                    </button>
                </div>
            </div>

            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="card" style={{ padding: '2rem' }}>
                    {/* Title */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                            Title <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                            type="text"
                            className="input"
                            placeholder="Enter post title..."
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            required
                        />
                    </div>

                    {/* Category */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                            Category <span style={{ color: 'red' }}>*</span>
                        </label>
                        <select
                            className="input"
                            value={form.categoryId}
                            onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                            required
                        >
                            <option value="">Select a category...</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Excerpt */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                            Excerpt <span style={{ color: 'red' }}>*</span>
                        </label>
                        <textarea
                            className="textarea"
                            placeholder="Write a short excerpt for the post..."
                            value={form.excerpt}
                            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                            style={{ minHeight: '80px' }}
                            required
                        />
                    </div>

                    {/* Content */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                            Content <span style={{ color: 'red' }}>*</span>
                        </label>
                        <textarea
                            className="textarea"
                            placeholder="Write your blog post content here... (HTML supported)"
                            value={form.content}
                            onChange={(e) => setForm({ ...form, content: e.target.value })}
                            style={{ minHeight: '400px', fontFamily: 'monospace' }}
                            required
                        />
                        <p style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '0.25rem' }}>
                            You can use HTML tags for formatting
                        </p>
                    </div>

                    {/* Featured Image URL */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                            Featured Image URL
                        </label>
                        <input
                            type="url"
                            className="input"
                            placeholder="https://example.com/image.jpg"
                            value={form.featuredImg}
                            onChange={(e) => setForm({ ...form, featuredImg: e.target.value })}
                        />
                    </div>

                    {/* Tags */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                            Tags
                        </label>
                        <input
                            type="text"
                            className="input"
                            placeholder="technology, tips, tutorial"
                            value={form.tags}
                            onChange={(e) => setForm({ ...form, tags: e.target.value })}
                        />
                    </div>

                    {/* Status */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                checked={form.published}
                                onChange={(e) => setForm({ ...form, published: e.target.checked })}
                                style={{ width: '18px', height: '18px' }}
                            />
                            <span style={{ fontWeight: 600 }}>Published</span>
                        </label>
                    </div>

                    {/* Actions */}
                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                        justifyContent: 'flex-end',
                        paddingTop: '1.5rem',
                        borderTop: '1px solid var(--border)',
                    }}>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={saving}
                        >
                            <Save size={18} /> {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
