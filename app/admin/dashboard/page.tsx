'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAdmin } from '@/contexts/AdminContext';
import { LogOut, LayoutGrid } from 'lucide-react';

// Dashboard Widgets
import LogPose from '@/components/dashboard/LogPose';
import QuestLog from '@/components/dashboard/QuestLog';
import TheTreasury from '@/components/dashboard/TheTreasury';
import VisualMemory from '@/components/dashboard/VisualMemory';

export default function AdminDashboard() {
    const { isAdmin, logout } = useAdmin();
    const router = useRouter();

    useEffect(() => {
        if (!isAdmin) {
            router.push('/admin');
        }
    }, [isAdmin, router]);

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    if (!isAdmin) return null;

    return (
        <div className="min-h-screen bg-paper dark:bg-void text-ink dark:text-bone p-4 md:p-8 transition-colors duration-500">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-7xl mx-auto mb-8 flex items-center justify-between"
            >
                <div className="flex items-center gap-4">
                    <div className="bg-ink dark:bg-bone text-paper dark:text-void p-3 rounded-lg">
                        <LayoutGrid className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-cinzel font-black">CAPTAIN'S LOG</h1>
                        <p className="font-mono text-sm text-smoke">Welcome back, Navigator.</p>
                    </div>
                </div>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 border-2 border-ink/20 dark:border-bone/30 hover:border-ink dark:hover:border-bone hover:bg-ink dark:hover:bg-bone hover:text-paper dark:hover:text-void transition-all font-mono text-sm rounded"
                >
                    <LogOut className="w-4 h-4" />
                    Logout
                </button>
            </motion.div>

            {/* Dashboard Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-min">

                {/* Widget 1: The Log Pose (Manga Tracker) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="lg:col-span-1"
                >
                    <LogPose />
                </motion.div>

                {/* Widget 2: The Quest Log (To-Do) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-2 row-span-2"
                >
                    <QuestLog />
                </motion.div>

                {/* Widget 3: The Treasury (Savings) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="lg:col-span-1"
                >
                    <TheTreasury />
                </motion.div>

                {/* Widget 4: Visual Memory (Photo) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-2"
                >
                    <VisualMemory />
                </motion.div>

            </div>
        </div>
    );
}

