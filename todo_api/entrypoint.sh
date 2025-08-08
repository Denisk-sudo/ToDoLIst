#!/bin/sh


echo "🕒 Waiting for postgres..."


echo "🚀 Running Alembic migrations..."
alembic upgrade head

echo "🚀 Starting backend..."
exec uvicorn app.main:app --host 0.0.0.0 --port 8080
