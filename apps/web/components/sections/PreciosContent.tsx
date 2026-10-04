'use client'

import { ServiceBlock } from '@/components/ui/ServiceBlock'
import type { ServicioComercial } from '@/types/services'

interface PreciosContentProps {
    servicios: ServicioComercial[]
}

/**
 * Wrapper cliente para renderizar los ServiceBlocks.
 * La página padre (page.tsx) le inyecta los datos desde Supabase (o mock).
 */
export function PreciosContent({ servicios }: PreciosContentProps): React.JSX.Element {
    const serviciosVisibles = servicios
        .filter((s) => s.visible)
        .sort((a, b) => a.orden - b.orden)

    return (
        <div className="space-y-24 lg:space-y-32">
            {serviciosVisibles.map((servicio) => (
                <ServiceBlock key={servicio.slug} servicio={servicio} />
            ))}
        </div>
    )
}
