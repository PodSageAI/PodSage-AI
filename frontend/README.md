# PodSage AI Frontend (React + Vite)

AI-powered Kubernetes observability dashboards for PodSage AI.

---

## Overview
The frontend provides an interactive dashboard for real-time Kubernetes metrics, anomaly visualization, service dependency mapping, and AI-generated insights.

It communicates with the backend via HTTP APIs and WebSocket live updates.

---

## Key Features
- Real-time dashboard charts (CPU / memory / restarts)
- Anomaly tables and AI insights
- Infrastructure dependency graph
- WebSocket-driven live updates
- Prometheus-backed data visualization (through backend)
- Responsive, dark “glass” UI theme

---

## Tech Stack
- **React** (UI)
- **Vite** (dev/build tooling)
- **Recharts** (charts)
- **WebSocket** (live updates)
- **CSS** (global styling)

---

## Requirements
- Node.js **18+** (recommended)

---

## Setup
```bash
cd "c:/Users/sampr/OneDrive/Desktop/test pod/PA/frontend"
npm install
```

---

## Development
```bash
npm run dev
```

Frontend runs on:
- http://localhost:5173

---

## Production Build
```bash
npm run build
npm run preview
```

---

## API Base URL
The frontend calls the backend at a configurable base URL.

Default:
- http://localhost:8000

Override by creating an `.env` file:
```bash
# PA/frontend/.env
VITE_API_BASE_URL=http://localhost:8000
```

---

## Project Structure
```text
frontend/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── api/
    │   └── client.js
    ├── components/
    │   ├── Header.jsx
    │   ├── MetricCard.jsx
    │   ├── SeriesChart.jsx
    │   ├── AnomalyTable.jsx
    │   ├── AIInsights.jsx
    │   ├── DependencyGraph.jsx
    │   ├── ClusterSummary.jsx
    │   ├── JsonPreview.jsx
    │   └── ...
    ├── styles/
    │   └── global.css
    └── utils/
        └── metrics.js
```

---

## Environments / Configuration
- `VITE_API_BASE_URL` controls the backend URL for the frontend.

---

## Docker / Container Notes
This repository includes backend Docker configuration. The frontend is typically run via Vite during development.

If you add containerization for the frontend in the future, ensure the WebSocket and API base URLs are mapped correctly.

---

# License
MIT License

---

# Maintainers
PodSage AI Team

---

# Status
Active Development

