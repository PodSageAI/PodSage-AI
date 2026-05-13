from app.services.prometheus_service import (
    get_cpu_usage,
    get_memory_usage,
    get_pod_restarts
)


CPU_THRESHOLD = 0.8
MEMORY_THRESHOLD = 500000000
RESTART_THRESHOLD = 5



def detect_anomalies():
    anomalies = []

    cpu_data = get_cpu_usage()
    memory_data = get_memory_usage()
    restart_data = get_pod_restarts()

    try:
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
                    "value": value
                })

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
                    "value": value
                })

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
                    "value": value
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
                "insight": f"Pod {anomaly['pod']} is consuming unusually high CPU resources.",
                "recommendation": "Consider scaling replicas or optimizing workload."
            })

        elif anomaly.get("type") == "High Memory Usage":
            insights.append({
                "pod": anomaly['pod'],
                "insight": f"Pod {anomaly['pod']} may have a memory leak.",
                "recommendation": "Inspect application memory allocation patterns."
            })

        elif anomaly.get("type") == "Frequent Pod Restarts":
            insights.append({
                "pod": anomaly['pod'],
                "insight": f"Pod {anomaly['pod']} is restarting frequently.",
                "recommendation": "Check logs and container health probes."
            })

    return insights
