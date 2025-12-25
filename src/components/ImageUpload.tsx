"use client";

import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({
  value,
  onChange,
  label = "Featured Image",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    setError("");
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        onChange(data.url);
      } else {
        setError(data.error);
      }
    } catch {
      setError("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleUpload(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  return (
    <div>
      <label
        style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}
      >
        {label}
      </label>

      {value ? (
        <div
          style={{
            position: "relative",
            borderRadius: "0.75rem",
            overflow: "hidden",
          }}
        >
          <img
            src={value}
            alt="Preview"
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
            }}
          />
          <button
            type="button"
            onClick={() => onChange("")}
            style={{
              position: "absolute",
              top: "0.5rem",
              right: "0.5rem",
              background: "rgba(0, 0, 0, 0.7)",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <X size={18} />
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          style={{
            border: `2px dashed ${
              dragActive ? "var(--primary)" : "var(--border)"
            }`,
            borderRadius: "0.75rem",
            padding: "2rem",
            textAlign: "center",
            cursor: "pointer",
            background: dragActive ? "var(--secondary)" : "transparent",
            transition: "all 0.2s ease",
          }}
        >
          {uploading ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <Loader2
                size={32}
                style={{
                  animation: "spin 1s linear infinite",
                  color: "var(--primary)",
                }}
              />
              <span style={{ color: "var(--muted)" }}>Uploading...</span>
            </div>
          ) : (
            <>
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "1rem",
                  background: "var(--secondary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1rem",
                }}
              >
                <ImageIcon size={28} style={{ color: "var(--muted)" }} />
              </div>
              <p style={{ marginBottom: "0.5rem", fontWeight: 500 }}>
                Drop an image here or{" "}
                <span style={{ color: "var(--primary)" }}>browse</span>
              </p>
              <p style={{ fontSize: "0.875rem", color: "var(--muted)" }}>
                JPEG, PNG, GIF, WebP • Max 5MB
              </p>
            </>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        style={{ display: "none" }}
      />

      {/* URL Input fallback */}
      <div style={{ marginTop: "1rem" }}>
        <label
          style={{
            fontSize: "0.875rem",
            color: "var(--muted)",
            display: "block",
            marginBottom: "0.25rem",
          }}
        >
          Or paste image URL:
        </label>
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="input"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      {error && (
        <p
          style={{
            marginTop: "0.5rem",
            color: "#ef4444",
            fontSize: "0.875rem",
          }}
        >
          {error}
        </p>
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
