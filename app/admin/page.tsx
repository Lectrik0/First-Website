'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/contexts/AdminContext';
import { Lock, User } from 'lucide-react';

export default function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const { login } = useAdmin();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const success = login(username, password);

        if (success) {
            router.push('/admin/dashboard');
        } else {
            setError('Invalid credentials. The path is closed to outsiders.');
            setTimeout(() => setError(''), 3000);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-void">
            {/* Background subtle pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(255,255,255,0.03) 50px, rgba(255,255,255,0.03) 51px)',
                }} />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 w-full max-w-md"
            >
                {/* Sensei Title */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-6xl font-cinzel font-black text-bone mb-2">
                        SENSEI
                    </h1>
                    <div className="w-32 h-px bg-bone mx-auto mb-4" />
                    <p className="text-sm font-mono text-smoke uppercase tracking-widest">
                        Admin Portal
                    </p>
                </motion.div>

                {/* Login Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="bg-charcoal/50 border-2 border-bone/20 p-8 backdrop-blur-sm"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Username */}
                        <div>
                            <label className="block text-xs font-mono text-bone uppercase tracking-wider mb-2">
                                Username
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-smoke" />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 bg-void border-2 border-bone/30 focus:border-bone text-bone font-mono text-sm outline-none transition-colors"
                                    placeholder="sensei"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-xs font-mono text-bone uppercase tracking-wider mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-smoke" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 bg-void border-2 border-bone/30 focus:border-bone text-bone font-mono text-sm outline-none transition-colors"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-3 border border-blood/50 bg-blood/10"
                            >
                                <p className="text-xs font-mono text-blood text-center">
                                    {error}
                                </p>
                            </motion.div>
                        )}

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-3 bg-bone text-void font-cinzel font-bold text-lg uppercase tracking-wider hover:bg-smoke transition-colors"
                        >
                            Enter
                        </motion.button>
                    </form>

                    {/* Hint */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="mt-6 text-center text-xs font-mono text-smoke/50"
                    >
                        &ldquo;The sword is but a tool. The mind is the true weapon.&rdquo;
                    </motion.p>
                </motion.div>

                {/* Back Link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-8 text-center"
                >
                    <a
                        href="/"
                        className="text-sm font-mono text-smoke hover:text-bone transition-colors"
                    >
                        ← Return to main site
                    </a>
                </motion.div>
            </motion.div>
        </div>
    );
}
