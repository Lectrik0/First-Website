'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface EducationNode {
    year: string;
    degree: string;
    institution: string;
}

export default function BrushStroke() {
    const [hoveredNode, setHoveredNode] = useState<number | null>(null);

    const education: EducationNode[] = [
        { year: '2021', degree: 'Bachelor of Science', institution: 'University of Technology' },
        { year: '2023', degree: 'Master of Science', institution: 'Institute of Advanced Studies' },
        { year: '2025', degree: 'Ph.D. Candidate', institution: 'Research University' },
    ];

    return (
        <section className="py-32 px-4 md:px-8 lg:px-16 relative">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20 text-center"
                >
                    <h2 className="text-6xl font-playfair font-black text-[#0F0F0F] dark:text-[#F0F0F0] mb-4 tracking-tight">
                        道
                    </h2>
                    <p className="font-mono text-sm text-[#0F0F0F]/70 dark:text-[#F0F0F0]/70 italic">
                        The Path of Learning
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="relative pt-20">
                    {/* Variable Thickness Brush Stroke */}
                    <svg
                        className="absolute top-0 left-0 w-full h-full pointer-events-none"
                        viewBox="0 0 1000 300"
                        preserveAspectRatio="none"
                    >
                        <motion.path
                            d="M 50,150 Q 150,140 250,150 Q 350,160 500,150 Q 650,140 750,150 Q 850,160 950,150"
                            stroke="#0F0F0F"
                            className="dark:stroke-[#F0F0F0]"
                            strokeWidth="8"
                            fill="none"
                            strokeLinecap="round"
                            opacity="0.3"
                            initial={{ pathLength: 0, strokeWidth: 2 }}
                            whileInView={{ pathLength: 1, strokeWidth: 8 }}
                            viewport={{ once: true }}
                            transition={{
                                pathLength: { duration: 2, ease: 'easeInOut' },
                                strokeWidth: { duration: 2, ease: 'easeInOut' },
                            }}
                        />
                        {/* Thicker sections for calligraphy effect */}
                        <motion.path
                            d="M 250,150 Q 350,160 500,150"
                            stroke="#0F0F0F"
                            className="dark:stroke-[#F0F0F0]"
                            strokeWidth="12"
                            fill="none"
                            strokeLinecap="round"
                            opacity="0.2"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 2, delay: 0.5, ease: 'easeInOut' }}
                        />
                    </svg>

                    {/* Education Nodes */}
                    <div className="relative grid grid-cols-1 md:grid-cols-3 gap-16">
                        {education.map((node, index) => {
                            const isHovered = hoveredNode === index;

                            return (
                                <motion.div
                                    key={node.year}
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.4, type: 'spring' }}
                                    onHoverStart={() => setHoveredNode(index)}
                                    onHoverEnd={() => setHoveredNode(null)}
                                    className="flex flex-col items-center"
                                >
                                    {/* Irregular Hand-Drawn Circle */}
                                    <motion.div
                                        animate={
                                            isHovered
                                                ? {
                                                    scale: [1, 1.05, 0.95, 1.02, 1],
                                                    rotate: [0, -2, 2, -1, 0],
                                                }
                                                : {}
                                        }
                                        transition={
                                            isHovered
                                                ? {
                                                    duration: 0.5,
                                                    repeat: 2,
                                                }
                                                : {}
                                        }
                                        className="relative w-24 h-24 mb-6"
                                    >
                                        <div
                                            className="w-full h-full bg-[#0F0F0F] dark:bg-[#F0F0F0]"
                                            style={{
                                                clipPath: `polygon(
                                                    50% 0%, 58% 5%, 65% 12%, 72% 20%,
                                                    78% 30%, 82% 40%, 85% 50%, 82% 60%,
                                                    78% 70%, 72% 80%, 65% 88%, 58% 95%,
                                                    50% 100%, 42% 95%, 35% 88%, 28% 80%,
                                                    22% 70%, 18% 60%, 15% 50%, 18% 40%,
                                                    22% 30%, 28% 20%, 35% 12%, 42% 5%
                                                )`,
                                                opacity: isHovered ? 1 : 0.8,
                                            }}
                                        >
                                            {/* Red accent on hover */}
                                            {isHovered && (
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 0.3 }}
                                                    className="absolute inset-0 bg-[#8A0000]"
                                                />
                                            )}
                                        </div>
                                    </motion.div>

                                    {/* Year */}
                                    <motion.div
                                        animate={{
                                            color: isHovered ? '#8A0000' : '#0F0F0F',
                                        }}
                                        className="font-mono text-3xl font-black mb-4 dark:text-[#F0F0F0]"
                                    >
                                        {node.year}
                                    </motion.div>

                                    {/* Details */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{
                                            opacity: isHovered ? 1 : 0.7,
                                            y: isHovered ? 0 : 10,
                                        }}
                                        className="text-center"
                                    >
                                        <h3 className="font-playfair text-lg font-bold text-[#0F0F0F] dark:text-[#F0F0F0] mb-2">
                                            {node.degree}
                                        </h3>
                                        <p className="font-mono text-xs text-[#0F0F0F]/60 dark:text-[#F0F0F0]/60">
                                            {node.institution}
                                        </p>
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
