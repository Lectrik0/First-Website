'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scroll, Check, Trash2, Plus, Sword, Coins } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface Quest {
    id: string;
    title: string;
    type: 'main' | 'side';
    completed: boolean;
}

export default function QuestLog() {
    const [quests, setQuests] = useLocalStorage<Quest[]>('ronin_quest_log', [
        { id: '1', title: 'Complete Digital Ronin Dashboard', type: 'main', completed: false },
        { id: '2', title: 'Find all Korok seeds in TotK', type: 'side', completed: false },
    ]);

    const [newQuest, setNewQuest] = useState('');
    const [activeTab, setActiveTab] = useState<'main' | 'side'>('main');

    const addQuest = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newQuest.trim()) return;

        const quest: Quest = {
            id: Date.now().toString(),
            title: newQuest,
            type: activeTab,
            completed: false
        };

        setQuests([...quests, quest]);
        setNewQuest('');
    };

    const toggleQuest = (id: string) => {
        setQuests(prev => prev.map(q => {
            if (q.id === id) {
                // Play sound effect here in future (e.g. coin sound)
                if (!q.completed) {
                    // Audio logic would go here
                }
                return { ...q, completed: !q.completed };
            }
            return q;
        }));
    };

    const deleteQuest = (id: string) => {
        setQuests(prev => prev.filter(q => q.id !== id));
    };

    const filteredQuests = quests.filter(q => q.type === activeTab);

    return (
        <div className="relative p-6 bg-paper dark:bg-charcoal border-2 border-dark-brown/50 dark:border-bone/20 rounded-lg shadow-lg min-h-[400px] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 border-b-2 border-dark-brown/20 dark:border-bone/20 pb-2">
                <h3 className="font-pirate text-2xl text-dark-brown dark:text-bone flex items-center gap-2">
                    <Scroll className="w-6 h-6" />
                    Quest Log
                </h3>
                <div className="flex gap-2">
                    <button
                        onClick={() => setActiveTab('main')}
                        className={`px-3 py-1 text-xs font-bold uppercase rounded ${activeTab === 'main' ? 'bg-luffyRed text-white' : 'bg-transparent text-smoke'}`}
                    >
                        Main
                    </button>
                    <button
                        onClick={() => setActiveTab('side')}
                        className={`px-3 py-1 text-xs font-bold uppercase rounded ${activeTab === 'side' ? 'bg-oceanBlue text-white' : 'bg-transparent text-smoke'}`}
                    >
                        Side
                    </button>
                </div>
            </div>

            {/* Quest List */}
            <div className="flex-1 overflow-y-auto space-y-3 mb-4 custom-scrollbar">
                <AnimatePresence mode='popLayout'>
                    {filteredQuests.map(quest => (
                        <motion.div
                            key={quest.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className={`p-3 rounded border transition-all flex items-center justify-between group ${quest.completed
                                ? 'bg-green-900/10 border-green-500/30 opacity-60'
                                : 'bg-void/5 border-ink/10 dark:border-bone/10'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => toggleQuest(quest.id)}
                                    className={`w-5 h-5 rounded-sm border flex items-center justify-center transition-colors ${quest.completed
                                        ? 'bg-gold border-gold text-charcoal'
                                        : 'border-ink/50 dark:border-bone/50 hover:border-gold'
                                        }`}
                                >
                                    {quest.completed && <Check className="w-3 h-3" />}
                                </button>
                                <span className={`font-mono text-sm dark:text-bone ${quest.completed ? 'line-through text-smoke' : ''}`}>
                                    {quest.title}
                                </span>
                            </div>
                            <button
                                onClick={() => deleteQuest(quest.id)}
                                className="opacity-0 group-hover:opacity-100 text-blood hover:text-red-600 transition-opacity"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </motion.div>
                    ))}
                    {filteredQuests.length === 0 && (
                        <div className="text-center text-smoke py-8 font-cinzel italic">
                            No active quests...
                        </div>
                    )}
                </AnimatePresence>
            </div>

            {/* Input */}
            <form onSubmit={addQuest} className="relative">
                <input
                    type="text"
                    value={newQuest}
                    onChange={(e) => setNewQuest(e.target.value)}
                    placeholder={`Add new ${activeTab} quest...`}
                    className="w-full pl-4 pr-10 py-2 bg-paper/50 dark:bg-void/50 border border-ink/20 dark:border-bone/20 rounded font-mono text-sm focus:border-gold outline-none dark:text-bone"
                />
                <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-ink/50 dark:text-bone/50 hover:text-gold transition-colors"
                >
                    <Plus className="w-4 h-4" />
                </button>
            </form>

            {/* Decorative Icon */}
            <div className="absolute top-2 right-2 opacity-10 pointer-events-none">
                {activeTab === 'main' ? <Sword className="w-24 h-24" /> : <Coins className="w-24 h-24" />}
            </div>
        </div>
    );
}
