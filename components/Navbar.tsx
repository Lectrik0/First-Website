'use client';

import { motion } from 'framer-motion';
import { Shield, Terminal, Code } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import Link from 'next/link';

export default function Navbar() {
    const navLinks = [
        { name: 'The Path', href: '#path' },
        { name: 'Archives', href: '#archives' },
        { name: 'Dojo', href: '#dojo' },
    ];

    return (
        <motion.nav
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="fixed top-0 left-0 right-0 z-50 bg-paper/95 dark:bg-void/95 border-b border-ink/10 dark:border-bone/10"
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo - Minimal */}
                    <Link href="#home">
                        <motion.div
                            className="flex items-center space-x-2 group cursor-pointer"
                            whileHover={{ x: 2 }}
                        >
                            <h1 className="text-lg font-playfair font-black text-ink dark:text-bone tracking-tight">
                                ALI <span className="font-light">AHMED</span>
                            </h1>
                        </motion.div>
                    </Link>

                    {/* Navigation Links - Minimal Text Only */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link, index) => (
                            <motion.a
                                key={link.href}
                                href={link.href}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 + index * 0.1, ease: 'easeOut' }}
                                className="brush-underline font-playfair font-semibold text-ink dark:text-bone text-sm uppercase tracking-wider"
                            >
                                {link.name}
                            </motion.a>
                        ))}
                    </div>

                    {/* Theme Toggle */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        <ThemeToggle />
                    </motion.div>
                </div>
            </div>
        </motion.nav>
    );
}
