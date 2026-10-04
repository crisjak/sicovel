import Image from 'next/image'
import { Star } from 'lucide-react'
import type { TestimonioItem } from '@/lib/actions/testimonios'

interface TestimoniosSectionProps {
    testimonios: TestimonioItem[]
}

function StarRating({ calificacion }: { calificacion: number }) {
    return (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
                <Star
                    key={i}
                    className={`w-4 h-4 ${
                        i <= calificacion
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'fill-zinc-200 text-zinc-200 dark:fill-zinc-700 dark:text-zinc-700'
                    }`}
                />
            ))}
        </div>
    )
}

export function TestimoniosSection({ testimonios }: TestimoniosSectionProps): React.JSX.Element | null {
    if (testimonios.length === 0) return null

    return (
        <section className="py-12 lg:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 mb-6">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                            Lo que dicen nuestros clientes
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white">
                        Resultados reales
                    </h2>
                    <p className="mt-4 text-zinc-600 dark:text-zinc-400 text-lg max-w-2xl mx-auto">
                        Empresas y emprendedores que confiaron en SICOVEL para transformar su presencia digital.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {testimonios.map((t) => (
                        <div
                            key={t.id}
                            className="flex flex-col gap-4 p-6 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                        >
                            <StarRating calificacion={t.calificacion} />

                            <blockquote className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed flex-1">
                                &ldquo;{t.comentario}&rdquo;
                            </blockquote>

                            <div className="flex items-center gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                                {t.avatar_url ? (
                                    <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                                        <Image
                                            src={t.avatar_url}
                                            alt={t.autor}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center flex-shrink-0">
                                        <span className="text-white font-bold text-sm">
                                            {t.autor.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                )}
                                <div>
                                    <p className="font-semibold text-zinc-900 dark:text-white text-sm">
                                        {t.autor}
                                    </p>
                                    {(t.cargo || t.empresa) && (
                                        <p className="text-xs text-zinc-500 dark:text-zinc-500">
                                            {[t.cargo, t.empresa].filter(Boolean).join(' · ')}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
