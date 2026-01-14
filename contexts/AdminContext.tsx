'use client';

import { createContext, useContext, useState, useEffect } from 'react';

interface AdminContextType {
    isAdmin: boolean;
    login: (username: string, password: string) => boolean;
    logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Check if admin session exists (using localStorage for persistence)
            const adminSession = localStorage.getItem('admin-session');
            if (adminSession === 'true') {
                setIsAdmin(true);
            }
        }
    }, []);

    const login = (username: string, password: string): boolean => {
        // Simple auth (in production, use proper backend)
        if (username === 'sensei' && password === 'vagabond2024') {
            setIsAdmin(true);
            localStorage.setItem('admin-session', 'true');
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAdmin(false);
        localStorage.removeItem('admin-session');
    };

    return (
        <AdminContext.Provider value={{ isAdmin, login, logout }}>
            {children}
        </AdminContext.Provider>
    );
}

export function useAdmin() {
    const context = useContext(AdminContext);
    if (context === undefined) {
        throw new Error('useAdmin must be used within AdminProvider');
    }
    return context;
}
