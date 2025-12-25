"use client";

import { useState, useEffect } from "react";
import { Send, User, Mail, MessageSquare, Loader2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Comment {
  id: string;
  name: string;
  content: string;
  createdAt: string;
}

interface CommentSectionProps {
  postId: string;
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/comments?postId=${postId}`);
      if (res.ok) {
        const data = await res.json();
        setComments(data);
      }
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, name, email, content }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: "success", text: "Comment posted successfully!" });
        setName("");
        setEmail("");
        setContent("");
        fetchComments(); // Refresh comments
      } else {
        setMessage({ type: "error", text: data.error });
      }
    } catch {
      setMessage({ type: "error", text: "Failed to post comment" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        marginTop: "3rem",
        paddingTop: "2rem",
        borderTop: "1px solid var(--border)",
      }}
    >
      <h2
        style={{
          marginBottom: "1.5rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <MessageSquare size={24} />
        Comments ({comments.length})
      </h2>

      {/* Comment Form */}
      <div className="card" style={{ padding: "1.5rem", marginBottom: "2rem" }}>
        <h3 style={{ marginBottom: "1rem", fontSize: "1.125rem" }}>
          Leave a Comment
        </h3>
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
              marginBottom: "1rem",
            }}
          >
            <div style={{ position: "relative" }}>
              <User
                size={18}
                style={{
                  position: "absolute",
                  left: "1rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--muted)",
                }}
              />
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="input"
                style={{ paddingLeft: "2.75rem" }}
              />
            </div>
            <div style={{ position: "relative" }}>
              <Mail
                size={18}
                style={{
                  position: "absolute",
                  left: "1rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--muted)",
                }}
              />
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input"
                style={{ paddingLeft: "2.75rem" }}
              />
            </div>
          </div>
          <textarea
            placeholder="Write your comment..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="textarea"
            style={{ marginBottom: "1rem", minHeight: "120px" }}
          />

          {message.text && (
            <div
              style={{
                marginBottom: "1rem",
                padding: "0.75rem 1rem",
                borderRadius: "0.5rem",
                background:
                  message.type === "success"
                    ? "rgba(34, 197, 94, 0.1)"
                    : "rgba(239, 68, 68, 0.1)",
                color: message.type === "success" ? "#22c55e" : "#ef4444",
                fontSize: "0.875rem",
              }}
            >
              {message.text}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="btn btn-primary"
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            {submitting ? (
              <>
                <Loader2
                  size={18}
                  style={{ animation: "spin 1s linear infinite" }}
                />
                Posting...
              </>
            ) : (
              <>
                <Send size={18} />
                Post Comment
              </>
            )}
          </button>
        </form>
      </div>

      {/* Comments List */}
      {loading ? (
        <div
          style={{
            textAlign: "center",
            padding: "2rem",
            color: "var(--muted)",
          }}
        >
          <Loader2
            size={32}
            style={{
              animation: "spin 1s linear infinite",
              marginBottom: "0.5rem",
            }}
          />
          <p>Loading comments...</p>
        </div>
      ) : comments.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "3rem",
            background: "var(--secondary)",
            borderRadius: "1rem",
            color: "var(--muted)",
          }}
        >
          <MessageSquare
            size={48}
            style={{ marginBottom: "1rem", opacity: 0.5 }}
          />
          <p>No comments yet. Be the first to comment!</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="card"
              style={{ padding: "1.25rem" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginBottom: "0.75rem",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: 600,
                    fontSize: "1rem",
                  }}
                >
                  {comment.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 style={{ fontSize: "1rem", marginBottom: "0.125rem" }}>
                    {comment.name}
                  </h4>
                  <span style={{ fontSize: "0.75rem", color: "var(--muted)" }}>
                    {formatDistanceToNow(new Date(comment.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>
              <p style={{ color: "var(--foreground)", lineHeight: 1.7 }}>
                {comment.content}
              </p>
            </div>
          ))}
        </div>
      )}

      <style jsx global>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @media (max-width: 600px) {
          form > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
