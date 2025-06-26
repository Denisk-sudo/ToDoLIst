# 📝 Todo List App

A full-featured ToDo application with a FastAPI backend, React + TypeScript frontend, and PostgreSQL database. All services are orchestrated using Docker Compose.

## 📦 Project Components

- **Backend:** FastAPI
- **Frontend:** React + TypeScript
- **Database:** PostgreSQL
- **Tools:** Docker, Docker Compose

---

## 🚀 Getting Started

> ⚠️ Prerequisites:
> - [Docker](https://www.docker.com/)
> - [Docker Compose](https://docs.docker.com/compose/)

### 1. Clone the Repository

```bash
git clone https://github.com/Denisk-sudo/ToDoLIst
cd todo-app
```

### 2. Create `.env` File for Backend

Inside the `todo_api/` directory, create a file named `.env`:

```env
DB_HOST=db
DB_PORT=5432
DB_NAME=flaskdb
DB_USER=nick
DB_PASSWORD=FlaskApp
```

### 3. Build and Start the Containers

```bash
docker compose up --build
```

### 4. Access the Application

- **Frontend:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:8000/todos/](http://localhost:8000/todos/)
- **Swagger docs:** [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 📂 Project Structure

```
todo-app/
├── todo_api/             # Backend (FastAPI)
│   ├── main.py
│   ├── models.py
│   ├── crud.py
│   ├── database.py
│   ├── schemas.py
│   └── .env
│
├── todo_frontend/        # Frontend (React + TypeScript)
│   └── ...
│
├── docker-compose.yml    # Docker Compose configuration
└── README.md             # This file
```

---

## 🧹 Stopping the Application

```bash
docker compose down
```

To remove volumes (database data):
```bash
docker compose down -v
```

---

## ❓ Troubleshooting

If something doesn't work, double-check the `.env` file, container logs, and open ports.
