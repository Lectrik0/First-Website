import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // Strict Monochrome Palette - "Ink & Blade"
                // Light Mode
                'paper': '#F0F0F0',
                'ink': '#000000',
                'charcoal': '#2B2B2B',
                'ash': '#808080',

                // Dark Mode
                'void': '#121212',
                'bone': '#EFEFEF',
                'smoke': '#8B8B8B',

                // Minimal accents (only for critical UI states)
                'blood': '#8B0000',
            },
            fontFamily: {
                playfair: ['Playfair Display', 'serif'],
                cinzel: ['Cinzel', 'serif'],
                noto: ['Noto Serif JP', 'serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            animation: {
                'brush-stroke': 'brushStroke 0.4s ease-out forwards',
                'ink-splash': 'inkSplash 0.6s ease-out',
                'fade-in': 'fadeIn 0.8s ease-out',
                'slide-in': 'slideIn 0.6s ease-out',
            },
            keyframes: {
                brushStroke: {
                    '0%': { width: '0%', opacity: '0' },
                    '100%': { width: '100%', opacity: '1' },
                },
                inkSplash: {
                    '0%': { transform: 'scale(0) rotate(-5deg)', opacity: '0' },
                    '60%': { opacity: '1' },
                    '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
                },
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideIn: {
                    '0%': { opacity: '0', transform: 'translateX(-30px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
            },
            backgroundImage: {
                'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
            },
            clipPath: {
                'torn': 'polygon(0% 0%, 95% 0%, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0% 95%, 0% 5%)',
                'torn-rough': 'polygon(2% 0%, 95% 1%, 98% 4%, 100% 10%, 99% 90%, 97% 95%, 93% 99%, 8% 100%, 3% 97%, 1% 92%, 0% 8%)',
            },
        },
    },
    plugins: [],
};

export default config;
