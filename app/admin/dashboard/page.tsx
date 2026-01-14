'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAdmin } from '@/contexts/AdminContext';
import { FileText, FolderGit2, LogOut, Plus, Edit, Trash2 } from 'lucide-react';

export default function AdminDashboard() {
    const { isAdmin, logout } = useAdmin();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'posts' | 'projects'>('posts');

    useEffect(() => {
        if (!isAdmin) {
            router.push('/admin');
        }
    }, [isAdmin, router]);

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    // Mock data (in production, fetch from API)
    const blogPosts = [
        { id: 1, title: 'Understanding Buffer Overflow Attacks', date: '2024-01-10', status: 'Published' },
        { id: 2, title: 'My Journey Through HackTheBox', date: '2023-12-28', status: 'Published' },
        { id: 3, title: 'Building Secure APIs', date: '2023-12-15', status: 'Draft' },
    ];

    const projects = [
        { id: 1, name: 'SecureAuth', tech: 'Python, Flask', status: 'Active' },
        { id: 2, name: 'Network Scanner Pro', tech: 'Python, Scapy', status: 'Active' },
        { id: 3, name: 'Vuln Web App', tech: 'Node.js, Express', status: 'Archived' },
    ];

    if (!isAdmin) return null;

    return (
        <div className="min-h-screen bg-void text-bone p-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-7xl mx-auto mb-12"
            >
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-5xl font-cinzel font-black mb-2">SENSEI DASHBOARD</h1>
                        <div className="w-32 h-px bg-bone" />
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 border-2 border-bone/30 hover:border-bone hover:bg-bone hover:text-void transition-all font-mono text-sm"
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>
                </div>
            </motion.div>

            <div className="max-w-7xl mx-auto">
                {/* Tab Navigation */}
                <div className="flex gap-4 mb-8 border-b border-bone/20">
                    <button
                        onClick={() => setActiveTab('posts')}
                        className={`flex items-center gap-2 px-6 py-3 font-cinzel font-bold uppercase transition-all ${activeTab === 'posts'
                                ? 'border-b-2 border-bone text-bone'
                                : 'text-smoke hover:text-bone'
                            }`}
                    >
                        <FileText className="w-5 h-5" />
                        Blog Posts
                    </button>
                    <button
                        onClick={() => setActiveTab('projects')}
                        className={`flex items-center gap-2 px-6 py-3 font-cinzel font-bold uppercase transition-all ${activeTab === 'projects'
                                ? 'border-b-2 border-bone text-bone'
                                : 'text-smoke hover:text-bone'
                            }`}
                    >
                        <FolderGit2 className="w-5 h-5" />
                        Projects
                    </button>
                </div>

                {/* Content */}
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    {/* Add New Button */}
                    <div className="mb-6">
                        <button
                            onClick={() => router.push('/admin/editor')}
                            className="flex items-center gap-2 px-6 py-3 bg-bone text-void font-cinzel font-bold uppercase hover:bg-smoke transition-colors"
                        >
                            <Plus className="w-5 h-5" />
                            New {activeTab === 'posts' ? 'Post' : 'Project'}
                        </button>
                    </div>

                    {/* List */}
                    <div className="space-y-4">
                        {activeTab === 'posts' ? (
                            blogPosts.map((post, index) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-charcoal/50 border-2 border-bone/20 p-6 hover:border-bone/40 transition-all group"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-cinzel font-bold text-bone mb-2">
                                                {post.title}
                                            </h3>
                                            <div className="flex items-center gap-4 text-sm font-mono">
                                                <span className="text-smoke">{post.date}</span>
                                                <span className={`px-2 py-1 text-xs ${post.status === 'Published'
                                                        ? 'bg-bone/10 text-bone border border-bone/30'
                                                        : 'bg-smoke/10 text-smoke border border-smoke/30'
                                                    }`}>
                                                    {post.status}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => router.push(`/admin/editor/${post.id}`)}
                                                className="p-2 border border-bone/30 hover:bg-bone hover:text-void transition-all"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 border border-blood/30 hover:bg-blood hover:text-bone transition-all">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            projects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-charcoal/50 border-2 border-bone/20 p-6 hover:border-bone/40 transition-all group"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-cinzel font-bold text-bone mb-2">
                                                {project.name}
                                            </h3>
                                            <div className="flex items-center gap-4 text-sm font-mono">
                                                <span className="text-smoke">{project.tech}</span>
                                                <span className={`px-2 py-1 text-xs ${project.status === 'Active'
                                                        ? 'bg-bone/10 text-bone border border-bone/30'
                                                        : 'bg-smoke/10 text-smoke border border-smoke/30'
                                                    }`}>
                                                    {project.status}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 border border-bone/30 hover:bg-bone hover:text-void transition-all">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 border border-blood/30 hover:bg-blood hover:text-bone transition-all">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
