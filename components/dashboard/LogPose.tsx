'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Plus, Minus, BookOpen, Tv } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface LogPoseData {
    series: string;
    episode: number;
    chapter: number;
    type: 'anime' | 'manga';
}

export default function LogPose() {
    const [data, setData] = useLocalStorage<LogPoseData>('ronin_log_pose', {
        series: 'One Piece',
        episode: 1089,
        chapter: 1105,
        type: 'manga'
    });

    const [isNeedleSpinning, setIsNeedleSpinning] = useState(false);

    const updateCount = (field: 'episode' | 'chapter', change: number) => {
        setIsNeedleSpinning(true);
        setTimeout(() => setIsNeedleSpinning(false), 500);

        setData(prev => ({
            ...prev,
            [field]: Math.max(0, prev[field] + change)
        }));
    };

    return (
        <div className="relative group p-6 bg-paper/10 dark:bg-void/40 backdrop-blur-sm border border-ink/10 dark:border-bone/10 rounded-xl overflow-hidden min-h-[300px] flex flex-col items-center justify-center">
            {/* Glass reflection effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />

            {/* Header */}
            <div className="absolute top-4 left-0 w-full text-center">
                <h3 className="font-cinzel font-bold text-ink dark:text-bone flex items-center justify-center gap-2">
                    <Compass className="w-5 h-5 text-oceanBlue" />
                    LOG POSE
                </h3>
            </div>

            {/* Compass Visualization */}
            <div className="relative w-32 h-32 mb-8 mt-6">
                <div className="absolute inset-0 rounded-full border-4 border-gold/50 shadow-[0_0_15px_rgba(255,215,0,0.3)] bg-void/50 backdrop-blur-md"></div>
                <div className="absolute inset-2 rounded-full border border-gold/30"></div>

                {/* Needle */}
                <motion.div
                    className="absolute top-1/2 left-1/2 w-24 h-2 bg-gradient-to-r from-red-500 to-transparent origin-left -translate-y-1/2"
                    animate={{ rotate: isNeedleSpinning ? [0, 360, 370, 360] : 0 }}
                    transition={{ duration: 0.8, type: "spring" }}
                    style={{ left: '50%', transformOrigin: '0% 50%' }}
                >
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-gold rounded-full shadow-lg"></div>
                </motion.div>

                {/* Glass Cover */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>
            </div>

            {/* Controls */}
            <div className="w-full space-y-4 z-10">
                <div className="flex items-center justify-center gap-2 mb-4">
                    <input
                        type="text"
                        value={data.series}
                        onChange={(e) => setData({ ...data, series: e.target.value })}
                        className="bg-transparent text-center font-pirate text-xl text-ink dark:text-bone border-b border-ink/20 focus:border-gold outline-none w-full max-w-[200px]"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* Chapter Input */}
                    <div className="flex flex-col items-center p-2 bg-paper/50 dark:bg-charcoal/50 rounded-lg">
                        <span className="text-xs font-mono text-smoke mb-1 flex items-center gap-1">
                            <BookOpen className="w-3 h-3" /> CH
                        </span>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => updateCount('chapter', -1)}
                                className="w-6 h-6 flex items-center justify-center rounded-full bg-ink/10 dark:bg-bone/10 hover:bg-gold/20 text-ink dark:text-bone"
                            >
                                <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-mono text-lg font-bold min-w-[3ch] text-center dark:text-bone">{data.chapter}</span>
                            <button
                                onClick={() => updateCount('chapter', 1)}
                                className="w-6 h-6 flex items-center justify-center rounded-full bg-ink/10 dark:bg-bone/10 hover:bg-gold/20 text-ink dark:text-bone"
                            >
                                <Plus className="w-3 h-3" />
                            </button>
                        </div>
                    </div>

                    {/* Episode Input */}
                    <div className="flex flex-col items-center p-2 bg-paper/50 dark:bg-charcoal/50 rounded-lg">
                        <span className="text-xs font-mono text-smoke mb-1 flex items-center gap-1">
                            <Tv className="w-3 h-3" /> EP
                        </span>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => updateCount('episode', -1)}
                                className="w-6 h-6 flex items-center justify-center rounded-full bg-ink/10 dark:bg-bone/10 hover:bg-gold/20 text-ink dark:text-bone"
                            >
                                <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-mono text-lg font-bold min-w-[3ch] text-center dark:text-bone">{data.episode}</span>
                            <button
                                onClick={() => updateCount('episode', 1)}
                                className="w-6 h-6 flex items-center justify-center rounded-full bg-ink/10 dark:bg-bone/10 hover:bg-gold/20 text-ink dark:text-bone"
                            >
                                <Plus className="w-3 h-3" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Magnetic jitter decoration */}
            <motion.div
                className="absolute top-4 right-4 text-[10px] font-mono text-gold/50"
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                N 32° W
            </motion.div>
        </div>
    );
}
