import Link from 'next/link'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { SectionEyebrow } from '@/components/ui/SectionEyebrow'
import { PreciosContent } from '@/components/sections/PreciosContent'
import { FaqsSection } from '@/components/sections/FaqsSection'
import { getServiciosComerciales } from '@/lib/repositories/servicios.repository'
import { getFaqsActivas } from '@/lib/actions/faqs'
import { getData } from '@/lib/data'
import { siteConfig } from '@/config/site'

export const revalidate = 60

export const metadata: import('next').Metadata = {
    title: 'Planes y precios | SICOVEL',
    description: `Conoce los precios y planes de ${siteConfig.name}. Landing Pages, Web Informativa y E-commerce con precios transparentes y sin comisiones ocultas en Chile.`,
    keywords: ['precios desarrollo web chile', 'planes web', 'landing page precio', 'e-commerce chile precio', 'SICOVEL precios'],
    openGraph: {
        title: 'Planes y precios | SICOVEL',
        description: 'Landing Pages, Sitios Web y E-commerce con precios claros y sin sorpresas. Elige el plan ideal para tu negocio en Chile.',
        url: `${siteConfig.url}/precios`,
        siteName: siteConfig.seo.siteName,
        locale: 'es_CL',
        type: 'website',
    },
}

export default async function PreciosPage(): Promise<React.JSX.Element> {
    // Datos locales para CTA y FAQs comerciales (site-content.json, sin Supabase)
    const siteData = getData()
    const { preciosCta, faqsComerciales, preciosHeader } = siteData

    const [servicios, faqsSupabase] = await Promise.all([
        getServiciosComerciales(),
        getFaqsActivas(),
    ])

    // Usar FAQs de Supabase si existen; si no, usar las locales como fallback
    const faqs = faqsSupabase.length > 0
        ? faqsSupabase
        : faqsComerciales.items.map((item, i) => ({
              id: item.id,
              pregunta: item.pregunta,
              respuesta: item.respuesta,
              categoria: 'general',
              orden: i + 1,
          }))

    return (
        <main className="flex flex-col">
            {/* Hero Section */}
            <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden text-center px-4">
                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionEyebrow text={preciosHeader.eyebrow} />
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight max-w-4xl mx-auto drop-shadow-sm">
                        <SectionTitle text={preciosHeader.titulo} />
                    </h1>
                    <p className="mt-6 text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                        {preciosHeader.descripcion}
                    </p>
                    <p className="mt-4 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 inline-block px-4 py-2 rounded-full border border-blue-100 dark:border-blue-800">
                        {preciosHeader.nota}
                    </p>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="pb-16 lg:pb-24 relative px-4">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <PreciosContent servicios={servicios} />
                </div>
            </section>

            <FaqsSection faqs={faqs} />

            {/* CTA Section */}
            <section className="py-16 lg:py-24 px-4">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative max-w-3xl mx-auto text-center p-8 lg:p-12 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl">
                        <div className="relative z-10">
                            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
                                {preciosCta.titulo}
                            </h2>
                            <p className="text-zinc-600 dark:text-zinc-300 text-lg mb-8 max-w-xl mx-auto">
                                {preciosCta.descripcion}
                            </p>
                            <Link
                                href={preciosCta.href}
                                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 dark:text-blue-600 dark:bg-white dark:hover:bg-blue-50 transition-all shadow-lg hover:-translate-y-1"
                            >
                                {preciosCta.textoBoton}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
