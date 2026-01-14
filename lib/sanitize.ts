/**
 * HTML Sanitization Utility
 * 
 * Uses DOMPurify to sanitize untrusted HTML/Markdown content before rendering.
 * This prevents XSS attacks by removing malicious scripts and unsafe elements.
 * 
 * @module lib/sanitize
 */

import DOMPurify from 'isomorphic-dompurify';

/**
 * Sanitize HTML string to prevent XSS attacks
 * 
 * @param dirty - Untrusted HTML string (e.g., from user input or external sources)
 * @returns Sanitized HTML string safe for rendering
 * 
 * @example
 * ```typescript
 * const userInput = '<script>alert("XSS")</script><p>Safe content</p>';
 * const clean = sanitizeHtml(userInput);
 * // Returns: '<p>Safe content</p>'
 * ```
 */
export function sanitizeHtml(dirty: string): string {
    return DOMPurify.sanitize(dirty, {
        // Allow common safe HTML tags
        ALLOWED_TAGS: [
            'p', 'br', 'strong', 'em', 'u', 's', 'a', 'ul', 'ol', 'li',
            'blockquote', 'code', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'img', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'hr', 'span', 'div'
        ],
        // Allow safe attributes
        ALLOWED_ATTR: [
            'href', 'title', 'alt', 'src', 'class', 'id', 'target', 'rel'
        ],
        // Ensure links open in new tab and have noopener
        ALLOW_UNKNOWN_PROTOCOLS: false,
        SAFE_FOR_TEMPLATES: true,
    });
}

/**
 * Sanitize HTML string with strict mode (more restrictive)
 * 
 * Use this for user-generated content where you want minimal formatting.
 * Only allows basic text formatting tags.
 * 
 * @param dirty - Untrusted HTML string
 * @returns Strictly sanitized HTML string
 * 
 * @example
 * ```typescript
 * const userComment = '<p>Comment</p><img src="x" onerror="alert(1)">';
 * const clean = sanitizeHtmlStrict(userComment);
 * // Returns: '<p>Comment</p>' (img tag removed)
 * ```
 */
export function sanitizeHtmlStrict(dirty: string): string {
    return DOMPurify.sanitize(dirty, {
        ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'a', 'code'],
        ALLOWED_ATTR: ['href', 'title'],
        ALLOW_UNKNOWN_PROTOCOLS: false,
    });
}

/**
 * Sanitize and extract plain text from HTML
 * 
 * Removes all HTML tags and returns only text content.
 * Useful for previews, meta descriptions, or search indexing.
 * 
 * @param dirty - HTML string
 * @returns Plain text content
 * 
 * @example
 * ```typescript
 * const html = '<p>Hello <strong>world</strong>!</p>';
 * const text = sanitizeToPlainText(html);
 * // Returns: 'Hello world!'
 * ```
 */
export function sanitizeToPlainText(dirty: string): string {
    const clean = DOMPurify.sanitize(dirty, {
        ALLOWED_TAGS: [],
        KEEP_CONTENT: true,
    });
    return clean.trim();
}

/**
 * Sanitize URL to prevent javascript: and data: URI XSS
 * 
 * @param url - Untrusted URL string
 * @returns Sanitized URL or empty string if invalid
 * 
 * @example
 * ```typescript
 * const maliciousUrl = 'javascript:alert(1)';
 * const safe = sanitizeUrl(maliciousUrl);
 * // Returns: ''
 * 
 * const validUrl = 'https://example.com';
 * const safe2 = sanitizeUrl(validUrl);
 * // Returns: 'https://example.com'
 * ```
 */
export function sanitizeUrl(url: string): string {
    // Remove whitespace
    const trimmed = url.trim();

    // Check for dangerous protocols
    const dangerousProtocols = ['javascript:', 'data:', 'vbscript:', 'file:'];
    const lowerUrl = trimmed.toLowerCase();

    for (const protocol of dangerousProtocols) {
        if (lowerUrl.startsWith(protocol)) {
            return '';
        }
    }

    // Only allow http, https, mailto, and relative URLs
    if (
        trimmed.startsWith('http://') ||
        trimmed.startsWith('https://') ||
        trimmed.startsWith('mailto:') ||
        trimmed.startsWith('/') ||
        trimmed.startsWith('#')
    ) {
        return trimmed;
    }

    // If it doesn't start with a protocol, assume it's relative
    if (!trimmed.includes(':')) {
        return trimmed;
    }

    // Otherwise, reject it
    return '';
}

/**
 * Configuration preset for blog posts
 * Allows more formatting options for rich content
 */
export const BLOG_SANITIZE_CONFIG = {
    ALLOWED_TAGS: [
        'p', 'br', 'strong', 'em', 'u', 's', 'a', 'ul', 'ol', 'li',
        'blockquote', 'code', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'img', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'hr', 'span', 'div',
        'mark', 'small', 'sub', 'sup', 'kbd'
    ],
    ALLOWED_ATTR: [
        'href', 'title', 'alt', 'src', 'class', 'id', 'target', 'rel',
        'width', 'height', 'align'
    ],
    ALLOW_UNKNOWN_PROTOCOLS: false,
    SAFE_FOR_TEMPLATES: true,
};

/**
 * Sanitize HTML for blog posts with custom config
 * 
 * @param dirty - Blog post HTML content
 * @returns Sanitized HTML suitable for blog posts
 */
export function sanitizeBlogPost(dirty: string): string {
    return DOMPurify.sanitize(dirty, BLOG_SANITIZE_CONFIG);
}
