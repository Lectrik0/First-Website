'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, Tag } from 'lucide-react';

export default function TheArchives() {
    const blogPosts = [
        {
            title: 'Understanding Buffer Overflow Attacks',
            excerpt: 'A deep dive into memory corruption vulnerabilities and how to exploit them ethically for penetration testing.',
            date: 'January 10, 2024',
            readTime: '8 min',
            tags: ['Security', 'Exploitation', 'Memory'],
            slug: 'buffer-overflow-attacks',
        },
        {
            title: 'My Journey Through HackTheBox',
            excerpt: 'Lessons learned from solving 50+ machines on HTB and how it shaped my pentesting methodology.',
            date: 'December 28, 2023',
            readTime: '6 min',
            tags: ['CTF', 'Learning', 'Penetration Testing'],
            slug: 'hackthebox-journey',
        },
        {
            title: 'Building Secure APIs: A Developer\'s Guide',
            excerpt: 'Common API security vulnerabilities and best practices for building secure REST APIs from the ground up.',
            date: 'December 15, 2023',
            readTime: '10 min',
            tags: ['Development', 'Security', 'APIs'],
            slug: 'secure-apis-guide',
        },
        {
            title: 'Cryptography Fundamentals Every Developer Should Know',
            excerpt: 'Breaking down encryption, hashing, and digital signatures in a way that makes sense for practical application.',
            date: 'November 30, 2023',
            readTime: '12 min',
            tags: ['Cryptography', 'Theory', 'Security'],
            slug: 'cryptography-fundamentals',
        },
        {
            title: 'Setting Up Your First Home Lab',
            excerpt: 'A complete guide to building a cybersecurity home lab for practicing penetration testing and red team operations.',
            date: 'November 18, 2023',
            readTime: '15 min',
            tags: ['Lab', 'Setup', 'Infrastructure'],
            slug: 'home-lab-setup',
        },
        {
            title: 'Web Application Pentesting Methodology',
            excerpt: 'My systematic approach to web app security testing, from reconnaissance to post-exploitation.',
            date: 'October 25, 2023',
            readTime: '9 min',
            tags: ['Web Security', 'Methodology', 'Pentesting'],
            slug: 'web-app-methodology',
        },
    ];

    return (
        <section id="archives" className="py-24 px-4 md:px-8 lg:px-16 bg-paper/50 dark:bg-void/50">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <h2 className="text-5xl md:text-7xl font-playfair font-black text-ink dark:text-bone mb-4">
                        THE ARCHIVES
                    </h2>
                    <div className="w-32 h-1 bg-ink dark:bg-bone mb-6" />
                    <p className="text-xl font-playfair italic text-charcoal dark:text-smoke max-w-2xl">
                        "Knowledge shared is knowledge multiplied. Lessons learned are lessons earned."
                    </p>
                </motion.div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post, index) => (
                        <motion.article
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="paper-card p-6 flex flex-col group cursor-pointer torn-edge"
                        >
                            {/* Date & Read Time */}
                            <div className="flex items-center justify-between mb-4 text-xs font-mono text-ash dark:text-smoke">
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    <span>{post.date}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    <span>{post.readTime}</span>
                                </div>
                            </div>

                            {/* Title */}
                            <h3 className="text-2xl font-playfair font-bold text-ink dark:text-bone mb-3 group-hover:underline decoration-2 underline-offset-4 transition-all">
                                {post.title}
                            </h3>

                            {/* Excerpt */}
                            <p className="font-playfair text-charcoal dark:text-smoke mb-4 flex-grow leading-relaxed">
                                {post.excerpt}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag, i) => (
                                    <span
                                        key={i}
                                        className="px-3 py-1 text-xs font-mono border border-ink/20 dark:border-bone/20 text-ink dark:text-bone"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Read More Link */}
                            <div className="mt-4 pt-4 border-t border-ink/10 dark:border-bone/10">
                                <a
                                    href={`/blog/${post.slug}`}
                                    className="font-playfair font-semibold text-ink dark:text-bone brush-underline inline-block"
                                >
                                    Read Article →
                                </a>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
