'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import * as LucideIcons from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ServicioComercial } from '@/types/services'

interface ServiceCarouselProps {
    servicios: ServicioComercial[]
}

function getIcon(iconName: string): LucideIcon {
    const icons = LucideIcons as unknown as Record<string, LucideIcon>
    return icons[iconName] || LucideIcons.Briefcase
}

export function ServiceCarousel({ servicios }: ServiceCarouselProps): React.JSX.Element | null {
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        if (!servicios || servicios.length === 0) return
        const interval = setInterval(() => {
            setActiveIndex((current) => (current + 1) % servicios.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [servicios?.length])

    const handleDragEnd = (_: any, info: any) => {
        if (info.offset.x < -50) {
            setActiveIndex((current) => (current + 1) % servicios.length)
        } else if (info.offset.x > 50) {
            setActiveIndex((current) => (current === 0 ? servicios.length - 1 : current - 1))
        }
    }

    if (!servicios || servicios.length === 0) return null

    return (
        <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden [perspective:1000px]">
            <AnimatePresence initial={false}>
                {servicios.map((servicio, index) => {
                    const isActive = index === activeIndex
                    const isPrev = index === (activeIndex === 0 ? servicios.length - 1 : activeIndex - 1)
                    const isNext = index === (activeIndex + 1) % servicios.length
                    
                    let position = 'hidden'
                    if (isActive) position = 'center'
                    else if (isPrev) position = 'left'
                    else if (isNext) position = 'right'

                    if (position === 'hidden') return null

                    const variants = {
                        center: { x: 0, scale: 1, zIndex: 10, opacity: 1, rotateY: 0 },
                        left: { x: '-55%', scale: 0.8, zIndex: 5, opacity: 0.4, rotateY: 25 },
                        right: { x: '55%', scale: 0.8, zIndex: 5, opacity: 0.4, rotateY: -25 },
                    }

                    const Icon = getIcon(servicio.icono)

                    return (
                        <motion.div
                            key={servicio.slug}
                            className={`absolute w-[280px] sm:w-[320px] rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing shadow-2xl transition-all duration-500 bg-white dark:bg-[#0a0f1c] ${
                                isActive
                                    ? 'border-2 border-blue-500 ring-2 ring-blue-500/80 shadow-[0_0_25px_rgba(59,130,246,0.5)] scale-[1.01]'
                                    : 'border border-zinc-200 dark:border-zinc-800'
                            }`}
                            variants={variants}
                            initial="left"
                            animate={position}
                            exit="hidden"
                            transition={{ duration: 0.6, type: 'spring', stiffness: 300, damping: 30 }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.2}
                            onDragEnd={handleDragEnd}
                            onClick={() => {
                                if (position === 'left') setActiveIndex((current) => (current === 0 ? servicios.length - 1 : current - 1))
                                if (position === 'right') setActiveIndex((current) => (current + 1) % servicios.length)
                            }}
                        >
                            {/* OVERLAY DE OSCURECIMIENTO LATERAL */}
                            <div 
                                className={`absolute inset-0 z-40 pointer-events-none transition-opacity duration-500 ${
                                    isActive ? 'opacity-0' : 'opacity-100 bg-white/50 dark:bg-[#0a0f1c]/60'
                                }`} 
                            />

                            {/* IMAGEN — fuera del contenedor blur para máxima nitidez siempre */}
                            <div className="relative w-full h-48 bg-zinc-800 overflow-hidden shrink-0">
                                {(servicio as any).imagen_url ? (
                                    <>
                                        <img
                                            src={(servicio as any).imagen_url}
                                            alt={servicio.nombre}
                                            className="absolute inset-0 w-full h-full object-cover"
                                            loading={isActive ? 'eager' : 'lazy'}
                                            decoding={isActive ? 'sync' : 'async'}
                                            style={{ imageRendering: 'auto' }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent dark:from-[#0a0f1c] dark:via-[#0a0f1c]/20" />
                                    </>
                                ) : (
                                    <>
                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-cyan-900" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent dark:from-[#0a0f1c] dark:via-[#0a0f1c]/20" />
                                    </>
                                )}
                                <div className="absolute bottom-4 left-4 p-2 bg-blue-500/20 backdrop-blur-md rounded-lg border border-blue-400/30">
                                    <Icon className="w-6 h-6 text-cyan-500 dark:text-cyan-400" />
                                </div>
                            </div>

                            {/* TEXTO — blur solo en tarjetas laterales */}
                            <div className={`flex-1 flex flex-col relative z-10 transition-all duration-500 ${isActive ? '' : 'blur-[3px]'}`}>
                                <div className="p-6 flex-1 flex flex-col bg-white dark:bg-[#0a0f1c]">
                                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">{servicio.nombre}</h3>
                                    <p className="text-sm text-zinc-600 dark:text-zinc-300 line-clamp-2 mb-6">{servicio.descripcion_corta}</p>
                                    <div className="mt-auto">
                                        <div
                                            className={`inline-flex items-center text-sm font-semibold transition-colors ${isActive ? 'text-blue-600 dark:text-cyan-400 hover:text-blue-700 dark:hover:text-cyan-300 pointer-events-auto' : 'text-zinc-500 dark:text-zinc-600 pointer-events-none'}`}
                                            tabIndex={isActive ? 0 : -1}
                                        >
                                            Ver Más <LucideIcons.ArrowRight className="ml-1 w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )
                })}
            </AnimatePresence>
        </div>
    )
}
