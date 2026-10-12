'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from './ThemeToggle'
import { BrandLogo } from '@/components/ui/BrandLogo'
import type { NavbarData } from '@/types/content'

interface NavbarProps {
    data: NavbarData
}

export function Navbar({ data }: NavbarProps): React.JSX.Element {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const pathname = usePathname()

    return (
        <div className="h-20 w-full shrink-0 z-50 relative">
            <header className="navbar-brand-shell fixed top-0 left-0 right-0 z-50 w-full">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">

                    {/* ── Logo Brandmark ── */}
                    <Link
                        href={data.logo.href}
                        className="flex items-center group select-none shrink-0 min-w-0"
                    >
                        <div className="flex items-center">
                            {/* Full Image Logo (Oficial) — Optical Scale Override via Reusable Component */}
                            <BrandLogo 
                                className="w-[140px] min-[380px]:w-[180px] sm:w-[240px] md:w-[300px] lg:w-[360px] h-12 min-[380px]:h-14 sm:h-16 md:h-20 translate-y-0.5 md:translate-y-2 max-w-[55vw] sm:max-w-none"
                                imageClassName="scale-[1.25] min-[380px]:scale-[1.5] sm:scale-[1.8] md:scale-[2.1] lg:scale-[2.25]"
                            />
                        </div>
                    </Link>

                    {/* ── Desktop Navigation ── */}
                    <nav className="hidden md:flex items-center gap-1">
                        {data.links.map((link) => {
                            const isActive = pathname === link.href
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`
                                        relative px-4 py-2 text-sm font-semibold rounded-full
                                        transition-colors duration-300
                                        ${isActive
                                            // Active: clean text glow without pill background
                                            ? 'text-blue-600 dark:text-cyan-300 [text-shadow:0_0_12px_rgba(59,130,246,0.5)] dark:[text-shadow:0_0_12px_rgba(6,182,212,0.8)]'
                                            // Default/Hover: adapt to theme with subtle glow on hover
                                            : 'text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-200 hover:[text-shadow:0_0_10px_rgba(59,130,246,0.3)] dark:hover:[text-shadow:0_0_10px_rgba(6,182,212,0.5)]'
                                        }
                                    `}
                                >
                                    {link.label}
                                </Link>
                            )
                        })}
                    </nav>

                    {/* ── Desktop CTA ── */}
                    <div className="hidden md:flex items-center gap-3 pr-12 lg:pr-14">
                        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                            <Link
                                href={data.ctaButton.href}
                                className="
                                    px-5 py-2.5 text-sm font-bold text-white rounded-xl
                                    bg-gradient-to-r from-blue-600 to-cyan-500
                                    hover:from-blue-500 hover:to-cyan-400
                                    transition-all shadow-lg shadow-blue-500/30
                                    relative overflow-hidden group block
                                    border border-blue-400/30
                                "
                            >
                                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                                <span className="relative z-10">{data.ctaButton.text}</span>
                            </Link>
                        </motion.div>
                    </div>

                    {/* ── Mobile: Hamburger — CSS-only transitions (no framer-motion) ── */}
                    <div className="flex md:hidden items-center gap-2">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="relative p-2.5 rounded-xl min-w-[44px] min-h-[44px] flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-200 hover:bg-blue-50/80 dark:hover:bg-blue-500/10 active:scale-95 transition-all"
                            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                            aria-expanded={isMenuOpen}
                        >
                            <span className={`absolute transition-all duration-150 ${isMenuOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`}>
                                <Menu className="w-6 h-6" />
                            </span>
                            <span className={`absolute transition-all duration-150 ${isMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`}>
                                <X className="w-6 h-6" />
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Mobile Menu Panel — CSS transition (no framer-motion, zero JS overhead) ── */}
            <div
                className={`
                    navbar-mobile-panel md:hidden relative z-50
                    border-b border-slate-200/20 dark:border-blue-500/15
                    overflow-hidden transition-all duration-200 ease-in-out
                    ${isMenuOpen
                        ? 'opacity-100 max-h-[calc(100vh-5rem)] overflow-y-auto'
                        : 'opacity-0 max-h-0 pointer-events-none'
                    }
                `}
                aria-hidden={!isMenuOpen}
            >
                <nav className="container mx-auto px-4 py-5 flex flex-col gap-1.5">
                    {data.links.map((link) => {
                        const isCurrent = pathname === link.href
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className={`
                                    px-4 py-3 rounded-xl text-sm font-semibold transition-all active:scale-[0.98] border
                                    ${isCurrent
                                        ? 'text-blue-100 dark:text-blue-100 bg-blue-600/30 dark:bg-blue-600/30 border-blue-400/50 dark:border-blue-400/50'
                                        : 'text-slate-700 dark:text-slate-300 border-transparent hover:text-blue-600 dark:hover:text-blue-200 hover:bg-blue-50 dark:hover:bg-blue-500/10'
                                    }
                                `}
                            >
                                {link.label}
                            </Link>
                        )
                    })}

                    <Link
                        href={data.ctaButton.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="mt-3 px-4 py-3 text-sm font-bold text-white text-center bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98] border border-blue-400/30"
                    >
                        {data.ctaButton.text}
                    </Link>

                    <div className="mt-3 flex items-center justify-between border-t border-slate-200/40 dark:border-blue-500/15 pt-4 px-2">
                        <span className="text-sm font-medium text-slate-500 dark:text-blue-300/60">Modo de visualización</span>
                        <ThemeToggle className="relative" />
                    </div>
                </nav>
            </div>
        </header>
        </div>
    )
}
