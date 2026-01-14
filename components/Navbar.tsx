'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import Link from 'next/link';

export default function Navbar() {
    const pathname = usePathname();

    const navLinks = [
        { name: 'The Path', href: '/' },
        { name: 'The Dojo', href: '/work' },
        { name: 'The Quarters', href: '/life' },
    ];

    return (
        <motion.nav
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="fixed top-0 left-0 right-0 z-50 bg-paper/95 dark:bg-void/95 border-b border-ink/10 dark:border-bone/10 backdrop-blur-sm"
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/">
                        <motion.div
                            className="flex items-center space-x-2 group cursor-pointer"
                            whileHover={{ x: 2 }}
                        >
                            <h1 className="text-lg font-playfair font-black text-ink dark:text-bone tracking-tight">
                                ALI <span className="font-light">AHMED</span>
                            </h1>
                        </motion.div>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-12">
                        {navLinks.map((link, index) => {
                            const isActive = pathname === link.href;

                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="relative group"
                                >
                                    <motion.span
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.2 + index * 0.1, ease: 'easeOut' }}
                                        className={`font-playfair font-bold text-sm uppercase tracking-widest transition-colors duration-300 ${isActive
                                                ? 'text-ink dark:text-bone'
                                                : 'text-smoke hover:text-ink dark:hover:text-bone'
                                            }`}
                                    >
                                        {link.name}
                                    </motion.span>

                                    {/* Active Indicator */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="navbar-indicator"
                                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold"
                                            initial={{ scaleX: 0 }}
                                            animate={{ scaleX: 1 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
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
