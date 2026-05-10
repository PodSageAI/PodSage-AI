from pydantic import BaseModel


class PodMetric(BaseModel):
    pod: str
    value: float


class Insight(BaseModel):
    pod: str
    insight: str
    recommendation: str
