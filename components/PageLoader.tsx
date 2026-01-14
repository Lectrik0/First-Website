'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function PageLoader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading completion
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="fixed inset-0 z-[10000] bg-paper dark:bg-void flex items-center justify-center"
                >
                    {/* Ink Splash Reveal */}
                    <div className="relative">
                        {/* Center expanding circle */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: [0, 1.2, 1] }}
                            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                            className="w-32 h-32 border-4 border-ink dark:border-bone rounded-full"
                        />

                        {/* Inner pulsing dot */}
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{
                                scale: [0, 1, 1],
                                opacity: [0, 1, 1]
                            }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="absolute inset-0 m-auto w-16 h-16 bg-ink dark:bg-bone rounded-full"
                        >
                            {/* Kanji inside */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.8 }}
                                className="w-full h-full flex items-center justify-center"
                            >
                                <span className="text-3xl font-noto font-black text-paper dark:text-void">
                                    道
                                </span>
                            </motion.div>
                        </motion.div>

                        {/* Orbiting particles */}
                        {[...Array(4)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{
                                    scale: 1,
                                    opacity: [0, 1, 0],
                                    rotate: 360
                                }}
                                transition={{
                                    duration: 2,
                                    delay: 0.5 + (i * 0.1),
                                    rotate: {
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: 'linear'
                                    }
                                }}
                                className="absolute w-2 h-2 bg-ink dark:bg-bone rounded-full"
                                style={{
                                    top: '50%',
                                    left: '50%',
                                    transform: `translate(-50%, -50%) rotate(${i * 90}deg) translateX(60px)`
                                }}
                            />
                        ))}
                    </div>

                    {/* Loading Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="absolute bottom-1/3 font-mono text-xs tracking-widest text-ink dark:text-bone uppercase"
                    >
                        Loading...
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
