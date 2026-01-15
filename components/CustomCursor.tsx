'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useTheme } from 'next-themes';

interface TrailPoint {
    x: number;
    y: number;
    timestamp: number;
}

export default function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const { resolvedTheme } = useTheme();

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const trailHistoryRef = useRef<TrailPoint[]>([]);
    const animationFrameRef = useRef<number | undefined>(undefined);
    const isAnimatingRef = useRef(false);

    const TRAIL_LENGTH = 20; // Number of points to track
    const FADE_DURATION = 150; // ms - short and snappy
    const MAX_RADIUS = 8; // px - largest circle
    const MIN_RADIUS = 1; // px - smallest circle

    // Tapered brush stroke drawing with overlapping circles
    const drawTrail = useCallback(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!ctx || !canvas) return;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const currentTime = Date.now();

        // Filter out old points
        trailHistoryRef.current = trailHistoryRef.current.filter(
            point => currentTime - point.timestamp < FADE_DURATION
        );

        const points = trailHistoryRef.current;
        const numPoints = points.length;

        if (numPoints === 0) {
            isAnimatingRef.current = false;
            return;
        }

        // Theme-aware colors
        const isDark = resolvedTheme === 'dark';
        const strokeColor = isDark ? '#e2e8f0' : '#171717'; // Silver for dark, Ink black for light
        const glowColor = isDark ? '#ffffff' : '#9ca3af'; // White glow for dark, Grey for light

        // Draw circles along the trail with decreasing radius (taper effect)
        for (let i = 0; i < numPoints; i++) {
            const point = points[i];
            const age = currentTime - point.timestamp;
            const ageRatio = age / FADE_DURATION;

            // Calculate opacity (fade out over time)
            const opacity = 1 - ageRatio;

            // Calculate radius (taper from newest to oldest)
            // Newest points (end of array) = largest radius
            // Oldest points (start of array) = smallest radius
            const positionRatio = i / Math.max(numPoints - 1, 1);
            const radius = MIN_RADIUS + (MAX_RADIUS - MIN_RADIUS) * positionRatio;

            // Draw circle with glow
            ctx.save();
            ctx.globalAlpha = opacity;

            // Glow effect
            ctx.shadowBlur = 12;
            ctx.shadowColor = glowColor;

            // Draw filled circle
            ctx.fillStyle = strokeColor;
            ctx.beginPath();
            ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        }

        // Continue animation
        animationFrameRef.current = requestAnimationFrame(drawTrail);
    }, [resolvedTheme]);

    // Canvas initialization
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    // Mouse tracking and trail creation
    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            const currentTime = Date.now();
            const currentX = e.clientX;
            const currentY = e.clientY;

            setCursorPosition({ x: currentX, y: currentY });

            // Add point to trail history
            trailHistoryRef.current.push({
                x: currentX,
                y: currentY,
                timestamp: currentTime,
            });

            // Keep trail at max length
            if (trailHistoryRef.current.length > TRAIL_LENGTH) {
                trailHistoryRef.current.shift();
            }

            // Start animation if not already running
            if (!isAnimatingRef.current && trailHistoryRef.current.length > 0) {
                isAnimatingRef.current = true;
                drawTrail();
            }
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

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
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [drawTrail]);

    return (
        <>
            {/* Hide default cursor */}
            <style jsx global>{`
                * {
                    cursor: none !important;
                }
            `}</style>

            {/* Canvas for katana slash trail - with mix-blend-mode */}
            <canvas
                ref={canvasRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    pointerEvents: 'none',
                    zIndex: 99998,
                    mixBlendMode: 'difference',
                }}
            />

            {/* Custom Cursor - Ronin Blade tip */}
            <motion.div
                style={{
                    position: 'fixed',
                    left: cursorPosition.x,
                    top: cursorPosition.y,
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none',
                    zIndex: 99999,
                    mixBlendMode: 'difference',
                }}
            >
                <motion.div
                    animate={{
                        scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
                    }}
                    transition={{ duration: 0.15 }}
                >
                    {/* Blade tip - white circles (will invert on backgrounds) */}
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <circle cx="12" cy="12" r="4" fill="white" opacity="0.9" />
                        <circle cx="12" cy="12" r="6" fill="white" opacity="0.3" />
                        <circle cx="12" cy="12" r="8" fill="white" opacity="0.1" />
                    </svg>
                </motion.div>
            </motion.div>

            {/* Ink Splatter on Click */}
            {isClicking && (
                <motion.div
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 3, opacity: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    style={{
                        position: 'fixed',
                        left: cursorPosition.x,
                        top: cursorPosition.y,
                        pointerEvents: 'none',
                        zIndex: 99998,
                        mixBlendMode: 'difference',
                    }}
                >
                    <div
                        style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: 'white',
                            transform: 'translate(-50%, -50%)',
                        }}
                    />
                </motion.div>
            )}
        </>
    );
}
