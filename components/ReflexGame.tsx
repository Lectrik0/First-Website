'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type GamePhase = 'idle' | 'meditation' | 'flash' | 'result';

export default function ReflexGame() {
    const [phase, setPhase] = useState<GamePhase>('idle');
    const [reactionTime, setReactionTime] = useState<number | null>(null);
    const [falseStart, setFalseStart] = useState(false);
    const [showGame, setShowGame] = useState(false);
    const flashTimeRef = useRef<number>(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const startGame = () => {
        setPhase('meditation');
        setReactionTime(null);
        setFalseStart(false);

        // Random delay between 2-5 seconds
        const delay = 2000 + Math.random() * 3000;

        timerRef.current = setTimeout(() => {
            setPhase('flash');
            flashTimeRef.current = Date.now();
        }, delay);
    };

    const handleClick = () => {
        if (phase === 'meditation') {
            // False start
            setFalseStart(true);
            setPhase('result');
            if (timerRef.current) clearTimeout(timerRef.current);
        } else if (phase === 'flash') {
            // Calculate reaction time
            const time = Date.now() - flashTimeRef.current;
            setReactionTime(time);
            setPhase('result');
        }
    };

    const reset = () => {
        setPhase('idle');
        setReactionTime(null);
        setFalseStart(false);
        if (timerRef.current) clearTimeout(timerRef.current);
    };

    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    const getResultMessage = () => {
        if (falseStart) {
            return {
                title: 'FALSE START',
                subtitle: 'Dishonorable. You struck too early.',
                color: 'text-red-600',
            };
        }

        if (reactionTime === null) return null;

        if (reactionTime < 200) {
            return {
                title: 'GODLIKE',
                subtitle: `${reactionTime}ms - The blade was invisible.`,
                color: 'text-yellow-500',
            };
        } else if (reactionTime < 300) {
            return {
                title: 'EXCELLENT',
                subtitle: `${reactionTime}ms - Swift as the wind.`,
                color: 'text-green-500',
            };
        } else {
            return {
                title: 'TOO SLOW',
                subtitle: `${reactionTime}ms - You are dead.`,
                color: 'text-red-600',
            };
        }
    };

    if (!showGame) {
        return (
            <section className="py-24 px-4 md:px-8 lg:px-16">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.button
                        onClick={() => setShowGame(true)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 border-2 border-ink dark:border-bone bg-transparent text-ink dark:text-bone font-cinzel text-xl font-bold hover:bg-ink hover:text-bone dark:hover:bg-bone dark:hover:text-ink transition-colors"
                    >
                        居合術 - THE IAIJUTSU
                    </motion.button>
                    <p className="mt-4 font-mono text-sm text-charcoal dark:text-smoke italic">
                        "Test your reflexes in a samurai duel"
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="py-24 px-4 md:px-8 lg:px-16">
            <div className="max-w-7xl mx-auto">
                <AnimatePresence mode="wait">
                    {/* Idle State */}
                    {phase === 'idle' && (
                        <motion.div
                            key="idle"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="min-h-[600px] flex flex-col items-center justify-center bg-black text-white rounded-lg border-4 border-white"
                        >
                            <h2 className="text-6xl font-cinzel font-black mb-8 tracking-wider">
                                居合術
                            </h2>
                            <p className="text-2xl font-cinzel mb-12">THE IAIJUTSU</p>
                            <p className="font-mono text-sm mb-8 max-w-md text-center opacity-70">
                                When the screen flashes white and the kanji appears, click as fast as you can.
                                Click too early, and you dishonor yourself.
                            </p>
                            <motion.button
                                onClick={startGame}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="px-12 py-4 border-4 border-white bg-transparent text-white font-cinzel text-2xl font-bold hover:bg-white hover:text-black transition-colors"
                            >
                                BEGIN
                            </motion.button>
                        </motion.div>
                    )}

                    {/* Meditation Phase */}
                    {phase === 'meditation' && (
                        <motion.div
                            key="meditation"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleClick}
                            className="min-h-[600px] flex items-center justify-center bg-black text-white rounded-lg border-4 border-white cursor-pointer"
                        >
                            <motion.p
                                animate={{
                                    opacity: [0.3, 1, 0.3],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                                className="text-4xl font-cinzel tracking-widest"
                            >
                                Focus...
                            </motion.p>
                        </motion.div>
                    )}

                    {/* Flash Phase */}
                    {phase === 'flash' && (
                        <motion.div
                            key="flash"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            onClick={handleClick}
                            className="min-h-[600px] flex items-center justify-center bg-white text-black rounded-lg border-4 border-black cursor-pointer relative overflow-hidden"
                        >
                            {/* Ink Splatter Effect */}
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 2, opacity: 0.1 }}
                                transition={{ duration: 0.3 }}
                                className="absolute inset-0 bg-black"
                                style={{
                                    clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                                }}
                            />

                            <motion.div
                                initial={{ scale: 0, rotate: -45 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: 'spring', stiffness: 200 }}
                                className="text-center"
                            >
                                <p className="text-9xl font-noto font-black mb-4">
                                    斬
                                </p>
                                <p className="text-4xl font-cinzel font-black tracking-widest">
                                    STRIKE
                                </p>
                            </motion.div>
                        </motion.div>
                    )}

                    {/* Result Phase */}
                    {phase === 'result' && (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="min-h-[600px] flex flex-col items-center justify-center bg-black text-white rounded-lg border-4 border-white relative overflow-hidden"
                        >
                            {/* Ink Splatter for GODLIKE */}
                            {reactionTime && reactionTime < 200 && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 3 }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute inset-0 bg-yellow-500 opacity-20"
                                    style={{
                                        clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                                    }}
                                />
                            )}

                            <motion.div
                                initial={{ scale: 0, y: 50 }}
                                animate={{ scale: 1, y: 0 }}
                                transition={{ type: 'spring', stiffness: 150 }}
                                className="text-center z-10"
                            >
                                <p className={`text-7xl font-cinzel font-black mb-4 ${getResultMessage()?.color}`}>
                                    {getResultMessage()?.title}
                                </p>
                                <p className="text-2xl font-mono mb-12 opacity-70">
                                    {getResultMessage()?.subtitle}
                                </p>

                                <motion.button
                                    onClick={reset}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="px-8 py-3 border-2 border-white bg-transparent text-white font-cinzel text-xl font-bold hover:bg-white hover:text-black transition-colors"
                                >
                                    RESET
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
