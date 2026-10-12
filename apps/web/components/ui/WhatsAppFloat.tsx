'use client'

interface WhatsAppFloatProps {
    /** Número de WhatsApp en formato internacional sin + (ej: 56920477927) */
    numero?: string
    /** Mensaje prellenado que se abre en WhatsApp */
    mensaje?: string
    /** Texto del tooltip al hacer hover */
    tooltip?: string
}

function WhatsAppIcon({ className = 'w-7 h-7' }: { className?: string }): React.JSX.Element {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.08C19.42 7.64 20.28 9.7 20.28 11.91C20.28 16.45 16.59 20.15 12.04 20.15C10.56 20.15 9.12 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.27 16.61L5.07 16.3C4.24 14.98 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67ZM8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7.02 8.48 7.02 9.68C7.02 10.88 7.9 12.03 8.02 12.19C8.15 12.35 9.73 14.79 12.16 15.84C12.74 16.09 13.19 16.24 13.54 16.35C14.12 16.53 14.65 16.51 15.07 16.44C15.54 16.37 16.51 15.85 16.71 15.28C16.92 14.71 16.92 14.22 16.86 14.12C16.79 14.02 16.63 13.96 16.39 13.84C16.14 13.72 14.92 13.12 14.69 13.04C14.47 12.96 14.3 12.92 14.14 13.16C13.97 13.41 13.5 13.96 13.36 14.12C13.22 14.28 13.08 14.3 12.83 14.18C12.59 14.06 11.8 13.8 10.87 12.97C10.14 12.32 9.65 11.52 9.51 11.27C9.37 11.03 9.49 10.89 9.62 10.77C9.73 10.66 9.87 10.48 10 10.33C10.12 10.19 10.17 10.08 10.25 9.92C10.33 9.76 10.29 9.61 10.23 9.49C10.17 9.37 9.7 8.23 9.5 7.76C9.31 7.29 9.12 7.36 8.97 7.35C8.83 7.34 8.67 7.33 8.53 7.33Z" />
        </svg>
    )
}

export function WhatsAppFloat({
    numero = '56920477927',
    mensaje = 'Hola SICOVEL, quiero cotizar un proyecto',
    tooltip = 'Cotizar por WhatsApp',
}: WhatsAppFloatProps): React.JSX.Element {
    const encodedMsg = encodeURIComponent(mensaje)
    const href = `https://wa.me/${numero}${encodedMsg ? `?text=${encodedMsg}` : ''}`

    return (
        <aside
            aria-label="Contacto por WhatsApp"
            className="fixed bottom-5 right-5 z-50 flex items-center group pointer-events-auto"
        >
            {/* Tooltip flotante en hover (Desktop) */}
            <span
                role="tooltip"
                className="
                    pointer-events-none absolute right-full mr-3
                    hidden sm:inline-flex items-center gap-1.5
                    whitespace-nowrap rounded-xl
                    bg-slate-900/90 dark:bg-slate-800/95
                    px-3.5 py-2 text-xs font-bold text-white
                    shadow-xl shadow-black/20 backdrop-blur-md
                    border border-white/10
                    opacity-0 translate-x-2
                    transition-all duration-200 ease-out
                    group-hover:opacity-100 group-hover:translate-x-0
                "
            >
                <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                {tooltip}
            </span>

            {/* Botón Flotante Oficial con Glow */}
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={tooltip}
                title={tooltip}
                className="
                    relative flex items-center justify-center
                    w-13 h-13 sm:w-14 sm:h-14
                    p-3 rounded-full
                    bg-[#25D366] hover:bg-[#1EBE5A]
                    text-white
                    shadow-[0_4px_20px_rgba(37,211,102,0.4)]
                    hover:shadow-[0_6px_28px_rgba(37,211,102,0.65)]
                    hover:scale-110 active:scale-95
                    transition-all duration-300 ease-out
                    focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950
                "
            >
                <WhatsAppIcon className="w-7 h-7 sm:w-8 sm:h-8 fill-current drop-shadow-sm" />

                {/* Sutil indicador de presencia online */}
                <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-white border-2 border-[#25D366]">
                    <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
                </span>
            </a>
        </aside>
    )
}
