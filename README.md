# CRIS SICOVE

> Plataforma tecnológica chilena que democratiza soluciones web y móviles de alto rendimiento.

## 🏗️ Estructura del Monorepo

```
SICOVE/
├── apps/
│   ├── web/                 # Next.js 15 (App Router)
│   └── mobile/              # React Native (Expo)
├── packages/
│   └── shared/              # Código compartido
│       ├── types/           # Interfaces TypeScript
│       ├── utils/           # Funciones utilitarias
│       ├── validations/     # Esquemas de validación
│       ├── constants/       # Constantes globales
│       └── tokens/          # Design tokens
├── backend/
│   ├── node-api/            # APIs Node.js
│   └── django/              # Backend Django
├── infra/
│   ├── docker/              # Configuración Docker
│   └── aws/                 # Configuración AWS
└── docs/                    # Documentación
```

## 🚀 Quick Start

```bash
# Instalar dependencias
npm install

# Desarrollo Web
npm run dev:web

# Desarrollo Mobile
npm run dev:mobile

# Todos los servicios con Docker
docker-compose up
```

## 📦 Workspaces

| Workspace | Descripción |
|-----------|-------------|
| `@sicove/web` | Aplicación web Next.js 15 |
| `@sicove/mobile` | Aplicación móvil Expo |
| `@sicove/shared` | Código compartido |
| `@sicove/node-api` | API Node.js |

## 🛠️ Stack Tecnológico

- **Frontend Web:** Next.js 15, TypeScript
- **Mobile:** React Native, Expo, TypeScript
- **Backend:** Node.js, Django (Python)
- **Base de Datos:** Supabase (PostgreSQL)
- **Infraestructura:** Docker, AWS

## 📚 Documentación

Ver [docs/](./docs/) para documentación completa.

## 📄 Licencia

Propiedad de CRIS SICOVE © 2026
