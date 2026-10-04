# Arquitectura Real de SICOVE — Estado Vigente

## 1. Composición actual por capas (lo que existe HOY)

```
┌──────────────────────────────────────────────────────────────┐
│                        NAVEGADOR                             │
│  React 18 + Framer Motion + Tailwind CSS 4                   │
│  Componentes Client ("use client") + Server Components       │
├──────────────────────────────────────────────────────────────┤
│                   NEXT.JS 14 (App Router)                    │
│  ┌─────────────────┐  ┌──────────────────┐                   │
│  │ Server Comps     │  │ Route Handlers   │                   │
│  │ (pages, layouts) │  │ /api/content     │                   │
│  └────────┬────────┘  └────────┬─────────┘                   │
│           │                    │                              │
│  ┌────────▼────────────────────▼─────────┐                   │
│  │          CAPA DE DATOS (lib/)          │                   │
│  │  ┌──────────────┐ ┌────────────────┐  │                   │
│  │  │  data.ts      │ │ services-data  │  │                   │
│  │  │  (fs → JSON)  │ │ (.ts mock)     │  │                   │
│  │  └──────┬───────┘ └───────┬────────┘  │                   │
│  │         │                 │            │                   │
│  │    site-content.json   SERVICIOS_     │                   │
│  │    (disco local)       COMERCIALES    │                   │
│  └───────────────────────────────────────┘                   │
├──────────────────────────────────────────────────────────────┤
│              SUPABASE (sicove-core)                           │
│  ┌──────────────┐ ┌──────────────┐                           │
│  │  PostgreSQL   │ │   Storage    │   ← EXISTE pero NO       │
│  │  (12 tablas)  │ │  (buckets)   │     está conectado       │
│  └──────────────┘ └──────────────┘                           │
├──────────────────────────────────────────────────────────────┤
│              CÓDIGO MUERTO / PAUSADO                         │
│  backend/node-api/  ← solo package.json vacío               │
│  backend/django/    ← solo requirements.txt vacío            │
│  docker-compose.yml ← referencia 5 servicios que no inician  │
└──────────────────────────────────────────────────────────────┘
```

---

## 2. Roles reales de Next.js

### Como Frontend
- Renderiza las páginas públicas: `/`, `/servicios`, `/precios`, `/contacto`, `/nosotros`, `/portafolio`
- Renderiza el panel admin: `/admin/*` (7 sub-páginas)
- Usa Server Components para SEO (`metadata` exportado) y carga inicial rápida
- Usa Client Components para interactividad (carrusel 3D, menú hamburguesa, theme toggle, formularios admin)

### Como Server Layer (lo que hace hoy de "backend")
- **Route Handler** `app/api/content/route.ts`: Un GET/PUT que lee y escribe directamente `site-content.json` del disco duro usando `fs.readFileSync` / `fs.writeFileSync`
- **Función server** `lib/data.ts`: `getData()` lee el JSON sincrónicamente. Es invocada tanto por Server Components como por el Route Handler
- **NO** hay Server Actions (`"use server"`) implementadas todavía
- **NO** hay conexión a Supabase. Cero imports de `@supabase/supabase-js`
- **NO** hay autenticación. El panel `/admin` es accesible sin login

---

## 3. Relación actual Frontend → Server Layer → Supabase

```
HOY:
  UI Component → getData() → fs.readFileSync("site-content.json") → devuelve objeto
  UI Component → import { SERVICIOS_COMERCIALES } → constante TypeScript en memoria

FUTURO (objetivo):
  UI Component → getServicios() → supabase.from("categorias_servicio")... → devuelve objeto
  UI Component → getPlanes()    → supabase.from("planes")...              → devuelve objeto
```

**La conexión Supabase NO existe hoy.** El frontend vive 100% de:
1. `data/site-content.json` — contenido editorial (hero, navbar, footer, about, contact, portfolio)
2. `data/services-data.ts` — oferta comercial (servicios y planes con precios CLP)

---

## 4. Qué NO existe realmente hoy

| Elemento | Estado | Realidad |
|---|---|---|
| Backend Node.js | ❌ Muerto | Solo `package.json` + `tsconfig.json` vacíos. Cero código |
| Backend Django | ❌ Muerto | Solo `requirements.txt` + `README.md`. Cero código |
| Docker Compose | ❌ No funcional | Define 5 servicios (web, node-api, django, postgres, redis) pero ninguno tiene Dockerfile real |
| Supabase conectado | ❌ No conectado | El schema SQL existe en `backend/supabase/init_schema.sql` pero no hay cliente Supabase en el frontend |
| Autenticación | ❌ No existe | `/admin` es público, sin protección |
| Server Actions | ❌ No implementadas | No hay archivos con `"use server"` |
| RLS / Policies | ❌ No diseñadas | Declarado como "futuro" en el schema |

---

## 5. Flujo de datos correcto (cómo debería ser)

### Fase actual (Mock):
```
[Server Component]
      │
      ▼
  lib/data.ts  ───── getData() ────→ site-content.json
  data/services-data.ts ───────────→ SERVICIOS_COMERCIALES (constante TS)
      │
      ▼
  [Componente recibe props] → [Render]
```

### Fase siguiente (Supabase):
```
[Server Component]
      │
      ▼
  lib/supabase.ts ── createServerClient()
      │
      ▼
  lib/queries/servicios.ts ── getServicios() → supabase.from("categorias_servicio").select()
  lib/queries/planes.ts ───── getPlanes()    → supabase.from("planes").select()
  lib/queries/contenido.ts ── getContenido() → supabase.from("contenido_sitio").select()
      │
      ▼
  [Componente recibe props] → [Render]  ← Los componentes NO cambian
```

**La clave:** Los componentes (`PricingCard`, `ServiceBlock`, `Hero`, etc.) ya reciben datos via props. La migración a Supabase solo cambia **dónde se obtienen** los datos, no **cómo se renderizan**.

---

## 6. Estructura de carpetas recomendada

```
apps/web/
├── app/                          # Rutas Next.js (App Router)
│   ├── layout.tsx                # Layout raíz (metadata, fonts, tema)
│   ├── page.tsx                  # Homepage
│   ├── servicios/page.tsx
│   ├── precios/page.tsx
│   ├── contacto/page.tsx
│   ├── nosotros/page.tsx
│   ├── portafolio/page.tsx
│   ├── admin/                    # Panel admin (futuro: proteger con auth)
│   └── api/content/route.ts      # Route handler para JSON editorial
│
├── components/
│   ├── layout/                   # Navbar, Footer, ThemeToggle, ConditionalLayout
│   ├── sections/                 # Hero, ServiceCarousel, PreciosContent
│   └── ui/                       # SectionTitle, PricingCard, ServiceBlock
│
├── data/                         # ← FUENTES DE DATOS MOCK (reemplazables)
│   ├── site-content.json         # Contenido editorial editable
│   └── services-data.ts          # Oferta comercial (servicios + planes)
│
├── lib/                          # ← CAPA DE ACCESO A DATOS
│   ├── data.ts                   # getData/saveData (fs → JSON) HOY
│   ├── mock-data.ts              # Re-export de compatibilidad
│   ├── supabase.ts               # FUTURO: cliente Supabase server-side
│   └── queries/                  # FUTURO: funciones de consulta por entidad
│       ├── servicios.ts
│       ├── planes.ts
│       └── contenido.ts
│
├── types/
│   ├── content.ts                # Tipos para contenido editorial
│   └── services.ts               # Tipos para oferta comercial
│
└── public/images/                # Assets estáticos
```

---

## 7. Riesgos actuales

### 🔴 CRÍTICO: Dos fuentes de verdad paralelas
Hoy existen **dos sistemas de datos desconectados** que alimentan la UI:
- `site-content.json` para todo lo editorial (hero, navbar, footer, about, contact, portfolio, y un array `services` viejo)
- `services-data.ts` para los servicios y planes comerciales

El array `services` en el JSON **coexiste** con `SERVICIOS_COMERCIALES` en el TypeScript. Ambos definen servicios pero con estructuras distintas. El carrusel del Hero consume el del JSON; la página de precios consume el de TypeScript. Esto **va a generar inconsistencias** si alguien edita uno sin actualizar el otro.

### 🟡 ALTO: Panel admin sin protección
`/admin` es accesible públicamente. Cualquier persona puede navegar a `/admin/hero` y modificar el JSON del sitio via la API `PUT /api/content`. Esto es un riesgo serio en producción.

### 🟡 ALTO: Lectura sincrónica del filesystem
`getData()` usa `fs.readFileSync()` de Node.js. En Vercel (serverless), esto funciona pero es frágil: el archivo no persiste entre invocaciones del servidor. Cualquier cambio via admin se perderá después de un redeploy.

### 🟠 MEDIO: Código muerto genera confusión
Las carpetas `backend/node-api`, `backend/django` y el `docker-compose.yml` sugieren una arquitectura multi-servicio que **no existe**. Cualquier desarrollador nuevo que entre al proyecto asumirá que hay 3 backends cuando solo hay uno (Next.js).

---

## 8. Decisiones técnicas para conectar Supabase sin romper nada

1. **NO tocar los componentes UI.** `PricingCard`, `ServiceBlock`, `Hero`, etc. ya reciben props tipados. Solo hay que cambiar de dónde salen los datos
2. **Crear `lib/supabase.ts`** con `createServerComponentClient` de `@supabase/ssr` — nunca exponer el service_role key al client
3. **Crear funciones de query por entidad** en `lib/queries/` que devuelvan exactamente los mismos tipos (`ServicioComercial[]`, `PlanComercial[]`)
4. **Migrar el contenido editorial** de `site-content.json` a una tabla en Supabase (ej: `contenido_sitio` tipo key/value JSONB)
5. **La API route `/api/content`** debe migrar de `fs` a Supabase, manteniendo la misma interfaz GET/PUT
6. **Mantener los mocks como fallback** durante la migración (try Supabase → catch → fallback to mock)

---

## 9. Qué NO haría todavía

- ❌ **No instalar `@supabase/supabase-js` hasta que el frontend esté 100% estable** (todavía estás refinando UI)
- ❌ **No implementar RLS** hasta tener autenticación real
- ❌ **No crear Server Actions** hasta que haya formularios que escriban a Supabase
- ❌ **No implementar multi-tenencia** (es para cuando SICOVE tenga clientes reales de proyectos)
- ❌ **No construir middleware de auth** hasta que el admin se conecte a Supabase Auth
- ❌ **No levantar Docker** — Vercel + Supabase hosted es la ruta correcta
- ❌ **No tocar backend/node-api ni backend/django** — están muertos y deberían marcarse como tal o eliminarse

---

## 10. Contradicciones detectadas

| Aspecto | Arquitectura antigua | Arquitectura vigente | Veredicto |
|---|---|---|---|
| Backend | Docker con Node-API + Django + PostgreSQL local + Redis | Next.js como server layer + Supabase cloud | **Vigente gana.** Docker/Django/Redis son fantasmas |
| Datos | `site-content.json` único via `fs` | JSON editorial + TypeScript mock comercial, preparados para Supabase | **Vigente gana.** Pero hay fragmentación que corregir |
| Array `services` | Vive en `site-content.json` con estructura `ServiceData` vieja | Vive en `services-data.ts` con estructura `ServicioComercial` nueva | **⚠️ Conflicto activo.** El carrusel del Hero lee del JSON; los precios del TS. Unificar |
| Pricing | Toggle mensual/único con `PricingData` | Organizado por servicio con `PlanComercial` | **Vigente gana.** El toggle antiguo fue eliminado correctamente |
