'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface Certification {
    name: string;
    year: string;
    verified: boolean;
}

export default function WoodenPlaques() {
    const certifications: Certification[] = [
        { name: 'OSCP', year: '2024', verified: true },
        { name: 'CEH', year: '2024', verified: true },
        { name: 'Security+', year: '2023', verified: true },
        { name: 'CISSP', year: 'Progress', verified: false },
    ];

    return (
        <section className="py-32 px-4 md:px-8 lg:px-16 relative">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20 text-center"
                >
                    <h2 className="text-6xl font-playfair font-black text-[#0F0F0F] dark:text-[#F0F0F0] mb-4 tracking-tight">
                        証
                    </h2>
                    <p className="font-mono text-sm text-[#0F0F0F]/70 dark:text-[#F0F0F0]/70 italic">
                        The Dojo Roster
                    </p>
                </motion.div>

                {/* Wooden Plaques */}
                <div className="flex justify-center items-end gap-8 md:gap-12">
                    {certifications.map((cert, index) => (
                        <motion.div
                            key={cert.name}
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15, type: 'spring', stiffness: 80 }}
                            whileHover={{ y: -10 }}
                            className="group relative"
                        >
                            {/* Wooden Plaque */}
                            <div
                                className="relative h-80 w-24 bg-gradient-to-b from-[#3E2723] to-[#1B0F0A] overflow-hidden"
                                style={{
                                    clipPath: `polygon(
                                        0 2%, 5% 0, 95% 0, 100% 2%,
                                        100% 98%, 95% 100%, 5% 100%, 0 98%
                                    )`,
                                    boxShadow: `
                                        inset 0 2px 4px rgba(0, 0, 0, 0.5),
                                        inset 0 -2px 4px rgba(255, 255, 255, 0.1),
                                        0 10px 30px rgba(0, 0, 0, 0.3)
                                    `,
                                }}
                            >
                                {/* Wood Grain Texture */}
                                <div
                                    className="absolute inset-0 opacity-20"
                                    style={{
                                        backgroundImage: `repeating-linear-gradient(
                                            90deg,
                                            transparent,
                                            transparent 2px,
                                            rgba(0, 0, 0, 0.1) 2px,
                                            rgba(0, 0, 0, 0.1) 4px
                                        )`,
                                    }}
                                />

                                {/* Vertical Text */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center writing-mode-vertical-rl py-8">
                                    <div className="flex flex-col items-center gap-6">
                                        {/* Certification Name */}
                                        <h3 className="text-3xl font-cinzel font-black text-[#EAE8E3] tracking-widest">
                                            {cert.name.split('').join(' ')}
                                        </h3>

                                        {/* Year */}
                                        <span className="text-sm font-mono text-[#EAE8E3]/70">
                                            {cert.year}
                                        </span>

                                        {/* Verified Stamp */}
                                        {cert.verified && (
                                            <motion.div
                                                initial={{ scale: 0, rotate: -45 }}
                                                whileInView={{ scale: 1, rotate: 0 }}
                                                transition={{ delay: 0.5 + index * 0.15, type: 'spring' }}
                                                className="w-12 h-12 rounded-full bg-[#8A0000] flex items-center justify-center border-2 border-[#EAE8E3]"
                                                style={{
                                                    boxShadow: '0 0 10px rgba(138, 0, 0, 0.5)',
                                                }}
                                            >
                                                <Check className="w-6 h-6 text-[#EAE8E3]" />
                                            </motion.div>
                                        )}
                                    </div>
                                </div>

                                {/* Hover Glow */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                    className="absolute inset-0 bg-[#8A0000]/10 pointer-events-none"
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
