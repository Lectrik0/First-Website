'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';

export default function HiddenLogin() {
    const [passphrase, setPassphrase] = useState('');
    const [error, setError] = useState(false);
    const router = useRouter();
    const { login } = useAuth();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const success = login(passphrase);

        if (success) {
            // Success animation then redirect
            setTimeout(() => {
                router.push('/life');
            }, 500);
        } else {
            // Error shake animation
            setError(true);
            setPassphrase('');
            setTimeout(() => setError(false), 500);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
            {/* Minimalist form */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="w-full max-w-md"
            >
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Subtle title */}
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 0.3, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-center text-white/30 font-mono text-xs tracking-widest uppercase"
                    >
                        The Way of the Ronin
                    </motion.p>

                    {/* Passphrase input */}
                    <motion.input
                        type="password"
                        value={passphrase}
                        onChange={(e) => setPassphrase(e.target.value)}
                        placeholder="Enter the way of the Ronin..."
                        autoFocus
                        animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
                        transition={{ duration: 0.4 }}
                        className="w-full bg-transparent border-b border-white/20 focus:border-white/60 outline-none text-white text-center py-4 font-mono placeholder:text-white/20 transition-colors"
                    />

                    {/* Error message */}
                    {error && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center text-red-500/80 font-mono text-xs"
                        >
                            The path is closed to outsiders.
                        </motion.p>
                    )}

                    {/* Hidden submit button (Enter key works) */}
                    <button type="submit" className="hidden" />
                </form>

                {/* Escape hint */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.2 }}
                    transition={{ delay: 2 }}
                    className="text-center text-white/20 font-mono text-xs mt-12"
                >
                    Press ESC to return
                </motion.p>
            </motion.div>
        </div>
    );
}
