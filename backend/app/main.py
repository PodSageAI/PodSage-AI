from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.metrics import router as metrics_router
from app.api.anomalies import router as anomalies_router
from app.api.dependencies import router as dependencies_router
from app.api.insights import router as insights_router

from app.database.db import initialize_database

# Initialize FastAPI app
app = FastAPI(
    title="PodSage AI",
    description="AI-Powered Kubernetes Observability Platform",
    version="0.1.1-alpha"
)

# Initialize database
initialize_database()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routers
app.include_router(metrics_router)
app.include_router(anomalies_router)
app.include_router(dependencies_router)
app.include_router(insights_router)


@app.get("/")
def root():
    return {
        "message": "PodSage AI Backend Running",
        "status": "healthy",
        "version": "0.1.0-alpha"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }
