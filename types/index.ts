// Type definitions for Digital Ronin features

export interface TechStackItem {
    name: string;
    icon: string; // SVG path or icon name
    class: string; // RPG-style class (e.g., "Heavy Weapon", "Support Tool")
    proficiency: string; // e.g., "Mastered", "Advanced", "Learning"
    category: string; // e.g., "Languages", "Tools", "Frameworks"
}

export interface BattleLog {
    id: string;
    title: string;
    machine: string;
    status: 'DEFEATED' | 'EVADED';
    date: string;
    difficulty: string; // e.g., "Easy", "Medium", "Hard", "Insane"
    description: string;
    tags: string[];
    link?: string; // Link to full write-up
}

export interface TerminalCommand {
    name: string;
    description: string;
    execute: () => string | string[];
}

export interface CheatCommand {
    id: string;
    category: string;
    command: string;
    description: string;
    example?: string;
}

export interface PhilosophyEntry {
    id: string;
    title: string;
    content: string;
    date: string;
}
