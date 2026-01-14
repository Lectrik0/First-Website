'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sword, Shield, Wrench } from 'lucide-react';

interface SkillCategory {
    title: string;
    color: string;
    glowColor: string;
    icon: any;
    skills: string[];
}

export default function TriptychScrolls() {
    const [hoveredScroll, setHoveredScroll] = useState<number | null>(null);

    const categories: SkillCategory[] = [
        {
            title: 'OFFENSIVE',
            color: 'from-red-600 to-red-800',
            glowColor: 'rgba(220, 38, 38, 0.5)',
            icon: Sword,
            skills: ['Penetration Testing', 'Exploit Development', 'Social Engineering', 'Web App Hacking', 'Network Attacks'],
        },
        {
            title: 'DEFENSIVE',
            color: 'from-blue-600 to-blue-800',
            glowColor: 'rgba(37, 99, 235, 0.5)',
            icon: Shield,
            skills: ['Security Hardening', 'Incident Response', 'Threat Hunting', 'SIEM Management', 'Forensics'],
        },
        {
            title: 'UTILITY',
            color: 'from-amber-500 to-amber-700',
            glowColor: 'rgba(245, 158, 11, 0.5)',
            icon: Wrench,
            skills: ['Python Scripting', 'Bash Automation', 'Burp Suite', 'Metasploit', 'Wireshark', 'Nmap'],
        },
    ];

    return (
        <section className="py-24 px-4 md:px-8 lg:px-16 relative">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-5xl font-cinzel font-black text-ink dark:text-bone mb-4">
                        THE TRIPTYCH SCROLLS
                    </h2>
                    <p className="font-mono text-charcoal dark:text-smoke text-sm italic">
                        "Three paths of the Digital Ronin"
                    </p>
                    <div className="w-24 h-px bg-gold mx-auto mt-4" />
                </motion.div>

                {/* Scrolls */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {categories.map((category, index) => {
                        const Icon = category.icon;
                        const isHovered = hoveredScroll === index;

                        return (
                            <motion.div
                                key={category.title}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                onHoverStart={() => setHoveredScroll(index)}
                                onHoverEnd={() => setHoveredScroll(null)}
                                className="relative flex flex-col items-center"
                            >
                                {/* Hanging Rod */}
                                <div className="w-full h-2 bg-gradient-to-r from-transparent via-charcoal dark:via-bone to-transparent mb-2" />

                                {/* Scroll */}
                                <motion.div
                                    animate={{
                                        height: isHovered ? 500 : 200,
                                    }}
                                    transition={{
                                        type: 'spring',
                                        stiffness: 100,
                                        damping: 15,
                                    }}
                                    className={`relative w-full bg-gradient-to-b ${category.color} overflow-hidden`}
                                    style={{
                                        clipPath: `polygon(
                                            0 0, 100% 0, 100% 95%,
                                            95% 97%, 90% 95%, 85% 98%,
                                            80% 96%, 75% 99%, 70% 97%,
                                            65% 95%, 60% 98%, 55% 96%,
                                            50% 99%, 45% 96%, 40% 98%,
                                            35% 95%, 30% 97%, 25% 99%,
                                            20% 96%, 15% 98%, 10% 95%,
                                            5% 97%, 0 95%
                                        )`,
                                        boxShadow: `0 10px 30px ${category.glowColor}, 0 0 20px ${category.glowColor}`,
                                    }}
                                >
                                    {/* Title (Vertical) */}
                                    <div className="absolute top-4 left-1/2 -translate-x-1/2 writing-mode-vertical-rl">
                                        <div className="flex flex-col items-center gap-3">
                                            <Icon className="w-8 h-8 text-white" />
                                            <h3 className="text-2xl font-cinzel font-black text-white tracking-widest">
                                                {category.title.split('').join(' ')}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Skills List (Appears on unroll) */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{
                                            opacity: isHovered ? 1 : 0,
                                        }}
                                        transition={{ delay: 0.2 }}
                                        className="absolute bottom-8 left-0 right-0 px-6 space-y-3"
                                    >
                                        {category.skills.map((skill, skillIndex) => (
                                            <motion.div
                                                key={skill}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{
                                                    opacity: isHovered ? 1 : 0,
                                                    x: isHovered ? 0 : -20,
                                                }}
                                                transition={{ delay: 0.3 + skillIndex * 0.1 }}
                                                className="text-white font-mono text-sm text-center border-t border-white/20 pt-2"
                                            >
                                                {skill}
                                            </motion.div>
                                        ))}
                                    </motion.div>

                                    {/* Paper Texture Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                                </motion.div>

                                {/* Bottom Weight */}
                                <div className="w-3/4 h-3 bg-charcoal dark:bg-bone mt-1 rounded-full" />
                            </motion.div>
                        );
                    })}
                </div>

                {/* Decorative Kanji */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.03 }}
                    viewport={{ once: true }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[300px] font-noto text-ink dark:text-bone pointer-events-none select-none -z-10"
                >
                    技
                </motion.div>
            </div>
        </section>
    );
}
