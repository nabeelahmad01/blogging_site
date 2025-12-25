"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setResponseMessage(data.message);
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setResponseMessage(data.error);
      }
    } catch {
      setStatus("error");
      setResponseMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
    >
      {status === "success" && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "1rem",
            background: "rgba(34, 197, 94, 0.1)",
            border: "1px solid rgba(34, 197, 94, 0.3)",
            borderRadius: "0.5rem",
            color: "#22c55e",
          }}
        >
          <CheckCircle size={20} />
          {responseMessage}
        </div>
      )}

      {status === "error" && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "1rem",
            background: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            borderRadius: "0.5rem",
            color: "#ef4444",
          }}
        >
          <AlertCircle size={20} />
          {responseMessage}
        </div>
      )}

      <div>
        <label
          style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}
        >
          Your Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="input"
          placeholder="John Doe"
          required
          disabled={status === "loading"}
        />
      </div>

      <div>
        <label
          style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}
        >
          Email Address
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="input"
          placeholder="john@example.com"
          required
          disabled={status === "loading"}
        />
      </div>

      <div>
        <label
          style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}
        >
          Subject
        </label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="input"
          placeholder="How can we help?"
          required
          disabled={status === "loading"}
        />
      </div>

      <div>
        <label
          style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}
        >
          Message
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="textarea"
          placeholder="Your message here..."
          required
          disabled={status === "loading"}
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={status === "loading"}
        style={{
          alignSelf: "flex-start",
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
            Sending...
          </>
        ) : (
          <>
            <Send size={18} />
            Send Message
          </>
        )}
      </button>

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
    </form>
  );
}
