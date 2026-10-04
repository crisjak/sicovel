'use client'

import { MessageCircle } from 'lucide-react'

interface WhatsAppFloatProps {
    /** Número de WhatsApp en formato internacional sin + (ej: 56912345678) */
    numero: string
    /** Mensaje prellenado que se abre en WhatsApp */
    mensaje?: string
    /** Texto del tooltip al hacer hover */
    tooltip?: string
}

export function WhatsAppFloat({
    numero,
    mensaje = '',
    tooltip = 'Hablar por WhatsApp',
}: WhatsAppFloatProps): React.JSX.Element {
    const encodedMsg = encodeURIComponent(mensaje)
    const href = `https://wa.me/${numero}${encodedMsg ? `?text=${encodedMsg}` : ''}`

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={tooltip}
            title={tooltip}
            className="
                fixed bottom-6 right-6 z-50
                flex items-center justify-center
                w-14 h-14 sm:w-16 sm:h-16
                rounded-full
                bg-[#25D366] hover:bg-[#1EBE5A]
                text-white
                shadow-lg shadow-green-600/30 hover:shadow-green-600/50
                transition-all duration-300
                hover:scale-110 hover:-translate-y-0.5
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950
                animate-[whatsapp-pulse_3s_ease-in-out_infinite]
            "
        >
            <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 fill-current" />

            {/* Ping indicator */}
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-white border-2 border-[#25D366]">
                <span className="absolute inset-0 rounded-full bg-white animate-ping opacity-75" />
            </span>
        </a>
    )
}
