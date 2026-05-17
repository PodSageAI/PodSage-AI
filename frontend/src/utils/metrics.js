
/**
 * Formats unknown or nullish values for display.
 */
export function formatUnknown(v) {
  if (v === null || v === undefined) return '—'
  if (typeof v === 'number') return Number.isFinite(v) ? v.toString() : '—'
  if (typeof v === 'string') return v || '—'
  return '—'
}

/**
 * Robust target extraction from Prometheus metric labels.
 */
export function extractTarget(metric) {
  if (!metric) return 'unknown'
  return (
    metric.pod ||
    metric.instance ||
    metric.job ||
    metric.container ||
    metric.cpu ||
    'unknown'
  )
}

/**
 * Formats values with appropriate units.
 */
export function formatMetricValue(val, type) {
  if (val == null || isNaN(val)) return '—'
  
  if (type === 'cpu') {
    // Assuming val is 0-1 range for CPU usage (core)
    // If it's already a percentage, just format it.
    // Let's assume it's raw and we want to show 2 decimal percentage.
    return (val * 100).toFixed(2) + '%'
  }
  
  if (type === 'memory') {
    // Heuristic: If the value is small (< 1000), it's likely a percentage from the node fallback
    // Container memory in bytes is almost always > 1MB (1048576 bytes)
    if (val > 0 && val < 1000) {
      return val.toFixed(2) + '%'
    }
    // Assuming val is in bytes
    const mb = val / (1024 * 1024)
    if (mb > 1024) {
      return (mb / 1024).toFixed(2) + ' GB'
    }
    return mb.toFixed(2) + ' MB'
  }
  
  return val.toString()
}

/**
 * Parses Prometheus result format and returns summary statistics.
 * { status?, data: { resultType, result: [{metric, value:[ts, val]}] } }
 */
export function MetricSummaryFromPrometheus(payload, type) {
  try {
    const result = payload?.data?.result
    if (!Array.isArray(result) || result.length === 0) return { top: null, count: 0 }

    const parsed = result
      .map((r) => {
        const v = Array.isArray(r?.value) ? r.value[1] : undefined
        const num = typeof v === 'string' ? Number(v) : typeof v === 'number' ? v : NaN
        const target = extractTarget(r?.metric)
        return { 
          pod: target, 
          value: num,
          formattedValue: formatMetricValue(num, type)
        }
      })
      .filter((x) => Number.isFinite(x.value))

    if (parsed.length === 0) return { top: null, count: 0 }

    parsed.sort((a, b) => b.value - a.value)
    return { top: parsed[0], count: result.length, all: parsed }
  } catch {
    return { top: null, count: 0 }
  }
}

