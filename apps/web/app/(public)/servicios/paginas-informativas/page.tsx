import { Hero } from '@/components/sections'
import { CheckCircle2 } from 'lucide-react'

// Mock Data specific for this detailed service view
const informativasHeroData = {
    title: 'Páginas Informativas Profesionales',
    subtitle: 'Presencia de Marca',
    description: 'Establece credibilidad y transmite confianza a tus clientes. Construimos el hogar digital de tu empresa para que muestres exactamente lo que te hace diferente.',
    primaryButton: {
        text: 'Cotizar Sitio Web',
        href: '/contacto?plan=web-unico',
    },
    // Adding a secondary button to go back or see more services
    secondaryButton: {
        text: 'Ver más servicios',
        href: '/#servicios',
    },
    backgroundImage: '/images/hero-bg.jpg', // Reusing the main background
}

const features = [
    {
        title: 'Estructura Robusta de Hasta 10 Páginas',
        description: 'Te damos el espacio suficiente para mostrar todo lo que ofreces. Podrás tener secciones dedicadas a "Quiénes Somos", "Servicios o Productos detallados", "Preguntas Frecuentes", "Portafolio" o galerías de trabajo, y "Contacto". Todo perfectamente organizado para no saturar a tus visitantes.',
    },
    {
        title: 'Blog Integrado (Opcional)',
        description: 'Tener un blog activo ayuda enormemente a generar confianza y autoridad en tu rubro. Si lo deseas, integramos un sistema para que puedas publicar artículos, noticias o novedades de tu empresa, atrayendo más tráfico de manera orgánica a tu sitio.',
    },
    {
        title: 'Edición Simple, Sin Códigos Complicados',
        description: 'Tú debes tener el control de tu información. Te entregamos un panel autoadministrable muy intuitivo. Esto significa que si necesitas cambiar un texto, subir una foto nueva o modificar tu teléfono mañana, podrás hacerlo tú mismo en segundos, sin depender de nosotros.',
    },
    {
        title: 'Hosting Profesional (1er Año Incluido)',
        description: 'Una página web necesita "vivir" en un servidor para estar siempre en internet. Nosotros nos ocupamos de todo el aspecto técnico, incluyendo el servidor de alta velocidad y certificado de seguridad (el candadito verde) para que tu página corra rápido y seguro. El primer año corre por nuestra cuenta.',
    },
]

export default function PaginasInformativasService(): React.JSX.Element {
    return (
        <main className="flex min-h-screen flex-col relative">
            {/* Hero Section */}
            <Hero data={informativasHeroData} />

            {/* Service Details Section */}
            <section className="py-20 lg:py-32">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mb-6">
                            Lo que ofrecemos en tu plan de{' '}
                            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                                Página Informativa
                            </span>
                        </h2>
                        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed">
                            Una página informativa, a diferencia de un e-commerce, sirve como una vitrina digital permanente para tu marca. Está pensada para generar <strong>seriedad y prestigio</strong>. Todo entregado "llave en mano", listo para que comiences a posicionarte de inmediato.
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mt-12 bg-white dark:bg-slate-800/50 p-8 sm:p-12 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-blue-500/5">
                        {features.map((feature, index) => (
                            <div key={index} className="flex gap-4">
                                <div className="flex-shrink-0 mt-1">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                        <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Final CTA */}
                    <div className="mt-20 text-center">
                        <p className="text-xl text-zinc-900 dark:text-white font-medium mb-8">
                            ¿Listo para llevar la imagen de tu empresa al siguiente nivel?
                        </p>
                        <a 
                            href="/contacto?plan=web-unico"
                            className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl hover:from-blue-700 hover:to-cyan-600 transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-1"
                        >
                            Comenzar mi Proyecto
                        </a>
                    </div>
                </div>
            </section>
        </main>
    )
}
