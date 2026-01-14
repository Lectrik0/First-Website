'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Coins, Plus, Trash2, ShoppingBag } from 'lucide-react';

interface TreasuryItem {
    id: string;
    name: string;
    cost: number;
    saved: number;
}

export default function TheTreasury() {
    const [items, setItems] = useState<TreasuryItem[]>([
        { id: '1', name: 'RTX 5090', cost: 1600, saved: 400 },
        { id: '2', name: 'Japan Trip', cost: 5000, saved: 1200 },
    ]);
    const [newItemName, setNewItemName] = useState('');
    const [newItemCost, setNewItemCost] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);

    // Load items
    useEffect(() => {
        const saved = localStorage.getItem('ronin_treasury');
        if (saved) {
            try {
                setItems(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to load treasury', e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save items
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('ronin_treasury', JSON.stringify(items));
        }
    }, [items, isLoaded]);

    const addItem = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newItemName.trim() || !newItemCost) return;

        const item: TreasuryItem = {
            id: Date.now().toString(),
            name: newItemName,
            cost: Number(newItemCost),
            saved: 0
        };

        setItems([...items, item]);
        setNewItemName('');
        setNewItemCost('');
    };

    const updateSavings = (id: string, amount: number) => {
        setItems(items.map(item => {
            if (item.id === id) {
                return { ...item, saved: Math.min(item.cost, Math.max(0, item.saved + amount)) };
            }
            return item;
        }));
    };

    const deleteItem = (id: string) => {
        setItems(items.filter(i => i.id !== id));
    };

    if (!isLoaded) return null;

    return (
        <div className="p-6 bg-gradient-to-br from-paper to-paper/80 dark:from-charcoal dark:to-void border-2 border-gold/30 rounded-lg shadow-lg min-h-[400px] flex flex-col relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <Coins className="w-40 h-40 text-gold" />
            </div>

            {/* Header */}
            <div className="flex items-center gap-3 mb-6 border-b-2 border-gold/20 pb-4">
                <div className="bg-gold/20 p-2 rounded-full text-gold">
                    <Coins className="w-6 h-6" />
                </div>
                <h3 className="font-cinzel font-bold text-2xl text-ink dark:text-bone">The Treasury</h3>
            </div>

            {/* Items List */}
            <div className="flex-1 space-y-6 overflow-y-auto mb-6 custom-scrollbar pr-2">
                {items.map(item => {
                    const progress = (item.saved / item.cost) * 100;
                    return (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-void/5 dark:bg-void/30 p-4 rounded-lg border border-gold/10 group relative"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-cinzel font-bold text-ink dark:text-bone flex items-center gap-2">
                                    <ShoppingBag className="w-4 h-4 text-gold" />
                                    {item.name}
                                </span>
                                <div className="flex items-center gap-2">
                                    <span className="font-mono text-sm text-gold">
                                        ฿ {item.saved.toLocaleString()} / {item.cost.toLocaleString()}
                                    </span>
                                    <button
                                        onClick={() => deleteItem(item.id)}
                                        className="opacity-0 group-hover:opacity-100 text-blood hover:bg-blood/10 p-1 rounded transition-all"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="h-4 bg-charcoal/20 dark:bg-void rounded-full overflow-hidden relative border border-gold/20">
                                <motion.div
                                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-gold/70 to-gold"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 1, ease: 'easeOut' }}
                                />
                                {/* Shine effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-full -translate-x-full animate-[shimmer_2s_infinite]"></div>
                            </div>

                            {/* Controls */}
                            <div className="flex gap-2 mt-3 justify-end">
                                <button
                                    onClick={() => updateSavings(item.id, 100)}
                                    className="px-3 py-1 text-xs font-bold font-mono bg-gold/10 text-gold hover:bg-gold hover:text-charcoal transition-colors rounded border border-gold/30"
                                >
                                    +100
                                </button>
                                <button
                                    onClick={() => updateSavings(item.id, 500)}
                                    className="px-3 py-1 text-xs font-bold font-mono bg-gold/10 text-gold hover:bg-gold hover:text-charcoal transition-colors rounded border border-gold/30"
                                >
                                    +500
                                </button>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Add New Item */}
            <form onSubmit={addItem} className="flex gap-2 items-center bg-paper/50 dark:bg-void/50 p-2 rounded border border-ink/10 dark:border-bone/10">
                <input
                    type="text"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    placeholder="New Wishlist Item..."
                    className="flex-1 bg-transparent border-b border-ink/20 dark:border-bone/20 focus:border-gold outline-none px-2 py-1 font-mono text-sm dark:text-bone placeholder:text-smoke"
                />
                <input
                    type="number"
                    value={newItemCost}
                    onChange={(e) => setNewItemCost(e.target.value)}
                    placeholder="Cost"
                    className="w-24 bg-transparent border-b border-ink/20 dark:border-bone/20 focus:border-gold outline-none px-2 py-1 font-mono text-sm dark:text-bone placeholder:text-smoke"
                />
                <button
                    type="submit"
                    className="p-2 bg-gold/20 text-gold hover:bg-gold hover:text-charcoal rounded transition-colors"
                >
                    <Plus className="w-4 h-4" />
                </button>
            </form>
        </div>
    );
}
