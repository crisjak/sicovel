'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'

export function HeroAnimatedBackground(): ReactNode {
    // Only render animations after mount to prevent hydration mismatch
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])

    if (!mounted) {
        return (
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {/* Fallback for SSR */}
                <div className="absolute -top-40 -right-20 w-[500px] h-[500px] rounded-full opacity-30"
                    style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)' }} />
                <div className="absolute top-1/3 -left-40 w-[600px] h-[600px] rounded-full opacity-30"
                    style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)' }} />
            </div>
        )
    }

    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Tech Grid Pattern */}
            <div 
                className="absolute inset-0 opacity-[0.25] dark:opacity-[0.07] mix-blend-overlay"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(59, 130, 246, 0.4) 1px, transparent 1px), 
                        linear-gradient(90deg, rgba(59, 130, 246, 0.4) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px',
                    maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black 10%, transparent 80%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black 10%, transparent 80%)'
                }}
            />

            {/* Top Right Aurora */}
            <motion.div
                animate={{
                    x: [0, -40, 0],
                    y: [0, 30, 0],
                    scale: [1, 1.15, 1],
                    opacity: [0.6, 0.8, 0.6]
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-40 -right-20 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full mix-blend-screen dark:mix-blend-lighten"
                style={{
                    background: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, rgba(6,182,212,0.05) 40%, transparent 70%)',
                }}
            />

            {/* Bottom Left Aurora */}
            <motion.div
                animate={{
                    x: [0, 50, 0],
                    y: [0, -30, 0],
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.7, 0.5]
                }}
                transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 -left-20 w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full mix-blend-screen dark:mix-blend-lighten"
                style={{
                    background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, rgba(59,130,246,0.06) 40%, transparent 70%)',
                }}
            />

            {/* Center Breathing Glow */}
            <motion.div
                animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [0.9, 1.05, 0.9]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[30%] left-1/4 w-[50%] h-[400px] rounded-full mix-blend-screen dark:mix-blend-lighten hidden md:block"
                style={{
                    background: 'radial-gradient(ellipse, rgba(59,130,246,0.08) 0%, transparent 60%)',
                }}
            />
        </div>
    )
}
