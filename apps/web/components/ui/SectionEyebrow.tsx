// SectionEyebrow — Firma visual minimalista premium.
// Reutiliza el mismo lenguaje del Hero principal.
// Funciona como Server Component puro (sin 'use client').

interface SectionEyebrowProps {
    text: string
    className?: string
}
import type { ReactNode } from 'react'

export function SectionEyebrow({ text, className = '' }: SectionEyebrowProps): ReactNode {
    return (
        <div className={`hero-breathe flex items-center justify-center gap-3 sm:gap-5 mb-6 select-none ${className}`}>
            <div className="h-[1px] w-6 sm:w-14 bg-gradient-to-r from-transparent to-cyan-500/50" />
            <span className="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.22em] text-cyan-500/90 dark:text-cyan-400/90 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)] whitespace-nowrap">
                {text}
            </span>
            <div className="h-[1px] w-6 sm:w-14 bg-gradient-to-l from-transparent to-cyan-500/50" />
        </div>
    )
}
