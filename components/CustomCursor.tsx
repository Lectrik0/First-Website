'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 });

    useEffect(() => {
        setMounted(true);

        const moveCursor = (e: MouseEvent) => {
            setCursorPosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        // Detect hoverable elements
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button')
            ) {
                setIsHovering(true);
            }
        };

        const handleMouseOut = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button')
            ) {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseout', handleMouseOut);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseout', handleMouseOut);
        };
    }, []);

    if (!mounted) return null;

    return (
        <>
            {/* Hide default cursor */}
            <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>

            {/* Custom Cursor - Brush Tip */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
                style={{
                    left: cursorPosition.x,
                    top: cursorPosition.y,
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <motion.div
                    animate={{
                        scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
                    }}
                    transition={{ duration: 0.15 }}
                >
                    {/* Brush tip */}
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="12" cy="12" r="4" fill="white" opacity="0.9" />
                        <circle cx="12" cy="12" r="6" fill="white" opacity="0.3" />
                        <circle cx="12" cy="12" r="8" fill="white" opacity="0.1" />
                    </svg>
                </motion.div>
            </motion.div>

            {/* Ink Blot on Click - Centered */}
            {isClicking && (
                <motion.div
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 3, opacity: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="fixed pointer-events-none z-[9998] hidden md:block"
                    style={{
                        left: cursorPosition.x,
                        top: cursorPosition.y,
                    }}
                >
                    <div
                        className="w-8 h-8 rounded-full bg-white mix-blend-difference"
                        style={{
                            transform: 'translate(-50%, -50%)',
                        }}
                    />
                </motion.div>
            )}
        </>
    );
}
