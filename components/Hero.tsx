'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Hero() {
    const { scrollYProgress } = useScroll();

    // Parallax effects
    const nameY = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const subtitleY = useTransform(scrollYProgress, [0, 1], [0, -30]);
    const inkSplashScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.5]);
    const kanjiRotate = useTransform(scrollYProgress, [0, 1], [0, 5]);

    const socialLinks = [
        { icon: Github, href: '#', label: 'GitHub' },
        { icon: Linkedin, href: '#', label: 'LinkedIn' },
        { icon: Mail, href: '#contact', label: 'Email' },
    ];

    // Split name into characters for stagger animation
    const firstName = 'ALI'.split('');
    const lastName = 'Ahmed'.split('');

    return (
        <section
            id="home"
            className="min-h-screen flex items-center px-4 pt-24 pb-16 relative overflow-hidden"
        >
            {/* Animated Kanji Watermark */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{ rotate: kanjiRotate }}
            >
                <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.02, scale: 1 }}
                    transition={{ duration: 2, ease: 'easeOut' }}
                    className="text-[25rem] md:text-[35rem] font-noto font-black text-ink dark:text-bone leading-none"
                >
                    無双
                </motion.span>
            </motion.div>

            {/* Manga Panel Layout */}
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-0 relative">

                {/* Left Panel - Text Content */}
                <div className="lg:col-span-7 relative z-10 py-12 lg:py-24">
                    {/* Name - Character by Character Reveal */}
                    <motion.div style={{ y: nameY }} className="mb-8">
                        <div className="mb-2">
                            {firstName.map((char, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, y: 20, rotateX: -90 }}
                                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                    transition={{
                                        duration: 0.8,
                                        delay: 0.4 + (i * 0.05),
                                        ease: [0.16, 1, 0.3, 1]
                                    }}
                                    className="inline-block text-6xl md:text-8xl lg:text-9xl font-cinzel font-black text-ink dark:text-bone uppercase"
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </div>
                        <div>
                            {lastName.map((char, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, y: 20, rotateX: -90 }}
                                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                    transition={{
                                        duration: 0.8,
                                        delay: 0.8 + (i * 0.05),
                                        ease: [0.16, 1, 0.3, 1]
                                    }}
                                    className="inline-block text-6xl md:text-8xl lg:text-9xl font-cinzel font-black text-ink dark:text-bone uppercase"
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Ink Stroke Divider - Draws in */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1, delay: 1.5, ease: 'easeOut' }}
                        className="w-32 h-1 bg-ink dark:bg-bone my-8 origin-left"
                    />

                    {/* Subtitle with Parallax */}
                    <motion.div
                        style={{ y: subtitleY }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.8 }}
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
                        transition={{ duration: 0.8, delay: 2 }}
                        className="flex flex-wrap gap-4 mb-12"
                    >
                        <motion.a
                            href="#path"
                            whileHover={{ scale: 1.02, x: 4 }}
                            whileTap={{ scale: 0.98 }}
                            className="ink-button group relative overflow-hidden"
                        >
                            <motion.span
                                className="relative z-10"
                                initial={{ opacity: 1 }}
                                whileHover={{ opacity: 1 }}
                            >
                                VIEW JOURNEY
                            </motion.span>
                        </motion.a>

                        <motion.a
                            href="#contact"
                            whileHover={{ x: 4 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-6 py-3 font-playfair font-bold text-ink dark:text-bone border-b-2 border-ink dark:border-bone hover:border-blood transition-colors"
                        >
                            CONTACT
                        </motion.a>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 2.2 }}
                        className="flex items-center gap-6"
                    >
                        {socialLinks.map((social, index) => {
                            const Icon = social.icon;
                            return (
                                <motion.a
                                    key={index}
                                    href={social.href}
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-10 h-10 border border-ink dark:border-bone flex items-center justify-center text-ink dark:text-bone hover:bg-ink hover:dark:bg-bone hover:text-paper hover:dark:text-void transition-all duration-300"
                                    aria-label={social.label}
                                >
                                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                                </motion.a>
                            );
                        })}
                    </motion.div>
                </div>

                {/* Right Panel - Ink Splash with Scale Animation */}
                <motion.div
                    className="lg:col-span-5 relative hidden lg:flex items-center justify-center"
                    style={{ scale: inkSplashScale }}
                >
                    <div className="relative w-full h-[500px]">
                        {/* Vertical brush stroke */}
                        <motion.div
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ duration: 1.5, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute right-0 top-0 w-2 h-full bg-ink dark:bg-bone origin-top"
                            style={{ transform: 'rotate(-2deg)' }}
                        />

                        {/* Ink splash marks */}
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 0.1 }}
                            transition={{ duration: 0.8, delay: 1.6 }}
                            className="absolute right-10 top-20 w-32 h-32 rounded-full bg-ink dark:bg-bone blur-2xl"
                        />
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 0.08 }}
                            transition={{ duration: 0.8, delay: 1.8 }}
                            className="absolute right-5 bottom-32 w-24 h-24 rounded-full bg-ink dark:bg-bone blur-xl"
                        />
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2.5 }}
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
