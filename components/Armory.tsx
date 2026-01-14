'use client';

import { motion } from 'framer-motion';
import { armoryItems } from '@/data/armoryData';
import { TechStackItem } from '@/types';
import { useState } from 'react';

export default function Armory() {
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    return (
        <section id="armory" className="py-24 px-4 md:px-8 lg:px-16">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-5xl md:text-7xl font-playfair font-black text-ink dark:text-bone mb-4">
                        THE ARMORY
                    </h2>
                    <div className="w-32 h-1 bg-ink dark:bg-bone mb-6 mx-auto" />
                    <p className="text-xl font-playfair italic text-charcoal dark:text-smoke max-w-2xl mx-auto">
                        "The warrior's tools define their craft. Master each blade, and the path reveals itself."
                    </p>
                </motion.div>

                {/* Tech Stack Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {armoryItems.map((item, index) => (
                        <motion.div
                            key={item.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.4,
                                delay: index * 0.05,
                                ease: 'easeOut'
                            }}
                            className="relative"
                            onMouseEnter={() => setHoveredItem(item.name)}
                            onMouseLeave={() => setHoveredItem(null)}
                        >
                            {/* Item Card */}
                            <div className="paper-card p-6 flex flex-col items-center justify-center gap-4 h-40 relative overflow-hidden group cursor-pointer">
                                {/* Icon */}
                                <div
                                    className={`text-5xl transition-all duration-300 ${hoveredItem === item.name
                                            ? 'grayscale-0 filter drop-shadow-[0_0_8px_rgba(0,0,0,0.5)] dark:drop-shadow-[0_0_8px_rgba(239,239,239,0.5)]'
                                            : 'grayscale'
                                        }`}
                                >
                                    {item.icon}
                                </div>

                                {/* Name */}
                                <h3 className="font-mono text-sm font-bold text-ink dark:text-bone text-center uppercase tracking-wide">
                                    {item.name}
                                </h3>

                                {/* Glow Effect on Hover */}
                                {hoveredItem === item.name && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="absolute inset-0 bg-gradient-to-br from-ink/5 to-transparent dark:from-bone/5 pointer-events-none"
                                    />
                                )}
                            </div>

                            {/* RPG Tooltip */}
                            {hoveredItem === item.name && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 z-50 pointer-events-none"
                                >
                                    <div className="paper-card px-4 py-3 min-w-[250px] bg-white dark:bg-charcoal shadow-xl">
                                        {/* Header */}
                                        <div className="border-b-2 border-ink/20 dark:border-bone/20 pb-2 mb-2">
                                            <h4 className="font-playfair font-bold text-ink dark:text-bone text-base">
                                                {item.name}
                                            </h4>
                                        </div>

                                        {/* Stats */}
                                        <div className="space-y-1">
                                            <div className="flex items-center justify-between">
                                                <span className="font-mono text-xs text-charcoal dark:text-smoke">
                                                    Class:
                                                </span>
                                                <span className="font-mono text-xs font-semibold text-ink dark:text-bone">
                                                    {item.class}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="font-mono text-xs text-charcoal dark:text-smoke">
                                                    Proficiency:
                                                </span>
                                                <span
                                                    className={`font-mono text-xs font-semibold ${item.proficiency === 'Mastered'
                                                            ? 'text-blood'
                                                            : 'text-ink dark:text-bone'
                                                        }`}
                                                >
                                                    {item.proficiency}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="font-mono text-xs text-charcoal dark:text-smoke">
                                                    Category:
                                                </span>
                                                <span className="font-mono text-xs font-semibold text-ink dark:text-bone">
                                                    {item.category}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Arrow */}
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                                        <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-white dark:border-t-charcoal" />
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Quote */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-16 text-center"
                >
                    <p className="font-playfair text-sm italic text-ash dark:text-smoke">
                        Each tool sharpens the mind. Each skill forges the path.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
