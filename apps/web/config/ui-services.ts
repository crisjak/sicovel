// Diccionario Visual de Servicios
// Esta configuración es ÚNICAMENTE estética para el UI (Vistas React).
// NO debe contener reglas comerciales, precios, ni features. Todo eso debe provenir de DB.

export const CONFIG_VISUAL_SERVICIOS: Record<string, { icono: string, es_destacado: boolean, orden: number, modalidad_ui: 'pago_unico' | 'por_plan' }> = {
    'landing': {
        icono: 'Rocket',
        es_destacado: false,
        orden: 1,
        modalidad_ui: 'pago_unico'
    },
    'sitio_informativo': {
        icono: 'Globe',
        es_destacado: true,
        orden: 2,
        modalidad_ui: 'por_plan'
    },
    'ecommerce': {
        icono: 'ShoppingCart',
        es_destacado: false,
        orden: 3,
        modalidad_ui: 'por_plan'
    }
}
