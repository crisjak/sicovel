import { Hero } from '@/components/sections'
import { CheckCircle2 } from 'lucide-react'

// Mock Data specific for this detailed service view
const landingPageHeroData = {
    title: 'Landing Pages de Alta Conversión',
    subtitle: 'Servicio Especializado',
    description: 'Transformamos clics en clientes con páginas de aterrizaje diseñadas estratégicamente para maximizar tus ventas y captación de leads.',
    primaryButton: {
        text: 'Cotizar Landing Page',
        href: '/contacto?plan=landing-unico',
    },
    // Adding a secondary button to go back or see more services
    secondaryButton: {
        text: 'Ver más servicios',
        href: '/#servicios',
    },
    backgroundImage: '/images/hero-bg.jpg', // Reusing the main background or could use a specific one
}

const features = [
    {
        title: 'Diseño Responsive Premium',
        description: 'Nos aseguramos de que tu página se vea increíble no solo en computadoras, sino también en celulares y tablets. Hoy en día, la mayoría de las personas navega desde su teléfono, por lo que un diseño que se adapte perfectamente a cualquier pantalla es fundamental para dar una imagen profesional y no perder ventas.',
    },
    {
        title: 'Optimización SEO Incluida',
        description: 'Estructuramos tu página con las mejores prácticas técnicas para que buscadores como Google puedan entenderla fácilmente. Esto ayuda a que, con el tiempo, tu sitio pueda aparecer más arriba en los resultados de búsqueda cuando alguien busque los servicios o productos que ofreces.',
    },
    {
        title: 'Entrega Ultrarrápida en 5-7 días',
        description: 'Sabemos que en los negocios el tiempo es oro. Por eso, trabajamos de manera ágil y eficiente para tener tu Landing Page lista y publicada en internet en menos de una semana, sin sacrificar en ningún momento la calidad del diseño ni su funcionamiento.',
    },
    {
        title: 'Pago Único, Sin Mensualidades',
        description: 'A diferencia de otras agencias que te cobran mes a mes de forma indefinida por mantener tu página, con nosotros realizas un solo pago por el desarrollo. El diseño y el código de tu Landing Page serán 100% de tu propiedad desde el primer día.',
    },
]

export default function LandingPagesService(): React.JSX.Element {
    return (
        <main className="flex min-h-screen flex-col relative">
            {/* Hero Section */}
            <Hero data={landingPageHeroData} />

            {/* Service Details Section */}
            <section className="py-20 lg:py-32">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mb-6">
                            Lo que ofrecemos en tu plan de{' '}
                            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                                Landing Page
                            </span>
                        </h2>
                        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed">
                            Una Landing Page (o página de aterrizaje) está diseñada con un único objetivo: <strong>la conversión</strong>. Todo incluído para que tu negocio destaque en internet sin costos ocultos.
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
                            ¿Listo para multiplicar tus conversiones?
                        </p>
                        <a 
                            href="/contacto?plan=landing-unico"
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
