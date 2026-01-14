'use client';

import { motion } from 'framer-motion';
import { Mail, Linkedin, Twitter, Github } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PGPSignature from './PGPSignature';
import { useDataStore } from '@/hooks/useDataStore';

export default function Contact() {
    const { isAdmin, toggleAdmin } = useDataStore();
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        alert('Message sent! I\'ll get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const socialLinks = [
        { icon: Mail, href: 'mailto:ali@example.com', label: 'Email' },
        { icon: Github, href: 'https://github.com/yourusername', label: 'GitHub' },
        { icon: Linkedin, href: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
        { icon: Twitter, href: 'https://twitter.com/yourusername', label: 'Twitter' },
    ];

    return (
        <section id="contact" className="py-24 px-4 md:px-8 lg:px-16 bg-paper/50 dark:bg-void/50">
            <div className="max-w-4xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 1, y: 0 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-5xl md:text-7xl font-playfair font-black text-ink dark:text-bone mb-4">
                        CONNECT
                    </h2>
                    <div className="w-32 h-1 bg-ink dark:bg-bone mb-6 mx-auto" />
                    <p className="text-xl font-playfair italic text-charcoal dark:text-smoke max-w-2xl mx-auto">
                        "The pen is mightier than the sword. But the keyboard is mightier than both."
                    </p>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 1, y: 0 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="paper-card p-8 md:p-12 mb-12"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name */}
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-playfair font-semibold text-ink dark:text-bone mb-2 uppercase tracking-wide"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-paper dark:bg-void border-2 border-ink/20 dark:border-bone/20 focus:border-ink dark:focus:border-bone focus:outline-none transition-colors font-playfair"
                                placeholder="Your name"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-playfair font-semibold text-ink dark:text-bone mb-2 uppercase tracking-wide"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-paper dark:bg-void border-2 border-ink/20 dark:border-bone/20 focus:border-ink dark:focus:border-bone focus:outline-none transition-colors font-playfair"
                                placeholder="your@email.com"
                            />
                        </div>

                        {/* Message */}
                        <div>
                            <label
                                htmlFor="message"
                                className="block text-sm font-playfair font-semibold text-ink dark:text-bone mb-2 uppercase tracking-wide"
                            >
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={6}
                                className="w-full px-4 py-3 bg-paper dark:bg-void border-2 border-ink/20 dark:border-bone/20 focus:border-ink dark:focus:border-bone focus:outline-none transition-colors font-playfair resize-none"
                                placeholder="Your message..."
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="ink-button w-full md:w-auto"
                        >
                            SEND MESSAGE
                        </button>
                    </form>
                </motion.div>

                {/* Social Links */}
                <motion.div
                    initial={{ opacity: 1, y: 0 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex flex-wrap items-center justify-center gap-6"
                >
                    {socialLinks.map((social, index) => {
                        const Icon = social.icon;
                        return (
                            <a
                                key={index}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex flex-col items-center gap-2"
                                aria-label={social.label}
                            >
                                <div className="w-14 h-14 border-2 border-ink dark:border-bone flex items-center justify-center text-ink dark:text-bone hover:bg-ink hover:dark:bg-bone hover:text-paper hover:dark:text-void transition-all duration-300">
                                    <Icon className="w-6 h-6" strokeWidth={1.5} />
                                </div>
                                <span className="text-xs font-mono text-charcoal dark:text-smoke group-hover:text-ink dark:group-hover:text-bone transition-colors">
                                    {social.label}
                                </span>
                            </a>
                        );
                    })}
                </motion.div>

                {/* PGP Signature */}
                <PGPSignature />

                {/* Hidden Hanko Stamp Trigger */}
                <motion.div
                    initial={{ opacity: 1 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mt-12 flex justify-center"
                >
                    <div
                        onDoubleClick={() => router.push('/hidden-login')}
                        className="text-6xl opacity-10 hover:opacity-30 transition-opacity cursor-default select-none"
                        title="印"
                    >
                        印
                    </div>
                </motion.div>

                {/* Footer Quote */}
                <motion.div
                    initial={{ opacity: 1 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-8 text-center"
                >
                    <p className="font-playfair text-sm text-ash dark:text-smoke italic">
                        © 2024 Ali Ahmed. Walking the path between tradition and innovation.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
