'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import Link from 'next/link';
import { sanitizeBlogPost } from '@/lib/sanitize';

// Mock blog data (in production, fetch from database/CMS)
const blogPosts = {
    'buffer-overflow-attacks': {
        title: 'Understanding Buffer Overflow Attacks',
        date: 'January 10, 2024',
        author: 'Ali Ahmed',
        category: 'Security Research',
        content: `
A buffer overflow occurs when a program writes more data to a buffer than it was allocated to hold. This excess data overflows into adjacent memory locations, potentially corrupting or overwriting the data they contain.

## The Mechanics

In a typical buffer overflow attack, an attacker exploits this vulnerability to inject and execute malicious code. The attack works because many programs allocate fixed-size buffers on the stack or heap.

\`\`\`c
// Vulnerable code example
char buffer[64];
strcpy(buffer, user_input); // No bounds checking!
\`\`\`

## Prevention Techniques

1. **Use Safe Functions**: Replace \`strcpy\` with \`strncpy\`, \`gets\` with \`fgets\`
2. **Input Validation**: Always validate and sanitize user input
3. **Stack Canaries**: Compiler-level protection mechanisms
4. **ASLR**: Address Space Layout Randomization
5. **DEP/NX**: Data Execution Prevention

## Real-World Impact

Buffer overflows have been responsible for some of the most critical security vulnerabilities in history, including the Morris Worm (1988) and countless modern exploits.

*"The way of the warrior is found in death" - Hagakure*
    `,
    },
    'hackthebox-journey': {
        title: 'My Journey Through HackTheBox',
        date: 'December 28, 2023',
        author: 'Ali Ahmed',
        category: 'CTF',
        content: `
HackTheBox has been my dojo for sharpening cybersecurity skills through hands-on practice. This is my journey from Script Kiddie to Hacker rank.

## Starting Out

My first box was "Lame" - an appropriately named introduction to the platform. The feelings of frustration, then enlightenment, then triumph became a familiar cycle.

## Key Lessons Learned

- **Enumeration is Everything**: 80% of the work is thorough reconnaissance
- **Document Everything**: Keep detailed notes of every command and result
- **Think Outside the Box**: The obvious path is rarely the correct one
- **Read The #### Manual**: RTFM isn't just a meme, it's wisdom

## Favorite Boxes

1. **Haystack** - Spanish OSINT challenge
2. **Magic** - Perfect blend of web and privilege escalation
3. **Registry** - Docker exploitation masterclass

*"Fall seven times, stand up eight" - Japanese  Proverb*
    `,
    },
    'building-secure-apis': {
        title: 'Building Secure APIs: A Practical Guide',
        date: 'December 15, 2023',
        author: 'Ali Ahmed',
        category: 'Development',
        content: `
API security is critical in modern web applications. This guide covers the essential practices for building APIs that can withstand real-world attacks.

## Authentication & Authorization

Never conflate these two concepts:
- **Authentication**: Who are you?
- **Authorization**: What can you do?

\`\`\`javascript
// Proper JWT validation
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw new Error('Invalid token');
  }
};
\`\`\`

## Rate Limiting

Implement rate limiting to prevent abuse:

- **Per-IP limits**: Prevent brute force
- **Per-User limits**: Prevent resource exhaustion
- **Endpoint-specific limits**: Critical paths need stricter rules

## Input Validation

Trust nothing from the user:

1. Validate data types
2. Sanitize inputs
3. Use parameterized queries
4. Implement request size limits

## HTTPS Everywhere

There is no excuse for unencrypted API traffic in modern applications.

*"The supreme art of war is to subdue the enemy without fighting" - Sun Tzu*
    `,
    },
};

export default function BlogPost() {
    const params = useParams();
    const slug = params.slug as string;
    const post = blogPosts[slug as keyof typeof blogPosts];

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-paper dark:bg-void px-4">
                <div className="text-center">
                    <h1 className="text-6xl font-cinzel font-black text-ink dark:text-bone mb-4">
                        404
                    </h1>
                    <p className="text-xl font-playfair text-charcoal dark:text-smoke mb-8">
                        This scroll has been lost to time...
                    </p>
                    <Link
                        href="/"
                        className="ink-button inline-flex items-center gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Return Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-paper dark:bg-void">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="sticky top-0 z-50 bg-paper/90 dark:bg-void/90 backdrop-blur-sm border-b border-ink/10 dark:border-bone/10 px-4 py-4"
            >
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-ink dark:text-bone hover:text-blood dark:hover:text-blood transition-colors font-mono text-sm"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Archives
                    </Link>
                    <div className="text-xs font-mono text-smoke">
                        {post.category}
                    </div>
                </div>
            </motion.div>

            {/* Article */}
            <article className="max-w-4xl mx-auto px-4 py-16">
                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <h1 className="text-5xl md:text-6xl font-cinzel font-black text-ink dark:text-bone mb-6 leading-tight">
                        {post.title}
                    </h1>
                    <div className="flex items-center gap-6 text-sm font-mono text-charcoal dark:text-smoke">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {post.date}
                        </div>
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            {post.author}
                        </div>
                    </div>
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="prose prose-lg prose-neutral dark:prose-invert max-w-none
            prose-headings:font-cinzel prose-headings:font-bold prose-headings:text-ink dark:prose-headings:text-bone
            prose-p:font-playfair prose-p:text-charcoal dark:prose-p:text-smoke prose-p:leading-relaxed
            prose-code:font-mono prose-code:text-blood prose-code:bg-ash/10 dark:prose-code:bg-bone/10 prose-code:px-1 prose-code:py-0.5
            prose-pre:bg-charcoal dark:prose-pre:bg-void prose-pre:border prose-pre:border-ink/20 dark:prose-pre:border-bone/20
            prose-blockquote:border-l-4 prose-blockquote:border-blood prose-blockquote:italic prose-blockquote:font-playfair
            prose-strong:text-ink dark:prose-strong:text-bone prose-strong:font-bold
            prose-a:text-blood hover:prose-a:underline"
                    dangerouslySetInnerHTML={{
                        __html: sanitizeBlogPost(
                            post.content.split('\n').map(line => {
                                // Simple markdown parsing for demo
                                if (line.startsWith('## ')) return `<h2>${line.slice(3)}</h2>`;
                                if (line.startsWith('# ')) return `<h1>${line.slice(2)}</h1>`;
                                if (line.match(/^\d+\./)) return `<li>${line}</li>`;
                                if (line.startsWith('- ')) return `<li>${line.slice(2)}</li>`;
                                if (line.startsWith('*') && line.endsWith('*')) return `<blockquote>${line}</blockquote>`;
                                if (line.startsWith('```')) return line.includes('```c') ? '<pre><code class="language-c">' : '</code></pre>';
                                if (line.startsWith('```javascript')) return '<pre><code class="language-javascript">';
                                return `<p>${line}</p>`;
                            }).join('')
                        )
                    }}
                />

                {/* Blossom decoration at end */}
                <div className="mt-16 pt-8 border-t-2 border-ink/10 dark:border-bone/10 flex items-center justify-center">
                    <div className="w-8 h-8 text-[#FFB7C5] opacity-30">
                        🌸
                    </div>
                </div>
            </article>
        </div>
    );
}
