import { Hero } from '@/components/sections'
import { CheckCircle2 } from 'lucide-react'

// Mock Data specific for this detailed service view
const ecommerceHeroData = {
    title: 'Tu Propia Tienda E-commerce 24/7',
    subtitle: 'Ventas Automatizadas',
    description: 'Vende tus productos todo el año sin intermediarios. Creamos la tienda en línea perfecta para tu negocio, donde cada transacción la recibes directo a tu cuenta bancaria.',
    primaryButton: {
        text: 'Cotizar Tienda Online',
        href: '/contacto?plan=tienda-unico',
    },
    secondaryButton: {
        text: 'Ver más servicios',
        href: '/#servicios',
    },
    backgroundImage: '/images/hero-bg.jpg', 
}

const features = [
    {
        title: 'Catálogo sin Límites',
        description: 'Tú eres el único que decide cuánto crecer. Sube 10, 100 o 1,000 productos a tu vitrina virtual sin que debas pagar extra por espacio. Te ayudamos a configurar las categorías y etiquetas para que tus clientes encuentren rápido lo que buscan.',
    },
    {
        title: 'Pasarelas de Pago Chilenas Integradas',
        description: 'Simplificamos cómo cobras. Configuramos Webpay Plus y Flow desde el primer momento, permitiéndote aceptar todas las tarjetas de débito (RedCompra), crédito y prepago emitidas en Chile, para que tus clientes puedan pagar como prefieran.',
    },
    {
        title: 'Gestión Completa Desde tu Celular',
        description: 'No tienes que estar pegado al computador. A través de una app móvil, recibirás una notificación auditiva cada vez que consigas una venta, podrás pausar stock en reuniones o verificar los pagos que van directo a tu cuenta bancaria desde cualquier lugar.',
    },
    {
        title: 'Garantía 0% de Comisión',
        description: 'Olvídate de las aplicaciones de delivery y de mercados de terceros que se quedan con hasta un 30% de tus ventas. Nosotros solo te cobramos el valor técnico de crear tu plataforma. Todo el dinero de las ventas de productos recae únicamente en ti.',
    },
]

export default function EcommerceService(): React.JSX.Element {
    return (
        <main className="flex min-h-screen flex-col relative">
            {/* Hero Section */}
            <Hero data={ecommerceHeroData} />

            {/* Service Details Section */}
            <section className="py-20 lg:py-32">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mb-6">
                            Lo que ofrecemos en tu plan de{' '}
                            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                                E-commerce
                            </span>
                        </h2>
                        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed">
                            No te conformes con vender por Instagram. Una verdadera tienda online profesional automatiza tus ventas, gestiona tu inventario, calcula envíos automáticos (como a Starken o Chilexpress) e inspira <strong>absoluta confianza</strong> a la hora de procesar pagos electrónicos.
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
                            ¿Te imaginas despertar mañana con ventas que se cerraron de madrugada?
                        </p>
                        <a 
                            href="/contacto?plan=tienda-unico"
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
