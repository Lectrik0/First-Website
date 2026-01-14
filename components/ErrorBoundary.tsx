'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(_: Error): State {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center bg-paper/50 dark:bg-void/50 rounded-lg border border-blood/20">
                    <AlertTriangle className="w-12 h-12 text-blood mb-4" />
                    <h2 className="text-2xl font-playfair font-bold text-ink dark:text-bone mb-2">
                        A BLADE HAS BROKEN
                    </h2>
                    <p className="text-charcoal dark:text-smoke font-mono text-sm mb-6">
                        Something went wrong in this section.
                    </p>
                    <button
                        onClick={() => this.setState({ hasError: false })}
                        className="px-6 py-2 bg-ink dark:bg-bone text-paper dark:text-void font-bold text-sm hover:opacity-90 transition-opacity"
                    >
                        TRY AGAIN
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
