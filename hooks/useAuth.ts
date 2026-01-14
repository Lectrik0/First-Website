'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const RONIN_PASSPHRASE = 'vagabond2024'; // TODO: User should change this

export function useAuth() {
    const [isRonin, setIsRonin] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const router = useRouter();

    // Check authentication status on mount
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const auth = localStorage.getItem('ronin-auth') === 'true';
        setIsRonin(auth);
        setIsLoaded(true);
    }, []);

    const login = (passphrase: string): boolean => {
        if (passphrase === RONIN_PASSPHRASE) {
            localStorage.setItem('ronin-auth', 'true');
            setIsRonin(true);
            return true;
        }
        return false;
    };

    const logout = () => {
        localStorage.removeItem('ronin-auth');
        setIsRonin(false);
        router.push('/');
    };

    const requireAuth = (redirectTo: string = '/') => {
        useEffect(() => {
            if (isLoaded && !isRonin) {
                router.push(redirectTo);
            }
        }, [isLoaded, isRonin, redirectTo]);
    };

    return {
        isRonin,
        isLoaded,
        login,
        logout,
        requireAuth,
    };
}
