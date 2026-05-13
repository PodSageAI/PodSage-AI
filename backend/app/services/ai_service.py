from app.services.prometheus_service import (
    get_cpu_usage,
    get_memory_usage,
    get_pod_restarts
)

CPU_THRESHOLD = 0.2
MEMORY_THRESHOLD = 500000000
RESTART_THRESHOLD = 5


def detect_anomalies():
    anomalies = []

    cpu_data = get_cpu_usage()
    memory_data = get_memory_usage()
    restart_data = get_pod_restarts()

    try:
        # CPU anomalies
        for item in cpu_data['data']['result']:
            value = float(item['value'][1])

            if value > CPU_THRESHOLD:
                anomalies.append({
                    "type": "High CPU Usage",
                    "pod": (
                        item['metric'].get('pod')
                        or item['metric'].get('instance')
                        or "unknown"
                    ),
                    "value": round(value * 100, 2),
                    "unit": "%"
                })

        # Memory anomalies
        for item in memory_data['data']['result']:
            value = float(item['value'][1])

            if value > MEMORY_THRESHOLD:
                anomalies.append({
                    "type": "High Memory Usage",
                    "pod": (
                        item['metric'].get('pod')
                        or item['metric'].get('instance')
                        or "unknown"
                    ),
                    "value": round(value / (1024 * 1024), 2),
                    "unit": "MB"
                })

        # Restart anomalies
        for item in restart_data['data']['result']:
            value = float(item['value'][1])

            if value > RESTART_THRESHOLD:
                anomalies.append({
                    "type": "Frequent Pod Restarts",
                    "pod": (
                        item['metric'].get('pod')
                        or item['metric'].get('instance')
                        or "unknown"
                    ),
                    "value": int(value),
                    "unit": "restarts"
                })

    except Exception as e:
        anomalies.append({
            "error": str(e)
        })

    return anomalies


def generate_insights():
    anomalies = detect_anomalies()

    insights = []

    for anomaly in anomalies:

        if anomaly.get("type") == "High CPU Usage":
            insights.append({
                "pod": anomaly['pod'],
                "insight": (
                    f"Pod {anomaly['pod']} is consuming "
                    f"{anomaly['value']}{anomaly['unit']} CPU."
                ),
                "recommendation": (
                    "Consider scaling replicas or optimizing workload."
                )
            })

        elif anomaly.get("type") == "High Memory Usage":
            insights.append({
                "pod": anomaly['pod'],
                "insight": (
                    f"Pod {anomaly['pod']} is using "
                    f"{anomaly['value']} {anomaly['unit']} memory."
                ),
                "recommendation": (
                    "Inspect application memory allocation patterns."
                )
            })

        elif anomaly.get("type") == "Frequent Pod Restarts":
            insights.append({
                "pod": anomaly['pod'],
                "insight": (
                    f"Pod {anomaly['pod']} restarted "
                    f"{anomaly['value']} times."
                ),
                "recommendation": (
                    "Check logs and container health probes."
                )
            })

    return insights
