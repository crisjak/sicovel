// =============================================================================
// SICOVE - Database Types (Supabase / PostgreSQL) - V5 (MVP ADMIN)
// Generado manualmente en sincronía con init_schema.sql V5
// Tablas activas: categorias_servicio, planes, faqs, testimonios,
//                 configuraciones_sitio, consultas_contacto
// =============================================================================

export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            // ----------------------------------------------------------------
            categorias_servicio: {
                Row: {
                    id: string
                    slug: string
                    nombre: string
                    descripcion: string | null
                    orden: number
                    es_activo: boolean
                    imagen_url: string | null
                    creado_en: string
                    actualizado_en: string
                }
                Insert: {
                    id?: string
                    slug: string
                    nombre: string
                    descripcion?: string | null
                    orden?: number
                    es_activo?: boolean
                    imagen_url?: string | null
                    creado_en?: string
                    actualizado_en?: string
                }
                Update: {
                    id?: string
                    slug?: string
                    nombre?: string
                    descripcion?: string | null
                    orden?: number
                    es_activo?: boolean
                    imagen_url?: string | null
                    creado_en?: string
                    actualizado_en?: string
                }
                Relationships: []
            }
            // ----------------------------------------------------------------
            planes: {
                Row: {
                    id: string
                    categoria_id: string
                    nivel: 'unico' | 'basico' | 'pro' | 'premium'
                    nombre: string
                    descripcion_corta: string | null
                    precio_unico_clp: number
                    /** Precio de oferta en CLP (null = sin oferta) */
                    precio_oferta_clp: number | null
                    /** Etiqueta visible de la promo, ej: '20% OFF' */
                    promo_etiqueta: string | null
                    /** Si true, se muestra la oferta en el sitio */
                    promo_activa: boolean
                    /** Fecha ISO de inicio de la promo (null = siempre activa si promo_activa=true) */
                    promo_inicio: string | null
                    /** Fecha ISO de fin de la promo (null = sin expiración) */
                    promo_fin: string | null
                    caracteristicas: Json
                    exclusiones: Json
                    audiencia: Json
                    es_destacado: boolean
                    orden: number
                    es_activo: boolean
                    creado_en: string
                    actualizado_en: string
                }
                Insert: {
                    id?: string
                    categoria_id: string
                    nivel: 'unico' | 'basico' | 'pro' | 'premium'
                    nombre: string
                    descripcion_corta?: string | null
                    precio_unico_clp: number
                    precio_oferta_clp?: number | null
                    promo_etiqueta?: string | null
                    promo_activa?: boolean
                    promo_inicio?: string | null
                    promo_fin?: string | null
                    caracteristicas?: Json
                    exclusiones?: Json
                    audiencia?: Json
                    es_destacado?: boolean
                    orden?: number
                    es_activo?: boolean
                    creado_en?: string
                    actualizado_en?: string
                }
                Update: {
                    id?: string
                    categoria_id?: string
                    nivel?: 'unico' | 'basico' | 'pro' | 'premium'
                    nombre?: string
                    descripcion_corta?: string | null
                    precio_unico_clp?: number
                    precio_oferta_clp?: number | null
                    promo_etiqueta?: string | null
                    promo_activa?: boolean
                    promo_inicio?: string | null
                    promo_fin?: string | null
                    caracteristicas?: Json
                    exclusiones?: Json
                    audiencia?: Json
                    es_destacado?: boolean
                    orden?: number
                    es_activo?: boolean
                    creado_en?: string
                    actualizado_en?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'planes_categoria_id_fkey'
                        columns: ['categoria_id']
                        isOneToOne: false
                        referencedRelation: 'categorias_servicio'
                        referencedColumns: ['id']
                    }
                ]
            }
            // ----------------------------------------------------------------
            faqs: {
                Row: {
                    id: string
                    pregunta: string
                    respuesta: string
                    categoria: string
                    orden: number
                    es_activo: boolean
                    creado_en: string
                    actualizado_en: string
                }
                Insert: {
                    id?: string
                    pregunta: string
                    respuesta: string
                    categoria?: string
                    orden?: number
                    es_activo?: boolean
                    creado_en?: string
                    actualizado_en?: string
                }
                Update: {
                    id?: string
                    pregunta?: string
                    respuesta?: string
                    categoria?: string
                    orden?: number
                    es_activo?: boolean
                    creado_en?: string
                    actualizado_en?: string
                }
                Relationships: []
            }
            // ----------------------------------------------------------------
            testimonios: {
                Row: {
                    id: string
                    autor: string
                    empresa: string | null
                    cargo: string | null
                    comentario: string
                    avatar_url: string | null
                    calificacion: number
                    orden: number
                    es_activo: boolean
                    creado_en: string
                    actualizado_en: string
                }
                Insert: {
                    id?: string
                    autor: string
                    empresa?: string | null
                    cargo?: string | null
                    comentario: string
                    avatar_url?: string | null
                    calificacion?: number
                    orden?: number
                    es_activo?: boolean
                    creado_en?: string
                    actualizado_en?: string
                }
                Update: {
                    id?: string
                    autor?: string
                    empresa?: string | null
                    cargo?: string | null
                    comentario?: string
                    avatar_url?: string | null
                    calificacion?: number
                    orden?: number
                    es_activo?: boolean
                    creado_en?: string
                    actualizado_en?: string
                }
                Relationships: []
            }
            // ----------------------------------------------------------------
            configuraciones_sitio: {
                Row: {
                    id: string
                    clave: string
                    valor: Json
                    tipo_dato: string
                    descripcion: string | null
                    creado_en: string
                    actualizado_en: string
                }
                Insert: {
                    id?: string
                    clave: string
                    valor: Json
                    tipo_dato?: string
                    descripcion?: string | null
                    creado_en?: string
                    actualizado_en?: string
                }
                Update: {
                    id?: string
                    clave?: string
                    valor?: Json
                    tipo_dato?: string
                    descripcion?: string | null
                    creado_en?: string
                    actualizado_en?: string
                }
                Relationships: []
            }
            // ----------------------------------------------------------------
            consultas_contacto: {
                Row: {
                    id: string
                    nombre: string
                    email: string
                    telefono: string | null
                    nombre_negocio: string | null
                    rubro: string | null
                    tipo_documento: string | null
                    mensaje: string
                    origen: string

                    estado_lead: 'nuevo' | 'contactado' | 'en_negociacion' | 'cerrado_ganado' | 'cerrado_perdido'
                    notas_internas: string | null
                    es_leido: boolean
                    datos_extra: Json
                    creado_en: string
                    actualizado_en: string
                }
                Insert: {
                    id?: string
                    nombre: string
                    email: string
                    telefono?: string | null
                    nombre_negocio?: string | null
                    rubro?: string | null
                    tipo_documento?: string | null
                    mensaje: string
                    origen?: string
                    estado_lead?: 'nuevo' | 'contactado' | 'en_negociacion' | 'cerrado_ganado' | 'cerrado_perdido'
                    notas_internas?: string | null
                    es_leido?: boolean
                    datos_extra?: Json
                    creado_en?: string
                    actualizado_en?: string
                }
                Update: {
                    id?: string
                    nombre?: string
                    email?: string
                    telefono?: string | null
                    nombre_negocio?: string | null
                    rubro?: string | null
                    tipo_documento?: string | null
                    mensaje?: string
                    origen?: string

                    estado_lead?: 'nuevo' | 'contactado' | 'en_negociacion' | 'cerrado_ganado' | 'cerrado_perdido'
                    notas_internas?: string | null
                    es_leido?: boolean
                    datos_extra?: Json
                    creado_en?: string
                    actualizado_en?: string
                }
                Relationships: []
            }
            // ----------------------------------------------------------------
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}
