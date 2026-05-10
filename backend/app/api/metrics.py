from fastapi import APIRouter
from app.services.prometheus_service import (
    get_cpu_usage,
    get_memory_usage,
    get_pod_restarts
)

router = APIRouter(prefix="/metrics", tags=["Metrics"])


@router.get("/cpu")
def cpu_metrics():
    return get_cpu_usage()


@router.get("/memory")
def memory_metrics():
    return get_memory_usage()


@router.get("/restarts")
def restart_metrics():
    return get_pod_restarts()
