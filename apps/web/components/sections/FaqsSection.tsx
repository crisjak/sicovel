import { ChevronDown } from 'lucide-react'
import type { FaqItem } from '@/lib/actions/faqs'

interface FaqsSectionProps {
    faqs: FaqItem[]
}

export function FaqsSection({ faqs }: FaqsSectionProps): React.JSX.Element | null {
    if (faqs.length === 0) return null

    return (
        <section className="py-12 lg:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 mb-6">
                            <span className="w-2 h-2 rounded-full bg-blue-500" />
                            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                                Preguntas Frecuentes
                            </span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white">
                            ¿Tienes dudas?
                        </h2>
                        <p className="mt-4 text-zinc-600 dark:text-zinc-400 text-lg">
                            Resolvemos las preguntas más comunes sobre nuestros servicios.
                        </p>
                    </div>

                    {/* FAQ List */}
                    <div className="divide-y divide-zinc-200 dark:divide-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden">
                        {faqs.map((faq) => (
                            <details
                                key={faq.id}
                                className="group bg-white dark:bg-zinc-900/50 p-6 cursor-pointer"
                            >
                                <summary className="flex items-center justify-between gap-4 list-none font-semibold text-zinc-900 dark:text-white select-none">
                                    <span>{faq.pregunta}</span>
                                    <ChevronDown className="w-5 h-5 text-zinc-400 flex-shrink-0 group-open:rotate-180 transition-transform duration-300" />
                                </summary>
                                <p className="mt-4 text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">
                                    {faq.respuesta}
                                </p>
                            </details>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
