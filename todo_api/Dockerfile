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


COPY ./app /app/app
COPY ./alembic.ini /app
COPY ./migrations /app/migrations
COPY ./entrypoint.sh /app

COPY --from=builder /root/.local /root/.local

ENV PATH=/root/.local/bin:$PATH

RUN chmod +x /app/entrypoint.sh

EXPOSE 8000

ENTRYPOINT ["/bin/sh", "/app/entrypoint.sh"]
