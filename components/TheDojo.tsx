'use client';

import { motion } from 'framer-motion';
import { Github, ExternalLink, Trophy, Target } from 'lucide-react';

export default function TheDojo() {
    const projects = [
        {
            title: 'SecureAuth',
            description: 'Open-source authentication library with built-in protection against common web vulnerabilities (CSRF, XSS, SQL Injection).',
            tech: ['Python', 'Flask', 'JWT', 'PostgreSQL'],
            github: 'https://github.com/yourusername/secureauth',
            live: null,
            type: 'project',
        },
        {
            title: 'Network Scanner Pro',
            description: 'Advanced network reconnaissance tool with custom TCP/UDP scanning capabilities and service fingerprinting.',
            tech: ['Python', 'Scapy', 'Nmap', 'Threading'],
            github: 'https://github.com/yourusername/network-scanner',
            live: null,
            type: 'project',
        },
        {
            title: 'Vuln Web App',
            description: 'Intentionally vulnerable web application for security training, featuring OWASP Top 10 vulnerabilities.',
            tech: ['Node.js', 'Express', 'MySQL', 'Docker'],
            github: 'https://github.com/yourusername/vuln-webapp',
            live: 'https://demo.vulnapp.com',
            type: 'project',
        },
    ];

    const achievements = [
        {
            title: 'HackTheBox - Pro Hacker',
            description: 'Ranked in top 5% globally. Solved 75+ machines across all difficulty levels.',
            platform: 'HackTheBox',
            rank: 'Pro Hacker',
            type: 'achievement',
        },
        {
            title: 'TryHackMe - Top 1000',
            description: 'Completed 150+ rooms covering OWASP, privilege escalation, and network security.',
            platform: 'TryHackMe',
            rank: 'Top 1000',
            type: 'achievement',
        },
        {
            title: 'CTF Winner - University Comp',
            description: 'First place in annual university CTF competition with focus on web exploitation.',
            platform: 'University',
            rank: '1st Place',
            type: 'achievement',
        },
    ];

    return (
        <section id="dojo" className="py-24 px-4 md:px-8 lg:px-16">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <h2 className="text-5xl md:text-7xl font-playfair font-black text-ink dark:text-bone mb-4">
                        THE DOJO
                    </h2>
                    <div className="w-32 h-1 bg-ink dark:bg-bone mb-6" />
                    <p className="text-xl font-playfair italic text-charcoal dark:text-smoke max-w-2xl">
                        "Practice without theory is blind. Theory without practice is empty."
                    </p>
                </motion.div>

                {/* Projects */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-20"
                >
                    <div className="flex items-center gap-3 mb-8">
                        <Github className="w-8 h-8 text-ink dark:text-bone" strokeWidth={1.5} />
                        <h3 className="text-3xl font-playfair font-bold text-ink dark:text-bone">Projects</h3>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {projects.map((project, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="paper-card p-6 manga-filter"
                            >
                                <h4 className="text-2xl font-playfair font-bold text-ink dark:text-bone mb-3">
                                    {project.title}
                                </h4>

                                <p className="font-playfair text-charcoal dark:text-smoke mb-4 leading-relaxed">
                                    {project.description}
                                </p>

                                {/* Tech Stack */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tech.map((tech, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 text-xs font-mono bg-ink/5 dark:bg-bone/5 border border-ink/20 dark:border-bone/20 text-ink dark:text-bone"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* Links */}
                                <div className="flex gap-4 pt-4 border-t border-ink/10 dark:border-bone/10">
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 font-playfair font-semibold text-ink dark:text-bone brush-underline"
                                    >
                                        <Github className="w-4 h-4" />
                                        <span>Source</span>
                                    </a>
                                    {project.live && (
                                        <a
                                            href={project.live}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 font-playfair font-semibold text-ink dark:text-bone brush-underline"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            <span>Demo</span>
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* CTF Achievements */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <div className="flex items-center gap-3 mb-8">
                        <Trophy className="w-8 h-8 text-ink dark:text-bone" strokeWidth={1.5} />
                        <h3 className="text-3xl font-playfair font-bold text-ink dark:text-bone">CTF & Achievements</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {achievements.map((achievement, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{ y: -4 }}
                                className="paper-card p-6 text-center border-2 border-ink/20 dark:border-bone/20"
                            >
                                <Target className="w-12 h-12 text-ink dark:text-bone mx-auto mb-4" strokeWidth={1.5} />

                                <div className="text-xs font-mono text-ash dark:text-smoke mb-2 uppercase tracking-wider">
                                    {achievement.platform}
                                </div>

                                <h4 className="text-xl font-playfair font-bold text-ink dark:text-bone mb-2">
                                    {achievement.title}
                                </h4>

                                <p className="text-sm font-playfair text-charcoal dark:text-smoke mb-3">
                                    {achievement.description}
                                </p>

                                <div className="inline-block px-4 py-1 border-2 border-ink dark:border-bone font-mono text-xs text-ink dark:text-bone">
                                    {achievement.rank}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
