from fastapi import APIRouter
from app.services.dependency_service import get_dependencies

router = APIRouter(prefix="/dependencies", tags=["Dependencies"])


@router.get("/")
def dependencies():
    return get_dependencies()
