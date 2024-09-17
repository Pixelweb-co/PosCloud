# Proyecto de Pedido

Este proyecto es una aplicación que incluye un backend en Java con Spring Boot y un frontend en Angular. Ambos servicios se ejecutan en contenedores Docker.

## Requisitos

- Docker
- Docker Compose

## Instalación y Configuración

### 1. Clonar el Repositorio

Primero, clona el repositorio en tu máquina local:

```bash
git clone https://github.com/tuusuario/tu-repositorio.git
cd tu-repositorio

2. Configurar el Backend
El backend está ubicado en la carpeta api. Asegúrate de que el Dockerfile y docker-compose.yml estén correctamente configurados en la carpeta api.

3. Configurar el Frontend
El frontend está ubicado en la carpeta frontend. Asegúrate de que el Dockerfile esté correctamente configurado en la carpeta frontend.

4. Configurar Docker Compose
El archivo docker-compose.yml se encuentra en la raíz del proyecto. Asegúrate de que esté configurado correctamente para incluir los servicios del backend, frontend y base de datos.

5. Construir y Ejecutar los Contenedores
Desde la raíz del proyecto, ejecuta los siguientes comandos para construir y ejecutar los contenedores Docker:

docker-compose up --build