'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function RoninRadio() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.3);
    const [currentTrack, setCurrentTrack] = useState(0);
    const [showControls, setShowControls] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const tracks = [
        {
            name: 'Rain',
            url: 'https://cdn.pixabay.com/audio/2022/05/13/audio_257112ce97.mp3', // Public domain rain sound
        },
        {
            name: 'Lo-Fi',
            url: 'https://cdn.pixabay.com/audio/2022/03/10/audio_2f3a1a0f15.mp3', // Public domain lo-fi beat
        },
    ];

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const changeTrack = (index: number) => {
        if (audioRef.current) {
            const wasPlaying = isPlaying;
            audioRef.current.pause();
            setCurrentTrack(index);
            setTimeout(() => {
                if (wasPlaying && audioRef.current) {
                    audioRef.current.play();
                }
            }, 100);
        }
    };

    return (
        <motion.div
            className="fixed bottom-6 left-6 z-40"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
        >
            {/* Hidden Audio Element */}
            <audio
                ref={audioRef}
                src={tracks[currentTrack].url}
                loop
                onEnded={() => setIsPlaying(false)}
            />

            <div className="relative">
                {/* Controls Panel - Shows on Hover */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                        opacity: showControls ? 1 : 0,
                        y: showControls ? 0 : 10,
                        pointerEvents: showControls ? 'auto' : 'none'
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-full left-0 mb-3 bg-paper/95 dark:bg-void/95 backdrop-blur-sm border border-ink/10 dark:border-bone/10 rounded-lg p-4 min-w-[200px] shadow-xl"
                >
                    {/* Volume Slider */}
                    <div className="mb-3">
                        <label className="text-xs font-playfair text-charcoal dark:text-smoke mb-1 block">
                            Volume
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={volume}
                            onChange={(e) => setVolume(parseFloat(e.target.value))}
                            className="w-full accent-sakura"
                        />
                    </div>

                    {/* Track Selection */}
                    <div>
                        <label className="text-xs font-playfair text-charcoal dark:text-smoke mb-1 block">
                            Track
                        </label>
                        <div className="flex gap-2">
                            {tracks.map((track, index) => (
                                <button
                                    key={index}
                                    onClick={() => changeTrack(index)}
                                    className={`px-3 py-1 text-xs font-playfair rounded transition-colors ${currentTrack === index
                                            ? 'bg-sakura text-white'
                                            : 'bg-ink/5 dark:bg-bone/5 text-charcoal dark:text-smoke hover:bg-sakura/20'
                                        }`}
                                >
                                    {track.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Main Player */}
                <div className="flex items-center gap-3">
                    {/* EQ Visualizer - Only shows when playing */}
                    {isPlaying && (
                        <div className="flex items-end gap-1 h-12">
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    className="w-1 bg-sakura rounded-full"
                                    animate={{
                                        scaleY: [0.3, 1, 0.5, 0.8, 0.4],
                                    }}
                                    transition={{
                                        duration: 1,
                                        repeat: Infinity,
                                        delay: i * 0.2,
                                        ease: 'easeInOut',
                                    }}
                                    style={{ height: '100%' }}
                                />
                            ))}
                        </div>
                    )}

                    {/* Enso Icon */}
                    <button
                        onClick={togglePlay}
                        className="relative group"
                        aria-label={isPlaying ? 'Pause' : 'Play'}
                    >
                        <motion.svg
                            width="48"
                            height="48"
                            viewBox="0 0 48 48"
                            className="cursor-pointer"
                            animate={{ rotate: isPlaying ? 360 : 0 }}
                            transition={{
                                duration: 20,
                                repeat: isPlaying ? Infinity : 0,
                                ease: 'linear',
                            }}
                        >
                            {/* Enso Circle - Incomplete circle for Zen aesthetic */}
                            <motion.circle
                                cx="24"
                                cy="24"
                                r="18"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeDasharray="100 13"
                                strokeLinecap="round"
                                className="text-ink dark:text-bone"
                                whileHover={{ scale: 1.1 }}
                            />
                        </motion.svg>

                        {/* Hover State Glow */}
                        <div className="absolute inset-0 rounded-full bg-sakura/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
