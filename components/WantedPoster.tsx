'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface WantedPosterProps {
    title: string;
    image?: string;
    bounty: string;
    description?: string;
    link?: string;
    index?: number;
}

export default function WantedPoster({
    title,
    image = 'https://placehold.co/400x500/D62828/FDF5E6?text=Project',
    bounty,
    description = 'A legendary project from the Grand Line',
    link = '#',
    index = 0,
}: WantedPosterProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{
                y: -20,
                rotate: 3,
                transition: { duration: 0.3 },
            }}
            className="group"
        >
            <a href={link} className="block">
                <div className="paper-texture wanted-poster-shadow hand-drawn-border-alt p-6 border-4 border-dark-brown/80 relative overflow-hidden">
                    {/* Vintage Stamp Effect */}
                    <div className="absolute top-4 right-4 w-16 h-16 border-2 border-luffyRed/40 rounded-full flex items-center justify-center rotate-12">
                        <span className="text-luffyRed text-xs font-bold">WANTED</span>
                    </div>

                    {/* Header */}
                    <div className="text-center mb-4">
                        <h3 className="text-3xl md:text-4xl font-pirate text-dark-brown mb-2">
                            WANTED
                        </h3>
                        <div className="w-full h-0.5 bg-dark-brown/50 mb-2"></div>
                        <p className="text-sm font-cinzel uppercase tracking-wider text-oceanBlue">
                            Dead or Alive
                        </p>
                    </div>

                    {/* Image Container */}
                    <div className="relative w-full aspect-[4/5] mb-4 border-4 border-dark-brown/30 hand-drawn-border overflow-hidden bg-aged-paper">
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>

                    {/* Project Title */}
                    <div className="text-center mb-3">
                        <h4 className="text-2xl md:text-3xl font-pirate text-luffyRed mb-2">
                            {title}
                        </h4>
                        <p className="text-sm font-inter text-dark-brown/80">
                            {description}
                        </p>
                    </div>

                    {/* Bounty Amount */}
                    <div className="text-center pt-3 border-t-2 border-dark-brown/50">
                        <p className="text-xs font-cinzel uppercase tracking-wider text-oceanBlue mb-1">
                            Bounty
                        </p>
                        <p className="text-3xl md:text-4xl font-pirate text-treasureGold text-shadow-strong">
                            {bounty}
                        </p>
                    </div>

                    {/* Decorative Corner Tears */}
                    <div className="absolute top-0 left-0 w-8 h-8 bg-parchment transform -translate-x-2 -translate-y-2 rotate-45"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 bg-parchment transform translate-x-2 translate-y-2 rotate-45"></div>
                </div>
            </a>
        </motion.div>
    );
}
