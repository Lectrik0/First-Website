'use client';

import { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X } from 'lucide-react';

interface CommandOutput {
    command: string;
    output: string[];
}

export default function QuakeTerminal() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<CommandOutput[]>([]);
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [shouldShake, setShouldShake] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const terminalRef = useRef<HTMLDivElement>(null);

    // Welcome message
    useEffect(() => {
        if (isOpen && history.length === 0) {
            setHistory([{
                command: '',
                output: [
                    '╔═══════════════════════════════════════════════════════╗',
                    '║         DIGITAL RONIN TERMINAL v1.0                  ║',
                    '║         "The way of the warrior is found in code"    ║',
                    '╚═══════════════════════════════════════════════════════╝',
                    '',
                    'Type "help" for available commands.',
                    ''
                ]
            }]);
        }
    }, [isOpen]);

    // Keyboard shortcut listener
    useEffect(() => {
        const handleKeyDown = (e: globalThis.KeyboardEvent) => {
            // Toggle with ~ (backtick)
            if (e.key === '`' || e.key === '~') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
            // Toggle with Cmd+K or Ctrl+K
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
            // Close with Escape
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    // Auto-focus input when opened
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    // Auto-scroll to bottom
    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [history]);

    const executeCommand = (cmd: string): string[] => {
        const command = cmd.trim().toLowerCase();

        switch (command) {
            case 'help':
                return [
                    'Available commands:',
                    '',
                    '  whoami          - Display information about the ronin',
                    '  contact         - Show contact information',
                    '  clear           - Clear the terminal',
                    '  sudo rm -rf /   - Try at your own risk...',
                    '  help            - Show this help message',
                    ''
                ];

            case 'whoami':
                return [
                    '',
                    '┌─────────────────────────────────────────────┐',
                    '│  ALI AHMED - Digital Ronin                  │',
                    '├─────────────────────────────────────────────┤',
                    '│  Role:        Security Researcher           │',
                    '│  Path:        The Way of the Samurai        │',
                    '│  Philosophy:  "Do not seek to follow in     │',
                    '│               the footsteps of the wise.    │',
                    '│               Seek what they sought."       │',
                    '│                                             │',
                    '│  Mission:     Master the blade of code,     │',
                    '│               guard the digital realm       │',
                    '└─────────────────────────────────────────────┘',
                    ''
                ];

            case 'contact':
                return [
                    '',
                    'CONTACT INFORMATION',
                    '══════════════════════════════════════',
                    '',
                    '  📧 Email:    ali@example.com',
                    '  🐙 GitHub:   github.com/yourusername',
                    '  💼 LinkedIn: linkedin.com/in/yourusername',
                    '',
                    '══════════════════════════════════════',
                    ''
                ];

            case 'clear':
                return ['CLEAR_SCREEN'];

            case 'sudo rm -rf /':
            case 'sudo rm -rf':
                setShouldShake(true);
                setTimeout(() => setShouldShake(false), 500);
                return [
                    '',
                    '⚠️  CRITICAL ERROR ⚠️',
                    '',
                    'rm: cannot remove \'/\': Permission denied',
                    'rm: cannot remove \'/bin\': Permission denied',
                    'rm: cannot remove \'/boot\': Permission denied',
                    'rm: cannot remove \'/dev\': Permission denied',
                    '',
                    '┌────────────────────────────────────────┐',
                    '│  YOU HAVE NO POWER HERE, MORTAL!       │',
                    '│                                        │',
                    '│  The Digital Ronin protects this realm│',
                    '└────────────────────────────────────────┘',
                    '',
                    '[SYSTEM INTEGRITY PROTECTED]',
                    ''
                ];

            case '':
                return [];

            default:
                return [
                    `bash: ${cmd}: command not found`,
                    'Type "help" for available commands.',
                    ''
                ];
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!input.trim()) return;

        const output = executeCommand(input);

        // Handle clear command
        if (output[0] === 'CLEAR_SCREEN') {
            setHistory([]);
            setInput('');
            return;
        }

        // Add to history
        setHistory(prev => [...prev, { command: input, output }]);
        setCommandHistory(prev => [...prev, input]);
        setHistoryIndex(-1);
        setInput('');
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        // Command history navigation
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length > 0) {
                const newIndex = historyIndex === -1
                    ? commandHistory.length - 1
                    : Math.max(0, historyIndex - 1);
                setHistoryIndex(newIndex);
                setInput(commandHistory[newIndex]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex !== -1) {
                const newIndex = historyIndex + 1;
                if (newIndex >= commandHistory.length) {
                    setHistoryIndex(-1);
                    setInput('');
                } else {
                    setHistoryIndex(newIndex);
                    setInput(commandHistory[newIndex]);
                }
            }
        }
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 bg-ink/30 dark:bg-bone/10 backdrop-blur-sm z-[9998]"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Terminal */}
                        <motion.div
                            initial={{ y: '-100%', opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: '-100%', opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className={`fixed top-0 left-0 right-0 z-[9999] mx-auto max-w-6xl mt-4 ${shouldShake ? 'animate-shake' : ''
                                }`}
                        >
                            <div className="paper-card bg-paper dark:bg-void overflow-hidden">
                                {/* Terminal Header */}
                                <div className="flex items-center justify-between px-4 py-3 border-b-2 border-ink/10 dark:border-bone/10 bg-charcoal/5 dark:bg-bone/5">
                                    <div className="flex items-center gap-2">
                                        <Terminal className="w-5 h-5 text-ink dark:text-bone" />
                                        <span className="font-mono text-sm font-bold text-ink dark:text-bone">
                                            visitor@digital-ronin:~
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="p-1 hover:bg-ink/10 dark:hover:bg-bone/10 rounded transition-colors"
                                        aria-label="Close terminal"
                                    >
                                        <X className="w-5 h-5 text-ink dark:text-bone" />
                                    </button>
                                </div>

                                {/* Terminal Content */}
                                <div
                                    ref={terminalRef}
                                    className="p-4 h-[60vh] overflow-y-auto font-mono text-sm"
                                >
                                    {/* Command History */}
                                    {history.map((item, index) => (
                                        <div key={index} className="mb-2">
                                            {item.command && (
                                                <div className="flex items-center gap-2 text-ink dark:text-bone">
                                                    <span className="text-blood">$</span>
                                                    <span>{item.command}</span>
                                                </div>
                                            )}
                                            <div className="text-charcoal dark:text-smoke whitespace-pre-wrap">
                                                {item.output.map((line, lineIndex) => (
                                                    <div key={lineIndex}>{line}</div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}

                                    {/* Input Line */}
                                    <form onSubmit={handleSubmit} className="flex items-center gap-2">
                                        <span className="text-blood">$</span>
                                        <input
                                            ref={inputRef}
                                            type="text"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            className="flex-1 bg-transparent border-none outline-none text-ink dark:text-bone"
                                            autoComplete="off"
                                            spellCheck={false}
                                        />
                                    </form>
                                </div>

                                {/* Terminal Footer */}
                                <div className="flex items-center justify-between px-4 py-2 border-t-2 border-ink/10 dark:border-bone/10 bg-charcoal/5 dark:bg-bone/5">
                                    <span className="font-mono text-xs text-ash dark:text-smoke">
                                        Press ESC or ~ to close
                                    </span>
                                    <span className="font-mono text-xs text-ash dark:text-smoke">
                                        ↑↓ for history
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Shake Animation */}
            <style jsx>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0) translateY(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-10px) translateY(5px); }
                    20%, 40%, 60%, 80% { transform: translateX(10px) translateY(-5px); }
                }
                .animate-shake {
                    animation: shake 0.5s ease-in-out;
                }
            `}</style>
        </>
    );
}
