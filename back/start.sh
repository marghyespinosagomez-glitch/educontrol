#!/bin/bash

# 1. Iniciar Postgres
service postgresql start

# Esperar un par de segundos a que Postgres despierte
sleep 3

# 2. Crear usuario y BD solo si no existen (el '|| true' evita que el script falle si ya existen)
su - postgres -c "psql -c \"CREATE USER \\\"EduControl\\\" WITH PASSWORD 'Casanare1511*';\"" || true
su - postgres -c "psql -c \"CREATE DATABASE control OWNER \\\"EduControl\\\";\"" || true

# 3. Arrancar Node
echo "🚀 Todo listo en puerto 3070. Arrancando EduControl..."
npm start