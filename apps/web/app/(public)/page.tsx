import { Hero } from '@/components/sections'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { TestimoniosSection } from '@/components/sections/TestimoniosSection'
import { ComoTrabajamosSection } from '@/components/sections/ComoTrabajamosSection'
import { FaqsSection } from '@/components/sections/FaqsSection'
import { getSiteConfig } from '@/lib/actions/configuraciones'
import { getServiciosComerciales } from '@/lib/repositories/servicios.repository'
import { getTestimoniosActivos } from '@/lib/actions/testimonios'
import { getData } from '@/lib/data'
import { siteConfig } from '@/config/site'
import type { HeroData } from '@/types/content'
import type { Metadata } from 'next'

// Regeneración ISR cada 60 seg en producción, permitiendo velocidad de página estática
export const revalidate = 60

export const metadata: Metadata = {
    title: 'SICOVEL | Desarrollo web moderno para pymes en Chile',
    description: 'Creamos landing pages, sitios web y e-commerce para pymes, emprendedores y negocios locales en Chile. Precios transparentes y atención personalizada.',
    keywords: ['desarrollo web chile', 'landing page chile', 'páginas web pymes', 'e-commerce chile', 'sitio web profesional', 'SICOVEL'],
    openGraph: {
        title: 'SICOVEL | Desarrollo web moderno para pymes en Chile',
        description: 'Creamos landing pages, sitios web y e-commerce para pymes, emprendedores y negocios locales en Chile.',
        url: siteConfig.url,
        siteName: siteConfig.seo.siteName,
        locale: 'es_CL',
        type: 'website',
        // TODO: Agregar og-image cuando se cree /public/images/og-image.jpg (1200x630px)
    },
}

export default async function HomePage(): Promise<React.JSX.Element> {
    const [{ data: config }, servicios, testimonios] = await Promise.all([
        getSiteConfig(),
        getServiciosComerciales(),
        getTestimoniosActivos(),
    ])

    // Datos locales (proceso + FAQs comerciales) desde site-content.json
    // No conectado a Supabase — fuente: data/site-content.json via getData()
    const siteData = getData()

    // Construir HeroData desde configuraciones_sitio de Supabase.
    // Se incluyen fallbacks seguros para no romper la UI si una clave falta en BD.
    const heroData: HeroData = {
        title: config?.hero_titulo_home ?? 'Tecnología de Alto Rendimiento para tu Negocio',
        subtitle: '',
        description: config?.hero_subtitulo_home ?? 'Creamos landing pages, sitios web y e-commerce que impulsan tu crecimiento.',
        backgroundImage: config?.hero_imagen_url ?? '/images/hero-bg.jpg',
        primaryButton: {
            text: config?.hero_cta_principal_texto ?? 'Hablar por WhatsApp',
            href: config?.hero_cta_principal_link ?? siteConfig.whatsapp.url,
        },
        secondaryButton: config?.hero_cta_secundario_texto
            ? {
                  text: config.hero_cta_secundario_texto,
                  href: config.hero_cta_secundario_link ?? '/precios',
              }
            : {
                  text: 'Ver Planes',
                  href: '/precios',
              },
    }

    // Adaptar FaqComercialItem[] al shape FaqItem[] que espera FaqsSection.
    // FaqItem requiere `categoria` y `orden` que FaqComercialItem no tiene —
    // se inyectan valores por defecto para compatibilidad de tipos.
    const faqsParaHome = siteData.faqsComerciales.items.map((item, i) => ({
        id: item.id,
        pregunta: item.pregunta,
        respuesta: item.respuesta,
        categoria: 'general',
        orden: i + 1,
    }))

    return (
        <>
            <Hero data={heroData} servicios={servicios} />
            <ServicesGrid services={siteData.services} />
            <ComoTrabajamosSection data={siteData.proceso} />
            <FaqsSection faqs={faqsParaHome} />
            <TestimoniosSection testimonios={testimonios} />
        </>
    )
}
