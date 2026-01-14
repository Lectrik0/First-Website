'use client';

import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
    // State to store our value
    // Initialize with initialValue first to ensure Server/Client match
    const [storedValue, setStoredValue] = useState<T>(initialValue);

    // One-time effect to read from localStorage on the client
    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }
        try {
            const item = window.localStorage.getItem(key);
            if (item) {
                setStoredValue(JSON.parse(item));
            }
        } catch (error) {
            console.warn(`Error reading localStorage key "${key}":`, error);
        }
    }, [key]);

    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = (value: T | ((val: T) => T)) => {
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;

            // Save state
            setStoredValue(valueToStore);

            // Save to local storage
            if (typeof window !== "undefined") {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            // A more advanced implementation would handle the error case
            console.warn(`Error setting localStorage key "${key}":`, error);
        }
    };

    return [storedValue, setValue] as const;
}
