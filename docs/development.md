# Guía de Desarrollo

## Requisitos

- Node.js >= 20.0.0
- npm >= 10.0.0
- Python >= 3.11 (para Django)
- Docker y Docker Compose

## Setup Inicial

```bash
# Clonar repositorio
git clone <repo-url>
cd SICOVE

# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env.local
```

## Desarrollo

### Web (Next.js)
```bash
npm run dev:web
```

### Mobile (Expo)
```bash
npm run dev:mobile
```

### Con Docker
```bash
docker-compose up
```

## Convenciones

- TypeScript estricto
- ESLint + Prettier
- Commits convencionales
