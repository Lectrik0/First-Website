'use client';

import { motion } from 'framer-motion';
import { philosophyEntries } from '@/data/philosophyData';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PhilosophyPage() {
    return (
        <main className="min-h-screen bg-paper dark:bg-void">
            {/* Minimalist Navigation */}
            <div className="fixed top-6 left-6 z-50">
                <Link href="/">
                    <motion.button
                        whileHover={{ x: -5 }}
                        className="flex items-center gap-2 px-4 py-2 border-2 border-ink dark:border-bone text-ink dark:text-bone hover:bg-ink hover:dark:bg-bone hover:text-paper hover:dark:text-void transition-all font-mono text-sm"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Return</span>
                    </motion.button>
                </Link>
            </div>

            {/* Content */}
            <div className="max-w-3xl mx-auto px-6 py-24">
                {/* Page Title */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="mb-20 text-center"
                >
                    <h1 className="text-7xl md:text-9xl font-playfair font-black text-ink dark:text-bone mb-6 tracking-tight">
                        PHILOSOPHY
                    </h1>
                    <div className="w-24 h-1 bg-ink dark:bg-bone mx-auto" />
                </motion.div>

                {/* Philosophy Entries */}
                <div className="space-y-32">
                    {philosophyEntries.map((entry, index) => (
                        <motion.article
                            key={entry.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className="relative"
                        >
                            {/* Title */}
                            <h2 className="text-3xl md:text-5xl font-playfair font-bold text-center text-ink dark:text-bone mb-8 leading-tight">
                                {entry.title}
                            </h2>

                            {/* Date */}
                            <div className="text-center mb-12">
                                <time className="text-sm font-mono text-ash dark:text-smoke uppercase tracking-widest">
                                    {new Date(entry.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </time>
                            </div>

                            {/* Content - Manga Monologue Style */}
                            <div className="relative">
                                {/* Decorative corners */}
                                <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-ink/20 dark:border-bone/20 -translate-x-2 -translate-y-2" />
                                <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-ink/20 dark:border-bone/20 translate-x-2 -translate-y-2" />
                                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-ink/20 dark:border-bone/20 -translate-x-2 translate-y-2" />
                                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-ink/20 dark:border-bone/20 translate-x-2 translate-y-2" />

                                {/* Text Content */}
                                <div className="py-12 px-4 text-center">
                                    {entry.content.split('\n\n').map((paragraph, i) => (
                                        <motion.p
                                            key={i}
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.8, delay: i * 0.2 }}
                                            className="text-lg md:text-xl font-playfair text-ink dark:text-bone leading-relaxed mb-8 last:mb-0 whitespace-pre-line"
                                        >
                                            {paragraph}
                                        </motion.p>
                                    ))}
                                </div>
                            </div>

                            {/* Divider */}
                            {index < philosophyEntries.length - 1 && (
                                <div className="mt-20 flex items-center justify-center">
                                    <div className="w-2 h-2 bg-ink dark:bg-bone rotate-45" />
                                    <div className="w-24 h-px bg-ink/30 dark:bg-bone/30 mx-4" />
                                    <div className="w-2 h-2 bg-ink dark:bg-bone rotate-45" />
                                </div>
                            )}
                        </motion.article>
                    ))}
                </div>

                {/* Footer Quote */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="mt-32 text-center"
                >
                    <p className="text-sm font-playfair italic text-ash dark:text-smoke">
                        The path continues. The blade sharpens with each step.
                    </p>
                </motion.div>
            </div>
        </main>
    );
}
