'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="w-10 h-10 border border-ink/20 dark:border-bone/20 flex items-center justify-center">
                <div className="w-4 h-4 bg-ink/20 dark:bg-bone/20 animate-pulse" />
            </div>
        );
    }

    const isDark = theme === 'dark';

    return (
        <motion.button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="relative w-10 h-10 border-2 border-ink dark:border-bone flex items-center justify-center transition-all duration-300 hover:bg-ink hover:dark:bg-bone group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle theme"
        >
            {/* Icon with rotation */}
            <motion.div
                animate={{ rotate: isDark ? 180 : 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
            >
                {isDark ? (
                    <Moon className="w-5 h-5 text-bone group-hover:text-void transition-colors" strokeWidth={2} />
                ) : (
                    <Sun className="w-5 h-5 text-ink group-hover:text-paper transition-colors" strokeWidth={2} />
                )}
            </motion.div>
        </motion.button>
    );
}
