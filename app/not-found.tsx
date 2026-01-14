'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CloudFog } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-paper dark:bg-charcoal flex items-center justify-center p-6 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-md"
            >
                <CloudFog className="w-24 h-24 text-ink/20 dark:text-bone/20 mx-auto mb-6" />

                <h2 className="text-4xl font-playfair font-black text-ink dark:text-bone mb-4">
                    LOST IN THE MIST
                </h2>

                <p className="font-playfair italic text-charcoal/80 dark:text-smoke mb-8">
                    "Do not let yourself be guided by the feeling of lust or love.
                    Though the path is unsure, the destination is within."
                </p>

                <div className="w-32 h-px bg-ink/10 dark:bg-bone/10 mx-auto mb-8" />

                <Link
                    href="/"
                    className="inline-block px-8 py-3 border-2 border-ink dark:border-bone text-ink dark:text-bone font-cinzel font-bold hover:bg-ink hover:text-white dark:hover:bg-bone dark:hover:text-void transition-colors duration-300"
                >
                    RETURN TO THE PATH
                </Link>

                <p className="font-mono text-xs text-smoke mt-12">
                    404 - PAGE NOT FOUND
                </p>
            </motion.div>
        </div>
    );
}
