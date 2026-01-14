'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface Skill {
    name: string;
    x: number; // Position offset
    y: number;
    rotation: number;
    scale: number;
}

export default function InkSplatters() {
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

    const skills: Skill[] = [
        { name: 'Python', x: 10, y: 0, rotation: -3, scale: 1.1 },
        { name: 'JavaScript', x: -15, y: 20, rotation: 2, scale: 0.95 },
        { name: 'Burp Suite', x: 25, y: -10, rotation: -1, scale: 1.05 },
        { name: 'Metasploit', x: -5, y: 30, rotation: 4, scale: 1 },
        { name: 'Wireshark', x: 20, y: 15, rotation: -2, scale: 0.9 },
        { name: 'Nmap', x: -20, y: -5, rotation: 1, scale: 1.15 },
        { name: 'Docker', x: 15, y: 25, rotation: -4, scale: 0.85 },
        { name: 'Linux', x: -10, y: -15, rotation: 3, scale: 1.05 },
        { name: 'Git', x: 5, y: 35, rotation: -1, scale: 0.95 },
        { name: 'SQL', x: -25, y: 10, rotation: 2, scale: 1 },
    ];

    return (
        <section className="py-32 px-4 md:px-8 lg:px-16 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20 text-center"
                >
                    <h2 className="text-6xl font-playfair font-black text-[#0F0F0F] dark:text-[#F0F0F0] mb-4 tracking-tight">
                        技
                    </h2>
                    <p className="font-mono text-sm text-[#0F0F0F]/70 dark:text-[#F0F0F0]/70 italic">
                        The Tools of the Trade
                    </p>
                </motion.div>

                {/* Scattered Ink Splatters */}
                <div className="relative min-h-[600px] flex flex-wrap justify-center items-center gap-12">
                    {skills.map((skill, index) => {
                        const isHovered = hoveredSkill === skill.name;

                        return (
                            <motion.div
                                key={skill.name}
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, type: 'spring' }}
                                onHoverStart={() => setHoveredSkill(skill.name)}
                                onHoverEnd={() => setHoveredSkill(null)}
                                style={{
                                    transform: `translate(${skill.x}px, ${skill.y}px) rotate(${skill.rotation}deg)`,
                                }}
                                className="relative"
                            >
                                {/* Ink Splatter Shape */}
                                <motion.div
                                    animate={{
                                        scale: isHovered ? 1.2 : 1,
                                        filter: isHovered ? 'blur(2px)' : 'blur(0px)',
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className="relative w-40 h-40 bg-[#0F0F0F] dark:bg-[#F0F0F0]"
                                    style={{
                                        clipPath: `polygon(
                                            50% 0%, 65% 15%, 80% 10%, 90% 25%,
                                            100% 40%, 95% 60%, 85% 75%, 75% 90%,
                                            60% 100%, 40% 95%, 25% 85%, 15% 70%,
                                            5% 50%, 10% 30%, 20% 15%, 35% 5%
                                        )`,
                                        opacity: isHovered ? 0.9 : 0.85,
                                    }}
                                >
                                    {/* Bleeding effect overlay */}
                                    {isHovered && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 0.3 }}
                                            className="absolute inset-0 bg-[#8A0000]"
                                            style={{
                                                clipPath: `polygon(
                                                    50% 0%, 65% 15%, 80% 10%, 90% 25%,
                                                    100% 40%, 95% 60%, 85% 75%, 75% 90%,
                                                    60% 100%, 40% 95%, 25% 85%, 15% 70%,
                                                    5% 50%, 10% 30%, 20% 15%, 35% 5%
                                                )`,
                                                filter: 'blur(8px)',
                                            }}
                                        />
                                    )}
                                </motion.div>

                                {/* Skill Name */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <motion.span
                                        animate={{
                                            color: isHovered ? '#8A0000' : '#EAE8E3',
                                            scale: isHovered ? 1.1 : 1,
                                        }}
                                        className="font-mono text-sm font-bold text-center px-2"
                                        style={{
                                            textShadow: isHovered
                                                ? '0 0 10px rgba(138, 0, 0, 0.5)'
                                                : 'none',
                                        }}
                                    >
                                        {skill.name}
                                    </motion.span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
