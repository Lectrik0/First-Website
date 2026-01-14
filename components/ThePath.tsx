'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Shield, Award, Code, Lock, Terminal } from 'lucide-react';

export default function ThePath() {
    const education = [
        {
            degree: 'Bachelor in Cybersecurity',
            institution: 'University Name',
            period: '2021 - Present',
            description: 'Specializing in Network Security, Cryptography, and Penetration Testing',
        },
    ];

    const certifications = [
        { name: 'CompTIA Security+', issuer: 'CompTIA', year: '2023' },
        { name: 'CEH (Certified Ethical Hacker)', issuer: 'EC-Council', year: '2024' },
        { name: 'OSCP (In Progress)', issuer: 'Offensive Security', year: '2024' },
    ];

    const skills = [
        { category: 'Security', items: ['Penetration Testing', 'Vulnerability Assessment', 'Network Security', 'Web Application Security'], icon: Shield },
        { category: 'Programming', items: ['Python', 'Bash', 'JavaScript', 'C/C++'], icon: Code },
        { category: 'Tools', items: ['Burp Suite', 'Metasploit', 'Wireshark', 'Nmap'], icon: Terminal },
        { category: 'Cryptography', items: ['Encryption Algorithms', 'PKI', 'Hash Functions', 'SSL/TLS'], icon: Lock },
    ];

    return (
        <section id="path" className="py-24 px-4 md:px-8 lg:px-16 relative">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <h2 className="text-5xl md:text-7xl font-playfair font-black text-ink dark:text-bone mb-4">
                        THE PATH
                    </h2>
                    <div className="w-32 h-1 bg-ink dark:bg-bone mb-6" />
                    <p className="text-xl font-playfair italic text-charcoal dark:text-smoke max-w-2xl">
                        "Every master was once a beginner. Every expert started as a student."
                    </p>
                </motion.div>

                {/* Education */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-16"
                >
                    <div className="flex items-center gap-3 mb-8">
                        <GraduationCap className="w-8 h-8 text-ink dark:text-bone" strokeWidth={1.5} />
                        <h3 className="text-3xl font-playfair font-bold text-ink dark:text-bone">Education</h3>
                    </div>

                    {education.map((edu, index) => (
                        <div key={index} className="paper-card p-6 mb-6">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                                <div>
                                    <h4 className="text-2xl font-playfair font-bold text-ink dark:text-bone mb-1">
                                        {edu.degree}
                                    </h4>
                                    <p className="text-lg font-playfair text-charcoal dark:text-smoke">
                                        {edu.institution}
                                    </p>
                                </div>
                                <span className="text-sm font-mono text-ash dark:text-smoke mt-2 md:mt-0">
                                    {edu.period}
                                </span>
                            </div>
                            <p className="font-playfair text-charcoal dark:text-smoke">
                                {edu.description}
                            </p>
                        </div>
                    ))}
                </motion.div>

                {/* Certifications */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mb-16"
                >
                    <div className="flex items-center gap-3 mb-8">
                        <Award className="w-8 h-8 text-ink dark:text-bone" strokeWidth={1.5} />
                        <h3 className="text-3xl font-playfair font-bold text-ink dark:text-bone">Certifications</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {certifications.map((cert, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -4 }}
                                className="paper-card p-6 border-l-4 border-ink dark:border-bone"
                            >
                                <h4 className="text-lg font-playfair font-bold text-ink dark:text-bone mb-2">
                                    {cert.name}
                                </h4>
                                <p className="text-sm font-playfair text-charcoal dark:text-smoke mb-1">
                                    {cert.issuer}
                                </p>
                                <span className="text-xs font-mono text-ash dark:text-smoke">
                                    {cert.year}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Skills */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <div className="flex items-center gap-3 mb-8">
                        <Shield className="w-8 h-8 text-ink dark:text-bone" strokeWidth={1.5} />
                        <h3 className="text-3xl font-playfair font-bold text-ink dark:text-bone">Skills & Expertise</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {skills.map((skill, index) => {
                            const Icon = skill.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="paper-card p-6"
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <Icon className="w-6 h-6 text-ink dark:text-bone" strokeWidth={1.5} />
                                        <h4 className="text-xl font-playfair font-bold text-ink dark:text-bone">
                                            {skill.category}
                                        </h4>
                                    </div>
                                    <ul className="space-y-2">
                                        {skill.items.map((item, i) => (
                                            <li key={i} className="flex items-center gap-2 font-playfair text-charcoal dark:text-smoke">
                                                <span className="w-1.5 h-1.5 bg-ink dark:bg-bone" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
