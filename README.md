# PodSage AI

AI-Powered Kubernetes Observability & Infrastructure Intelligence Platform

---

## Overview

PodSage AI is an intelligent Kubernetes observability platform designed to monitor, analyze, and correlate real-time pod resource behavior using AI-driven infrastructure insights.

Built for the ABB Accelerator 2026 challenge, the platform helps engineers detect anomalies, understand service dependencies, and optimize containerized environments through real-time analytics, anomaly detection, and intelligent recommendations.

The platform combines Kubernetes telemetry, Prometheus metrics, AI-driven analysis, and real-time dashboards into a unified infrastructure intelligence system.

---

## Key Features

* Real-time Kubernetes monitoring
* CPU, memory, and restart analytics
* AI-powered anomaly detection
* Infrastructure intelligence & recommendations
* Pod dependency mapping
* Prometheus integration
* WebSocket live updates
* Dockerized deployment
* Kubernetes-compatible architecture
* Extensible AI agent framework
* Fault-tolerant metric fallback handling

---

# System Architecture

```mermaid
flowchart LR

    A["Applications / Microservices<br/>(Multiple Pods)"]

    B["Data Collection Layer<br/><br/>
    • cAdvisor / Kubelet Metrics<br/>
    • Prometheus + Node Exporter<br/>
    • kube-state-metrics<br/>
    • PVC / Storage Metrics<br/>
    • Network / eBPF (Optional)"]

    C["AI Agent Layer (Multi-Agent)<br/><br/>
    • CPU Agent<br/>
    • Memory Agent<br/>
    • Storage Agent<br/>
    • Network Agent<br/>
    • Log/IO Agent<br/>
    • Dependency Mapper Agent<br/>
    • Correlation Engine<br/>
    • Coordinator / Orchestrator Agent"]

    D["Intelligence & Storage Layer<br/><br/>
    • Prometheus (Time-Series DB)<br/>
    • Loki / Vector Log Aggregation<br/>
    • NetworkX / Neo4j Dependency Graph<br/>
    • ML Models (Anomaly Detection & Forecasting)"]

    E["Dashboard & User Layer<br/><br/>
    • React / Next.js Dashboard<br/>
    • Recharts / Plotly Visualizations<br/>
    • Grafana Integration<br/>
    • WebSocket Real-Time Updates<br/>
    • NLP Insights Panel<br/>
    • Alerts & Dependency Graphs"]

    A -->|"Telemetry, Metrics, Logs"| B

    B -->|"Infrastructure Data Streams"| C

    C -->|"Correlated Insights & Analysis"| D

    D -->|"Visualizations, Alerts & Intelligence"| E
```

---

# Tech Stack

## Backend

* Python
* FastAPI
* WebSockets
* SQLite

## Monitoring & Metrics

* Prometheus
* Node Exporter
* Kubernetes Metrics API
* cAdvisor

## Infrastructure

* Docker
* Docker Compose
* Kubernetes
* Minikube
* K3s
* MicroK8s

## AI & Analysis

* Rule-based anomaly detection
* Infrastructure correlation engine
* Dependency analysis
* Forecast-ready architecture

## Frontend (Planned)

* React / Next.js
* Recharts
* Plotly
* Grafana

---

# Project Structure

```text
PodSage-AI/
├── LICENSE
├── README.md
├── backend/
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── requirements.txt
│   └── app/
│       ├── api/
│       │   ├── anomalies.py
│       │   ├── dependencies.py
│       │   ├── insights.py
│       │   └── metrics.py
│       │
│       ├── database/
│       │   └── db.py
│       │
│       ├── models/
│       │   └── schemas.py
│       │
│       ├── services/
│       │   ├── ai_service.py
│       │   ├── alert_service.py
│       │   ├── dependency_service.py
│       │   ├── kubernetes_service.py
│       │   └── prometheus_service.py
│       │
│       ├── websocket/
│       │   └── live_updates.py
│       │
│       └── main.py
```

---

# API Endpoints

## Health

| Endpoint  | Description          |
| --------- | -------------------- |
| `/`       | Root status endpoint |
| `/health` | Health check         |

---

## Metrics

| Endpoint            | Description          |
| ------------------- | -------------------- |
| `/metrics/cpu`      | CPU usage metrics    |
| `/metrics/memory`   | Memory usage metrics |
| `/metrics/restarts` | Pod restart metrics  |

---

## AI & Intelligence

| Endpoint        | Description            |
| --------------- | ---------------------- |
| `/anomalies`    | Detected anomalies     |
| `/insights`     | AI-generated insights  |
| `/dependencies` | Service dependency map |

---

# Example Responses

## CPU Metrics

```json
{
  "status": "success",
  "data": {
    "resultType": "vector",
    "result": [
      {
        "metric": {},
        "value": [
          1778683850.411,
          "0.2482235237555631"
        ]
      }
    ]
  }
}
```

---

## Anomaly Detection

```json
[
  {
    "type": "High CPU Usage",
    "pod": "node-exporter:9100",
    "value": 24.82
  }
]
```

---

## AI Insights

```json
[
  {
    "pod": "node-exporter:9100",
    "insight": "Pod node-exporter:9100 is consuming unusually high CPU resources.",
    "recommendation": "Consider scaling replicas or optimizing workload."
  }
]
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/PodSageAI/PodSage-AI.git
cd PodSage-AI/backend
```

---

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

## Run Backend

```bash
uvicorn app.main:app --reload
```

Backend runs on:

```text
http://localhost:8000
```

Swagger documentation:

```text
http://localhost:8000/docs
```

---

# Docker Usage

## Start Services

```bash
docker compose up --build
```

---

## Stop Services

```bash
docker compose down
```

---

# Prometheus Integration

PodSage AI supports:

* Prometheus metrics
* Node Exporter metrics
* Kubernetes metrics
* Container metrics
* Fallback node-level monitoring

The backend automatically falls back to node metrics if container-level metrics are unavailable.

---

# Current Capabilities

* Live CPU monitoring
* Memory monitoring
* Pod restart tracking
* AI anomaly detection
* Infrastructure insights
* Dependency mapping
* Prometheus querying
* Real-time backend APIs

---

# Planned Features

* LLM-powered operational intelligence
* NLP querying
* Historical anomaly analytics
* Predictive forecasting
* Real dependency graph visualization
* Grafana dashboard integration
* Multi-node Kubernetes support
* eBPF network dependency tracing
* Advanced ML anomaly scoring
* Distributed cluster analytics

---

# ABB Accelerator 2026

Developed as part of the ABB Accelerator 2026 innovation challenge focused on:

* AI-powered infrastructure intelligence
* Kubernetes observability
* Real-time analytics
* Automation & monitoring
* Cloud-native operational systems

---

# License

MIT License

Copyright (c) 2026 PodSage AI

---

# Maintainers

* Abhrankan Chakrabarti
* PodSage AI Team

---

# Status

Current Version:

```text
v0.1.3-alpha
```

Project Status:

```text
Active Development
```
