# REST API Node.js / TypeScript / Express

Este proyecto es una API REST desarrollada con Node.js, TypeScript y Express, que proporciona endpoints para gestionar productos. Incluye validación de datos, documentación con Swagger y pruebas automatizadas.

## Requisitos previos

- nodejs
- pnpm
- postgresql

## Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/estefanoquiriconi/rest-api-node-ts
cd rest-api-node-ts-server
```

2. Instala las dependencias:

```bash
pnpm install
```

3. Configura las variables de entorno:

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```
PORT=3000
DATABASE_URL=postgres://<usuario>:<contraseña>@<host>:<puerto>/<nombre_db>
```

## Ejecución del proyecto

Para iniciar el servidor en modo desarrollo:

```bash
pnpm dev
```

El servidor se iniciará en el puerto especificado en las variables de entorno (por defecto 3000).

## Pruebas

### Preparar la base de datos para pruebas

Antes de ejecutar las pruebas, puedes limpiar la base de datos:

```bash
pnpm pretest
```

### Ejecutar pruebas

Para ejecutar todas las pruebas:

```bash
pnpm test
```

Para ejecutar las pruebas con cobertura:

```bash
pnpm test:coverage
```

## Documentación de la API

La documentación de la API está disponible a través de Swagger UI. Una vez que el servidor esté en ejecución, puedes acceder a la documentación en:

```
http://localhost:3000/docs
```

## Estructura del proyecto

```
src/
├── config/         # Configuración (base de datos, swagger)
├── data/           # Scripts para gestión de datos
├── handlers/       # Controladores de la API
├── middlewares/    # Middlewares de Express
├── models/         # Modelos de Sequelize
├── routes/         # Rutas de la API
├── validators/     # Validadores de entrada
├── __test__/       # Pruebas unitarias
├── index.ts        # Punto de entrada de la aplicación
└── server.ts       # Configuración del servidor Express
```

## Endpoints disponibles

- `GET /api/products`: Obtener lista de productos
- `GET /api/products/:id`: Obtener un producto por ID
- `POST /api/products`: Crear un nuevo producto
- `PUT /api/products/:id`: Actualizar un producto existente
- `PATCH /api/products/:id`: Actualizar disponibilidad de un producto
- `DELETE /api/products/:id`: Eliminar un producto

## Tecnologías utilizadas

- Node.js
- TypeScript
- Express
- Sequelize
- PostgreSQL
- Jest (pruebas)
- Swagger (documentación)
