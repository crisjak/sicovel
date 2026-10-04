import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { HeroData } from '@/types/content'
import type { ServicioComercial } from '@/types/services'
import { ServiceCarousel } from './ServiceCarousel'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { HeroAnimatedBackground } from './HeroAnimatedBackground'
import { siteConfig } from '@/config/site'

interface HeroProps {
    data: HeroData
    servicios?: ServicioComercial[]
}

export function Hero({ data, servicios = [] }: HeroProps): React.JSX.Element {
    const hasServices = Array.isArray(servicios) && servicios.length > 0;

    return (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
            {/* Background Image with Gradient Overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Subtle image background fading out */}
                <div
                    className="absolute inset-0 opacity-10 dark:opacity-10 [mask-image:linear-gradient(to_bottom,white,transparent)]"
                    style={{
                        backgroundImage: `url(${data.backgroundImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
            </div>

            {/* Dynamic Animated Background */}
            <HeroAnimatedBackground />

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className={`grid grid-cols-1 ${hasServices ? 'lg:grid-cols-2 gap-12' : 'text-center'} items-center`}>
                    <div className={`${hasServices ? 'max-w-2xl' : 'max-w-4xl mx-auto flex flex-col items-center'}`}>
                        {/* Minimalist Branding Line */}
                        <div className="hero-breathe flex items-center gap-3 sm:gap-4 mb-6 select-none">
                            <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-cyan-500/50" />
                            <span className="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.2em] text-cyan-500/90 dark:text-cyan-400/90 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">
                                {siteConfig.tagline}
                            </span>
                            <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-cyan-500/50" />
                        </div>

                    {/* Title */}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-sm">
                        <SectionTitle text={data.title} />
                    </h1>

                    {/* Description */}
                    <p className="mt-6 text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
                        {data.description}
                    </p>

                    {/* CTA Buttons - Desktop (or all if no services) */}
                    <div className={`${hasServices ? 'hidden lg:flex' : 'flex'} mt-10 flex-col sm:flex-row gap-4 w-full sm:w-auto`}>
                        <Link
                            href={data.primaryButton.href}
                            className="group inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl hover:from-blue-700 hover:to-cyan-600 transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                        >
                            {data.primaryButton.text}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        {data.secondaryButton && (
                            <Link
                                href={data.secondaryButton.href}
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors border border-zinc-200 dark:border-zinc-700"
                            >
                                {data.secondaryButton.text}
                            </Link>
                        )}
                    </div>


                    </div>
                    
                    {/* Carousel & Mobile CTA */}
                    {hasServices && (
                        <div className="w-full mt-12 lg:mt-0 flex flex-col items-center">
                            <ServiceCarousel servicios={servicios} />
                            
                            {/* CTA Buttons - Mobile */}
                            <div className="flex lg:hidden mt-8 w-full max-w-sm flex-col gap-4 justify-center">
                                <Link
                                    href={data.primaryButton.href}
                                    className="group w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl hover:from-blue-700 hover:to-cyan-600 transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                                >
                                    {data.primaryButton.text}
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                {data.secondaryButton && (
                                    <Link
                                        href={data.secondaryButton.href}
                                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors border border-zinc-200 dark:border-zinc-700"
                                    >
                                        {data.secondaryButton.text}
                                    </Link>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
