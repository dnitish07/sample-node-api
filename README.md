DevOps assignment based on a **Node.js REST API** with **Prometheus monitoring**, **GitHub Actions CI/CD**, and **Docker-based deployment**.

# 🚀 DevOps Assignment: CI/CD Pipeline and Monitoring for Node.js REST API

This project demonstrates a full CI/CD pipeline and monitoring setup for a Node.js REST API using:

- **GitHub Actions** (for CI/CD)
- **Docker Compose** (for container orchestration)
- **Prometheus** (for metrics monitoring)
- **(Optional)** Grafana (for dashboard visualization)
- **Prometheus Node Exporter** (for host-level metrics)
- **Node.js Express App** with `/metrics` exposed

---

## 📁 Project Structure

```markdown

sample-node-api/
├── .github/
│   └── workflows/
│       └── ci-cd.yml          # GitHub Actions workflow
├── prometheus/
│   ├── prometheus.yml         # Prometheus config
│   └── Dockerfile             # Optional if customizing
├── index.js                   # Node.js Express API
├── Dockerfile                 # App container definition
├── docker-compose.yml         # Orchestration of services
├── package.json
└── README.md

````

---

## 📌 Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Node.js](https://nodejs.org/) (for local dev only)
- GitHub account (for CI/CD)

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/sample-node-api.git
cd sample-node-api
````

---

### 2. Build and Run Locally with Docker

```bash
docker-compose up --build
```

This will start:

* `app` → Node.js Express API (exposes `/metrics`)
* `prometheus` → collects metrics from app
* *(Optional)* `grafana` → view metrics dashboards

---

### 3. Prometheus Setup

#### 📁 `prometheus/prometheus.yml`

```yaml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'node-api'
    static_configs:
      - targets: ['app:3000']
```

---

### 4. GitHub Actions CI/CD Setup

#### 📁 `.github/workflows/ci-cd.yml`

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v3

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Login to DockerHub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Build and Push Image
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: yourusername/sample-node-api:latest

      - name: Deploy (Optional)
        run: echo "Deploy logic if using cloud VM or Render"
```

---

## 🧪 How to Test It

* Visit `http://localhost:3000/` → API running
* Visit `http://localhost:3000/metrics` → metrics exposed
* Visit `http://localhost:9090/` → Prometheus UI

---

## 📊 (Optional) Grafana Setup

Add this to `docker-compose.yml`:

```yaml
grafana:
  image: grafana/grafana
  ports:
    - "3001:3000"
  volumes:
    - grafana-data:/var/lib/grafana
```

Visit `http://localhost:3001/` → Login (`admin`/`admin`)

---

## 🔁 CI/CD Pipeline Flow

```text
Developer Push Code → GitHub
         ↓
GitHub Actions:
  - Lint/Test
  - Build Docker Image
  - Push to Docker Hub
  - Optional: Deploy to server
```

---

## 📈 Monitoring Overview

* Prometheus scrapes `/metrics` from the app every 15s
* Metrics collected:

  * HTTP request counts
  * Duration
  * Memory, CPU, etc.
* Grafana (if enabled) shows real-time dashboards

---

## 📦 Scaling the Application

* Use Docker Swarm / Kubernetes for horizontal scaling
* Use a Load Balancer (e.g., NGINX or Traefik)
* Scale services:

```bash
docker-compose up --scale app=3
```

---

## 💥 Disaster Recovery Steps

* **Prometheus**: Backup data volume or use remote write
* **App**: Rebuild from Docker image or GitHub repo
* **CI/CD**: Use protected branches and rollback tags
* **Grafana**: Export dashboards and backup config
* **Versioning**: Use semantic version tags (`v1.0.0`, `v1.1.0`)

---

## 🧠 Helpful Commands

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild everything
docker-compose up --build --force-recreate
```

---

## 🙌 Author

**Nitish D.**
Full-Stack Software Engineer & DevOps Enthusiast
[GitHub](https://github.com/dnitish07)

---

## ✅ License

This project is licensed under the MIT License.

```

---

Let me know if you want this saved as a `README.md` file or converted to PDF.
```
