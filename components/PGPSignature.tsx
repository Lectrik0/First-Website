'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';

export default function PGPSignature() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [isGlitching, setIsGlitching] = useState(false);

    // Placeholder PGP key - replace with your actual public key
    const pgpKey = `-----BEGIN PGP PUBLIC KEY BLOCK-----

mQINBGXxYZ0BEADKj8kL9X2Hv+QwR7tNm5pS8vY3Kx9...
[PLACEHOLDER - REPLACE WITH YOUR ACTUAL PGP PUBLIC KEY]
...truncated for brevity...
-----END PGP PUBLIC KEY BLOCK-----`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(pgpKey);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-8"
        >
            <div className="paper-card p-6 bg-charcoal/5 dark:bg-bone/5">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blood rounded-full animate-pulse" />
                        <h3 className="font-mono text-sm font-bold text-ink dark:text-bone uppercase tracking-wider">
                            PGP Public Key
                        </h3>
                    </div>
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="p-2 hover:bg-ink/10 dark:hover:bg-bone/10 rounded transition-colors"
                        aria-label={isExpanded ? 'Collapse' : 'Expand'}
                    >
                        {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-ink dark:text-bone" />
                        ) : (
                            <ChevronDown className="w-4 h-4 text-ink dark:text-bone" />
                        )}
                    </button>
                </div>

                {/* Description */}
                <p className="font-mono text-xs text-charcoal dark:text-smoke mb-4">
                    Encrypt your messages with honor. Verify with integrity.
                </p>

                {/* Key Block */}
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="relative"
                    >
                        <div
                            className={`relative overflow-hidden ${isGlitching ? 'glitch-container' : ''}`}
                            onMouseEnter={() => setIsGlitching(true)}
                            onMouseLeave={() => setIsGlitching(false)}
                        >
                            <pre className="font-mono text-xs text-ink dark:text-bone bg-paper dark:bg-void p-4 border-2 border-ink/20 dark:border-bone/20 overflow-x-auto max-h-64 overflow-y-auto">
                                {pgpKey}
                            </pre>

                            {/* Glitch overlay effect */}
                            {isGlitching && (
                                <>
                                    <div className="absolute inset-0 bg-blood/5 pointer-events-none glitch-layer-1" />
                                    <div className="absolute inset-0 bg-ink/5 dark:bg-bone/5 pointer-events-none glitch-layer-2" />
                                </>
                            )}
                        </div>

                        {/* Copy Button */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={copyToClipboard}
                            className="mt-4 w-full ink-button flex items-center justify-center gap-2"
                        >
                            {isCopied ? (
                                <>
                                    <Check className="w-4 h-4" />
                                    <span>Copied to Clipboard!</span>
                                </>
                            ) : (
                                <>
                                    <Copy className="w-4 h-4" />
                                    <span>Copy Public Key</span>
                                </>
                            )}
                        </motion.button>
                    </motion.div>
                )}

                {/* Fingerprint */}
                <div className="mt-4 pt-4 border-t border-ink/10 dark:border-bone/10">
                    <p className="font-mono text-xs text-charcoal dark:text-smoke">
                        <span className="text-ink dark:text-bone font-semibold">Fingerprint:</span>
                        <br />
                        <span className="select-all">XXXX XXXX XXXX XXXX XXXX XXXX XXXX XXXX</span>
                    </p>
                </div>
            </div>

            {/* Glitch Animation Styles */}
            <style jsx>{`
                @keyframes glitch-1 {
                    0%, 100% {
                        transform: translate(0);
                        opacity: 0.8;
                    }
                    33% {
                        transform: translate(-2px, 2px);
                        opacity: 0.6;
                    }
                    66% {
                        transform: translate(2px, -2px);
                        opacity: 0.6;
                    }
                }

                @keyframes glitch-2 {
                    0%, 100% {
                        transform: translate(0);
                        opacity: 0.7;
                    }
                    33% {
                        transform: translate(3px, -3px);
                        opacity: 0.5;
                    }
                    66% {
                        transform: translate(-3px, 3px);
                        opacity: 0.5;
                    }
                }

                .glitch-layer-1 {
                    animation: glitch-1 0.3s infinite;
                }

                .glitch-layer-2 {
                    animation: glitch-2 0.4s infinite;
                }

                .glitch-container {
                    animation: subtle-shake 0.1s infinite;
                }

                @keyframes subtle-shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-1px); }
                    75% { transform: translateX(1px); }
                }
            `}</style>
        </motion.div>
    );
}
