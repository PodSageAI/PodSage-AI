import requests

PROMETHEUS_URL = "http://prometheus:9090/api/v1/query"


def query_prometheus(query):
    try:
        response = requests.get(
            PROMETHEUS_URL,
            params={"query": query},
            timeout=5
        )

        response.raise_for_status()

        return response.json()

    except requests.exceptions.RequestException as e:
        return {
            "status": "error",
            "error": str(e),
            "data": {
                "result": []
            }
        }


def get_cpu_usage():
    """
    Try Kubernetes container metrics first.
    Fallback to node CPU metrics.
    """

    container_query = (
        'sum(rate(container_cpu_usage_seconds_total[1m])) by (pod)'
    )

    result = query_prometheus(container_query)

    if result.get("data", {}).get("result"):
        return result

    node_query = (
        '1 - avg(rate(node_cpu_seconds_total{mode="idle"}[1m]))'
    )

    return query_prometheus(node_query)


def get_memory_usage():
    """
    Try container memory metrics first.
    Fallback to node memory usage.
    """

    container_query = (
        'sum(container_memory_usage_bytes) by (pod)'
    )

    result = query_prometheus(container_query)

    if result.get("data", {}).get("result"):
        return result

    node_query = (
        '(1 - (node_memory_MemAvailable_bytes '
        '/ node_memory_MemTotal_bytes)) * 100'
    )

    return query_prometheus(node_query)


def get_pod_restarts():
    query = 'kube_pod_container_status_restarts_total'

    return query_prometheus(query)