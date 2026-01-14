'use client';

import { motion } from 'framer-motion';

export default function GiantTypography() {
    const skills = [
        'PYTHON',
        'JAVASCRIPT',
        'BURP SUITE',
        'METASPLOIT',
        'WIRESHARK',
        'NMAP',
        'DOCKER',
        'LINUX',
    ];

    return (
        <section className="py-32 px-4 md:px-8 lg:px-16 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* No header, just pure typography */}
                <div className="space-y-8">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill}
                            initial={{ opacity: 0, x: -100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative group"
                        >
                            {/* Ghost/Shadow Text */}
                            <div
                                className="absolute inset-0 text-6xl md:text-8xl lg:text-9xl font-black text-[#0F0F0F] dark:text-[#F0F0F0] opacity-10 select-none pointer-events-none"
                                style={{
                                    transform: 'translate(8px, 8px)',
                                }}
                            >
                                {skill}
                            </div>

                            {/* Main Text */}
                            <motion.h2
                                whileHover={{ x: 10, color: '#8A0000' }}
                                transition={{ duration: 0.2 }}
                                className="relative text-6xl md:text-8xl lg:text-9xl font-black text-[#0F0F0F] dark:text-[#F0F0F0] cursor-default"
                                style={{
                                    letterSpacing: '-0.02em',
                                }}
                            >
                                {skill}
                            </motion.h2>

                            {/* Ink Stroke Separator */}
                            <motion.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                                className="h-1 bg-[#0F0F0F] dark:bg-[#F0F0F0] mt-4 origin-left"
                                style={{
                                    width: `${30 + (index % 3) * 20}%`,
                                }}
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Vertical Kanji */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.05 }}
                    viewport={{ once: true }}
                    className="absolute right-8 top-1/2 -translate-y-1/2 text-[200px] font-noto text-[#0F0F0F] dark:text-[#F0F0F0] writing-mode-vertical-rl pointer-events-none select-none"
                >
                    技術
                </motion.div>
            </div>
        </section>
    );
}
