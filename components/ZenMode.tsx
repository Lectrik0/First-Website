'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

export default function ZenMode() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [isMuted, setIsMuted] = useState(false);
    const [showVolumeSlider, setShowVolumeSlider] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    // Update audio volume
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : volume;
        }
    }, [volume, isMuted]);

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

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (newVolume > 0 && isMuted) {
            setIsMuted(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="fixed bottom-6 right-6 z-40"
            onMouseEnter={() => setShowVolumeSlider(true)}
            onMouseLeave={() => setShowVolumeSlider(false)}
        >
            <div className="paper-card p-4 flex flex-col items-center gap-3 bg-white/95 dark:bg-charcoal/95 backdrop-blur-sm">
                {/* Label */}
                <div className="text-center">
                    <p className="font-playfair text-xs font-semibold text-ink dark:text-bone uppercase tracking-wider">
                        Meditation Mode
                    </p>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-3">
                    {/* Play/Pause Button */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={togglePlay}
                        className="w-12 h-12 rounded-full border-2 border-ink dark:border-bone flex items-center justify-center text-ink dark:text-bone hover:bg-ink hover:dark:bg-bone hover:text-paper hover:dark:text-void transition-all duration-300"
                        aria-label={isPlaying ? 'Pause' : 'Play'}
                    >
                        {isPlaying ? (
                            <Pause className="w-5 h-5" fill="currentColor" />
                        ) : (
                            <Play className="w-5 h-5" fill="currentColor" />
                        )}
                    </motion.button>

                    {/* Mute Button */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleMute}
                        className="w-8 h-8 rounded border border-ink/30 dark:border-bone/30 flex items-center justify-center text-ink dark:text-bone hover:bg-ink/10 hover:dark:bg-bone/10 transition-all duration-300"
                        aria-label={isMuted ? 'Unmute' : 'Mute'}
                    >
                        {isMuted ? (
                            <VolumeX className="w-4 h-4" />
                        ) : (
                            <Volume2 className="w-4 h-4" />
                        )}
                    </motion.button>
                </div>

                {/* Volume Slider */}
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                        opacity: showVolumeSlider ? 1 : 0,
                        height: showVolumeSlider ? 'auto' : 0
                    }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                >
                    <div className="flex items-center gap-2 pt-1">
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={handleVolumeChange}
                            className="w-24 h-1 bg-ink/20 dark:bg-bone/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-ink [&::-webkit-slider-thumb]:dark:bg-bone [&::-webkit-slider-thumb]:cursor-pointer"
                            aria-label="Volume"
                        />
                        <span className="font-mono text-xs text-charcoal dark:text-smoke w-8">
                            {Math.round(volume * 100)}%
                        </span>
                    </div>
                </motion.div>

                {/* Audio Element - Placeholder path */}
                {/* Replace '/audio/meditation.mp3' with your actual audio file */}
                <audio
                    ref={audioRef}
                    loop
                    preload="auto"
                >
                    <source src="/audio/meditation.mp3" type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </div>
        </motion.div>
    );
}
