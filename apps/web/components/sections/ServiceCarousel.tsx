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

const CAROUSEL_FALLBACK_IMAGES: Record<string, string> = {
    landing: '/images/carrusel/landing_mockup.png',
    sitio_informativo: '/images/carrusel/informativa_mockup.png',
    ecommerce: '/images/carrusel/ecomerce_mockup.png',
}

function resolveServiceImage(servicio: ServicioComercial): string {
    return (
        servicio.imagen_url ||
        servicio.imageUrl ||
        CAROUSEL_FALLBACK_IMAGES[servicio.slug] ||
        CAROUSEL_FALLBACK_IMAGES[(servicio as any).id] ||
        '/images/carrusel/landing_mockup.png'
    )
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
    }, [servicios])

    const handleDragEnd = (_: any, info: any) => {
        if (info.offset.x < -50) {
            setActiveIndex((current) => (current + 1) % servicios.length)
        } else if (info.offset.x > 50) {
            setActiveIndex((current) => (current === 0 ? servicios.length - 1 : current - 1))
        }
    }

    if (!servicios || servicios.length === 0) return null

    return (
        <div className="relative w-full h-[440px] sm:h-[500px] flex items-center justify-center overflow-hidden [perspective:1000px]">
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
                    const imageUrl = resolveServiceImage(servicio)

                    return (
                        <motion.div
                            key={servicio.slug}
                            className={`absolute w-[260px] min-[360px]:w-[290px] sm:w-[340px] max-w-[88vw] flex flex-col rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md overflow-hidden cursor-grab active:cursor-grabbing shadow-2xl transition-all duration-500 ${
                                isActive
                                    ? 'border-2 border-blue-500/80 ring-2 ring-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.4)] bg-slate-900/90 scale-[1.02]'
                                    : 'border border-white/10 bg-slate-900/60'
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
                                    isActive ? 'opacity-0' : 'opacity-100 bg-slate-950/60'
                                }`} 
                            />

                            {/* CONTENCIÓN ESTRICTA DE IMAGEN — tamaño delimitado sin desborde */}
                            <div className="relative w-full h-44 sm:h-52 overflow-hidden rounded-t-xl bg-slate-950/80 shrink-0">
                                <Image
                                    src={imageUrl}
                                    alt={servicio.nombre}
                                    fill
                                    sizes="(max-width: 640px) 290px, 340px"
                                    className="object-cover object-top"
                                    priority={true}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/20 to-transparent pointer-events-none" />
                                <div className="absolute bottom-3 left-4 p-2 bg-blue-500/20 backdrop-blur-md rounded-lg border border-blue-400/30 z-10">
                                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
                                </div>
                            </div>

                            {/* TEXTO — contenido legible con fondo oscuro */}
                            <div className={`flex-1 flex flex-col relative z-10 transition-all duration-500 ${isActive ? '' : 'blur-[3px]'}`}>
                                <div className="p-4 sm:p-5 flex-1 flex flex-col bg-slate-900/80">
                                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5">{servicio.nombre}</h3>
                                    <p className="text-xs sm:text-sm text-zinc-300 line-clamp-2 mb-4">{servicio.descripcion_corta}</p>
                                    <div className="mt-auto">
                                        <Link
                                            href={servicio.cta_href}
                                            className={`inline-flex items-center text-sm font-semibold transition-colors ${isActive ? 'text-cyan-400 hover:text-cyan-300 pointer-events-auto' : 'text-zinc-500 pointer-events-none'}`}
                                            tabIndex={isActive ? 0 : -1}
                                        >
                                            Ver Más <LucideIcons.ArrowRight className="ml-1 w-4 h-4" />
                                        </Link>
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
