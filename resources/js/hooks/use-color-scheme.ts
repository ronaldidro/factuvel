import { useCallback, useEffect, useState } from 'react';

const colorSchemes = ['default', 'green', 'blue', 'violet'];

export type ColorScheme = (typeof colorSchemes)[number];

const applyScheme = (scheme: ColorScheme) => {
    const root = document.documentElement;

    colorSchemes.forEach((schemeName) => {
        root.classList.remove(schemeName);
    });

    root.classList.add(scheme);
};

export function initializeColorScheme() {
    const savedScheme = (localStorage.getItem('color-scheme') as ColorScheme) || 'default';
    applyScheme(savedScheme);
}

export function useColorScheme() {
    const [scheme, setScheme] = useState<ColorScheme>('default');

    const updateScheme = useCallback((newScheme: ColorScheme) => {
        setScheme(newScheme);
        localStorage.setItem('color-scheme', newScheme);
        applyScheme(newScheme);
    }, []);

    useEffect(() => {
        const saved = (localStorage.getItem('color-scheme') as ColorScheme) || 'default';
        updateScheme(saved);
    }, [updateScheme]);

    return { scheme, updateScheme } as const;
}
