# PodSage AI

AI-Powered Kubernetes Observability & Infrastructure Intelligence Platform

## Overview

PodSage AI is an intelligent Kubernetes observability platform designed to monitor, analyze, and correlate real-time pod resource behavior using AI-driven infrastructure insights.

Built for the ABB Accelerator 2026 challenge, the platform helps engineers detect anomalies, understand service dependencies, and optimize containerized environments through real-time analytics and intelligent recommendations.

---

## Features

- Real-time Kubernetes pod monitoring
- CPU, memory, and restart analytics
- AI-driven anomaly detection
- Intelligent operational insights
- Pod dependency mapping
- FastAPI backend architecture
- Prometheus integration
- WebSocket live updates
- Dockerized deployment

---

## Tech Stack

### Backend
- Python
- FastAPI
- WebSockets

### Monitoring
- Prometheus
- Kubernetes Metrics API
- cAdvisor

### Infrastructure
- Docker
- Kubernetes / Minikube / K3s

### AI & Analysis
- Rule-based anomaly detection
- Infrastructure correlation engine

---

## Project Structure

```text
backend/
├── app/
│   ├── api/
│   ├── services/
│   ├── websocket/
│   ├── models/
│   └── database/
├── Dockerfile
├── docker-compose.yml
└── requirements.txt
```

---

## API Endpoints

| Endpoint | Description |
|---|---|
| `/metrics/cpu` | CPU usage metrics |
| `/metrics/memory` | Memory usage metrics |
| `/metrics/restarts` | Pod restart metrics |
| `/anomalies` | Detected anomalies |
| `/insights` | AI-generated insights |
| `/dependencies` | Service dependency map |

---

## Installation

### Clone Repository

```bash
git clone https://github.com/PodSageAI/PodSage-AI.git
cd PodSage-AI/backend
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Run Backend

```bash
uvicorn app.main:app --reload
```

---

## Docker Usage

```bash
docker compose up
```

---

## Future Improvements

- LLM-based analysis
- Predictive forecasting
- Real dependency graph visualization
- Historical anomaly analytics
- NLP querying
- Multi-node Kubernetes support

---

## ABB Accelerator 2026

Developed as part of the ABB Accelerator innovation challenge focused on AI-powered infrastructure intelligence and Kubernetes observability.

---

## License

MIT License
