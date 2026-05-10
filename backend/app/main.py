from fastapi import FastAPI
from app.api.metrics import router as metrics_router
from app.api.anomalies import router as anomalies_router
from app.api.dependencies import router as dependencies_router
from app.api.insights import router as insights_router

app = FastAPI(title="PodSage AI")

app.include_router(metrics_router)
app.include_router(anomalies_router)
app.include_router(dependencies_router)
app.include_router(insights_router)


@app.get("/")
def root():
    return {
        "message": "PodSage AI Backend Running"
    }
