'use client';

import { motion } from 'framer-motion';

export default function VagabondWatermark() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.05 }}
            transition={{ duration: 2, delay: 1 }}
            className="fixed bottom-8 right-8 pointer-events-none z-0 hidden md:block"
        >
            {/* Vagabond Kanji - 浪人 (Rōnin) */}
            <svg
                width="200"
                height="200"
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-ink dark:text-bone"
            >
                {/* Musashi Silhouette */}
                <g transform="translate(0, 0)">
                    {/* Head */}
                    <circle cx="100" cy="40" r="15" fill="currentColor" />

                    {/* Body/Torso */}
                    <rect x="90" y="55" width="20" height="40" rx="2" fill="currentColor" />

                    {/* Arms - Sword Stance */}
                    <path
                        d="M 90 65 L 60 75 L 50 85"
                        stroke="currentColor"
                        strokeWidth="6"
                        strokeLinecap="round"
                        fill="none"
                    />
                    <path
                        d="M 110 65 L 140 75 L 150 85"
                        stroke="currentColor"
                        strokeWidth="6"
                        strokeLinecap="round"
                        fill="none"
                    />

                    {/* Katana */}
                    <path
                        d="M 145 80 L 180 40"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                    />
                    <line
                        x1="145"
                        y1="80"
                        x2="150"
                        y2="75"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeLinecap="round"
                    />

                    {/* Legs - Wide Stance */}
                    <path
                        d="M 95 95 L 85 135 L 80 160"
                        stroke="currentColor"
                        strokeWidth="7"
                        strokeLinecap="round"
                        fill="none"
                    />
                    <path
                        d="M 105 95 L 115 135 L 120 160"
                        stroke="currentColor"
                        strokeWidth="7"
                        strokeLinecap="round"
                        fill="none"
                    />
                </g>
            </svg>
        </motion.div>
    );
}
