'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Petal {
    id: number;
    y: number;
    delay: number;
    duration: number;
    opacity: number;
    rotate: number;
    scale: number;
    driftAmplitude: number;
}

export default function SakuraRain() {
    const [petals, setPetals] = useState<Petal[]>([]);

    useEffect(() => {
        // Generate 20 random petals for wind gusts
        const generatePetals = () => {
            return Array.from({ length: 20 }, (_, i) => ({
                id: i,
                y: Math.random() * 100, // Random Y position (0-100%)
                delay: Math.random() * 15, // Stagger start (0-15s)
                duration: 8 + Math.random() * 12, // Travel duration (8-20s) - varying speeds
                opacity: 0.2 + Math.random() * 0.3, // Opacity (0.2-0.5) - subtle
                rotate: Math.random() * 360, // Initial rotation
                scale: 0.5 + Math.random() * 0.5, // Size variation (0.5-1.0)
                driftAmplitude: 5 + Math.random() * 15, // Vertical drift range (5-20vh)
            }));
        };

        setPetals(generatePetals());
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
            {petals.map((petal) => (
                <motion.div
                    key={petal.id}
                    className="absolute"
                    style={{
                        left: '0vw',
                        top: `${petal.y}%`,
                    }}
                    animate={{
                        x: ['0vw', '110vw'], // Horizontal left to right
                        y: [
                            '0vh',
                            `${petal.driftAmplitude}vh`,
                            `${-petal.driftAmplitude / 2}vh`,
                            `${petal.driftAmplitude * 0.7}vh`,
                            `${-petal.driftAmplitude * 0.3}vh`,
                            '0vh',
                        ], // Meandering up and down
                        rotate: [petal.rotate, petal.rotate + 360 + Math.random() * 360],
                    }}
                    transition={{
                        x: {
                            duration: petal.duration,
                            delay: petal.delay,
                            repeat: Infinity,
                            ease: 'linear',
                        },
                        y: {
                            duration: petal.duration,
                            delay: petal.delay,
                            repeat: Infinity,
                            ease: 'easeInOut', // Smooth wave motion
                        },
                        rotate: {
                            duration: petal.duration * 0.6,
                            delay: petal.delay,
                            repeat: Infinity,
                            ease: 'linear',
                        },
                    }}
                >
                    {/* Sakura Petal SVG */}
                    <svg
                        width={24 * petal.scale}
                        height={24 * petal.scale}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ opacity: petal.opacity }}
                    >
                        {/* Cherry blossom petal shape */}
                        <path
                            d="M12 2C12 2 8 6 8 10C8 12 10 14 12 14C14 14 16 12 16 10C16 6 12 2 12 2Z"
                            fill="#FFB7C5"
                        />
                        <path
                            d="M12 14C12 14 8 10 4 10C2 10 0 12 0 14C0 16 2 18 4 18C8 18 12 14 12 14Z"
                            fill="#FFB7C5"
                            opacity="0.8"
                        />
                        <path
                            d="M12 14C12 14 16 10 20 10C22 10 24 12 24 14C24 16 22 18 20 18C16 18 12 14 12 14Z"
                            fill="#FFB7C5"
                            opacity="0.8"
                        />
                        <path
                            d="M12 14C12 14 10 18 10 22C10 24 12 24 12 24C12 24 14 24 14 22C14 18 12 14 12 14Z"
                            fill="#FFB7C5"
                            opacity="0.7"
                        />
                        <path
                            d="M12 14C12 14 14 18 14 22C14 24 12 24 12 24C12 24 10 24 10 22C10 18 12 14 12 14Z"
                            fill="#FFB7C5"
                            opacity="0.7"
                        />
                        {/* Center dot */}
                        <circle cx="12" cy="14" r="1.5" fill="#FF9AB5" />
                    </svg>
                </motion.div>
            ))}
        </div>
    );
}
