# Arquitectura SICOVE

Ver documento de arquitectura completo en el repositorio de definición.

## Diagrama General

```
┌─────────────┐     ┌─────────────┐
│   Web App   │     │ Mobile App  │
│  (Next.js)  │     │   (Expo)    │
└──────┬──────┘     └──────┬──────┘
       │                   │
       └─────────┬─────────┘
                 │
       ┌─────────▼─────────┐
       │   Shared Package  │
       └─────────┬─────────┘
                 │
    ┌────────────┼────────────┐
    │            │            │
┌───▼───┐   ┌────▼───┐   ┌────▼────┐
│Node.js│   │ Django │   │Supabase │
│  API  │   │Backend │   │   DB    │
└───────┘   └────────┘   └─────────┘
```
