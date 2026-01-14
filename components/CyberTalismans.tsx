'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface Certification {
    name: string;
    issuer: string;
    year: string;
    verified: boolean;
}

export default function CyberTalismans() {
    const certifications: Certification[] = [
        { name: 'OSCP', issuer: 'Offensive Security', year: '2024', verified: true },
        { name: 'CEH', issuer: 'EC-Council', year: '2024', verified: true },
        { name: 'Security+', issuer: 'CompTIA', year: '2023', verified: true },
        { name: 'CISSP', issuer: 'ISC²', year: 'In Progress', verified: false },
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
                        THE CYBER-TALISMANS
                    </h2>
                    <p className="font-mono text-charcoal dark:text-smoke text-sm italic">
                        "Seals of mastery in the digital realm"
                    </p>
                    <div className="w-24 h-px bg-gold mx-auto mt-4" />
                </motion.div>

                {/* Talismans Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                    {certifications.map((cert, index) => (
                        <motion.div
                            key={cert.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            animate={{
                                y: [0, -10, 0],
                                rotate: [0, 2, -2, 0],
                            }}
                            transition={{
                                y: {
                                    duration: 4 + index * 0.5,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                },
                                rotate: {
                                    duration: 5 + index * 0.3,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                },
                            }}
                            className="group relative"
                        >
                            {/* Talisman Card */}
                            <div className="relative h-64 bg-gradient-to-b from-gray-800 to-gray-900 border-2 border-indigo-500 dark:border-cyan-500 rounded-sm overflow-hidden transition-all duration-300 group-hover:border-indigo-400 dark:group-hover:border-cyan-400"
                                style={{
                                    boxShadow: `
                                        0 0 10px rgba(99, 102, 241, 0.5),
                                        0 0 20px rgba(99, 102, 241, 0.3),
                                        inset 0 0 10px rgba(99, 102, 241, 0.2)
                                    `,
                                }}
                            >
                                {/* Front Face (Vertical Text) */}
                                <motion.div
                                    className="absolute inset-0 flex flex-col items-center justify-center p-4"
                                    initial={{ opacity: 1 }}
                                    whileHover={{ opacity: 0.3, filter: 'blur(2px)' }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="writing-mode-vertical-rl">
                                        <h3 className="text-4xl font-cinzel font-black text-white tracking-widest">
                                            {cert.name.split('').join(' ')}
                                        </h3>
                                    </div>
                                    {cert.verified && (
                                        <div className="absolute bottom-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                            <Check className="w-5 h-5 text-white" />
                                        </div>
                                    )}
                                </motion.div>

                                {/* Back Face (Details - Revealed on Hover) */}
                                <motion.div
                                    className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gradient-to-b from-indigo-900/90 to-cyan-900/90"
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="text-center space-y-3">
                                        <h4 className="text-xl font-cinzel font-bold text-white">
                                            {cert.name}
                                        </h4>
                                        <div className="w-12 h-px bg-cyan-400 mx-auto" />
                                        <p className="font-mono text-sm text-cyan-300">
                                            {cert.issuer}
                                        </p>
                                        <p className="font-mono text-xs text-cyan-400">
                                            {cert.year}
                                        </p>
                                        {cert.verified && (
                                            <div className="flex items-center justify-center gap-2 text-green-400 font-mono text-xs">
                                                <Check className="w-4 h-4" />
                                                VERIFIED
                                            </div>
                                        )}
                                    </div>
                                </motion.div>

                                {/* Neon Glow Pulse */}
                                <motion.div
                                    className="absolute inset-0 border-2 border-indigo-400 dark:border-cyan-400 rounded-sm pointer-events-none"
                                    animate={{
                                        opacity: [0.3, 0.6, 0.3],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                    }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Decorative Kanji */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.03 }}
                    viewport={{ once: true }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[300px] font-noto text-ink dark:text-bone pointer-events-none select-none -z-10"
                >
                    証
                </motion.div>
            </div>
        </section>
    );
}
