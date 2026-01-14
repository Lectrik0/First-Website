'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Beginning', href: '#home' },
        { name: 'Works', href: '#works' },
        { name: 'Journey', href: '#journey' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <>
            {/* Desktop Navigation */}
            <motion.nav
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:block"
            >
                <div className="bg-ricePaper/90 backdrop-blur-sm border-2 border-sumiInk px-8 py-4 ink-shadow">
                    <ul className="flex gap-8 items-center">
                        {navLinks.map((link, index) => (
                            <motion.li
                                key={link.href}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 + index * 0.1, ease: 'easeOut' }}
                            >
                                <a
                                    href={link.href}
                                    className="group relative font-playfair font-semibold text-sumiInk hover:text-driedBlood transition-colors duration-500"
                                >
                                    <span className="relative z-10">{link.name}</span>
                                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-sumiInk group-hover:w-full transition-all duration-500" />
                                </a>
                            </motion.li>
                        ))}
                    </ul>
                </div>
            </motion.nav>

            {/* Mobile Navigation */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-50">
                <div className="bg-ricePaper/95 backdrop-blur-sm p-4 flex justify-between items-center border-b-2 border-sumiInk">
                    <h2 className="font-noto text-sumiInk text-xl font-bold">Portfolio</h2>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-10 h-10 flex flex-col justify-center items-center gap-1.5"
                        aria-label="Toggle menu"
                    >
                        <motion.span
                            animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6 : 0 }}
                            className="w-6 h-px bg-sumiInk block transition-all duration-300"
                        />
                        <motion.span
                            animate={{ opacity: isOpen ? 0 : 1 }}
                            className="w-6 h-px bg-sumiInk block transition-all duration-300"
                        />
                        <motion.span
                            animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -6 : 0 }}
                            className="w-6 h-px bg-sumiInk block transition-all duration-300"
                        />
                    </button>
                </div>

                {/* Mobile Menu */}
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                        height: isOpen ? 'auto' : 0,
                        opacity: isOpen ? 1 : 0,
                    }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="bg-ricePaper/95 backdrop-blur-sm overflow-hidden border-b-2 border-sumiInk"
                >
                    <ul className="flex flex-col p-4 gap-4">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <a
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="font-playfair font-semibold text-sumiInk hover:text-driedBlood transition-colors duration-500 block py-2"
                                >
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>
        </>
    );
}
