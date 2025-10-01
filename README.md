# 🔍 Buscador Pokémon

> Aplicación web moderna para buscar Pokémon usando la PokeAPI oficial

[![Laravel](https://img.shields.io/badge/Laravel-11-red.svg)](https://laravel.com)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com)

## ✨ Características

- 🔍 **Búsqueda inteligente** por nombre parcial o ID
- 📱 **Diseño responsive** optimizado para móviles y desktop
- ⚡ **Paginación optimizada** con carga rápida de resultados
- 🎨 **Interfaz moderna** con Tailwind CSS
- 🧪 **Testing completo** con Pest (Feature & Unit tests)
- 🏗️ **Arquitectura MVC** bien estructurada
- 🐳 **Docker** para instalación sin complicaciones

## 🚀 Instalación Rápida (Docker)

### Requisitos
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/betancourtneidys/buscador-pokemon.git
cd buscador-pokemon

# 2. Configurar variables de entorno
cp .env.example .env

# 3. Construir y ejecutar
docker-compose up --build

# 4. Generar clave de aplicación
docker-compose exec app php artisan key:generate
```

**¡Listo!** 🎉 Accede a http://localhost:8000

## 💻 Instalación Local

### Requisitos
- PHP 8.2+
- Composer
- Node.js 18+
- npm/yarn

```bash
# Instalar dependencias
composer install
npm install

# Configurar entorno
cp .env.example .env
php artisan key:generate

# Compilar assets
npm run build

# Ejecutar servidor
php artisan serve
```

## 🧪 Testing

```bash
# Con Docker
docker-compose exec app php artisan test

# Local
php artisan test
```

**Cobertura de tests:**
- ✅ Tests de API endpoints
- ✅ Tests de servicios
- ✅ Tests de validación
- ✅ Tests de paginación

## 🏗️ Arquitectura

```
├── app/
│   ├── Http/Controllers/     # Controladores HTTP
│   ├── Http/Requests/        # Validación de requests
│   ├── Models/              # Modelos de datos
│   └── Services/            # Lógica de negocio
├── resources/js/
│   ├── components/          # Componentes React
│   ├── hooks/              # Custom hooks
│   ├── pages/              # Páginas principales
│   └── types/              # Tipos TypeScript
└── tests/
    ├── Feature/            # Tests de integración
    └── Unit/               # Tests unitarios
```

## 🛠️ Tecnologías

### Backend
- **Laravel 11** - Framework PHP moderno
- **PHP 8.2** - Última versión estable
- **Pest** - Framework de testing elegante

### Frontend
- **React 18** - Librería de UI
- **TypeScript 5** - JavaScript tipado
- **Inertia.js** - SPA sin API
- **Tailwind CSS** - Framework de estilos

### DevOps
- **Docker & Docker Compose** - Contenedorización
- **Vite** - Build tool rápido
- **ESLint** - Linting de código

## 🎯 Funcionalidades

### Búsqueda Avanzada
- Buscar por **nombre parcial**: "pika" encuentra "pikachu"
- Buscar por **ID numérico**: "25" encuentra "pikachu"
- **Validación inteligente**: mínimo 2 caracteres o número válido

### Resultados Detallados
- **Imagen oficial** del Pokémon
- **Estadísticas completas** (HP, Ataque, Defensa, etc.)
- **Tipos** con iconos oficiales
- **Información básica** (ID, nombre, experiencia)

### Paginación Optimizada
- **Carga inicial rápida** (12 resultados)
- **Paginación progresiva** con botón "Ver más"

## 🌐 API Externa

- **PokeAPI v2**: https://pokeapi.co/docs/v2
- **Sin limitaciones**: Acceso a todos los 1302 Pokémon
- **Datos completos**: Sprites, stats, tipos, y más

## 📱 Responsive Design

- **Mobile First**: Optimizado para dispositivos móviles
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Grid adaptativo**: 1-4 columnas según pantalla
- **Navegación táctil**: Botones y formularios optimizados

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 👨‍💻 Autor

**Neidys Betancourt**
- GitHub: [@betancourtneidys](https://github.com/betancourtneidys)
- LinkedIn: [Neidys Betancourt](https://linkedin.com/in/betancourtneidys)

---

⭐ **¡Dale una estrella si te gustó el proyecto!** ⭐