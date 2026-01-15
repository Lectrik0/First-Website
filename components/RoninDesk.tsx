'use client';

import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
// import Image from 'next/image';

interface DeskItem {
    id: string;
    name: string;
    label: string;
    description: string;
    link: string;
    position: { x: string; y: string };
    shape: 'blade' | 'scroll' | 'tea' | 'ink';
}

export default function RoninDesk() {
    const [selectedItem, setSelectedItem] = useState<DeskItem | null>(null);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    // Mouse position for parallax tilt
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);

    // Subtle parallax tilt (table follows mouse slightly)
    const rotateY = useTransform(mouseX, [0, 1], [-3, 3]);
    const rotateX = useTransform(mouseY, [0, 1], [33, 27]); // Base 30deg +/- 3

    const items: DeskItem[] = [
        {
            id: 'blade',
            name: 'The Blade',
            label: 'BATTLE LOGS',
            description: 'Projects forged in code and steel. View the arsenal of completed missions.',
            link: '/work',
            position: { x: '15%', y: '25%' },
            shape: 'blade',
        },
        {
            id: 'scroll',
            name: 'The Scroll',
            label: 'ANCIENT TEXTS',
            description: 'Wisdom preserved through writing. Explore the archives of knowledge.',
            link: '/archives',
            position: { x: '60%', y: '20%' },
            shape: 'scroll',
        },
        {
            id: 'tea',
            name: 'The Tea',
            label: 'INNER PATH',
            description: 'The way of balance. Discover the warrior beyond the battlefield.',
            link: '/life',
            position: { x: '25%', y: '65%' },
            shape: 'tea',
        },
        {
            id: 'ink',
            name: 'The Ink Stone',
            label: 'SEND MESSAGE',
            description: 'Bridge the digital realm. Reach out and connect.',
            link: '/contact',
            position: { x: '65%', y: '60%' },
            shape: 'ink',
        },
    ];

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            mouseX.set(x);
            mouseY.set(y);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    // CSS shape styles for each item
    const getShapeStyle = (shape: string, isHovered: boolean) => {
        const baseStyle = {
            position: 'relative' as const,
            transition: 'all 0.3s ease',
        };

        switch (shape) {
            case 'blade': // Long horizontal katana
                return {
                    ...baseStyle,
                    width: '280px',
                    height: '45px',
                    background: 'linear-gradient(90deg, #1a1a1a 0%, #4a4a4a 50%, #1a1a1a 100%)',
                    borderRadius: '2px',
                    boxShadow: isHovered
                        ? '0 20px 40px rgba(138, 0, 0, 0.6), inset 0 1px 0 rgba(255,255,255,0.3)'
                        : '0 10px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2)',
                    border: '1px solid #333',
                };
            case 'scroll': // Vertical rolled scroll
                return {
                    ...baseStyle,
                    width: '100px',
                    height: '200px',
                    background: 'linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 50%, #2a2a2a 100%)',
                    borderRadius: '50px',
                    boxShadow: isHovered
                        ? '0 20px 40px rgba(138, 0, 0, 0.6), inset 2px 0 4px rgba(0,0,0,0.5)'
                        : '0 10px 20px rgba(0,0,0,0.5), inset 2px 0 4px rgba(0,0,0,0.3)',
                    border: '2px solid #222',
                };
            case 'tea': // Round tea cup
                return {
                    ...baseStyle,
                    width: '110px',
                    height: '110px',
                    background: 'radial-gradient(circle at 30% 30%, #3a3a3a, #1a1a1a)',
                    borderRadius: '50%',
                    boxShadow: isHovered
                        ? '0 20px 40px rgba(138, 0, 0, 0.6), inset -3px -3px 10px rgba(0,0,0,0.6)'
                        : '0 10px 20px rgba(0,0,0,0.5), inset -3px -3px 10px rgba(0,0,0,0.4)',
                    border: '2px solid #2a2a2a',
                };
            case 'ink': // Rectangular ink stone
                return {
                    ...baseStyle,
                    width: '150px',
                    height: '120px',
                    background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)',
                    borderRadius: '8px',
                    boxShadow: isHovered
                        ? '0 20px 40px rgba(138, 0, 0, 0.6), inset 0 2px 4px rgba(255,255,255,0.1)'
                        : '0 10px 20px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.05)',
                    border: '1px solid #333',
                };
            default:
                return baseStyle;
        }
    };

    return (
        <>
            {/* Scene Container with Perspective */}
            <div
                className="relative w-full min-h-screen overflow-hidden bg-[#0a0a0a]"
                style={{ perspective: '1200px' }}
            >
                {/* Ambient Background Texture */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/noise.png')]" />

                {/* Table Surface - Tilted 2.5D View */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                        transformStyle: 'preserve-3d',
                        rotateX,
                        rotateY,
                    }}
                >
                    {/* The Desk Surface */}
                    <div
                        className="relative w-[90%] h-[80%]"
                        style={{
                            transformStyle: 'preserve-3d',
                            background: 'linear-gradient(135deg, #111 0%, #0a0a0a 100%)',
                            boxShadow: '0 50px 100px rgba(0,0,0,0.8)',
                        }}
                    >
                        {/* Desk Pattern */}
                        <div
                            className="absolute inset-0 opacity-5"
                            style={{
                                backgroundImage: `repeating-linear-gradient(
                                    0deg,
                                    transparent,
                                    transparent 60px,
                                    rgba(255,255,255,0.1) 60px,
                                    rgba(255,255,255,0.1) 61px
                                ),
                                repeating-linear-gradient(
                                    90deg,
                                    transparent,
                                    transparent 60px,
                                    rgba(255,255,255,0.1) 60px,
                                    rgba(255,255,255,0.1) 61px
                                )`,
                            }}
                        />

                        {/* Interactive Items */}
                        {items.map((item) => {
                            const isHovered = hoveredItem === item.id;
                            const shapeStyle = getShapeStyle(item.shape, isHovered);

                            return (
                                <motion.div
                                    key={item.id}
                                    className="absolute cursor-pointer"
                                    style={{
                                        left: item.position.x,
                                        top: item.position.y,
                                        transformStyle: 'preserve-3d',
                                    }}
                                    initial={{ rotateZ: Math.random() * 10 - 5 }}
                                    whileHover={{
                                        z: 30,
                                        scale: 1.05,
                                        transition: { duration: 0.3 },
                                    }}
                                    onHoverStart={() => setHoveredItem(item.id)}
                                    onHoverEnd={() => setHoveredItem(null)}
                                    onClick={() => setSelectedItem(item)}
                                >
                                    {/* Item Shape (CSS for now) */}
                                    <div style={shapeStyle}>
                                        {/* Uncomment below to use images later */}
                                        {/* <Image 
                                            src={`/desk/${item.shape}.png`}
                                            alt={item.name}
                                            fill
                                            className="object-contain"
                                        /> */}

                                        {/* Temp label inside */}
                                        <div className="flex items-center justify-center h-full text-white/30 font-mono text-xs">
                                            {item.shape}
                                        </div>
                                    </div>

                                    {/* Floating Label */}
                                    <AnimatePresence>
                                        {isHovered && (
                                            <motion.div
                                                className="absolute -bottom-20 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none"
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <span
                                                    className="text-3xl font-bold text-white tracking-widest"
                                                    style={{ fontFamily: 'Cinzel, serif' }}
                                                >
                                                    {item.label}
                                                </span>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Title Overlay */}
                <div className="absolute top-12 left-12 z-10 pointer-events-none">
                    <h1
                        className="text-5xl md:text-7xl font-black text-white mb-2"
                        style={{ fontFamily: 'Cinzel, serif' }}
                    >
                        THE RONIN'S DESK
                    </h1>
                    <p className="text-lg font-playfair italic text-white/40">
                        Choose your path, wanderer
                    </p>
                </div>
            </div>

            {/* Modal - Paper Unfold Effect */}
            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedItem(null)}
                    >
                        <motion.div
                            className="relative bg-[#f5f5f0] border-4 border-[#1a1a1a] p-12 max-w-lg w-full mx-4"
                            initial={{ scaleY: 0, rotateX: -90, opacity: 0 }}
                            animate={{ scaleY: 1, rotateX: 0, opacity: 1 }}
                            exit={{ scaleY: 0, rotateX: 90, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                transformStyle: 'preserve-3d',
                                transformOrigin: 'top center',
                            }}
                        >
                            {/* Paper Texture */}
                            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 pointer-events-none" />

                            {/* Content */}
                            <div className="relative z-10">
                                <h2
                                    className="text-4xl font-black text-[#1a1a1a] mb-2"
                                    style={{ fontFamily: 'Cinzel, serif' }}
                                >
                                    {selectedItem.name}
                                </h2>
                                <div className="w-20 h-1 bg-[#8a0000] mb-6" />

                                <p className="text-lg font-playfair text-[#2a2a2a] mb-8 leading-relaxed">
                                    {selectedItem.description}
                                </p>

                                <div className="flex gap-4">
                                    <motion.a
                                        href={selectedItem.link}
                                        className="flex-1 bg-[#1a1a1a] text-white px-8 py-4 text-center font-bold tracking-wider hover:bg-[#8a0000] transition-colors"
                                        style={{ fontFamily: 'Cinzel, serif' }}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        ENTER →
                                    </motion.a>

                                    <motion.button
                                        onClick={() => setSelectedItem(null)}
                                        className="px-8 py-4 border-2 border-[#1a1a1a] text-[#1a1a1a] font-semibold hover:bg-[#1a1a1a] hover:text-white transition-colors"
                                        style={{ fontFamily: 'Cinzel, serif' }}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        CLOSE
                                    </motion.button>
                                </div>
                            </div>

                            {/* Red Wax Seal */}
                            <div className="absolute -top-8 -right-8 w-16 h-16 rounded-full bg-[#8a0000] border-4 border-black shadow-2xl flex items-center justify-center">
                                <span className="text-white font-black text-xl">印</span>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
