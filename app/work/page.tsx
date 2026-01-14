'use client';

import Navbar from '@/components/Navbar';
import Armory from '@/components/Armory';
import TheDojo from '@/components/TheDojo';
import TheArchives from '@/components/TheArchives';
import { motion } from 'framer-motion';

export default function WorkPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-void text-bone pt-20">
                {/* Header */}
                <section className="px-6 lg:px-8 py-12 max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12"
                    >
                        <h1 className="text-6xl font-playfair font-black mb-4 tracking-tight">THE DOJO</h1>
                        <p className="font-mono text-smoke text-lg max-w-2xl">
                            "The art of digital warfare. Discipline, strategy, and execution."
                        </p>
                        <div className="w-full h-px bg-bone/20 mt-8" />
                    </motion.div>
                </section>

                <Armory />
                <TheDojo />
                <TheArchives />
            </main>
        </>
    );
}
