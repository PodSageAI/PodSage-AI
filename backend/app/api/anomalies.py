from fastapi import APIRouter
from app.services.ai_service import detect_anomalies

router = APIRouter(prefix="/anomalies", tags=["Anomalies"])


@router.get("/")
def anomalies():
    return detect_anomalies()
