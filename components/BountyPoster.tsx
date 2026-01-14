'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { type Project } from '@/hooks/useDataStore';

interface BountyPosterProps {
    project: Project;
    index: number;
}

export default function BountyPoster({ project, index }: BountyPosterProps) {
    // Use useMemo to ensure consistent tilt between server and client
    const randomTilt = useMemo(() => (Math.random() - 0.5) * 4, [project.id]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.03, rotate: 0 }}
            className="relative group"
            style={{
                rotate: `${randomTilt}deg`,
            }}
        >
            {/* Ronin's Warrant (Dark Charcoal Paper) */}
            <div
                className="relative bg-[#1a1a1a] p-6 border-2 border-bone/20 dark:border-bone/30 shadow-2xl overflow-hidden"
                style={{
                    clipPath: 'polygon(2% 0%, 98% 1%, 99% 3%, 100% 97%, 98% 100%, 2% 99%, 0% 97%, 1% 3%)',
                }}
            >
                {/* Textured Paper Overlay */}
                <div
                    className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    }}
                />

                {/* CONTRACT Header */}
                <div className="relative text-center mb-4">
                    <h3 className="text-4xl font-black text-bone tracking-widest" style={{ fontFamily: 'Cinzel, serif' }}>
                        CONTRACT
                    </h3>
                    <div className="w-full h-px bg-bone/30 mt-2" />
                </div>

                {/* Project Image */}
                <div className="relative mb-4">
                    <div className="border-2 border-bone/40 bg-black/50 aspect-video flex items-center justify-center overflow-hidden">
                        {project.imageUrl ? (
                            <img
                                src={project.imageUrl}
                                alt={project.title}
                                className="w-full h-full object-cover opacity-90"
                            />
                        ) : (
                            <div className="text-center p-4">
                                <p className="font-mono text-sm text-bone/60">{project.title}</p>
                            </div>
                        )}
                    </div>

                    {/* COMPLETED Stamp (if completed) - Bloodier Red */}
                    {project.status === 'completed' && (
                        <motion.div
                            initial={{ scale: 0, rotate: 0 }}
                            animate={{ scale: 1, rotate: -15 }}
                            transition={{ delay: 0.5, type: 'spring' }}
                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
                            style={{ mixBlendMode: 'multiply' }}
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-[#8a0000] opacity-40 blur-md rounded-full" />
                                <div className="relative border-8 border-[#8a0000] rounded-full w-40 h-40 flex items-center justify-center bg-[#8a0000]/20">
                                    <span className="text-5xl font-black text-[#8a0000] tracking-wider" style={{ fontFamily: 'Impact, sans-serif' }}>
                                        完了
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Project Title */}
                <h4 className="text-xl font-black text-center text-bone mb-2" style={{ fontFamily: 'Cinzel, serif' }}>
                    {project.title.toUpperCase()}
                </h4>

                {/* Description */}
                <p className="text-sm text-center text-bone/70 mb-4 font-mono italic">
                    {project.description}
                </p>

                {/* Bounty Amount */}
                <div className="text-center mb-4">
                    <div className="inline-block bg-bone/10 text-bone px-6 py-2 border border-bone/30">
                        <p className="text-xs font-bold mb-1 font-mono">REWARD</p>
                        <p className="text-2xl font-black font-mono">
                            {project.bounty || '฿100,000,000'}
                        </p>
                    </div>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {project.tech?.map((tech) => (
                        <span
                            key={tech}
                            className="px-2 py-1 bg-bone/10 text-bone text-xs font-bold border border-bone/20 font-mono"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Footer */}
                <div className="text-center">
                    <div className="w-full h-px bg-bone/30 mb-2" />
                    <p className="text-lg font-black text-bone tracking-widest font-mono">
                        TARGET ACQUIRED
                    </p>
                </div>

                {/* Links (appear on hover) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute bottom-4 right-4 flex gap-2"
                >
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-bone/10 text-bone hover:bg-bone/20 transition-colors border border-bone/30"
                        >
                            <Github className="w-4 h-4" />
                        </a>
                    )}
                    {project.live && (
                        <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-bone/10 text-bone hover:bg-bone/20 transition-colors border border-bone/30"
                        >
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    )}
                </motion.div>
            </div>

            {/* Drop Shadow on Hover */}
            <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 -z-10 bg-black/50 blur-xl"
                style={{ transform: 'translate(8px, 8px)' }}
            />
        </motion.div>
    );
}
