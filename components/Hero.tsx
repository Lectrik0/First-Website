'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Hero() {
    const socialLinks = [
        { icon: Github, href: '#', label: 'GitHub' },
        { icon: Linkedin, href: '#', label: 'LinkedIn' },
        { icon: Mail, href: '#contact', label: 'Email' },
    ];

    return (
        <section
            id="home"
            className="min-h-screen flex items-center px-4 pt-24 pb-16 relative kanji-watermark"
            data-kanji="無双"
        >
            {/* Manga Panel Layout - Asymmetric Split */}
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-0 relative">

                {/* Left Panel - Text Content (8 columns) */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                    className="lg:col-span-7 relative z-10 py-12 lg:py-24"
                >
                    {/* Terminal Prompt */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mb-6"
                    >
                        <p className="terminal-prompt font-mono text-xs uppercase tracking-wider">
                            whoami
                        </p>
                    </motion.div>

                    {/* Name - Manga Title Style */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
                        className="text-6xl md:text-8xl lg:text-9xl font-playfair font-black text-ink dark:text-bone leading-none mb-6"
                    >
                        IBRAHIM
                        <br />
                        <span className="font-light italic">Elhaddad</span>
                    </motion.h1>

                    {/* Ink Stroke Divider */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.6, delay: 1, ease: 'easeOut' }}
                        className="w-32 h-1 bg-ink dark:bg-bone mb-8 origin-left"
                    />

                    {/* Subtitle */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                        className="mb-12"
                    >
                        <h2 className="text-2xl md:text-3xl font-playfair text-charcoal dark:text-smoke mb-4">
                            Security Researcher & Developer
                        </h2>
                        <p className="text-lg font-playfair italic text-ash dark:text-smoke max-w-xl">
                            "The way of the warrior is found in death. Meditation on inevitable death should be performed daily."
                        </p>
                    </motion.div>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.4 }}
                        className="flex flex-wrap gap-4 mb-12"
                    >
                        <a
                            href="#path"
                            className="ink-button"
                        >
                            VIEW JOURNEY
                        </a>

                        <a
                            href="#contact"
                            className="px-6 py-3 font-playfair font-bold text-ink dark:text-bone border-b-2 border-ink dark:border-bone hover:border-blood transition-colors"
                        >
                            CONTACT
                        </a>
                    </motion.div>

                    {/* Social Links - Minimal */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 1.6 }}
                        className="flex items-center gap-6"
                    >
                        {socialLinks.map((social, index) => {
                            const Icon = social.icon;
                            return (
                                <a
                                    key={index}
                                    href={social.href}
                                    className="w-10 h-10 border border-ink dark:border-bone flex items-center justify-center text-ink dark:text-bone hover:bg-ink hover:dark:bg-bone hover:text-paper hover:dark:text-void transition-all duration-300"
                                    aria-label={social.label}
                                >
                                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                                </a>
                            );
                        })}
                    </motion.div>
                </motion.div>

                {/* Right Panel - Negative Space with Ink Splash (5 columns) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
                    className="lg:col-span-5 relative hidden lg:flex items-center justify-center ink-splash"
                >
                    {/* Vertical Ink Splash */}
                    <div className="relative w-full h-[500px]">
                        <motion.div
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ duration: 1.2, delay: 1, ease: 'easeOut' }}
                            className="absolute right-0 top-0 w-2 h-full bg-ink dark:bg-bone origin-top"
                            style={{ transform: 'rotate(-2deg)' }}
                        />

                        {/* Splash marks */}
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 0.1 }}
                            transition={{ duration: 0.6, delay: 1.4 }}
                            className="absolute right-10 top-20 w-32 h-32 rounded-full bg-ink dark:bg-bone blur-2xl"
                        />
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 0.08 }}
                            transition={{ duration: 0.6, delay: 1.6 }}
                            className="absolute right-5 bottom-32 w-24 h-24 rounded-full bg-ink dark:bg-bone blur-xl"
                        />
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator - Minimal */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-px h-12 bg-ink dark:bg-bone opacity-40"
                />
            </motion.div>
        </section>
    );
}
