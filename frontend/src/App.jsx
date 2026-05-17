import { useEffect, useMemo, useState } from 'react'
import { getAnomalies, getCpu, getDependencies, getInsights, getMemory, getRestarts } from './api/client'
import { MetricSummaryFromPrometheus } from './utils/metrics'


// Components
import Header from './components/Header'
import MetricCard from './components/MetricCard'
import SeriesChart from './components/SeriesChart'
import AnomalyTable from './components/AnomalyTable'
import AIInsights from './components/AIInsights'
import JsonPreview from './components/JsonPreview'
import ClusterSummary from './components/ClusterSummary'
import DependencyGraph from './components/DependencyGraph'

export default function App() {
  const [cpu, setCpu] = useState(null)
  const [memory, setMemory] = useState(null)
  const [restarts, setRestarts] = useState(null)

  const [anomalies, setAnomalies] = useState([])
  const [insights, setInsights] = useState([])
  const [dependencies, setDependencies] = useState(null)

  const [loadingMetrics, setLoadingMetrics] = useState(false)
  const [loadingAI, setLoadingAI] = useState(false)
  const [error, setError] = useState(null)

  const [sessionPeakMemory, setSessionPeakMemory] = useState(null)

  const cpuSummary = useMemo(() => (cpu ? MetricSummaryFromPrometheus(cpu, 'cpu') : null), [cpu])
  const memorySummary = useMemo(() => (memory ? MetricSummaryFromPrometheus(memory, 'memory') : null), [memory])
  const restartsSummary = useMemo(() => (restarts ? MetricSummaryFromPrometheus(restarts) : null), [restarts])

  const clusterStats = useMemo(() => {
    const total = (cpuSummary?.count || 0)
    const crit = anomalies.filter(a => a.status === 'Critical').length
    const warn = anomalies.filter(a => a.status === 'Warning').length
    return {
      totalPods: total || 14, // Fallback for demo if empty
      healthy: Math.max(0, (total || 14) - crit - warn),
      warnings: warn,
      critical: crit
    }
  }, [cpuSummary, anomalies])

  async function refreshAll() {
    setError(null)
    setLoadingMetrics(true)
    setLoadingAI(true)
    try {
      const [c, m, r, a, i, d] = await Promise.all([
        getCpu(),
        getMemory(),
        getRestarts(),
        getAnomalies(),
        getInsights(),
        getDependencies()
      ])
      setCpu(c)
      setMemory(m)
      setRestarts(r)
      setAnomalies(Array.isArray(a) ? a : [])
      setInsights(Array.isArray(i) ? i : [])
      setDependencies(d)
    } catch (e) {
      setError(e?.message || String(e))
    } finally {
      setLoadingMetrics(false)
      setLoadingAI(false)
    }
  }

  useEffect(() => {
    refreshAll().catch(() => { })
  }, [])

  // Update session-based peak memory usage
  useEffect(() => {
    if (memorySummary?.top) {
      if (!sessionPeakMemory || memorySummary.top.value > sessionPeakMemory.value) {
        setSessionPeakMemory(memorySummary.top)
      }
    }
  }, [memorySummary, sessionPeakMemory])

  return (
    <div style={{ minHeight: '100vh', paddingBottom: 60 }}>
      <Header onRefresh={refreshAll} loading={loadingMetrics || loadingAI} />

      <main className="container fade-in">
        {error && (
          <div className="card" style={{ padding: 16, marginTop: 24, borderColor: 'rgba(255,77,109,.35)', background: 'rgba(255,77,109,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--danger)" strokeWidth="3">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <div className="text-danger font-bold">Service Connection Error</div>
            </div>
            <div className="text-muted font-sm" style={{ marginTop: 8, whiteSpace: 'pre-wrap', paddingLeft: 30 }}>{error}</div>
          </div>
        )}

        <div style={{ marginTop: 24 }}>
          <ClusterSummary metrics={clusterStats} />
        </div>

        <div className="grid-metrics">
          <MetricCard
            title="Max CPU Utilization"
            subtitle="CPU CORE"
            tone="ok"
            loading={loadingMetrics}
            valueText={cpuSummary?.top?.formattedValue || '—'}
          />
          <MetricCard
            title="Peak Memory Usage"
            subtitle="MEMORY"
            tone="warn"
            loading={loadingMetrics}
            valueText={sessionPeakMemory?.formattedValue || memorySummary?.top?.formattedValue || '—'}
          />
          <MetricCard
            title="Recent Restart Events"
            subtitle="RESTARTS"
            tone="danger"
            loading={loadingMetrics}
            valueText={restartsSummary?.top?.value != null ? restartsSummary.top.value : '0'}
          />
        </div>

        <div className="grid-charts">
          <div className="card" style={{ padding: '24px 12px 12px' }}>
            <SeriesChart subtitle="CPU trend" title="CPU Core Usage" payload={cpu} color="var(--brand2)" />
          </div>
          <div className="card" style={{ padding: '24px 12px 12px' }}>
            <SeriesChart subtitle="Memory trend" title="Memory Utilization" payload={memory} color="var(--brand)" />
          </div>
          <div className="card" style={{ padding: '24px 12px 12px' }}>
            <SeriesChart subtitle="Restarts trend" title="Pod Restarts" payload={restarts} color="var(--danger)" />
          </div>
        </div>

        <div className="grid-main">
          <AnomalyTable anomalies={anomalies} loading={loadingAI} />
          <AIInsights insights={insights} loading={loadingAI} />
        </div>

        <DependencyGraph dependencies={dependencies} />

        <div style={{ marginTop: 24 }}>
          <JsonPreview data={dependencies} title="Raw Dependency Data" />
        </div>

        <footer style={{ marginTop: 60, textAlign: 'center', opacity: 0.5 }}>
          <div className="text-muted font-xs font-bold uppercase">
            PODSAGE AI OBSERVABILITY ENGINE • 2026
          </div>
        </footer>
      </main>
    </div>
  )
}

