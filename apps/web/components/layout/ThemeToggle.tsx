'use client'

import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

interface ThemeToggleProps {
    className?: string;
}

export function ThemeToggle({ className = "fixed top-3 right-4 sm:top-4 sm:right-6 z-[100]" }: ThemeToggleProps): React.JSX.Element {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <button
                className={`${className} p-2 bg-transparent opacity-50`}
                aria-label="Toggle theme"
            >
                <div className="w-6 h-6" />
            </button>
        )
    }

    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={`${className} p-2 bg-transparent hover:scale-110 active:scale-95 transition-transform group`}
            aria-label="Toggle theme"
        >
            <div className="relative w-6 h-6 flex items-center justify-center">
                {theme === 'dark' ? (
                    <>
                        {/* Luna: Estado actual (Se oculta al hacer hover) */}
                        <Moon className="absolute w-6 h-6 text-zinc-300 drop-shadow-lg transition-all duration-300 scale-100 opacity-100 group-hover:scale-50 group-hover:opacity-0 group-hover:-rotate-90" />
                        
                        {/* Sol: Estado próximo (Aparece al hacer hover) */}
                        <Sun className="absolute w-6 h-6 text-amber-400 drop-shadow-lg transition-all duration-300 scale-50 opacity-0 rotate-90 group-hover:scale-100 group-hover:opacity-100 group-hover:rotate-0" />
                    </>
                ) : (
                    <>
                        {/* Sol: Estado actual (Se oculta al hacer hover) */}
                        <Sun className="absolute w-6 h-6 text-zinc-700 drop-shadow-md transition-all duration-300 scale-100 opacity-100 group-hover:scale-50 group-hover:opacity-0 group-hover:rotate-90" />
                        
                        {/* Luna: Estado próximo (Aparece al hacer hover) */}
                        <Moon className="absolute w-6 h-6 text-blue-600 drop-shadow-md transition-all duration-300 scale-50 opacity-0 -rotate-90 group-hover:scale-100 group-hover:opacity-100 group-hover:rotate-0" />
                    </>
                )}
            </div>
        </button>
    )
}
