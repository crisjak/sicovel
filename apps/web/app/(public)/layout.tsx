import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppFloat } from '@/components/ui/WhatsAppFloat'
import { getData } from '@/lib/data'
import { siteConfig } from '@/config/site'

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode
}): React.JSX.Element {
    // 1. Lectura del Server Side. Cero CSR. Cero useEffects.
    const data = getData()

    return (
        <>
            <Navbar data={data.navbar} />
            
            {/* Fondo Global Premium (continuo entre páginas) */}
            <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-slate-50 dark:bg-slate-950">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-blue-500/20 to-cyan-400/20 rounded-full blur-[100px] opacity-70" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-400/20 to-blue-500/20 rounded-full blur-[100px] opacity-70" />
            </div>

            <main className="relative z-0 flex flex-col">{children}</main>
            
            <Footer data={data.footer} />

            {/* WhatsApp flotante — configuración centralizada desde config/site.ts */}
            {siteConfig.whatsapp.flotanteActivo && (
                <WhatsAppFloat
                    numero={siteConfig.whatsapp.numero}
                    mensaje={siteConfig.whatsapp.mensajeFlotante}
                    tooltip={siteConfig.whatsapp.tooltip}
                />
            )}
        </>
    )
}
