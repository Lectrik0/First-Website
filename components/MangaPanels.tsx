'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, ExternalLink, Github } from 'lucide-react';
import { useDataStore } from '@/hooks/useDataStore';
import { useAuth } from '@/hooks/useAuth';

export default function MangaPanels() {
    const { projects, addProject, updateProject, deleteProject } = useDataStore();
    const { isRonin } = useAuth();
    const [editingId, setEditingId] = useState<string | null>(null);
    const [showAddForm, setShowAddForm] = useState(false);

    // Sample projects if empty
    const displayProjects = projects.length > 0 ? projects : [
        {
            id: '1',
            title: 'Penetration Testing Framework',
            description: 'Custom automated pentesting toolkit',
            tech: ['Python', 'Bash', 'Metasploit'],
            github: '#',
            live: null,
        },
        {
            id: '2',
            title: 'Vulnerability Scanner',
            description: 'Network security assessment tool',
            tech: ['Go', 'Nmap', 'Docker'],
            github: '#',
            live: '#',
        },
        {
            id: '3',
            title: 'CTF Challenge Platform',
            description: 'Capture The Flag training environment',
            tech: ['Node.js', 'React', 'PostgreSQL'],
            github: '#',
            live: '#',
        },
    ];

    return (
        <section className="py-32 px-4 md:px-8 lg:px-16 relative">
            <div className="max-w-7xl mx-auto">
                {/* Header - Brutalist Typography */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <h2 className="text-8xl md:text-9xl font-black text-[#0F0F0F] dark:text-[#F0F0F0] mb-8">
                        PROJECTS
                    </h2>
                    <div className="h-2 bg-[#0F0F0F] dark:bg-[#F0F0F0] w-1/3" />
                </motion.div>

                {/* Manga Panel Grid */}
                <div className="grid grid-cols-12 gap-4 auto-rows-[200px]">
                    {displayProjects.map((project, index) => {
                        // Varied panel sizes like manga
                        const panelSizes = [
                            'col-span-12 md:col-span-8 row-span-2', // Wide cinemascope
                            'col-span-12 md:col-span-4 row-span-2', // Tall vertical
                            'col-span-12 md:col-span-6 row-span-1', // Medium square
                            'col-span-12 md:col-span-6 row-span-1', // Medium square
                            'col-span-12 md:col-span-4 row-span-2', // Tall vertical
                            'col-span-12 md:col-span-8 row-span-1', // Wide short
                        ];

                        const panelClass = panelSizes[index % panelSizes.length];

                        return (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`${panelClass} relative group overflow-hidden border-4 border-[#0F0F0F] dark:border-[#F0F0F0] bg-[#EAE8E3] dark:bg-[#111111]`}
                            >
                                {/* Content */}
                                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-2xl md:text-3xl font-black text-[#0F0F0F] dark:text-[#F0F0F0] mb-2 leading-tight">
                                            {project.title}
                                        </h3>
                                        <p className="font-mono text-sm text-[#0F0F0F]/70 dark:text-[#F0F0F0]/70 mb-4">
                                            {project.description}
                                        </p>
                                    </div>

                                    <div className="space-y-3">
                                        {/* Tech Stack */}
                                        <div className="flex flex-wrap gap-2">
                                            {project.tech?.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="px-3 py-1 border-2 border-[#0F0F0F] dark:border-[#F0F0F0] font-mono text-xs font-bold text-[#0F0F0F] dark:text-[#F0F0F0]"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Links */}
                                        <div className="flex gap-3">
                                            {project.github && (
                                                <a
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 border-2 border-[#0F0F0F] dark:border-[#F0F0F0] hover:bg-[#8A0000] hover:border-[#8A0000] hover:text-white transition-colors"
                                                >
                                                    <Github className="w-4 h-4" />
                                                </a>
                                            )}
                                            {project.live && (
                                                <a
                                                    href={project.live}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 border-2 border-[#0F0F0F] dark:border-[#F0F0F0] hover:bg-[#8A0000] hover:border-[#8A0000] hover:text-white transition-colors"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Hover Overlay - Red Accent */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 0.1 }}
                                    className="absolute inset-0 bg-[#8A0000] pointer-events-none"
                                />

                                {/* Admin Controls */}
                                {isRonin && (
                                    <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => setEditingId(project.id)}
                                            className="p-2 bg-[#0F0F0F] dark:bg-[#F0F0F0] text-[#F0F0F0] dark:text-[#0F0F0F] border-2 border-[#0F0F0F] dark:border-[#F0F0F0]"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => deleteProject(project.id)}
                                            className="p-2 bg-[#8A0000] text-white border-2 border-[#8A0000]"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}

                    {/* Add New Panel (Ronin only) */}
                    {isRonin && (
                        <motion.button
                            onClick={() => setShowAddForm(true)}
                            whileHover={{ scale: 1.02 }}
                            className="col-span-12 md:col-span-4 row-span-1 border-4 border-dashed border-[#0F0F0F]/30 dark:border-[#F0F0F0]/30 flex items-center justify-center hover:border-[#8A0000] hover:bg-[#8A0000]/5 transition-colors"
                        >
                            <Plus className="w-12 h-12 text-[#0F0F0F]/30 dark:text-[#F0F0F0]/30" />
                        </motion.button>
                    )}
                </div>
            </div>
        </section>
    );
}
