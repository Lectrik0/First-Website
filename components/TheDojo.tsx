'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Trophy, Target, Edit, Save, Plus, Trash2, Lock, Unlock } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface Project {
    id: string;
    title: string;
    description: string;
    tech: string[];
    github: string;
    live: string | null;
}

export default function TheDojo() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Persistent Projects Data
    const [projects, setProjects] = useLocalStorage<Project[]>('ronin_projects', [
        {
            id: '1',
            title: 'SecureAuth',
            description: 'Open-source authentication library with built-in protection against common web vulnerabilities (CSRF, XSS, SQL Injection).',
            tech: ['Python', 'Flask', 'JWT', 'PostgreSQL'],
            github: 'https://github.com/yourusername/secureauth',
            live: null,
        },
        {
            id: '2',
            title: 'Network Scanner Pro',
            description: 'Advanced network reconnaissance tool with custom TCP/UDP scanning capabilities and service fingerprinting.',
            tech: ['Python', 'Scapy', 'Nmap', 'Threading'],
            github: 'https://github.com/yourusername/network-scanner',
            live: null,
        },
    ]);

    // Temp state for editing
    const [editForm, setEditForm] = useState<Project | null>(null);

    const handleEdit = (project: Project) => {
        setEditingId(project.id);
        setEditForm({ ...project });
    };

    const handleSave = () => {
        if (!editForm) return;

        setProjects(prev => prev.map(p => p.id === editForm.id ? editForm : p));
        setEditingId(null);
        setEditForm(null);
    };

    const handleDelete = (id: string) => {
        if (confirm('Delete this project?')) {
            setProjects(prev => prev.filter(p => p.id !== id));
        }
    };

    const handleAdd = () => {
        const newProject: Project = {
            id: Date.now().toString(),
            title: 'New Project',
            description: 'Description goes here...',
            tech: ['Tech 1', 'Tech 2'],
            github: '#',
            live: null
        };
        setProjects(prev => [...prev, newProject]);
        // Automatically enter edit mode for new project
        setEditingId(newProject.id);
        setEditForm(newProject);
    };

    return (
        <section id="dojo" className="py-24 px-4 md:px-8 lg:px-16 relatives">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 flex justify-between items-end"
                >
                    <div>
                        <h2 className="text-5xl md:text-7xl font-playfair font-black text-ink dark:text-bone mb-4">
                            THE DOJO
                        </h2>
                        <div className="w-32 h-1 bg-ink dark:bg-bone mb-6" />
                        <p className="text-xl font-playfair italic text-charcoal dark:text-smoke max-w-2xl">
                            "Practice without theory is blind. Theory without practice is empty."
                        </p>
                    </div>

                    {/* Admin Toggle (Hidden/Subtle) */}
                    <button
                        onClick={() => setIsAdmin(!isAdmin)}
                        className={`p-2 rounded-full transition-colors ${isAdmin ? 'bg-gold text-charcoal' : 'text-ink/10 dark:text-bone/10 hover:text-ink dark:hover:text-bone'}`}
                        title="Toggle Admin Mode"
                    >
                        {isAdmin ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                    </button>
                </motion.div>

                {/* Projects */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-20"
                >
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <Github className="w-8 h-8 text-ink dark:text-bone" strokeWidth={1.5} />
                            <h3 className="text-3xl font-playfair font-bold text-ink dark:text-bone">Projects</h3>
                        </div>

                        {isAdmin && (
                            <button
                                onClick={handleAdd}
                                className="flex items-center gap-2 px-4 py-2 bg-gold text-charcoal font-bold font-mono rounded hover:bg-gold/80 transition-colors"
                            >
                                <Plus className="w-4 h-4" /> Add Project
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className={`paper-card p-6 manga-filter relative group ${editingId === project.id ? 'ring-2 ring-gold' : ''}`}
                            >
                                {editingId === project.id && editForm ? (
                                    // EDIT MODE
                                    <div className="space-y-4">
                                        <input
                                            type="text"
                                            value={editForm.title}
                                            onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                            className="w-full text-2xl font-playfair font-bold bg-transparent border-b border-ink/20 focus:border-gold outline-none"
                                            placeholder="Project Title"
                                        />
                                        <textarea
                                            value={editForm.description}
                                            onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                                            className="w-full font-playfair text-charcoal dark:text-smoke bg-transparent border border-ink/20 rounded p-2 focus:border-gold outline-none h-24"
                                            placeholder="Description"
                                        />
                                        <div>
                                            <label className="text-xs font-mono text-ash dark:text-smoke block mb-1">Tech Stack (comma separated)</label>
                                            <input
                                                type="text"
                                                value={editForm.tech.join(', ')}
                                                onChange={(e) => setEditForm({ ...editForm, tech: e.target.value.split(',').map(t => t.trim()) })}
                                                className="w-full font-mono text-sm bg-transparent border-b border-ink/20 focus:border-gold outline-none"
                                            />
                                        </div>
                                        <div className="flex justify-end gap-2 pt-4">
                                            <button
                                                onClick={() => setEditingId(null)}
                                                className="px-3 py-1 text-sm font-bold text-smoke hover:text-ink"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleSave}
                                                className="flex items-center gap-2 px-4 py-1.5 bg-gold text-charcoal font-bold text-sm rounded hover:bg-gold/80"
                                            >
                                                <Save className="w-4 h-4" /> Save
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    // VIEW MODE
                                    <>
                                        <div className="flex justify-between items-start mb-3">
                                            <h4 className="text-2xl font-playfair font-bold text-ink dark:text-bone">
                                                {project.title}
                                            </h4>

                                            {isAdmin && (
                                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => handleEdit(project)}
                                                        className="p-1.5 bg-ink/10 dark:bg-bone/10 text-ink dark:text-bone rounded hover:bg-gold hover:text-charcoal"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(project.id)}
                                                        className="p-1.5 bg-ink/10 dark:bg-bone/10 text-blood rounded hover:bg-blood hover:text-white"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>

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
                                    </>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* CTF Achievements (Static for now, but kept for layout consistency) */}
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
                        {/* Static Achievements - Can be refactored similar to Projects if needed */}
                        {/* ... (Kept existing visual style for consistency) ... */}
                        <div className="paper-card p-6 text-center border-2 border-ink/20 dark:border-bone/20">
                            <Target className="w-12 h-12 text-ink dark:text-bone mx-auto mb-4" />
                            <h4 className="text-xl font-playfair font-bold text-ink dark:text-bone">HackTheBox Pro</h4>
                            <p className="text-sm font-mono text-ash dark:text-smoke mt-2">Rank: Top 5%</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
