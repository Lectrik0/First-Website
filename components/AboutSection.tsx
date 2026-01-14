'use client';

import { motion } from 'framer-motion';

export default function AboutSection() {
    const principles = [
        { label: 'Projects', value: '50+', kanji: '作' },
        { label: 'Years', value: '5+', kanji: '年' },
        { label: 'Lines', value: '100K+', kanji: '行' },
        { label: 'Focus', value: '∞', kanji: '心' },
    ];

    return (
        <section id="journey" className="py-20 px-4 md:px-8 lg:px-16 bg-ricePaper/50">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-noto font-bold text-sumiInk mb-6">
                        The Journey
                    </h2>
                    <div className="flex justify-center mb-6">
                        <div className="w-32 h-1 bg-sumiInk"></div>
                    </div>
                </div>

                {/* About Content */}
                <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                    >
                        <h3 className="text-3xl font-noto text-sumiInk mb-6">
                            The Way of Code
                        </h3>
                        <div className="space-y-4 font-garamond text-darkGrey/90 text-lg leading-relaxed">
                            <p>
                                Like a wanderer on an endless path, I traverse the landscape of
                                technology with mindful intention. Each line of code is a brushstroke,
                                each project a meditation.
                            </p>
                            <p>
                                The way of the developer mirrors the way of the sword—discipline,
                                focus, and the pursuit of perfection through relentless practice.
                                In stillness, we find clarity. In motion, we find purpose.
                            </p>
                            <p>
                                This portfolio is not a collection of achievements, but a record
                                of the journey itself. Every challenge overcome, every lesson learned,
                                etched into the fabric of growth.
                            </p>
                        </div>

                        {/* Philosophical Quote */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                            className="mt-8 pl-6 border-l-2 border-sumiInk/40"
                        >
                            <p className="font-garamond italic text-darkGrey/70">
                                "In the beginner's mind there are many possibilities,
                                in the expert's mind there are few."
                            </p>
                            <p className="font-playfair text-sm text-fadedInk mt-2">
                                — Zen Proverb
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Visual Element */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="relative"
                    >
                        <div className="paper-texture brush-border-uneven p-12 ink-shadow-strong">
                            <div className="aspect-square flex items-center justify-center">
                                <span className="text-9xl font-noto text-sumiInk/10">道</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Principles Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {principles.map((principle, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
                            whileHover={{
                                y: -4,
                                transition: { duration: 0.3, ease: 'easeOut' }
                            }}
                            className="paper-texture brush-border p-6 text-center ink-shadow"
                        >
                            <div className="text-4xl font-noto text-sumiInk/20 mb-2">
                                {principle.kanji}
                            </div>
                            <div className="text-2xl md:text-3xl font-noto font-bold text-sumiInk mb-1">
                                {principle.value}
                            </div>
                            <div className="text-sm font-playfair text-darkGrey uppercase tracking-wide">
                                {principle.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
