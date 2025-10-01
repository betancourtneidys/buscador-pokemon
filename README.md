# Buscador Pokémon

Aplicación web para buscar Pokémon usando la PokeAPI.

## Características

- 🔍 Búsqueda por nombre parcial o ID
- 🎨 Interfaz responsive con Tailwind CSS
- ⚡ React + Inertia.js + Laravel
- 🧪 Tests con Pest
- 🐳 Docker para fácil instalación

## Instalación con Docker

### Requisitos
- Docker
- Docker Compose

### Pasos

1. **Clonar el repositorio**
```bash
git clone <tu-repo>
cd buscador-pokemon
```

2. **Configurar variables de entorno**
```bash
cp .env.example .env
```

3. **Construir y ejecutar con Docker**
```bash
docker-compose up --build
```

4. **Generar clave de aplicación**
```bash
docker-compose exec app php artisan key:generate
```

5. **Acceder a la aplicación**
- Aplicación: http://localhost:8000

## Instalación Local

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

## Testing

```bash
# Con Docker
docker-compose exec app php artisan test

# Local
php artisan test
```

## Tecnologías

- **Backend:** Laravel 11, PHP 8.2
- **Frontend:** React, TypeScript, Inertia.js
- **Estilos:** Tailwind CSS
- **Testing:** Pest
- **Contenedores:** Docker, Docker Compose