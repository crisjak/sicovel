import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Términos y Condiciones del Servicio | SICOVEL',
    description: 'Términos, condiciones y metodología de trabajo para el desarrollo de proyectos web con SICOVEL.',
}

export default function TerminosCondicionesPage(): React.JSX.Element {
    return (
        <main className="flex flex-col">
            <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
                    <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">
                        Términos y Condiciones del Servicio
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-10">
                        SICOVEL | Última actualización: Junio 2026
                    </p>

                    <div className="prose prose-zinc dark:prose-invert max-w-none space-y-6 text-zinc-700 dark:text-zinc-300">
                        <p>
                            En <strong>SICOVEL</strong>, nos especializamos en ofrecer servicios de desarrollo web moderno, que incluyen la creación de Landing Pages, Webs Informativas, tiendas E-commerce y soluciones digitales para pymes y emprendedores.
                        </p>
                        <p>
                            Los siguientes puntos describen de manera transparente cómo operamos y qué puedes esperar al trabajar con nosotros.
                        </p>

                        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mt-8">1. Modelo de venta asistida</h2>
                        <p>
                            Nuestros servicios no se compran automáticamente desde el sitio web, ya que cada proyecto es único. Todo desarrollo requiere un <strong>contacto previo, un diagnóstico y la elaboración de una propuesta comercial</strong> personalizada. Este proceso garantiza que contrates exactamente lo que tu negocio necesita.
                        </p>

                        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mt-8">2. Proceso de trabajo</h2>
                        <p>El ciclo estándar para la creación de un sitio web consta de las siguientes etapas:</p>
                        <ol>
                            <li><strong>Contacto inicial:</strong> Recibimos tu solicitud por formulario o WhatsApp.</li>
                            <li><strong>Diagnóstico:</strong> Conversamos brevemente para entender tus objetivos.</li>
                            <li><strong>Propuesta:</strong> Te enviamos una propuesta detallando el alcance y precio.</li>
                            <li><strong>Anticipo:</strong> Se realiza el pago inicial para confirmar el proyecto.</li>
                            <li><strong>Desarrollo:</strong> Construimos el sitio según lo acordado.</li>
                            <li><strong>Revisión:</strong> Te presentamos el resultado para recibir tus comentarios.</li>
                            <li><strong>Pago final:</strong> Se cancela el saldo restante.</li>
                            <li><strong>Publicación o entrega:</strong> Tu sitio queda público y funcionando.</li>
                        </ol>

                        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mt-8">3. Pagos y medios de pago</h2>
                        <p>
                            Normalmente, los proyectos se inician con un pago del <strong>50% por concepto de anticipo</strong> y el <strong>50% restante se paga antes de la publicación</strong> o entrega final del código/accesos.
                        </p>
                        <p>
                            El medio principal de pago es la <strong>transferencia bancaria</strong>. 
                            El envío de un link de pago mediante Flow (tarjetas) puede evaluarse de manera manual y caso a caso, como alternativa futura, previa conversación. No existe funcionalidad de carrito ni pago directo en nuestro sitio web.
                        </p>

                        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mt-8">4. Documento tributario</h2>
                        <p>
                            SICOVEL emite <strong>boleta de honorarios electrónica</strong> por la prestación de sus servicios profesionales de desarrollo. Si tu empresa requiere obligatoriamente una factura, evaluamos la situación caso a caso antes de aceptar el proyecto; por favor menciónalo durante nuestro contacto inicial.
                        </p>

                        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mt-8">5. Alcance y plazos</h2>
                        <p>
                            El alcance exacto del desarrollo, la cantidad de páginas, integraciones y características quedan definidos exclusivamente en la propuesta comercial que te enviamos. Cualquier requerimiento adicional, cambio estructural mayor o funciones solicitadas fuera del alcance inicial podrán ser cotizadas por separado.
                        </p>
                        <p>
                            Los plazos de entrega estimados dependerán de la complejidad del proyecto y de la entrega oportuna de la información por parte del cliente.
                        </p>

                        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mt-8">6. Obligaciones del cliente</h2>
                        <p>
                            Para que el proyecto fluya sin demoras, el cliente se compromete a:
                        </p>
                        <ul>
                            <li>Entregar los textos, imágenes, logos, credenciales de acceso o cualquier información esencial solicitada a tiempo.</li>
                            <li>Revisar los avances y entregar comentarios en plazos razonables para no detener el proceso de desarrollo.</li>
                        </ul>

                        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mt-8">7. Propiedad y uso</h2>
                        <p>
                            Las condiciones específicas sobre la entrega final, propiedad del código, uso de plataformas de terceros, gestión de accesos al panel de control y dominios quedarán estipuladas de manera clara en la propuesta comercial de cada proyecto particular.
                        </p>

                        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mt-8">8. Limitación de responsabilidad</h2>
                        <p>
                            Desarrollamos herramientas digitales modernas y optimizadas; sin embargo, SICOVEL <strong>no garantiza ventas, un posicionamiento SEO específico en el primer lugar de los buscadores, ni resultados comerciales exactos</strong>, ya que estos factores dependen de variables del mercado, de la calidad del producto del cliente y de sus estrategias de marketing externas.
                        </p>

                        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mt-8">9. Ley aplicable</h2>
                        <p>
                            Estos términos y cualquier relación comercial con SICOVEL se rigen bajo las leyes vigentes de la República de Chile.
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
