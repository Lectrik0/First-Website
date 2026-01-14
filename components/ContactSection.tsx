'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        alert('Message sent with intention.');
        setFormData({ name: '', email: '', message: '' });
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <section id="contact" className="py-20 px-4 md:px-8 lg:px-16 min-h-screen flex items-center">
            <div className="max-w-4xl mx-auto w-full">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-noto font-bold text-sumiInk mb-6">
                        Reach Out
                    </h2>
                    <div className="flex justify-center mb-6">
                        <div className="w-32 h-1 bg-sumiInk"></div>
                    </div>
                    <p className="text-lg md:text-xl font-garamond text-darkGrey italic">
                        Every connection begins with a single word
                    </p>
                </div>

                {/* Contact Form Container */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="paper-texture brush-border-uneven p-8 md:p-12 ink-shadow-strong relative"
                >
                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        {/* Name Input */}
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-playfair font-semibold text-sumiInk mb-2 uppercase tracking-wide"
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
                                className="w-full px-4 py-3 bg-ricePaper border-2 border-sumiInk/30 focus:border-driedBlood focus:outline-none transition-colors duration-500 font-garamond"
                                placeholder="Your name"
                            />
                        </div>

                        {/* Email Input */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-playfair font-semibold text-sumiInk mb-2 uppercase tracking-wide"
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
                                className="w-full px-4 py-3 bg-ricePaper border-2 border-sumiInk/30 focus:border-driedBlood focus:outline-none transition-colors duration-500 font-garamond"
                                placeholder="your@email.com"
                            />
                        </div>

                        {/* Message Textarea */}
                        <div>
                            <label
                                htmlFor="message"
                                className="block text-sm font-playfair font-semibold text-sumiInk mb-2 uppercase tracking-wide"
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
                                className="w-full px-4 py-3 bg-ricePaper border-2 border-sumiInk/30 focus:border-driedBlood focus:outline-none transition-colors duration-500 font-garamond resize-none"
                                placeholder="Share your thoughts..."
                            />
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            whileHover={{
                                y: -2,
                                transition: { duration: 0.3, ease: 'easeOut' }
                            }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full md:w-auto px-8 py-4 bg-sumiInk text-ricePaper font-playfair font-bold text-lg hover:bg-driedBlood transition-colors duration-500 ink-shadow"
                        >
                            Send Message
                        </motion.button>
                    </form>

                    {/* Decorative Kanji */}
                    <div className="absolute bottom-4 right-4 text-6xl font-noto text-sumiInk/5 pointer-events-none">
                        信
                    </div>
                </motion.div>

                {/* Philosophical Closing */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                    className="mt-12 text-center"
                >
                    <p className="font-garamond text-darkGrey/70 italic text-lg">
                        "The quieter you become, the more you can hear."
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
