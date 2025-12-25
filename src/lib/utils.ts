// Utility functions for the blogging site

/**
 * Calculate reading time based on content
 * Average reading speed: 200 words per minute
 */
export function calculateReadingTime(content: string): number {
  // Strip HTML tags
  const textContent = content.replace(/<[^>]*>/g, '');
  const words = textContent.trim().split(/\s+/).length;
  const readingTime = Math.ceil(words / 200);
  return Math.max(1, readingTime); // Minimum 1 minute
}

/**
 * Generate a URL-friendly slug from a string
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Format a date for display
 */
export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Extract headings from HTML content for Table of Contents
 */
export function extractHeadings(content: string): { id: string; text: string; level: number }[] {
  const headingRegex = /<h([2-3])[^>]*(?:id="([^"]*)")?[^>]*>([^<]*)<\/h[2-3]>/gi;
  const headings: { id: string; text: string; level: number }[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = parseInt(match[1]);
    const existingId = match[2];
    const text = match[3].trim();
    const id = existingId || generateSlug(text);
    headings.push({ id, text, level });
  }

  return headings;
}

/**
 * Add IDs to headings in HTML content
 */
export function addHeadingIds(content: string): string {
  return content.replace(/<h([2-3])([^>]*)>([^<]*)<\/h[2-3]>/gi, (match, level, attrs, text) => {
    if (attrs.includes('id=')) {
      return match;
    }
    const id = generateSlug(text.trim());
    return `<h${level} id="${id}"${attrs}>${text}</h${level}>`;
  });
}

/**
 * Truncate text to a specific length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
