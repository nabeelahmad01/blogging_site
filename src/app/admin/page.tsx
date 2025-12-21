'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    FileText,
    FolderOpen,
    Settings,
    LogOut,
    Plus,
    Eye,
    Edit,
    Trash2,
    PenSquare,
    BarChart3,
    Users,
    TrendingUp
} from 'lucide-react';

interface Post {
    id: string;
    title: string;
    slug: string;
    published: boolean;
    views: number;
    createdAt: string;
    category: { name: string };
}

interface Category {
    id: string;
    name: string;
    slug: string;
    _count: { posts: number };
}

interface DashboardStats {
    totalPosts: number;
    publishedPosts: number;
    totalViews: number;
    totalCategories: number;
}

export default function AdminDashboard() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [posts, setPosts] = useState<Post[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [stats, setStats] = useState<DashboardStats>({
        totalPosts: 0,
        publishedPosts: 0,
        totalViews: 0,
        totalCategories: 0,
    });
    const [loading, setLoading] = useState(true);
    const [newCategory, setNewCategory] = useState('');

    // Fetch data on mount
    useState(() => {
        fetchData();
    });

    async function fetchData() {
        try {
            const [postsRes, categoriesRes, statsRes] = await Promise.all([
                fetch('/api/posts'),
                fetch('/api/categories'),
                fetch('/api/stats'),
            ]);

            if (postsRes.ok) {
                const postsData = await postsRes.json();
                setPosts(postsData);
            }
            if (categoriesRes.ok) {
                const categoriesData = await categoriesRes.json();
                setCategories(categoriesData);
            }
            if (statsRes.ok) {
                const statsData = await statsRes.json();
                setStats(statsData);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }

    async function deletePost(id: string) {
        if (!confirm('Are you sure you want to delete this post?')) return;

        try {
            const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setPosts(posts.filter(p => p.id !== id));
            }
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    }

    async function createCategory() {
        if (!newCategory.trim()) return;

        try {
            const res = await fetch('/api/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newCategory }),
            });

            if (res.ok) {
                const category = await res.json();
                setCategories([...categories, category]);
                setNewCategory('');
            }
        } catch (error) {
            console.error('Error creating category:', error);
        }
    }

    async function deleteCategory(id: string) {
        if (!confirm('Are you sure? All posts in this category will become uncategorized.')) return;

        try {
            const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setCategories(categories.filter(c => c.id !== id));
            }
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    }

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'posts', label: 'Posts', icon: FileText },
        { id: 'categories', label: 'Categories', icon: FolderOpen },
    ];

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            {/* Sidebar */}
            <aside style={{
                width: '260px',
                background: 'var(--card)',
                borderRight: '1px solid var(--border)',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
            }}>
                {/* Logo */}
                <Link href="/" style={{ textDecoration: 'none', marginBottom: '2rem' }}>
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
                        <div>
                            <span style={{
                                fontSize: '1.25rem',
                                fontWeight: 800,
                                color: 'var(--foreground)',
                            }}>
                                BlogHub
                            </span>
                            <p style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>Admin Panel</p>
                        </div>
                    </div>
                </Link>

                {/* Navigation */}
                <nav style={{ flex: 1 }}>
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`admin-nav-item ${activeTab === item.id ? 'active' : ''}`}
                            style={{
                                width: '100%',
                                border: 'none',
                                cursor: 'pointer',
                                marginBottom: '0.5rem',
                                background: activeTab === item.id ? 'var(--secondary)' : 'transparent',
                            }}
                        >
                            <item.icon size={20} />
                            {item.label}
                        </button>
                    ))}

                    <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                        <Link
                            href="/admin/posts/new"
                            className="btn btn-primary"
                            style={{ width: '100%', justifyContent: 'center' }}
                        >
                            <Plus size={18} /> New Post
                        </Link>
                    </div>
                </nav>

                {/* Footer */}
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                    <Link href="/" className="admin-nav-item" style={{ textDecoration: 'none' }}>
                        <LogOut size={20} />
                        Back to Site
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, padding: '2rem', background: 'var(--background)' }}>
                {/* Dashboard Tab */}
                {activeTab === 'dashboard' && (
                    <div>
                        <h1 style={{ marginBottom: '2rem' }}>Dashboard</h1>

                        {/* Stats Grid */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '1.5rem',
                            marginBottom: '2rem',
                        }}>
                            <div className="stat-card">
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div>
                                        <h3>{stats.totalPosts}</h3>
                                        <p>Total Posts</p>
                                    </div>
                                    <FileText size={32} style={{ opacity: 0.5 }} />
                                </div>
                            </div>

                            <div className="stat-card" style={{ background: 'linear-gradient(135deg, #f093fb, #f5576c)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div>
                                        <h3>{stats.publishedPosts}</h3>
                                        <p>Published</p>
                                    </div>
                                    <TrendingUp size={32} style={{ opacity: 0.5 }} />
                                </div>
                            </div>

                            <div className="stat-card" style={{ background: 'linear-gradient(135deg, #4facfe, #00f2fe)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div>
                                        <h3>{stats.totalViews}</h3>
                                        <p>Total Views</p>
                                    </div>
                                    <Eye size={32} style={{ opacity: 0.5 }} />
                                </div>
                            </div>

                            <div className="stat-card" style={{ background: 'linear-gradient(135deg, #fa709a, #fee140)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div>
                                        <h3>{stats.totalCategories}</h3>
                                        <p>Categories</p>
                                    </div>
                                    <FolderOpen size={32} style={{ opacity: 0.5 }} />
                                </div>
                            </div>
                        </div>

                        {/* Recent Posts */}
                        <div className="card" style={{ padding: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <h3>Recent Posts</h3>
                                <Link href="/admin/posts/new" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
                                    <Plus size={16} /> Add New
                                </Link>
                            </div>

                            {posts.length > 0 ? (
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                            <th style={{ textAlign: 'left', padding: '0.75rem', color: 'var(--muted)', fontWeight: 500 }}>Title</th>
                                            <th style={{ textAlign: 'left', padding: '0.75rem', color: 'var(--muted)', fontWeight: 500 }}>Category</th>
                                            <th style={{ textAlign: 'left', padding: '0.75rem', color: 'var(--muted)', fontWeight: 500 }}>Status</th>
                                            <th style={{ textAlign: 'left', padding: '0.75rem', color: 'var(--muted)', fontWeight: 500 }}>Views</th>
                                            <th style={{ textAlign: 'right', padding: '0.75rem', color: 'var(--muted)', fontWeight: 500 }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {posts.slice(0, 5).map(post => (
                                            <tr key={post.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                                <td style={{ padding: '0.75rem' }}>{post.title}</td>
                                                <td style={{ padding: '0.75rem' }}>{post.category?.name || '-'}</td>
                                                <td style={{ padding: '0.75rem' }}>
                                                    <span className={`badge ${post.published ? '' : 'badge-secondary'}`}>
                                                        {post.published ? 'Published' : 'Draft'}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '0.75rem' }}>{post.views}</td>
                                                <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                                                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                                        <Link href={`/blog/${post.slug}`} className="btn btn-outline" style={{ padding: '0.25rem 0.5rem' }}>
                                                            <Eye size={14} />
                                                        </Link>
                                                        <Link href={`/admin/posts/${post.id}`} className="btn btn-outline" style={{ padding: '0.25rem 0.5rem' }}>
                                                            <Edit size={14} />
                                                        </Link>
                                                        <button onClick={() => deletePost(post.id)} className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', color: 'red' }}>
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--muted)' }}>
                                    <FileText size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                                    <p>No posts yet. Create your first post!</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Posts Tab */}
                {activeTab === 'posts' && (
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h1>All Posts</h1>
                            <Link href="/admin/posts/new" className="btn btn-primary">
                                <Plus size={18} /> New Post
                            </Link>
                        </div>

                        <div className="card" style={{ padding: '1.5rem' }}>
                            {posts.length > 0 ? (
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                            <th style={{ textAlign: 'left', padding: '0.75rem', color: 'var(--muted)', fontWeight: 500 }}>Title</th>
                                            <th style={{ textAlign: 'left', padding: '0.75rem', color: 'var(--muted)', fontWeight: 500 }}>Category</th>
                                            <th style={{ textAlign: 'left', padding: '0.75rem', color: 'var(--muted)', fontWeight: 500 }}>Status</th>
                                            <th style={{ textAlign: 'left', padding: '0.75rem', color: 'var(--muted)', fontWeight: 500 }}>Views</th>
                                            <th style={{ textAlign: 'left', padding: '0.75rem', color: 'var(--muted)', fontWeight: 500 }}>Date</th>
                                            <th style={{ textAlign: 'right', padding: '0.75rem', color: 'var(--muted)', fontWeight: 500 }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {posts.map(post => (
                                            <tr key={post.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                                <td style={{ padding: '0.75rem' }}>{post.title}</td>
                                                <td style={{ padding: '0.75rem' }}>{post.category?.name || '-'}</td>
                                                <td style={{ padding: '0.75rem' }}>
                                                    <span className={`badge ${post.published ? '' : 'badge-secondary'}`}>
                                                        {post.published ? 'Published' : 'Draft'}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '0.75rem' }}>{post.views}</td>
                                                <td style={{ padding: '0.75rem' }}>{new Date(post.createdAt).toLocaleDateString()}</td>
                                                <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                                                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                                        <Link href={`/blog/${post.slug}`} className="btn btn-outline" style={{ padding: '0.25rem 0.5rem' }}>
                                                            <Eye size={14} />
                                                        </Link>
                                                        <Link href={`/admin/posts/${post.id}`} className="btn btn-outline" style={{ padding: '0.25rem 0.5rem' }}>
                                                            <Edit size={14} />
                                                        </Link>
                                                        <button onClick={() => deletePost(post.id)} className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', color: 'red' }}>
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--muted)' }}>
                                    <FileText size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                                    <p style={{ marginBottom: '1rem' }}>No posts yet.</p>
                                    <Link href="/admin/posts/new" className="btn btn-primary">Create First Post</Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Categories Tab */}
                {activeTab === 'categories' && (
                    <div>
                        <h1 style={{ marginBottom: '2rem' }}>Categories</h1>

                        {/* Add Category */}
                        <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
                            <h3 style={{ marginBottom: '1rem' }}>Add New Category</h3>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Category name"
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                    style={{ maxWidth: '300px' }}
                                />
                                <button onClick={createCategory} className="btn btn-primary">
                                    <Plus size={18} /> Add Category
                                </button>
                            </div>
                        </div>

                        {/* Categories List */}
                        <div className="card" style={{ padding: '1.5rem' }}>
                            {categories.length > 0 ? (
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                            <th style={{ textAlign: 'left', padding: '0.75rem', color: 'var(--muted)', fontWeight: 500 }}>Name</th>
                                            <th style={{ textAlign: 'left', padding: '0.75rem', color: 'var(--muted)', fontWeight: 500 }}>Slug</th>
                                            <th style={{ textAlign: 'left', padding: '0.75rem', color: 'var(--muted)', fontWeight: 500 }}>Posts</th>
                                            <th style={{ textAlign: 'right', padding: '0.75rem', color: 'var(--muted)', fontWeight: 500 }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categories.map(category => (
                                            <tr key={category.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                                <td style={{ padding: '0.75rem' }}>{category.name}</td>
                                                <td style={{ padding: '0.75rem', color: 'var(--muted)' }}>{category.slug}</td>
                                                <td style={{ padding: '0.75rem' }}>
                                                    <span className="badge badge-secondary">{category._count?.posts || 0}</span>
                                                </td>
                                                <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                                                    <button onClick={() => deleteCategory(category.id)} className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', color: 'red' }}>
                                                        <Trash2 size={14} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--muted)' }}>
                                    <FolderOpen size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                                    <p>No categories yet. Add your first category above!</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
