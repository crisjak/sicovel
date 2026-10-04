# SICOVE — Plan de Integración con Supabase
**Fecha:** 12 de Abril, 2026  
**Arquitectura Base:** Next.js 14 (App Router) → Supabase PostgreSQL + Storage  
**Regla Maestra:** Next.js ES el server layer. No existe backend separado.

---

## 1. Arquitectura de Integración Propuesta

```
┌─────────────────────────────────────────────────────────────────┐
│                        NAVEGADOR                                │
│  React Components (Client)                                      │
│  Solo reciben props tipados. NUNCA llaman a Supabase directo.   │
├─────────────────────────────────────────────────────────────────┤
│                   NEXT.JS 14 (App Router)                       │
│                                                                 │
│  ┌── Server Components ──┐   ┌── Route Handlers ──┐            │
│  │ /servicios/page.tsx    │   │ /api/content  (R/W) │            │
│  │ /precios/page.tsx      │   │ /api/leads    (W)   │            │
│  │ /portafolio/page.tsx   │   └────────┬───────────┘            │
│  └────────┬──────────────┘            │                         │
│           │                           │                         │
│  ┌────────▼───────────────────────────▼────────────┐            │
│  │          lib/queries/ (Capa de Acceso a Datos)   │            │
│  │  ┌──────────────┐ ┌────────────┐ ┌───────────┐  │            │
│  │  │ servicios.ts │ │ planes.ts  │ │ contenido │  │            │
│  │  │              │ │            │ │ .ts       │  │            │
│  │  └──────┬───────┘ └──────┬─────┘ └─────┬─────┘  │            │
│  │         │                │             │         │            │
│  │  ┌──────▼────────────────▼─────────────▼──────┐  │            │
│  │  │           lib/supabase/client.ts            │  │            │
│  │  │   createServerClient() ← @supabase/ssr     │  │            │
│  │  └──────────────────┬─────────────────────────┘  │            │
│  └─────────────────────┼────────────────────────────┘            │
│                        │                                         │
├────────────────────────┼─────────────────────────────────────────┤
│                        ▼                                         │
│              SUPABASE (sicove-core)                               │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐             │
│  │  PostgreSQL   │ │   Storage    │ │   Auth       │             │
│  │  12 tablas    │ │   Buckets    │ │  (futuro)    │             │
│  └──────────────┘ └──────────────┘ └──────────────┘             │
└──────────────────────────────────────────────────────────────────┘
```

### Principios inamovibles:
1. **Los componentes UI (`PricingCard`, `ServiceBlock`, `Hero`) NUNCA importan Supabase.** Reciben datos via props.
2. **Solo `lib/queries/*.ts` tocan Supabase.** Son la única puerta de entrada a la DB.
3. **Las páginas (Server Components) llaman a `lib/queries/` y pasan props a los componentes.**
4. **Los Route Handlers (`/api/*`) solo existen para operaciones de escritura** (leads, admin edits) donde el navegador envía un POST/PUT.
5. **No se usa `createBrowserClient` en fase 1.** Todo es server-side. El navegador nunca habla con Supabase directamente.

---

## 2. Estructura Exacta de Carpetas

```
apps/web/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                        # Consume getContenidoHero(), getServiciosCarousel()
│   ├── servicios/page.tsx              # Consume getServiciosComerciales()
│   ├── precios/page.tsx                # Consume getServiciosConPlanes()
│   ├── portafolio/page.tsx             # Consume getProyectosPortafolio()
│   ├── contacto/page.tsx               # Formulario → POST /api/leads
│   ├── nosotros/page.tsx               # Consume getContenidoAbout()
│   ├── admin/                          # Futuro: proteger con middleware auth
│   └── api/
│       ├── content/route.ts            # GET/PUT contenido editorial
│       └── leads/route.ts              # POST nuevo lead de contacto
│
├── components/
│   ├── layout/                         # Navbar, Footer, ThemeToggle
│   ├── sections/                       # Hero, ServiceCarousel, PreciosContent
│   └── ui/                             # SectionTitle, PricingCard, ServiceBlock
│
├── data/                               # ← MOCKS (se mantienen como fallback)
│   ├── site-content.json               # Mock editorial
│   └── services-data.ts                # Mock comercial
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts                   # createServerClient() — ÚNICO punto de creación
│   │   └── types-db.ts                 # Tipos generados por Supabase CLI (supabase gen types)
│   │
│   ├── queries/                        # ← CAPA DE ACCESO A DATOS (la estrella)
│   │   ├── servicios.ts                # getServiciosComerciales() → ServicioComercial[]
│   │   ├── planes.ts                   # getPlanesPorServicio(slug) → PlanComercial[]
│   │   ├── contenido.ts               # getContenidoHero(), getContenidoAbout(), etc.
│   │   ├── portafolio.ts              # getProyectosPortafolio() → PortfolioProject[]
│   │   └── leads.ts                    # crearConsulta(data) → void
│   │
│   ├── mappers/                        # ← ADAPTADORES DB → UI
│   │   ├── servicio.mapper.ts          # Fila DB → ServicioComercial
│   │   └── plan.mapper.ts             # Fila DB → PlanComercial
│   │
│   ├── data.ts                         # getData() existente (mantener temporalmente)
│   └── mock-data.ts                    # Re-export existente (mantener temporalmente)
│
├── types/
│   ├── content.ts                      # Tipos UI para contenido editorial
│   ├── services.ts                     # Tipos UI para oferta comercial
│   └── database.ts                     # Tipos crudos de las tablas (alternativa a gen types)
│
└── public/images/
```

### ¿Por qué esta estructura?

| Carpeta | Responsabilidad | Quién la usa |
|---|---|---|
| `lib/supabase/` | Crear y configurar el cliente. Nada más | `lib/queries/*` |
| `lib/queries/` | Ejecutar consultas SQL y devolver datos tipados a la UI | Pages (Server Components) |
| `lib/mappers/` | Transformar filas crudas de DB en los tipos que la UI espera | `lib/queries/*` internamente |
| `data/` | Fallback cuando Supabase no responde o durante desarrollo local | `lib/queries/*` como catch |
| `types/` | Contratos de datos de UI (nunca exponen estructura interna de DB) | Componentes y queries |

---

## 3. Estrategia de Migración Progresiva

### Orden de conexión (de menor riesgo a mayor):

```
FASE 1: Solo lectura, datos públicos, sin auth
─────────────────────────────────────────────
  1. Servicios comerciales (categorias_servicio)
  2. Planes (planes)
  3. Catálogo complementos (catalogo_complementos)

FASE 2: Contenido editorial migrado a Supabase
─────────────────────────────────────────────
  4. Hero, About, Contact info
  5. Navbar links, Footer
  6. Portfolio

FASE 3: Escritura (formularios)
─────────────────────────────────────────────
  7. Formulario de contacto → consultas_contacto
  8. Admin panel → migrar de fs/JSON a Supabase

FASE 4: Auth + Protección
─────────────────────────────────────────────
  9. Supabase Auth para admin
  10. Middleware de protección en /admin/*
  11. RLS policies en Supabase
```

### ¿Por qué este orden?
- **Fase 1 primero** porque es read-only, público, y si falla solo se cae a mock. Cero riesgo de corrupción de datos.
- **Fase 2 después** porque el contenido editorial es el que hoy vive en `fs.readFileSync()`, que es frágil en Vercel.
- **Fase 3 después** porque las escrituras requieren validación y manejo de errores más robusto.
- **Fase 4 al final** porque el auth agrega complejidad transversal (middleware, cookies, sesiones).

---

## 4. Contrato de Datos (El puente DB ↔ UI)

### Problema actual:
La DB tiene columnas como `precio_mensual_clp`, `es_activo`, `categoria_id`. La UI espera objetos como `ServicioComercial` con `planes[]` anidados y `formatPrecioCLP()`. No son lo mismo.

### Solución: 3 capas de tipos

```
CAPA 1: Tipos de DB (lo que devuelve Supabase)
──────────────────────────────────────────────
  types/database.ts o lib/supabase/types-db.ts

  interface PlanRow {
      id: string
      categoria_id: string
      nivel: string
      nombre: string
      precio_mensual_clp: number | null
      precio_anual_clp: number | null
      precio_unico_clp: number | null
      limites: Record<string, unknown>
      es_activo: boolean
      creado_en: string
      actualizado_en: string
  }

CAPA 2: Tipos de UI (lo que usan los componentes)
──────────────────────────────────────────────
  types/services.ts (YA EXISTE)

  interface PlanComercial {
      id: string
      nivel: 'basico' | 'pro' | 'premium'
      nombre: string
      precio_clp: number
      features: string[]
      exclusiones: string[]
      audiencia: string[]
      es_recomendado: boolean
      ...
  }

CAPA 3: Mapper (la traducción)
──────────────────────────────────────────────
  lib/mappers/plan.mapper.ts

  function mapPlanRowToUI(row: PlanRow, features: string[], exclusiones: string[]): PlanComercial {
      return {
          id: row.id,
          nivel: row.nivel as PlanComercial['nivel'],
          nombre: row.nombre,
          precio_clp: row.precio_unico_clp ?? row.precio_mensual_clp ?? 0,
          features,
          exclusiones,
          es_recomendado: row.nivel === 'pro',
          ...
      }
  }
```

### Fallback a mocks (durante migración):

```typescript
// lib/queries/servicios.ts
import { createClient } from '@/lib/supabase/client'
import { SERVICIOS_COMERCIALES } from '@/data/services-data'
import { mapServicioRows } from '@/lib/mappers/servicio.mapper'

export async function getServiciosComerciales(): Promise<ServicioComercial[]> {
    try {
        const supabase = createClient()
        const { data, error } = await supabase
            .from('categorias_servicio')
            .select('*, planes(*)')
            .order('nombre')

        if (error || !data) throw error
        return mapServicioRows(data)
    } catch {
        // Fallback silencioso a mock durante migración
        console.warn('[SICOVE] Supabase no disponible, usando mock data')
        return SERVICIOS_COMERCIALES.filter(s => s.visible)
    }
}
```

**Los componentes no saben ni les importa** si los datos vienen de Supabase o del mock. Reciben `ServicioComercial[]` y renderizan.

---

## 5. Seguridad y Límites

### Qué se lee desde Server Components (seguro):
- Todo el contenido público: servicios, planes, portfolio, hero, about
- Se usa la `anon key` de Supabase (clave pública, diseñada para ser expuesta)
- Pero se ejecuta en el servidor, nunca en el navegador

### Qué NO debe exponerse al cliente:
- `service_role key` de Supabase — NUNCA. Solo en variables de entorno servidor
- Datos de `consultas_contacto` (leads con emails/teléfonos) — solo vía admin protegido
- Datos de `clientes` — solo vía admin protegido
- Operaciones de escritura directas a DB — siempre vía Route Handlers con validación

### Cuándo usar anon key:
- Lecturas públicas desde Server Components (servicios, planes, portfolio)
- Es la key que va en `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Cuándo usar lógica exclusivamente server-side:
- Cualquier escritura (crear lead, actualizar contenido admin)
- Lecturas de datos privados (leads, clientes)
- Estas operaciones usan `SUPABASE_SERVICE_ROLE_KEY` (sin `NEXT_PUBLIC_`)

### Qué NO hacer todavía:
- ❌ No crear `createBrowserClient()` — no hay caso de uso real hoy
- ❌ No implementar RLS — sin auth no tiene sentido, las policies no filtran nada
- ❌ No crear middleware de auth — primero conectar datos, después proteger
- ❌ No hacer real-time subscriptions — no hay caso de uso

---

## 6. Problemas Actuales que Debes Corregir Antes de Conectar

### 🔴 P1: Dos fuentes de servicios en conflicto
**Problema:** `site-content.json` tiene un array `services` con estructura `ServiceData` (id, title, features como strings simples). Simultáneamente, `services-data.ts` tiene `SERVICIOS_COMERCIALES` con estructura `ServicioComercial` (slug, planes[], features, exclusiones, audiencia).

El **carrusel del Hero** (`ServiceCarousel`) lee del JSON. Las páginas de **servicios y precios** leen del TypeScript. Cuando conectes Supabase, tendrás que decidir cuál gana.

**Solución:** Migrar el carrusel del Hero para que también consuma de `SERVICIOS_COMERCIALES` (o de la futura query `getServiciosComerciales()`). Eliminar el array `services` del JSON.

### 🟡 P2: El panel admin escribe a un JSON del filesystem
**Problema:** `PUT /api/content` usa `fs.writeFileSync()`. En Vercel, el filesystem es efímero. Cualquier cambio via admin se pierde tras un redeploy o cold start.

**Solución en Fase 2:** Migrar `/api/content` para que escriba a una tabla `contenido_sitio` en Supabase en vez del JSON local.

### 🟡 P3: No hay .env con las keys de Supabase
**Problema:** El proyecto tiene `.env.example` pero no hay variables de Supabase configuradas.

**Solución inmediata:** Agregar al `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
```

### 🟠 P4: features/exclusiones del plan están como arrays simples en el mock pero NO existen en la DB
**Problema:** En `services-data.ts`, cada `PlanComercial` tiene `features: string[]` y `exclusiones: string[]`. En la DB (`init_schema.sql`), los planes tienen `limites: JSONB` pero NO hay columnas para features/exclusiones textuales.

**Solución:** Agregar estas listas al campo `limites` JSONB del plan en la DB, o crear una tabla `features_plan`. La opción JSONB es más simple para esta fase:
```json
{
    "max_paginas": 5,
    "features": ["Diseño responsive", "SEO básico", ...],
    "exclusiones": ["E-commerce", "Blog", ...]
}
```

---

## 7. Plan de Implementación por Fases

### Fase 0: Preparación (antes de tocar Supabase)
- [ ] Agregar variables `.env.local` con URL y keys de Supabase
- [ ] Instalar `@supabase/ssr` (paquete oficial para Next.js App Router)
- [ ] Crear `lib/supabase/client.ts` con `createServerClient()`
- [ ] Unificar las dos fuentes de servicios (eliminar array `services` del JSON, migrar carrusel Hero)
- [ ] Verificar que la DB tiene datos seed ejecutados (`init_schema.sql` V3)

### Fase 1: Lectura de datos comerciales (1-2 días)
- [ ] Crear `lib/queries/servicios.ts` con `getServiciosComerciales()`
- [ ] Crear `lib/queries/planes.ts` con `getPlanesPorServicio()`
- [ ] Crear `lib/mappers/servicio.mapper.ts`
- [ ] Crear `lib/mappers/plan.mapper.ts`
- [ ] Actualizar `/servicios/page.tsx` para llamar a `getServiciosComerciales()` en vez de importar constante
- [ ] Actualizar `/precios/page.tsx` (vía `PreciosContent`) para consumir de queries
- [ ] Mantener fallback a mock si Supabase falla
- [ ] Verificar que la UI se ve idéntica

### Fase 2: Contenido editorial (2-3 días)
- [ ] Crear tabla `contenido_sitio` en Supabase (clave: string, valor: JSONB)
- [ ] Migrar contenido de `site-content.json` a esa tabla como rows (hero, navbar, footer, about, contact)
- [ ] Crear `lib/queries/contenido.ts` con `getContenido(clave)`
- [ ] Actualizar `lib/data.ts` para leer de Supabase en vez de `fs`
- [ ] Actualizar `/api/content/route.ts` para escribir a Supabase
- [ ] Verificar que admin sigue funcionando

### Fase 3: Formulario de contacto (1 día)
- [ ] Crear `lib/queries/leads.ts` con `crearConsulta()`
- [ ] Crear `/api/leads/route.ts` con POST
- [ ] Conectar formulario de `/contacto` al nuevo endpoint
- [ ] Verificar que los leads llegan a tabla `consultas_contacto`

### Fase 4: Auth + Admin protegido (3-5 días)
- [ ] Configurar Supabase Auth (email/password para admin)
- [ ] Instalar `@supabase/ssr` middleware helpers
- [ ] Crear `middleware.ts` en raíz de `app/` para proteger `/admin/*`
- [ ] Crear página de login `/admin/login`
- [ ] Agregar RLS básico a tablas sensibles
- [ ] Verificar que público no accede a `/admin`

---

## 8. Resumen Ejecutivo Final

### Arquitectura:
```
UI Components ← props ← Server Components ← lib/queries/ ← lib/supabase/client ← Supabase
```
Una línea recta. Sin ramificaciones. Sin backends extras.

### Flujo de datos:
```
[Página Server Component]
    → llama getServiciosComerciales()
        → lib/queries/servicios.ts
            → try: supabase.from('categorias_servicio').select('*, planes(*)')
            → catch: return SERVICIOS_COMERCIALES (mock fallback)
        → mapServicioRows(data) → ServicioComercial[]
    → pasa props a <ServiceBlock servicio={s} />
        → componente renderiza. No sabe de dónde vienen los datos.
```

### Riesgos si no se ejecuta esto:
1. El admin va a perder datos cada vez que Vercel haga un redeploy (fs es efímero)
2. Las dos fuentes de servicios van a divergir y generar bugs visuales
3. Agregar más contenido sin DB va a crear más JSONs sueltos inmanejables
4. Sin auth, el admin es una puerta abierta en producción

### Siguientes pasos concretos (los primeros 3):
1. **Ahora:** Agregar `.env.local` con las keys de Supabase
2. **Ahora:** Instalar `@supabase/ssr` con `npm install @supabase/ssr`
3. **Ahora:** Crear `lib/supabase/client.ts` (10 líneas de código)

Después de eso, la Fase 1 se ejecuta query por query, verificando que la UI no cambie.
