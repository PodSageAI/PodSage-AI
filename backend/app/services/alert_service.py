def generate_alert(alert_type, pod_name, value):
    return {
        "alert": alert_type,
        "pod": pod_name,
        "value": value,
        "severity": "HIGH"
    }
