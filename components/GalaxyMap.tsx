'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Node {
    id: string;
    x: number; // percentage
    y: number; // percentage
    label: string;
    type: 'core' | 'secondary';
    status: 'Mastered' | 'Proficient' | 'Learning';
}

interface Link {
    source: string;
    target: string;
}

interface Star {
    x: number;
    y: number;
    duration: number;
}

export default function GalaxyMap() {
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);
    const [stars, setStars] = useState<Star[]>([]);

    // Define the galaxy nodes (skills)
    const nodes: Node[] = [
        // Core Skills (Bone White Ink Splatters)
        { id: 'python', x: 25, y: 30, label: 'Python', type: 'core', status: 'Mastered' },
        { id: 'linux', x: 50, y: 20, label: 'Linux', type: 'core', status: 'Mastered' },
        { id: 'javascript', x: 75, y: 35, label: 'JavaScript', type: 'core', status: 'Mastered' },
        { id: 'security', x: 50, y: 50, label: 'Cybersecurity', type: 'core', status: 'Mastered' },

        // Secondary Skills (Faint Grey Ink Splatters)
        { id: 'django', x: 20, y: 50, label: 'Django', type: 'secondary', status: 'Proficient' },
        { id: 'react', x: 80, y: 55, label: 'React', type: 'secondary', status: 'Proficient' },
        { id: 'docker', x: 45, y: 70, label: 'Docker', type: 'secondary', status: 'Proficient' },
        { id: 'bash', x: 55, y: 35, label: 'Bash', type: 'secondary', status: 'Mastered' },
        { id: 'git', x: 65, y: 65, label: 'Git', type: 'secondary', status: 'Mastered' },
        { id: 'sql', x: 35, y: 65, label: 'SQL', type: 'secondary', status: 'Proficient' },
        { id: 'burpsuite', x: 60, y: 80, label: 'Burp Suite', type: 'secondary', status: 'Proficient' },
        { id: 'metasploit', x: 40, y: 80, label: 'Metasploit', type: 'secondary', status: 'Learning' },
    ];

    // Define brush stroke connections
    const links: Link[] = [
        { source: 'python', target: 'django' },
        { source: 'python', target: 'security' },
        { source: 'linux', target: 'bash' },
        { source: 'linux', target: 'docker' },
        { source: 'javascript', target: 'react' },
        { source: 'security', target: 'burpsuite' },
        { source: 'security', target: 'metasploit' },
        { source: 'docker', target: 'git' },
        { source: 'bash', target: 'linux' },
        { source: 'sql', target: 'django' },
    ];

    // Generate stars only on client side to avoid hydration mismatch
    useEffect(() => {
        const generatedStars: Star[] = [];
        for (let i = 0; i < 30; i++) {
            generatedStars.push({
                x: Math.random() * 100,
                y: Math.random() * 100,
                duration: 2 + Math.random() * 3,
            });
        }
        setStars(generatedStars);
    }, []);

    // Check if a link is connected to hovered node
    const isLinkActive = (link: Link) => {
        if (!hoveredNode) return false;
        return link.source === hoveredNode || link.target === hoveredNode;
    };

    // Get node position
    const getNode = (id: string) => nodes.find(n => n.id === id);

    return (
        <section className="py-24 px-4 md:px-8 lg:px-16 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 text-center"
                >
                    <h2 className="text-5xl font-playfair font-black text-ink dark:text-bone mb-4">
                        THE INK WEB
                    </h2>
                    <p className="font-mono text-charcoal dark:text-smoke text-sm italic">
                        "Constellations drawn in Sumi-e"
                    </p>
                </motion.div>

                {/* Ink Web Container */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="relative w-full h-[600px] bg-transparent rounded-lg overflow-hidden border border-ink/10 dark:border-bone/10"
                >
                    {/* SVG for Brush Stroke Lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        <defs>
                            {/* Brush stroke filter */}
                            <filter id="brushStroke">
                                <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="noise" />
                                <feDisplacementMap in="SourceGraphic" in2="noise" scale="1" />
                            </filter>
                        </defs>
                        {links.map((link, index) => {
                            const sourceNode = getNode(link.source);
                            const targetNode = getNode(link.target);
                            if (!sourceNode || !targetNode) return null;

                            const isActive = isLinkActive(link);

                            return (
                                <motion.line
                                    key={`${link.source}-${link.target}-${index}`}
                                    x1={`${sourceNode.x}%`}
                                    y1={`${sourceNode.y}%`}
                                    x2={`${targetNode.x}%`}
                                    y2={`${targetNode.y}%`}
                                    stroke={isActive ? '#E0E0E0' : '#666666'}
                                    strokeWidth={isActive ? 2 : 1}
                                    opacity={isActive ? 0.6 : 0.3}
                                    filter="url(#brushStroke)"
                                    animate={{
                                        stroke: isActive ? '#E0E0E0' : '#666666',
                                        strokeWidth: isActive ? 2 : 1,
                                        opacity: isActive ? 0.6 : 0.3,
                                    }}
                                    transition={{ duration: 0.3 }}
                                />
                            );
                        })}
                    </svg>

                    {/* Ink Splatter Nodes */}
                    {nodes.map((node, index) => {
                        const isHovered = hoveredNode === node.id;
                        const isCore = node.type === 'core';

                        return (
                            <motion.div
                                key={node.id}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    y: [0, -3, 0],
                                }}
                                transition={{
                                    opacity: { delay: index * 0.1 },
                                    scale: { delay: index * 0.1 },
                                    y: {
                                        duration: 3 + (index % 3),
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                    },
                                }}
                                onHoverStart={() => setHoveredNode(node.id)}
                                onHoverEnd={() => setHoveredNode(null)}
                                className="absolute cursor-pointer group"
                                style={{
                                    left: `${node.x}%`,
                                    top: `${node.y}%`,
                                    transform: 'translate(-50%, -50%)',
                                }}
                            >
                                {/* Ink Splatter (Organic Shape) */}
                                <motion.div
                                    animate={{
                                        scale: isHovered ? 1.3 : 1,
                                    }}
                                    className={`relative ${isCore ? 'w-8 h-8' : 'w-6 h-6'
                                        }`}
                                    style={{
                                        backgroundColor: isCore ? '#E0E0E0' : '#888888',
                                        clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                                        filter: 'blur(0.5px)',
                                    }}
                                />

                                {/* Bleeding Effect on Hover */}
                                {isHovered && (
                                    <motion.div
                                        initial={{ scale: 1, opacity: 0.3 }}
                                        animate={{ scale: 1.8, opacity: 0 }}
                                        transition={{ duration: 0.8, repeat: Infinity }}
                                        className="absolute inset-0"
                                        style={{
                                            backgroundColor: isCore ? '#E0E0E0' : '#888888',
                                            clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                                            filter: 'blur(2px)',
                                        }}
                                    />
                                )}

                                {/* Tooltip (Ink Scroll) */}
                                {isHovered && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="absolute top-full mt-4 left-1/2 -translate-x-1/2 bg-ink dark:bg-bone px-4 py-2 whitespace-nowrap z-10 pointer-events-none border border-bone dark:border-ink"
                                    >
                                        <p className="font-mono text-xs text-bone dark:text-ink font-bold mb-1">
                                            {node.label}
                                        </p>
                                        <p className="font-mono text-xs text-bone/70 dark:text-ink/70">
                                            {node.status}
                                        </p>
                                    </motion.div>
                                )}

                                {/* Label */}
                                <motion.p
                                    animate={{
                                        opacity: isHovered ? 1 : 0.6,
                                    }}
                                    className="absolute top-full mt-2 left-1/2 -translate-x-1/2 font-mono text-xs text-ink dark:text-bone whitespace-nowrap pointer-events-none"
                                >
                                    {node.label}
                                </motion.p>
                            </motion.div>
                        );
                    })}

                    {/* Faint Background Stars (Ink Dots) */}
                    <div className="absolute inset-0 pointer-events-none">
                        {stars.map((star, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1 h-1 rounded-full"
                                style={{
                                    left: `${star.x}%`,
                                    top: `${star.y}%`,
                                    backgroundColor: '#666666',
                                }}
                                animate={{
                                    opacity: [0.1, 0.3, 0.1],
                                }}
                                transition={{
                                    duration: star.duration,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                            />
                        ))}
                    </div>
                </motion.div>

                {/* Legend */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-8 flex justify-center gap-8"
                >
                    <div className="flex items-center gap-2">
                        <div
                            className="w-4 h-4"
                            style={{
                                backgroundColor: '#E0E0E0',
                                clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                            }}
                        />
                        <span className="font-mono text-xs text-ink dark:text-bone">Core Skills</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div
                            className="w-3 h-3"
                            style={{
                                backgroundColor: '#888888',
                                clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                            }}
                        />
                        <span className="font-mono text-xs text-ink dark:text-bone">Secondary Skills</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-0.5 bg-charcoal dark:bg-smoke opacity-30" />
                        <span className="font-mono text-xs text-ink dark:text-bone">Brush Strokes</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
