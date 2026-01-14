'use client';

import { useState, useEffect } from 'react';

// Type Definitions
export interface Project {
    id: string;
    title: string;
    description: string;
    tech: string[];  // Changed from techStack
    github?: string;  // Changed from githubUrl
    live?: string | null;  // Changed from liveUrl
    imageUrl?: string;
}

export interface Quest {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    category: 'gaming' | 'learning' | 'fitness' | 'creative';
    createdAt: string;
}

export interface Habit {
    id: string;
    name: string;
    completedDays: string[]; // ['2024-01-14', '2024-01-15']
}

export interface LibraryItem {
    id: string;
    title: string;
    type: 'book' | 'movie';
    status: 'reading' | 'watching' | 'finished' | 'to-read' | 'to-watch';
    coverUrl?: string;
}

interface DataStore {
    projects: Project[];
    quests: Quest[];
    habits: Habit[];
    libraryItems: LibraryItem[];
    onePieceEpisode: number;
    onePieceChapter: number;
    isAdmin: boolean;
}

const DEFAULT_DATA: DataStore = {
    projects: [],
    quests: [],
    habits: [],
    libraryItems: [],
    onePieceEpisode: 1,
    onePieceChapter: 1,
    isAdmin: false,
};

export function useDataStore() {
    const [data, setData] = useState<DataStore>(DEFAULT_DATA);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load data from localStorage on mount
    useEffect(() => {
        if (typeof window === 'undefined') return;

        try {
            const stored = localStorage.getItem('dataStore');
            if (stored) {
                const parsed = JSON.parse(stored);
                setData({ ...DEFAULT_DATA, ...parsed });
            }
            setIsLoaded(true);
        } catch (error) {
            console.warn('Error loading data from localStorage:', error);
            setIsLoaded(true);
        }
    }, []);

    // Save data to localStorage whenever it changes
    useEffect(() => {
        if (!isLoaded) return;
        if (typeof window === 'undefined') return;

        try {
            localStorage.setItem('dataStore', JSON.stringify(data));
        } catch (error) {
            console.warn('Error saving data to localStorage:', error);
        }
    }, [data, isLoaded]);

    // Admin Toggle
    const toggleAdmin = () => {
        setData(prev => ({ ...prev, isAdmin: !prev.isAdmin }));
    };

    // Project CRUD
    const addProject = (project: Omit<Project, 'id'>) => {
        const newProject: Project = {
            ...project,
            id: Date.now().toString(),
        };
        setData(prev => ({
            ...prev,
            projects: [...prev.projects, newProject],
        }));
        return newProject;
    };

    const updateProject = (id: string, updates: Partial<Project>) => {
        setData(prev => ({
            ...prev,
            projects: prev.projects.map(p =>
                p.id === id ? { ...p, ...updates } : p
            ),
        }));
    };

    const deleteProject = (id: string) => {
        setData(prev => ({
            ...prev,
            projects: prev.projects.filter(p => p.id !== id),
        }));
    };

    // Quest CRUD
    const addQuest = (quest: Omit<Quest, 'id' | 'createdAt'>) => {
        const newQuest: Quest = {
            ...quest,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
        };
        setData(prev => ({
            ...prev,
            quests: [...prev.quests, newQuest],
        }));
        return newQuest;
    };

    const updateQuest = (id: string, updates: Partial<Quest>) => {
        setData(prev => ({
            ...prev,
            quests: prev.quests.map(q =>
                q.id === id ? { ...q, ...updates } : q
            ),
        }));
    };

    const toggleQuestComplete = (id: string) => {
        setData(prev => ({
            ...prev,
            quests: prev.quests.map(q =>
                q.id === id ? { ...q, completed: !q.completed } : q
            ),
        }));
    };

    const deleteQuest = (id: string) => {
        setData(prev => ({
            ...prev,
            quests: prev.quests.filter(q => q.id !== id),
        }));
    };

    // Habit CRUD
    const addHabit = (name: string) => {
        const newHabit: Habit = {
            id: Date.now().toString(),
            name,
            completedDays: [],
        };
        setData(prev => ({
            ...prev,
            habits: [...prev.habits, newHabit],
        }));
        return newHabit;
    };

    const toggleHabitDay = (habitId: string, date: string) => {
        setData(prev => ({
            ...prev,
            habits: prev.habits.map(h => {
                if (h.id === habitId) {
                    const isCompleted = h.completedDays.includes(date);
                    return {
                        ...h,
                        completedDays: isCompleted
                            ? h.completedDays.filter(d => d !== date)
                            : [...h.completedDays, date],
                    };
                }
                return h;
            }),
        }));
    };

    const deleteHabit = (id: string) => {
        setData(prev => ({
            ...prev,
            habits: prev.habits.filter(h => h.id !== id),
        }));
    };

    // Library CRUD
    const addLibraryItem = (item: Omit<LibraryItem, 'id'>) => {
        const newItem: LibraryItem = {
            ...item,
            id: Date.now().toString(),
        };
        setData(prev => ({
            ...prev,
            libraryItems: [...prev.libraryItems, newItem],
        }));
        return newItem;
    };

    const updateLibraryItem = (id: string, updates: Partial<LibraryItem>) => {
        setData(prev => ({
            ...prev,
            libraryItems: prev.libraryItems.map(item =>
                item.id === id ? { ...item, ...updates } : item
            ),
        }));
    };

    const deleteLibraryItem = (id: string) => {
        setData(prev => ({
            ...prev,
            libraryItems: prev.libraryItems.filter(item => item.id !== id),
        }));
    };

    // One Piece Progress
    const updateOnePieceEpisode = (episode: number) => {
        setData(prev => ({ ...prev, onePieceEpisode: episode }));
    };

    const updateOnePieceChapter = (chapter: number) => {
        setData(prev => ({ ...prev, onePieceChapter: chapter }));
    };

    return {
        // State
        projects: data.projects,
        quests: data.quests,
        habits: data.habits,
        libraryItems: data.libraryItems,
        onePieceEpisode: data.onePieceEpisode,
        onePieceChapter: data.onePieceChapter,
        isAdmin: data.isAdmin,
        isLoaded,

        // Admin
        toggleAdmin,

        // Projects
        addProject,
        updateProject,
        deleteProject,

        // Quests
        addQuest,
        updateQuest,
        toggleQuestComplete,
        deleteQuest,

        // Habits
        addHabit,
        toggleHabitDay,
        deleteHabit,

        // Library
        addLibraryItem,
        updateLibraryItem,
        deleteLibraryItem,

        // One Piece
        updateOnePieceEpisode,
        updateOnePieceChapter,
    };
}
