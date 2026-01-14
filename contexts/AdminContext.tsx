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
        // Check if admin session exists
        const adminSession = sessionStorage.getItem('admin-session');
        if (adminSession === 'true') {
            setIsAdmin(true);
        }
    }, []);

    const login = (username: string, password: string): boolean => {
        // Simple auth (in production, use proper backend)
        if (username === 'sensei' && password === 'vagabond2024') {
            setIsAdmin(true);
            sessionStorage.setItem('admin-session', 'true');
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAdmin(false);
        sessionStorage.removeItem('admin-session');
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
