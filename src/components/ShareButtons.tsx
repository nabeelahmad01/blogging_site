'use client';

import { Facebook, Twitter, Linkedin, Link as LinkIcon, Check } from 'lucide-react';
import { useState } from 'react';

interface ShareButtonsProps {
    url: string;
    title: string;
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
    const [copied, setCopied] = useState(false);

    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    const shareLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
        linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
    };

    const copyLink = async () => {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const buttonStyle = {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid var(--border)',
        background: 'var(--background)',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        color: 'var(--muted)',
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.875rem', color: 'var(--muted)', fontWeight: 500 }}>Share:</span>

            <a
                href={shareLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                style={buttonStyle}
                className="share-btn"
            >
                <Facebook size={18} />
            </a>

            <a
                href={shareLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                style={buttonStyle}
                className="share-btn"
            >
                <Twitter size={18} />
            </a>

            <a
                href={shareLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={buttonStyle}
                className="share-btn"
            >
                <Linkedin size={18} />
            </a>

            <button
                onClick={copyLink}
                style={{
                    ...buttonStyle,
                    background: copied ? 'var(--primary)' : 'var(--background)',
                    borderColor: copied ? 'var(--primary)' : 'var(--border)',
                    color: copied ? 'white' : 'var(--muted)',
                }}
                className="share-btn"
            >
                {copied ? <Check size={18} /> : <LinkIcon size={18} />}
            </button>

            <style jsx>{`
        .share-btn:hover {
          border-color: var(--primary);
          color: var(--primary);
        }
      `}</style>
        </div>
    );
}
