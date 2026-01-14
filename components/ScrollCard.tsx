'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

interface ScrollCardProps {
    title: string;
    image?: string;
    description?: string;
    link?: string;
    index?: number;
}

export default function ScrollCard({
    title,
    image = 'https://placehold.co/400x600/2B2B2B/E6E2D3?text=Project',
    description = 'A journey through code and creation',
    link = '#',
    index = 0,
}: ScrollCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.15, ease: 'easeOut' }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="group relative"
        >
            <a href={link} className="block">
                <motion.div
                    animate={{
                        filter: isHovered ? 'contrast(1.2) brightness(0.85)' : 'contrast(1) brightness(1)',
                    }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="scroll-card brush-border-uneven p-6 relative overflow-hidden ink-shadow"
                >
                    {/* Swift Line Animation on Hover */}
                    {isHovered && (
                        <motion.div
                            initial={{ x: '-100%', scaleX: 0 }}
                            animate={{ x: '100%', scaleX: 1 }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            className="absolute top-0 left-0 w-full h-0.5 bg-driedBlood origin-left"
                            style={{
                                transform: 'rotate(-45deg)',
                                top: '50%',
                                transformOrigin: 'center'
                            }}
                        />
                    )}

                    {/* Scroll Header */}
                    <div className="text-center mb-4 border-b-2 border-sumiInk/20 pb-3">
                        <h3 className="text-2xl md:text-3xl font-noto font-bold text-sumiInk">
                            {title}
                        </h3>
                    </div>

                    {/* Image Container */}
                    <div className="relative w-full aspect-[2/3] mb-4 border-2 border-sumiInk/30 overflow-hidden bg-ricePaper">
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover transition-all duration-800"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>

                    {/* Description */}
                    <div className="text-center">
                        <p className="text-sm md:text-base font-garamond text-darkGrey/80 italic">
                            {description}
                        </p>
                    </div>

                    {/* Decorative Seal Mark */}
                    <div className="absolute bottom-4 right-4 w-8 h-8 border-2 border-driedBlood/40 rounded-full flex items-center justify-center">
                        <span className="text-driedBlood text-xs font-noto">印</span>
                    </div>
                </motion.div>
            </a>
        </motion.div>
    );
}
