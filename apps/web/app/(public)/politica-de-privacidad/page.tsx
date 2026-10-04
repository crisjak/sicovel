import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Política de Privacidad | SICOVEL',
    description: 'Conoce cómo SICOVEL recopila, utiliza y protege tus datos personales en nuestra plataforma y procesos de venta asistida.',
}

export default function PoliticaPrivacidadPage(): React.JSX.Element {
    return (
        <main className="flex flex-col">
            <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
                    <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">
                        Política de Privacidad
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-10">
                        Responsable: SICOVEL | Última actualización: Junio 2026
                    </p>

                    <div className="prose prose-zinc dark:prose-invert max-w-none space-y-6 text-zinc-700 dark:text-zinc-300">
                        <p>
                            En <strong>SICOVEL</strong>, la transparencia es clave. A continuación, te explicamos cómo tratamos la información personal que nos compartes para brindarte un servicio de desarrollo web seguro y profesional.
                        </p>

                        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mt-8">1. Qué datos recopilamos</h2>
                        <p>
                            Para poder entender tu proyecto y enviarte una propuesta adecuada, recopilamos los datos que nos entregas de forma voluntaria. Esto incluye:
                        </p>
                        <ul>
                            <li>Nombre.</li>
                            <li>Correo electrónico.</li>
                            <li>Número de WhatsApp.</li>
                            <li>Nombre de tu negocio y rubro.</li>
                            <li>Tipo de proyecto requerido (Landing Page, Web Informativa, E-commerce, etc.).</li>
                            <li>Mensajes, textos, imágenes o detalles entregados a través de formularios, correos, WhatsApp o nuestras redes sociales.</li>
                        </ul>

                        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mt-8">2. Para qué usamos los datos</h2>
                        <p>
                            Tu información nos permite realizar el proceso de venta asistida y desarrollo. La utilizamos exclusivamente para:
                        </p>
                        <ul>
                            <li>Responder a tus consultas y evaluar la viabilidad de tu idea.</li>
                            <li>Realizar un diagnóstico comercial.</li>
                            <li>Enviarte propuestas personalizadas y cotizaciones.</li>
                            <li>Hacer seguimiento al desarrollo y avance de tu proyecto web.</li>
                            <li>Mejorar nuestra atención y la calidad de nuestros servicios.</li>
                        </ul>

                        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mt-8">3. Canales de contacto</h2>
                        <p>
                            La comunicación oficial y el intercambio de información se realiza a través de nuestro formulario en la web, nuestro correo electrónico, nuestro WhatsApp oficial y nuestras redes sociales.
                        </p>

                        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mt-8">4. Almacenamiento y herramientas externas</h2>
                        <p>
                            Para gestionar las solicitudes de manera eficiente, SICOVEL utiliza herramientas externas y servicios en la nube (cloud) para alojamiento web, bases de datos seguras, gestión de correos electrónicos y organización interna de proyectos. Toda la información se almacena con medidas de seguridad estándar de la industria.
                        </p>

                        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mt-8">5. No venta de datos</h2>
                        <p>
                            Tu privacidad es respetada en todo momento. <strong>SICOVEL no vende, arrienda ni comercializa tus datos personales</strong> a empresas externas, agencias de publicidad o terceros bajo ninguna circunstancia.
                        </p>

                        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mt-8">6. Plazo de conservación</h2>
                        <p>
                            Conservaremos tus datos mientras exista una relación comercial o proyecto en curso, durante un periodo de seguimiento razonable tras la entrega de tu sitio web, o mientras sea necesario para nuestros fines administrativos y comerciales.
                        </p>

                        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mt-8">7. Derechos del usuario</h2>
                        <p>
                            Puedes solicitar el acceso, la corrección de tus datos en caso de errores, o la eliminación completa de tu información de nuestros registros. Para ejercer estos derechos, escríbenos directamente a <strong><a href="mailto:contacto.sicovel@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">contacto.sicovel@gmail.com</a></strong>.
                        </p>

                        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mt-8">8. Actualizaciones</h2>
                        <p>
                            Esta política podría actualizarse en el futuro para adaptarse a nuevos servicios, normativas o mejoras en nuestros procesos. Cualquier cambio importante se reflejará en esta misma página con la fecha de actualización correspondiente.
                        </p>
                    </div>

                    <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
                        <Link
                            href="/"
                            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                        >
                            &larr; Volver a la página principal
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    )
}
