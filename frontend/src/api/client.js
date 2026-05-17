const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

async function apiGet(path) {
  const url = `${API_BASE_URL}${path}`
  const res = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Request failed (${res.status}) ${text}`)
  }
  return res.json()
}

export function getCpu() {
  return apiGet('/metrics/cpu')
}
export function getMemory() {
  return apiGet('/metrics/memory')
}
export function getRestarts() {
  return apiGet('/metrics/restarts')
}
export function getAnomalies() {
  return apiGet('/anomalies/')
}
export function getInsights() {
  return apiGet('/insights/')
}
export function getDependencies() {
  return apiGet('/dependencies/')
}

