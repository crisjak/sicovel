# 🚀 SICOVE — Traducción de Oferta a Sistema Técnico
## Documento de Arquitectura Pre-Backend (Versión 1.0)

---

# 🧠 1. OBJETIVO DEL DOCUMENTO

Este documento define cómo la oferta comercial de SICOVE (servicios, planes y precios) se transforma en una estructura técnica real dentro del sistema.

El objetivo es:

> Convertir servicios en una plataforma escalable basada en templates, configuración y lógica reutilizable.

---

# 🧩 2. MODELO CONCEPTUAL DEL SISTEMA

SICOVE no crea sitios web individuales desde cero.

SICOVE funciona como:

> **Generador de plataformas digitales basado en configuración.**

---

## 🔁 Modelo de instancia

Cada cliente es representado como:

```
Project
→ basado en Template
→ configurado por Plan
→ extendido con Add-ons
→ administrado desde Panel
```

---

# 🧱 3. ENTIDADES PRINCIPALES

El sistema se basa en las siguientes entidades:

- Templates
- Projects
- Pages
- Sections
- Content
- Plans
- Feature Flags
- Add-ons

---

# 🔗 4. RELACIÓN ENTRE ENTIDADES

## Template
Define la estructura base reutilizable.

## Plan
Define límites y funcionalidades disponibles.

## Project
Instancia real de cliente.

---

## Ejemplo conceptual

### Template
```json
{
  "id": "landing-base-v1",
  "type": "landing",
  "sections": ["hero", "benefits", "contact"]
}
```

### Plan
```json
{
  "name": "landing-pro",
  "maxSections": 5,
  "features": ["analytics", "animations"]
}
```

### Project
```json
{
  "clientId": "123",
  "templateId": "landing-base-v1",
  "plan": "pro",
  "featuresEnabled": ["analytics"]
}
```

---

# 🧠 5. REGLA FUNDAMENTAL

> Template = estructura  
> Plan = restricciones  
> Project = instancia real

---

# 🌐 6. IMPLEMENTACIÓN POR SERVICIO

---

## 6.1 LANDING PAGES

### Template Base

- hero
- beneficios
- testimonios
- contacto

---

### Planes

#### BASIC
- máximo 3 secciones
- formulario contacto
- integración WhatsApp

#### PRO
- máximo 5 secciones
- analytics
- animaciones
- testimonios

#### PREMIUM
- máximo 8 secciones
- integraciones básicas
- A/B testing

---

## 6.2 SITIOS WEB INFORMATIVOS

### Template Base

- home
- about
- services
- contact
- blog

---

### Planes

#### BASIC
- máximo 5 páginas
- CMS básico

#### PRO
- máximo 15 páginas
- portafolio
- analytics

#### PREMIUM
- máximo 25 páginas
- multi idioma
- formularios avanzados

---

## 6.3 E-COMMERCE

### Template Base

- home
- catálogo
- producto
- carrito
- checkout

---

### Planes

#### BASIC
- hasta 100 productos
- pagos
- pedidos

#### PRO
- hasta 500 productos
- cupones
- clientes
- analytics

#### PREMIUM
- productos ilimitados
- integraciones básicas
- métricas avanzadas

---

# 🧩 7. FEATURE FLAGS (CLAVE DE ESCALABILIDAD)

El sistema utiliza Feature Flags para habilitar funcionalidades.

---

## Ejemplo

```
featuresEnabled = [
  "analytics",
  "coupons",
  "multi_language"
]
```

---

## Ventajas

- evita duplicar código
- permite escalar fácilmente
- permite vender add-ons

---

# ➕ 8. ADD-ONS COMO EXTENSIÓN DEL SISTEMA

Los add-ons activan nuevas capacidades.

---

## Ejemplo

```json
{
  "name": "chatbot",
  "price": 50000,
  "enables": ["chatbot_module"]
}
```

---

# 🖥️ 9. PANEL ADMINISTRATIVO

---

## Panel Cliente

Permite:

- editar contenido
- subir imágenes
- gestionar productos
- ver pedidos
- revisar métricas

---

## Panel SICOVE

Permite:

- crear proyectos
- asignar planes
- activar add-ons
- gestionar templates
- administrar clientes

---

# 🔁 10. FLUJO DEL SISTEMA

---

## Creación de proyecto

1. Cliente selecciona servicio
2. Se asigna plan
3. Se selecciona template
4. Sistema crea Project
5. Se clona estructura
6. Se habilitan features
7. Cliente edita contenido

---

# 🧨 11. PRINCIPIO CRÍTICO

> Nunca hardcodear lógica de planes en frontend

Todo debe provenir de:

- base de datos
- configuración dinámica

---

# 🧠 12. VISIÓN FINAL

SICOVE se convierte en:

> Plataforma modular basada en configuración y reutilización

---

# 🚀 13. SIGUIENTE PASO

Diseñar la base de datos en Supabase:

- tablas
- relaciones
- permisos
- estructura multi-tenant

---

# 🎯 CONCLUSIÓN

Este documento establece la base para:

- backend escalable
- panel administrativo
- sistema de templates
- monetización con add-ons

---

> SICOVE deja de ser un servicio manual y se transforma en un sistema automatizado de generación de plataformas digitales.

