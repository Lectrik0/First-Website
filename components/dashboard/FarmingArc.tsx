'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Sprout } from 'lucide-react';
import { useDataStore } from '@/hooks/useDataStore';
import { useAuth } from '@/hooks/useAuth';

export default function FarmingArc() {
    const { habits, addHabit, toggleHabitDay, deleteHabit } = useDataStore();
    const { isRonin } = useAuth();
    const [newHabitName, setNewHabitName] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);

    // Get current week (Sunday to Saturday)
    const getWeekDays = () => {
        const today = new Date();
        const dayOfWeek = today.getDay();
        const week = [];

        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() - dayOfWeek + i);
            week.push({
                date: date.toISOString().split('T')[0],
                label: ['S', 'M', 'T', 'W', 'T', 'F', 'S'][i],
                day: date.getDate(),
            });
        }
        return week;
    };

    const weekDays = getWeekDays();

    const handleAddHabit = () => {
        if (!newHabitName.trim()) return;
        addHabit(newHabitName.trim());
        setNewHabitName('');
        setShowAddForm(false);
    };

    return (
        <div className="relative p-6 bg-paper/50 dark:bg-void/50 backdrop-blur-sm border-2 border-ink/20 dark:border-bone/20 rounded-lg shadow-xl">
            {/* Header */}
            <div className="mb-6 border-b-2 border-ink/10 dark:border-bone/10 pb-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-cinzel text-2xl text-ink dark:text-bone flex items-center gap-2">
                            <Sprout className="w-6 h-6 text-green-600 dark:text-green-400" />
                            THE FARMING ARC
                        </h3>
                        <p className="font-mono text-xs text-charcoal dark:text-smoke italic mt-1">
                            "Musashi put down the sword to farm."
                        </p>
                    </div>

                    {isRonin && (
                        <motion.button
                            onClick={() => setShowAddForm(!showAddForm)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 bg-ink dark:bg-bone text-bone dark:text-ink rounded-full hover:bg-gold hover:text-charcoal transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                        </motion.button>
                    )}
                </div>
            </div>

            {/* Add Habit Form */}
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
                                value={newHabitName}
                                onChange={(e) => setNewHabitName(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleAddHabit()}
                                placeholder="Habit name (e.g., Gym, Read, Code)"
                                className="flex-1 px-3 py-2 bg-paper dark:bg-charcoal border border-ink/20 dark:border-bone/20 rounded font-mono text-sm text-ink dark:text-bone focus:border-gold outline-none"
                                autoFocus
                            />
                            <button
                                onClick={handleAddHabit}
                                className="px-4 py-2 bg-gold text-charcoal font-mono font-bold rounded hover:bg-gold/80 transition-colors"
                            >
                                Add
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Habits List */}
            <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                    {habits.map((habit) => (
                        <motion.div
                            key={habit.id}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="group"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-mono text-sm font-bold text-ink dark:text-bone">
                                    {habit.name}
                                </span>
                                {isRonin && (
                                    <button
                                        onClick={() => deleteHabit(habit.id)}
                                        className="opacity-0 group-hover:opacity-100 text-blood hover:text-red-600 transition-opacity"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                )}
                            </div>

                            {/* 7-Day Grid */}
                            <div className="grid grid-cols-7 gap-2">
                                {weekDays.map((day) => {
                                    const isCompleted = habit.completedDays.includes(day.date);
                                    return (
                                        <motion.button
                                            key={day.date}
                                            onClick={() => isRonin && toggleHabitDay(habit.id, day.date)}
                                            whileHover={isRonin ? { scale: 1.1 } : {}}
                                            whileTap={isRonin ? { scale: 0.9 } : {}}
                                            disabled={!isRonin}
                                            className={`aspect-square rounded-lg border-2 flex flex-col items-center justify-center transition-all ${isCompleted
                                                    ? 'bg-green-600 dark:bg-green-500 border-green-700 dark:border-green-400'
                                                    : 'bg-paper dark:bg-charcoal border-ink/20 dark:border-bone/20 hover:border-gold'
                                                } ${!isRonin && 'cursor-default'}`}
                                        >
                                            <span className={`text-xs font-mono font-bold ${isCompleted ? 'text-white' : 'text-smoke'
                                                }`}>
                                                {day.label}
                                            </span>
                                            <span className={`text-[10px] font-mono ${isCompleted ? 'text-white/80' : 'text-smoke/60'
                                                }`}>
                                                {day.day}
                                            </span>
                                            {isCompleted && (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    className="absolute"
                                                >
                                                    <Sprout className="w-3 h-3 text-white" />
                                                </motion.div>
                                            )}
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {habits.length === 0 && (
                    <div className="text-center py-8 text-smoke font-mono text-sm italic">
                        {isRonin ? 'Click + to add your first habit' : 'No habits tracked yet'}
                    </div>
                )}
            </div>

            {/* Decorative Kanji */}
            <div className="absolute top-4 right-4 text-6xl font-noto text-ink/5 dark:text-bone/5 pointer-events-none select-none">
                農
            </div>
        </div>
    );
}
