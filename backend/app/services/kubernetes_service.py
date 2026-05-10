from kubernetes import client, config

config.load_kube_config()

v1 = client.CoreV1Api()


def list_pods():
    pods = v1.list_pod_for_all_namespaces(watch=False)

    pod_data = []

    for pod in pods.items:
        pod_data.append({
            "name": pod.metadata.name,
            "namespace": pod.metadata.namespace,
            "status": pod.status.phase,
            "ip": pod.status.pod_ip
        })

    return pod_data
