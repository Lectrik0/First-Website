'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Film, Plus, Edit2, Trash2, Check } from 'lucide-react';
import { useDataStore, type LibraryItem } from '@/hooks/useDataStore';
import { useAuth } from '@/hooks/useAuth';

export default function TheLibrary() {
    const { libraryItems, addLibraryItem, updateLibraryItem, deleteLibraryItem } = useDataStore();
    const { isRonin } = useAuth();
    const [showAddForm, setShowAddForm] = useState(false);
    const [formType, setFormType] = useState<'book' | 'movie'>('book');
    const [newTitle, setNewTitle] = useState('');
    const [editingId, setEditingId] = useState<string | null>(null);

    const books = libraryItems.filter(item => item.type === 'book');
    const movies = libraryItems.filter(item => item.type === 'movie');

    const handleAdd = () => {
        if (!newTitle.trim()) return;

        const status = formType === 'book' ? 'to-read' : 'to-watch';
        addLibraryItem({
            title: newTitle.trim(),
            type: formType,
            status: status as any,
        });

        setNewTitle('');
        setShowAddForm(false);
    };

    const cycleStatus = (item: LibraryItem) => {
        if (item.type === 'book') {
            const statuses: LibraryItem['status'][] = ['to-read', 'reading', 'finished'];
            const currentIndex = statuses.indexOf(item.status);
            const nextStatus = statuses[(currentIndex + 1) % statuses.length];
            updateLibraryItem(item.id, { status: nextStatus });
        } else {
            const statuses: LibraryItem['status'][] = ['to-watch', 'watching', 'finished'];
            const currentIndex = statuses.indexOf(item.status);
            const nextStatus = statuses[(currentIndex + 1) % statuses.length];
            updateLibraryItem(item.id, { status: nextStatus });
        }
    };

    const getStatusColor = (status: LibraryItem['status']) => {
        switch (status) {
            case 'reading':
            case 'watching':
                return 'bg-yellow-500 text-charcoal';
            case 'finished':
                return 'bg-green-600 text-white';
            default:
                return 'bg-smoke text-white';
        }
    };

    const getStatusLabel = (status: LibraryItem['status']) => {
        return status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    const renderColumn = (items: LibraryItem[], type: 'book' | 'movie', icon: any, title: string) => (
        <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
                <h4 className="font-cinzel text-lg text-ink dark:text-bone flex items-center gap-2">
                    {icon}
                    {title}
                </h4>
                {isRonin && (
                    <motion.button
                        onClick={() => {
                            setFormType(type);
                            setShowAddForm(true);
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-1.5 bg-ink dark:bg-bone text-bone dark:text-ink rounded hover:bg-gold hover:text-charcoal transition-colors"
                    >
                        <Plus className="w-3 h-3" />
                    </motion.button>
                )}
            </div>

            <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                    {items.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="group relative bg-paper/50 dark:bg-charcoal/50 border border-ink/20 dark:border-bone/20 rounded p-3 hover:border-gold transition-colors"
                        >
                            <div className="flex items-start justify-between gap-2">
                                <div className="flex-1 min-w-0">
                                    <h5 className="font-mono text-sm font-bold text-ink dark:text-bone truncate">
                                        {item.title}
                                    </h5>
                                    <button
                                        onClick={() => isRonin && cycleStatus(item)}
                                        disabled={!isRonin}
                                        className={`mt-2 px-2 py-1 rounded text-xs font-mono font-bold ${getStatusColor(item.status)} ${isRonin ? 'cursor-pointer hover:opacity-80' : 'cursor-default'
                                            } transition-opacity`}
                                    >
                                        {getStatusLabel(item.status)}
                                    </button>
                                </div>

                                {isRonin && (
                                    <button
                                        onClick={() => deleteLibraryItem(item.id)}
                                        className="opacity-0 group-hover:opacity-100 text-blood hover:text-red-600 transition-opacity"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {items.length === 0 && (
                    <div className="text-center py-8 text-smoke font-mono text-xs italic">
                        {isRonin ? `Click + to add a ${type}` : `No ${type}s yet`}
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="relative p-6 bg-paper/50 dark:bg-void/50 backdrop-blur-sm border-2 border-ink/20 dark:border-bone/20 rounded-lg shadow-xl">
            {/* Header */}
            <div className="mb-6 border-b-2 border-ink/10 dark:border-bone/10 pb-4">
                <h3 className="font-cinzel text-2xl text-ink dark:text-bone">
                    THE LIBRARY
                </h3>
                <p className="font-mono text-xs text-charcoal dark:text-smoke italic mt-1">
                    "Knowledge is the sword of the mind."
                </p>
            </div>

            {/* Add Form */}
            <AnimatePresence>
                {showAddForm && isRonin && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-4 overflow-hidden"
                    >
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
                                placeholder={`${formType === 'book' ? 'Book' : 'Movie'} title...`}
                                className="flex-1 px-3 py-2 bg-paper dark:bg-charcoal border border-ink/20 dark:border-bone/20 rounded font-mono text-sm text-ink dark:text-bone focus:border-gold outline-none"
                                autoFocus
                            />
                            <button
                                onClick={handleAdd}
                                className="px-4 py-2 bg-gold text-charcoal font-mono font-bold rounded hover:bg-gold/80 transition-colors"
                            >
                                Add
                            </button>
                            <button
                                onClick={() => setShowAddForm(false)}
                                className="px-4 py-2 border border-ink/20 dark:border-bone/20 text-ink dark:text-bone font-mono rounded hover:border-gold transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Two Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderColumn(books, 'book', <BookOpen className="w-5 h-5" />, 'SCROLLS')}
                {renderColumn(movies, 'movie', <Film className="w-5 h-5" />, 'THEATER')}
            </div>

            {/* Decorative Kanji */}
            <div className="absolute bottom-4 right-4 text-6xl font-noto text-ink/5 dark:text-bone/5 pointer-events-none select-none">
                書
            </div>
        </div>
    );
}
