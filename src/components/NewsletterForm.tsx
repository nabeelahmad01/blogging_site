"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message);
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error);
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }

    // Reset status after 5 seconds
    setTimeout(() => {
      setStatus("idle");
      setMessage("");
    }, 5000);
  };

  return (
    <div style={{ position: "relative" }}>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          gap: "0.75rem",
          maxWidth: "450px",
          margin: "0 auto",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={status === "loading"}
          className="input"
          style={{
            flex: 1,
            minWidth: "200px",
            padding: "1rem 1.25rem",
          }}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn"
          style={{
            background: "white",
            color: "#667eea",
            padding: "1rem 2rem",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          {status === "loading" ? (
            <>
              <Loader2
                size={18}
                style={{ animation: "spin 1s linear infinite" }}
              />
              Subscribing...
            </>
          ) : (
            <>
              <Send size={18} />
              Subscribe
            </>
          )}
        </button>
      </form>

      {/* Status Message */}
      {message && (
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            padding: "0.75rem 1rem",
            borderRadius: "0.5rem",
            background:
              status === "success"
                ? "rgba(34, 197, 94, 0.2)"
                : "rgba(239, 68, 68, 0.2)",
            color: status === "success" ? "#22c55e" : "#ef4444",
            fontSize: "0.875rem",
            fontWeight: 500,
          }}
        >
          {status === "success" ? (
            <CheckCircle size={18} />
          ) : (
            <AlertCircle size={18} />
          )}
          {message}
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
      `}</style>
    </div>
  );
}
