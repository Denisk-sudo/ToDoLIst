# ======================
# 1️⃣ STAGE: build deps
# ======================
FROM python:3.11-slim AS builder

WORKDIR /app

COPY ./requirements.txt .

RUN pip install --user --no-cache-dir --upgrade pip \
 && pip install --user --no-cache-dir -r requirements.txt

# ============================
# 2️⃣ STAGE: final lightweight
# ============================
FROM python:3.11-slim

WORKDIR /app

# Копируем приложение
COPY ./app /app/app
COPY ./alembic.ini /app
COPY ./alembic /app/alembic
COPY ./entrypoint.sh /app

# Копируем зависимости из builder
COPY --from=builder /root/.local /root/.local

# Устанавливаем PATH
ENV PATH=/root/.local/bin:$PATH

# Переменные окружения для запуска без compose
ENV DB_HOST=db
ENV DB_PORT=5432
ENV DB_USER=nick
ENV DB_PASSWORD=FlaskApp
ENV DB_NAME=flaskdb

# Даём права на запуск entrypoint
RUN chmod +x /app/entrypoint.sh

# Открываем порт
EXPOSE 8080

# Команда по умолчанию (можно запускать напрямую docker run)
ENTRYPOINT ["/bin/sh", "/app/entrypoint.sh"]
