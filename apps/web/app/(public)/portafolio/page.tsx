import { redirect } from 'next/navigation'

/**
 * La sección de Portafolio está temporalmente deshabilitada.
 * Redirige al home de forma limpia sin dejar ruta pública accesible.
 */
export default function PortafolioPage(): React.JSX.Element {
    redirect('/')
}
