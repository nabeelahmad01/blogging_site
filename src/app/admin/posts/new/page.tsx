"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Eye,
  Plus,
  Trash2,
  CloudOff,
  CloudLightning,
} from "lucide-react";
import ImageUpload from "@/components/ImageUpload";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface FAQ {
  question: string;
  answer: string;
}

export default function NewPostPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    categoryId: "",
    tags: "",
    featuredImg: "",
    published: false,
  });
  const [autoSaveStatus, setAutoSaveStatus] = useState<
    "saved" | "saving" | "unsaved"
  >("saved");

  // Load from localStorage on mount
  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(console.error);

    // Load draft from localStorage
    const savedDraft = localStorage.getItem("post-draft");
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        setForm(draft.form || form);
        setFaqs(draft.faqs || []);
        setAutoSaveStatus("saved");
      } catch {
        // Invalid draft, ignore
      }
    }
  }, []);

  // Auto-save to localStorage
  const autoSave = useCallback(() => {
    setAutoSaveStatus("saving");
    const draft = { form, faqs, savedAt: new Date().toISOString() };
    localStorage.setItem("post-draft", JSON.stringify(draft));
    setTimeout(() => setAutoSaveStatus("saved"), 500);
  }, [form, faqs]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (form.title || form.content) {
        autoSave();
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [form, faqs, autoSave]);

  // Clear draft after successful submit
  const clearDraft = () => {
    localStorage.removeItem("post-draft");
  };

  async function handleSubmit(e: React.FormEvent, publish: boolean = false) {
    e.preventDefault();

    if (
      !form.title ||
      !form.slug ||
      !form.excerpt ||
      !form.content ||
      !form.categoryId
    ) {
      alert("Please fill in all required fields including slug");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          published: publish,
          faqs: faqs.length > 0 ? JSON.stringify(faqs) : null,
        }),
      });

      if (res.ok) {
        clearDraft();
        router.push("/admin");
      } else {
        const error = await res.json();
        alert(error.error || "Failed to create post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem" }}>
      <div style={{ marginBottom: "2rem" }}>
        <Link
          href="/admin"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            color: "var(--muted)",
            textDecoration: "none",
            marginBottom: "1rem",
          }}
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1>Create New Post</h1>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "var(--muted)",
              fontSize: "0.875rem",
            }}
          >
            {autoSaveStatus === "saving" && (
              <>
                <CloudLightning size={16} /> Saving...
              </>
            )}
            {autoSaveStatus === "saved" && (
              <>
                <CloudOff size={16} /> Draft saved
              </>
            )}
          </div>
        </div>
      </div>

      <form onSubmit={(e) => handleSubmit(e, false)}>
        <div className="card" style={{ padding: "2rem" }}>
          {/* Title */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: 600,
              }}
            >
              Title <span style={{ color: "red" }}>*</span>
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

          {/* Slug */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: 600,
              }}
            >
              Slug (URL) <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              className="input"
              placeholder="my-awesome-blog-post"
              value={form.slug}
              onChange={(e) =>
                setForm({
                  ...form,
                  slug: e.target.value
                    .toLowerCase()
                    .replace(/[^a-z0-9-]/g, "-")
                    .replace(/--+/g, "-"),
                })
              }
              required
            />
            <p
              style={{
                fontSize: "0.75rem",
                color: "var(--muted)",
                marginTop: "0.25rem",
              }}
            >
              URL-friendly slug (lowercase, no spaces). Example:
              best-ai-tools-2025
            </p>
          </div>

          {/* Category */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: 600,
              }}
            >
              Category <span style={{ color: "red" }}>*</span>
            </label>
            <select
              className="input"
              value={form.categoryId}
              onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
              required
            >
              <option value="">Select a category...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {categories.length === 0 && (
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "var(--muted)",
                  marginTop: "0.5rem",
                }}
              >
                No categories yet.{" "}
                <Link href="/admin" style={{ color: "var(--primary)" }}>
                  Create one first
                </Link>
              </p>
            )}
          </div>

          {/* Excerpt */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: 600,
              }}
            >
              Excerpt <span style={{ color: "red" }}>*</span>
            </label>
            <textarea
              className="textarea"
              placeholder="Write a short excerpt for the post..."
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              style={{ minHeight: "80px" }}
              required
            />
            <p
              style={{
                fontSize: "0.75rem",
                color: "var(--muted)",
                marginTop: "0.25rem",
              }}
            >
              This will be shown on the blog listing page
            </p>
          </div>

          {/* Content */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: 600,
              }}
            >
              Content <span style={{ color: "red" }}>*</span>
            </label>
            <textarea
              className="textarea"
              placeholder="Write your blog post content here... (HTML supported)"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              style={{ minHeight: "400px", fontFamily: "monospace" }}
              required
            />
            <p
              style={{
                fontSize: "0.75rem",
                color: "var(--muted)",
                marginTop: "0.25rem",
              }}
            >
              You can use HTML tags for formatting: &lt;h2&gt;, &lt;h3&gt;,
              &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt;, &lt;em&gt;,
              &lt;a&gt;, &lt;img&gt;, etc.
            </p>
          </div>

          {/* Featured Image */}
          <div style={{ marginBottom: "1.5rem" }}>
            <ImageUpload
              value={form.featuredImg}
              onChange={(url) => setForm({ ...form, featuredImg: url })}
            />
          </div>

          {/* Tags */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: 600,
              }}
            >
              Tags
            </label>
            <input
              type="text"
              className="input"
              placeholder="technology, tips, tutorial"
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
            />
            <p
              style={{
                fontSize: "0.75rem",
                color: "var(--muted)",
                marginTop: "0.25rem",
              }}
            >
              Separate multiple tags with commas
            </p>
          </div>

          {/* FAQs Section */}
          <div style={{ marginBottom: "1.5rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.5rem",
              }}
            >
              <label style={{ fontWeight: 600 }}>
                FAQs (Frequently Asked Questions)
              </label>
              <button
                type="button"
                onClick={() => setFaqs([...faqs, { question: "", answer: "" }])}
                className="btn btn-secondary"
                style={{ padding: "0.4rem 0.8rem", fontSize: "0.875rem" }}
              >
                <Plus size={16} /> Add FAQ
              </button>
            </div>
            <p
              style={{
                fontSize: "0.75rem",
                color: "var(--muted)",
                marginBottom: "1rem",
              }}
            >
              Add frequently asked questions related to this post for SEO
            </p>

            {faqs.map((faq, index) => (
              <div
                key={index}
                style={{
                  background: "var(--secondary)",
                  padding: "1rem",
                  borderRadius: "0.5rem",
                  marginBottom: "1rem",
                  position: "relative",
                }}
              >
                <button
                  type="button"
                  onClick={() => setFaqs(faqs.filter((_, i) => i !== index))}
                  style={{
                    position: "absolute",
                    top: "0.5rem",
                    right: "0.5rem",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#dc2626",
                    padding: "0.25rem",
                  }}
                >
                  <Trash2 size={16} />
                </button>
                <div style={{ marginBottom: "0.75rem" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "0.25rem",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                    }}
                  >
                    Question {index + 1}
                  </label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Enter the question..."
                    value={faq.question}
                    onChange={(e) => {
                      const updated = [...faqs];
                      updated[index].question = e.target.value;
                      setFaqs(updated);
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "0.25rem",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                    }}
                  >
                    Answer
                  </label>
                  <textarea
                    className="textarea"
                    placeholder="Enter the answer..."
                    value={faq.answer}
                    onChange={(e) => {
                      const updated = [...faqs];
                      updated[index].answer = e.target.value;
                      setFaqs(updated);
                    }}
                    style={{ minHeight: "80px" }}
                  />
                </div>
              </div>
            ))}

            {faqs.length === 0 && (
              <p
                style={{
                  color: "var(--muted)",
                  fontSize: "0.875rem",
                  textAlign: "center",
                  padding: "1rem",
                  background: "var(--secondary)",
                  borderRadius: "0.5rem",
                }}
              >
                No FAQs added yet. Click &quot;Add FAQ&quot; to add questions.
              </p>
            )}
          </div>

          {/* Actions */}
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "flex-end",
              paddingTop: "1.5rem",
              borderTop: "1px solid var(--border)",
            }}
          >
            <button
              type="submit"
              className="btn btn-secondary"
              disabled={loading}
            >
              <Save size={18} /> Save as Draft
            </button>
            <button
              type="button"
              onClick={(e) => handleSubmit(e, true)}
              className="btn btn-primary"
              disabled={loading}
            >
              <Eye size={18} /> Publish Now
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
