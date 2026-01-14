'use client';

import { motion } from 'framer-motion';
import { cheatsheetCommands } from '@/data/cheatsheetData';
import { Search, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import Navbar from '@/components/Navbar';

export default function BlackScrollPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const filteredCommands = cheatsheetCommands.filter(cmd =>
        cmd.command.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cmd.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cmd.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const copyToClipboard = (command: string, id: string) => {
        navigator.clipboard.writeText(command);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-24 pb-16 px-4 md:px-8 lg:px-16">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-12 text-center"
                    >
                        <h1 className="text-6xl md:text-8xl font-playfair font-black text-ink dark:text-bone mb-8">
                            THE BLACK SCROLL
                        </h1>
                        <div className="w-32 h-1 bg-ink dark:bg-bone mb-8 mx-auto" />
                        <p className="text-xl font-playfair italic text-charcoal dark:text-smoke max-w-2xl mx-auto">
                            Sacred commands of the digital warrior. Knowledge distilled into terminal wisdom.
                        </p>
                    </motion.div>

                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mb-12"
                    >
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-charcoal dark:text-smoke" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search commands, descriptions, or categories..."
                                className="w-full pl-12 pr-4 py-4 bg-white dark:bg-charcoal border-2 border-ink/20 dark:border-bone/20 focus:border-ink dark:focus:border-bone focus:outline-none transition-colors font-mono text-sm text-ink dark:text-bone placeholder:text-ash dark:placeholder:text-smoke"
                            />
                        </div>
                        <p className="mt-2 text-xs font-mono text-ash dark:text-smoke text-right">
                            {filteredCommands.length} command{filteredCommands.length !== 1 ? 's' : ''} found
                        </p>
                    </motion.div>

                    {/* Command List */}
                    <div className="space-y-3">
                        {filteredCommands.map((cmd, index) => (
                            <motion.div
                                key={cmd.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.02 }}
                                className="paper-card p-4 hover:shadow-lg transition-all group"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        {/* Category Badge */}
                                        <span className="inline-block px-2 py-1 text-xs font-mono font-semibold bg-ink/10 dark:bg-bone/10 text-ink dark:text-bone mb-2 uppercase tracking-wide">
                                            {cmd.category}
                                        </span>

                                        {/* Command */}
                                        <div className="bg-paper dark:bg-void p-3 mb-2 border-l-4 border-ink dark:border-bone">
                                            <code className="font-mono text-sm text-ink dark:text-bone break-all">
                                                {cmd.command}
                                            </code>
                                        </div>

                                        {/* Description */}
                                        <p className="text-sm font-playfair text-charcoal dark:text-smoke">
                                            {cmd.description}
                                        </p>

                                        {/* Example (if available) */}
                                        {cmd.example && (
                                            <div className="mt-2 text-xs font-mono text-ash dark:text-smoke">
                                                <span className="font-semibold">Example:</span> {cmd.example}
                                            </div>
                                        )}
                                    </div>

                                    {/* Copy Button */}
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => copyToClipboard(cmd.command, cmd.id)}
                                        className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-ink/30 dark:border-bone/30 hover:border-ink dark:hover:border-bone hover:bg-ink/5 dark:hover:bg-bone/5 transition-all"
                                        aria-label="Copy command"
                                    >
                                        {copiedId === cmd.id ? (
                                            <Check className="w-4 h-4 text-blood" />
                                        ) : (
                                            <Copy className="w-4 h-4 text-ink dark:text-bone" />
                                        )}
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredCommands.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-16"
                        >
                            <p className="text-xl font-playfair italic text-charcoal dark:text-smoke">
                                No commands found matching "{searchQuery}"
                            </p>
                            <p className="text-sm font-mono text-ash dark:text-smoke mt-2">
                                Try a different search term
                            </p>
                        </motion.div>
                    )}
                </div>
            </main>
        </>
    );
}
