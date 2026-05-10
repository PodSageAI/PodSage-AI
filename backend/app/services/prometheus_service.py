import requests

PROMETHEUS_URL = "http://localhost:9090/api/v1/query"


def query_prometheus(query):
    response = requests.get(
        PROMETHEUS_URL,
        params={"query": query}
    )

    return response.json()


def get_cpu_usage():
    query = 'rate(container_cpu_usage_seconds_total[1m])'
    return query_prometheus(query)


def get_memory_usage():
    query = 'container_memory_usage_bytes'
    return query_prometheus(query)


def get_pod_restarts():
    query = 'kube_pod_container_status_restarts_total'
    return query_prometheus(query)
