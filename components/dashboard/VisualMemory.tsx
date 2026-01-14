'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, Upload, X } from 'lucide-react';
import Image from 'next/image';

export default function VisualMemory() {
    const [image, setImage] = useState<string | null>(null);
    const [caption, setCaption] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [tempUrl, setTempUrl] = useState('');

    // Load memory
    useEffect(() => {
        const saved = localStorage.getItem('ronin_memory');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                setImage(data.image);
                setCaption(data.caption);
            } catch (e) {
                console.error('Failed to load memory', e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save memory
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('ronin_memory', JSON.stringify({ image, caption }));
        }
    }, [image, caption, isLoaded]);

    const handleSave = () => {
        if (tempUrl) setImage(tempUrl);
        setIsEditing(false);
    };

    if (!isLoaded) return null;

    return (
        <div className="relative h-full min-h-[400px] flex items-center justify-center p-8 bg-paper/20 dark:bg-void/20 rounded-xl border border-ink/5 dark:border-bone/5">
            {/* Wooden Texture / Desk surface hint could go here */}

            <motion.div
                className="relative bg-white p-4 pb-16 shadow-[0_10px_30px_rgba(0,0,0,0.2)] w-full max-w-sm rotate-[-2deg] hover:rotate-0 transition-transform duration-500 group"
                initial={{ rotate: -2, y: 20, opacity: 0 }}
                animate={{ rotate: -2, y: 0, opacity: 1 }}
                whileHover={{ scale: 1.02, rotate: 0 }}
                drag
                dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }}
            >
                {/* Tape */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-white/30 backdrop-blur-sm shadow-sm rotate-1 z-10 border-l border-r border-white/40"></div>

                {/* Photo Area */}
                <div className="aspect-[4/5] w-full bg-gray-100 relative overflow-hidden mb-4 group/photo text-charcoal">
                    {image ? (
                        <>
                            <Image
                                src={image}
                                alt="Memory"
                                fill
                                className="object-cover sepia-[.2] contrast-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 opacity-0 group-hover/photo:opacity-100 transition-opacity"></div>
                        </>
                    ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 gap-2">
                            <ImageIcon className="w-12 h-12" />
                            <span className="font-handwriting text-sm">No memory yet...</span>
                        </div>
                    )}

                    {/* Edit Overlay */}
                    <button
                        onClick={() => setIsEditing(true)}
                        className="absolute bottom-2 right-2 p-2 bg-white/80 hover:bg-white text-charcoal rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <Upload className="w-4 h-4" />
                    </button>
                </div>

                {/* Caption Area */}
                <div className="text-center relative">
                    {isEditing ? (
                        <input
                            type="text"
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            className="w-full text-center font-handwriting text-2xl text-charcoal bg-transparent border-b border-gray-300 focus:border-red-500 outline-none pb-1"
                            placeholder="Write a caption..."
                            autoFocus
                        />
                    ) : (
                        <h3
                            className="font-handwriting text-3xl text-charcoal/90 -rotate-1 cursor-text"
                            onClick={() => setIsEditing(true)}
                        >
                            {caption || "Click to label..."}
                        </h3>
                    )}
                </div>
            </motion.div>

            {/* Edit Modal */}
            {isEditing && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-xl">
                    <div className="bg-paper dark:bg-charcoal p-6 rounded-lg shadow-2xl w-full max-w-sm border-2 border-ink/20 dark:border-bone/20">
                        <h4 className="font-cinzel font-bold text-lg mb-4 text-ink dark:text-bone">Update Memory</h4>

                        <div className="space-y-4">
                            <input
                                type="text"
                                value={tempUrl}
                                onChange={(e) => setTempUrl(e.target.value)}
                                placeholder="Paste Image URL..."
                                className="w-full p-2 bg-void/5 dark:bg-void/50 border border-ink/20 dark:border-bone/20 rounded font-mono text-sm outline-none focus:border-gold dark:text-bone"
                            />

                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="px-4 py-2 text-sm font-bold text-smoke hover:text-ink dark:hover:text-bone transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="px-4 py-2 bg-gold text-charcoal font-bold text-sm rounded hover:bg-gold/80 transition-colors"
                                >
                                    Save Memory
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
