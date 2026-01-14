'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

interface EducationNode {
    year: string;
    degree: string;
    institution: string;
    details: string;
}

export default function InkPath() {
    const [hoveredNode, setHoveredNode] = useState<number | null>(null);

    const education: EducationNode[] = [
        {
            year: '2021',
            degree: 'Bachelor of Science',
            institution: 'University of Technology',
            details: 'Computer Science & Cybersecurity',
        },
        {
            year: '2023',
            degree: 'Master of Science',
            institution: 'Institute of Advanced Studies',
            details: 'Information Security',
        },
        {
            year: '2025',
            degree: 'Ph.D. Candidate',
            institution: 'Research University',
            details: 'Offensive Security Research',
        },
    ];

    return (
        <section className="py-24 px-4 md:px-8 lg:px-16 relative">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-5xl font-cinzel font-black text-ink dark:text-bone mb-4">
                        THE INK PATH
                    </h2>
                    <p className="font-mono text-charcoal dark:text-smoke text-sm italic">
                        "The journey of a thousand miles begins with a single step"
                    </p>
                    <div className="w-24 h-px bg-gold mx-auto mt-4" />
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* SVG Brush Stroke Path */}
                    <svg
                        className="absolute top-0 left-0 w-full h-full pointer-events-none"
                        viewBox="0 0 800 400"
                        preserveAspectRatio="none"
                    >
                        <motion.path
                            d="M 50,200 Q 200,150 400,200 T 750,200"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                            strokeLinecap="round"
                            className="text-ink/30 dark:text-bone/30"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 2, ease: 'easeInOut' }}
                        />
                    </svg>

                    {/* Education Nodes */}
                    <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 pt-32">
                        {education.map((node, index) => {
                            const isHovered = hoveredNode === index;

                            return (
                                <motion.div
                                    key={node.year}
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.3, type: 'spring' }}
                                    onHoverStart={() => setHoveredNode(index)}
                                    onHoverEnd={() => setHoveredNode(null)}
                                    className="flex flex-col items-center"
                                >
                                    {/* Ink Splatter Node */}
                                    <motion.div
                                        animate={
                                            isHovered
                                                ? {
                                                    x: [0, -2, 2, -1, 1, 0],
                                                    y: [0, 1, -1, 2, -2, 0],
                                                }
                                                : {}
                                        }
                                        transition={
                                            isHovered
                                                ? {
                                                    duration: 0.3,
                                                    repeat: 3,
                                                }
                                                : {}
                                        }
                                        className="relative w-20 h-20 mb-4"
                                    >
                                        <div
                                            className="w-full h-full bg-gradient-to-br from-ink to-charcoal dark:from-bone dark:to-smoke"
                                            style={{
                                                clipPath: `polygon(
                                                    50% 0%, 61% 35%, 98% 35%, 68% 57%,
                                                    79% 91%, 50% 70%, 21% 91%, 32% 57%,
                                                    2% 35%, 39% 35%
                                                )`,
                                                boxShadow: isHovered
                                                    ? '0 0 20px rgba(0, 0, 0, 0.5)'
                                                    : 'none',
                                            }}
                                        >
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <GraduationCap className="w-8 h-8 text-paper dark:text-void" />
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Year */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="font-mono text-2xl font-bold text-gold mb-2"
                                    >
                                        {node.year}
                                    </motion.div>

                                    {/* Details Card (Appears on Hover) */}
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{
                                            opacity: isHovered ? 1 : 0,
                                            y: isHovered ? 0 : -10,
                                        }}
                                        transition={{ duration: 0.3 }}
                                        className="bg-paper/90 dark:bg-void/90 backdrop-blur-sm border-2 border-ink/20 dark:border-bone/20 rounded-lg p-4 text-center shadow-xl"
                                    >
                                        <h3 className="font-playfair text-lg font-bold text-ink dark:text-bone mb-2">
                                            {node.degree}
                                        </h3>
                                        <p className="font-mono text-sm text-charcoal dark:text-smoke mb-1">
                                            {node.institution}
                                        </p>
                                        <p className="font-mono text-xs text-smoke italic">
                                            {node.details}
                                        </p>
                                    </motion.div>

                                    {/* Static Info (Always Visible) */}
                                    {!isHovered && (
                                        <motion.div
                                            initial={{ opacity: 1 }}
                                            animate={{ opacity: isHovered ? 0 : 1 }}
                                            className="text-center"
                                        >
                                            <h3 className="font-playfair text-base font-bold text-ink dark:text-bone">
                                                {node.degree}
                                            </h3>
                                        </motion.div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Decorative Kanji */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.03 }}
                    viewport={{ once: true }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[300px] font-noto text-ink dark:text-bone pointer-events-none select-none -z-10"
                >
                    道
                </motion.div>
            </div>
        </section>
    );
}
