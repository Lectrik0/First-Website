'use client';

import { motion } from 'framer-motion';
import { battleLogs } from '@/data/battleLogsData';
import { Trophy, Calendar, Target, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import Navbar from '@/components/Navbar';

export default function BattleLogsPage() {
    const [filter, setFilter] = useState<'all' | 'DEFEATED' | 'EVADED'>('all');

    const filteredLogs = filter === 'all'
        ? battleLogs
        : battleLogs.filter(log => log.status === filter);

    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-24 pb-16 px-4 md:px-8 lg:px-16">
                <div className="max-w-6xl mx-auto">
                    {/* Header with Musashi Quote */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-16 text-center"
                    >
                        <h1 className="text-6xl md:text-8xl font-playfair font-black text-ink dark:text-bone mb-8">
                            BATTLE LOGS
                        </h1>
                        <div className="w-32 h-1 bg-ink dark:bg-bone mb-8 mx-auto" />

                        {/* Musashi Quote */}
                        <div className="paper-card p-8 max-w-3xl mx-auto bg-charcoal/5 dark:bg-bone/5">
                            <p className="text-2xl font-playfair italic text-ink dark:text-bone leading-relaxed">
                                "Do not regret what you have done."
                            </p>
                            <p className="text-sm font-playfair text-charcoal dark:text-smoke mt-2">
                                — Miyamoto Musashi
                            </p>
                        </div>
                    </motion.div>

                    {/* Filter Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex items-center justify-center gap-4 mb-12 flex-wrap"
                    >
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-6 py-2 border-2 font-playfair font-semibold text-sm uppercase tracking-wide transition-all ${filter === 'all'
                                    ? 'bg-ink dark:bg-bone text-paper dark:text-void border-ink dark:border-bone'
                                    : 'border-ink/30 dark:border-bone/30 text-ink dark:text-bone hover:border-ink dark:hover:border-bone'
                                }`}
                        >
                            All Battles ({battleLogs.length})
                        </button>
                        <button
                            onClick={() => setFilter('DEFEATED')}
                            className={`px-6 py-2 border-2 font-playfair font-semibold text-sm uppercase tracking-wide transition-all ${filter === 'DEFEATED'
                                    ? 'bg-ink dark:bg-bone text-paper dark:text-void border-ink dark:border-bone'
                                    : 'border-ink/30 dark:border-bone/30 text-ink dark:text-bone hover:border-ink dark:hover:border-bone'
                                }`}
                        >
                            Defeated ({battleLogs.filter(l => l.status === 'DEFEATED').length})
                        </button>
                        <button
                            onClick={() => setFilter('EVADED')}
                            className={`px-6 py-2 border-2 font-playfair font-semibold text-sm uppercase tracking-wide transition-all ${filter === 'EVADED'
                                    ? 'bg-ink dark:bg-bone text-paper dark:text-void border-ink dark:border-bone'
                                    : 'border-ink/30 dark:border-bone/30 text-ink dark:text-bone hover:border-ink dark:hover:border-bone'
                                }`}
                        >
                            Evaded ({battleLogs.filter(l => l.status === 'EVADED').length})
                        </button>
                    </motion.div>

                    {/* Battle Log Cards */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredLogs.map((log, index) => (
                            <motion.div
                                key={log.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="paper-card p-6 hover:shadow-xl transition-shadow group cursor-pointer"
                            >
                                {/* Status Badge */}
                                <div className="flex items-center justify-between mb-4">
                                    <span
                                        className={`px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider ${log.status === 'DEFEATED'
                                                ? 'bg-ink/10 dark:bg-bone/10 text-ink dark:text-bone'
                                                : 'bg-blood/10 text-blood'
                                            }`}
                                    >
                                        {log.status}
                                    </span>
                                    <Trophy
                                        className={`w-5 h-5 ${log.status === 'DEFEATED'
                                                ? 'text-ink dark:text-bone'
                                                : 'text-ash dark:text-smoke opacity-30'
                                            }`}
                                    />
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-playfair font-bold text-ink dark:text-bone mb-2 group-hover:text-blood transition-colors">
                                    {log.title}
                                </h3>

                                {/* Machine */}
                                <p className="font-mono text-sm text-charcoal dark:text-smoke mb-4">
                                    {log.machine}
                                </p>

                                {/* Meta Info */}
                                <div className="flex items-center gap-4 mb-4 text-xs font-mono text-ash dark:text-smoke">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        <span>{log.date}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Target className="w-3 h-3" />
                                        <span>{log.difficulty}</span>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-sm font-playfair text-charcoal dark:text-smoke mb-4 line-clamp-3">
                                    {log.description}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {log.tags.slice(0, 3).map((tag, i) => (
                                        <span
                                            key={i}
                                            className="px-2 py-1 text-xs font-mono bg-ink/5 dark:bg-bone/5 border border-ink/10 dark:border-bone/10 text-charcoal dark:text-smoke"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                    {log.tags.length > 3 && (
                                        <span className="px-2 py-1 text-xs font-mono text-ash dark:text-smoke">
                                            +{log.tags.length - 3}
                                        </span>
                                    )}
                                </div>

                                {/* Read More */}
                                <div className="flex items-center gap-2 text-sm font-mono text-ink dark:text-bone group-hover:gap-3 transition-all">
                                    <span>Read Full Write-up</span>
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredLogs.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-16"
                        >
                            <p className="text-xl font-playfair italic text-charcoal dark:text-smoke">
                                No battles found in this category.
                            </p>
                        </motion.div>
                    )}
                </div>
            </main>
        </>
    );
}
