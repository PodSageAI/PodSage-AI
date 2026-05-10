from fastapi import APIRouter
from app.services.ai_service import generate_insights

router = APIRouter(prefix="/insights", tags=["Insights"])


@router.get("/")
def insights():
    return generate_insights()
