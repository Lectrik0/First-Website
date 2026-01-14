'use client';

import Navbar from '@/components/Navbar';
import LogPose from '@/components/dashboard/LogPose';
import QuestLog from '@/components/dashboard/QuestLog';
import TheTreasury from '@/components/dashboard/TheTreasury';
import VisualMemory from '@/components/dashboard/VisualMemory';
import { motion } from 'framer-motion';
import { Compass } from 'lucide-react';

export default function LifePage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-paper dark:bg-charcoal text-ink dark:text-bone pt-24 pb-12 transition-colors duration-500">
                {/* Header */}
                <section className="px-6 lg:px-8 mb-12 max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-4 mb-8"
                    >
                        <div className="p-4 bg-ink/5 dark:bg-bone/5 rounded-full">
                            <Compass className="w-8 h-8 text-ink dark:text-bone" />
                        </div>
                        <div>
                            <h1 className="text-5xl font-playfair font-black tracking-tight">THE QUARTERS</h1>
                            <p className="font-handwriting text-2xl text-charcoal/80 dark:text-smoke mt-2 -rotate-1">
                                "A pirate's life for me..."
                            </p>
                        </div>
                    </motion.div>

                    {/* Dashboard Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-min">
                        {/* Widget 1: The Log Pose */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                            className="lg:col-span-1"
                        >
                            <LogPose />
                        </motion.div>

                        {/* Widget 2: The Quest Log */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="lg:col-span-2 row-span-2"
                        >
                            <QuestLog />
                        </motion.div>

                        {/* Widget 3: The Treasury */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="lg:col-span-1"
                        >
                            <TheTreasury />
                        </motion.div>

                        {/* Widget 4: Visual Memory */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 }}
                            className="lg:col-span-2"
                        >
                            <VisualMemory />
                        </motion.div>
                    </div>
                </section>
            </main>
        </>
    );
}
