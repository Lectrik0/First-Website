'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Copy, Check } from 'lucide-react';

export default function TheCourier() {
    const [message, setMessage] = useState('');
    const [encrypted, setEncrypted] = useState('');
    const [copied, setCopied] = useState(false);

    const encryptMessage = () => {
        if (!message.trim()) return;

        // Simple Base64 encoding wrapped in PGP-style formatting
        const encoded = btoa(message);
        const pgpMessage = `-----BEGIN PGP MESSAGE-----
Version: Ronin Cipher v1.0

${encoded.match(/.{1,64}/g)?.join('\n') || encoded}
-----END PGP MESSAGE-----`;

        setEncrypted(pgpMessage);
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(encrypted);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const reset = () => {
        setMessage('');
        setEncrypted('');
        setCopied(false);
    };

    return (
        <section className="py-24 px-4 md:px-8 lg:px-16 relative">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 text-center"
                >
                    <h2 className="text-4xl font-cinzel font-black text-ink dark:text-bone mb-4">
                        THE COURIER
                    </h2>
                    <p className="font-mono text-charcoal dark:text-smoke text-sm italic">
                        "Send a sealed scroll to the Ronin."
                    </p>
                    <div className="w-24 h-px bg-gold mx-auto mt-4" />
                </motion.div>

                {/* Form */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="bg-paper/50 dark:bg-void/50 backdrop-blur-sm border-2 border-ink/20 dark:border-bone/20 rounded-lg p-8 shadow-xl"
                >
                    <AnimatePresence mode="wait">
                        {!encrypted ? (
                            <motion.div
                                key="input"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <label className="block font-mono text-sm text-ink dark:text-bone mb-2">
                                    Your Message
                                </label>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Write your message here..."
                                    rows={8}
                                    className="w-full px-4 py-3 bg-paper dark:bg-charcoal border border-ink/20 dark:border-bone/20 rounded font-mono text-sm text-ink dark:text-bone placeholder:text-smoke/50 focus:border-gold focus:outline-none resize-none"
                                />

                                <motion.button
                                    onClick={encryptMessage}
                                    disabled={!message.trim()}
                                    whileHover={{ scale: message.trim() ? 1.02 : 1 }}
                                    whileTap={{ scale: message.trim() ? 0.98 : 1 }}
                                    className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 bg-ink dark:bg-bone text-bone dark:text-ink font-mono font-bold rounded hover:bg-gold hover:text-charcoal transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Lock className="w-4 h-4" />
                                    Encrypt & Seal
                                </motion.button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="encrypted"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                            >
                                <label className="block font-mono text-sm text-ink dark:text-bone mb-2">
                                    Encrypted Message
                                </label>
                                <div className="relative">
                                    <pre className="w-full px-4 py-3 bg-charcoal dark:bg-void border border-gold/50 rounded font-mono text-xs text-gold overflow-x-auto whitespace-pre-wrap break-all">
                                        {encrypted}
                                    </pre>
                                </div>

                                <div className="flex gap-3 mt-6">
                                    <motion.button
                                        onClick={copyToClipboard}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gold text-charcoal font-mono font-bold rounded hover:bg-gold/80 transition-colors"
                                    >
                                        {copied ? (
                                            <>
                                                <Check className="w-4 h-4" />
                                                Copied!
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="w-4 h-4" />
                                                Copy to Clipboard
                                            </>
                                        )}
                                    </motion.button>

                                    <motion.button
                                        onClick={reset}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="px-6 py-3 border-2 border-ink/20 dark:border-bone/20 text-ink dark:text-bone font-mono font-bold rounded hover:border-gold transition-colors"
                                    >
                                        New Message
                                    </motion.button>
                                </div>

                                <p className="mt-4 text-xs font-mono text-smoke text-center italic">
                                    Send this encrypted message to: contact@aliahmed.dev
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Decorative Kanji */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.05 }}
                    viewport={{ once: true }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[200px] font-noto text-ink dark:text-bone pointer-events-none select-none -z-10"
                >
                    伝
                </motion.div>
            </div>
        </section>
    );
}
