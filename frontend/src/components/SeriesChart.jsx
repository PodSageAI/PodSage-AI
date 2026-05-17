import { useMemo } from 'react'
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area
} from 'recharts'

function safeNumber(v) {
  const n = typeof v === 'string' ? Number(v) : v
  return Number.isFinite(n) ? n : null
}

export default function SeriesChart({ title, subtitle, payload, color = '#7C5CFF' }) {
  const data = useMemo(() => {
    const result = payload?.data?.result
    if (!Array.isArray(result) || result.length === 0) return []

    const series = result[0]
    if (Array.isArray(series?.values)) {
      return series.values
        .map(([ts, val]) => {
          const x = safeNumber(ts)
          const y = safeNumber(val)
          if (x === null || y === null) return null
          return { x, y }
        })
        .filter(Boolean)
        .sort((a, b) => a.x - b.x)
        .slice(-80)
    }

    if (Array.isArray(series?.value)) {
      const [ts, val] = series.value
      const x = safeNumber(ts)
      const y = safeNumber(val)
      if (x === null || y === null) return []
      return [{ x, y }]
    }

    return []
  }, [payload])

  const gradientId = useMemo(() => `grad-${title.replace(/\s+/g, '-').toLowerCase()}`, [title])

  return (
    <div style={{ width: '100%' }}>
      <div className="sectionTitle" style={{ marginBottom: 16 }}>
        <h2 style={{ margin: 0, fontSize: 12 }}>{title}</h2>
        <div className="badge" style={{ fontSize: 10, padding: '3px 8px' }}>
          {subtitle}
        </div>
      </div>

      <div style={{ height: 200, width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.03)" vertical={false} />
            <XAxis
              dataKey="x"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#ffffff', fontSize: 10 }}
              domain={['dataMin', 'dataMax']}
              type="number"
              tickFormatter={(v) => (Number.isFinite(v) ? new Date(v * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '')}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#ffffff', fontSize: 10 }} 
            />
            <Tooltip
              contentStyle={{ 
                background: 'rgba(15, 20, 35, 0.9)', 
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.1)', 
                borderRadius: 12,
                boxShadow: '0 10px 20px rgba(0,0,0,0.4)',
                fontSize: 12
              }}
              labelStyle={{ color: 'var(--muted)', marginBottom: 4 }}
              itemStyle={{ color: color, fontWeight: 700 }}
              labelFormatter={(v) => (Number.isFinite(v) ? new Date(v * 1000).toLocaleString() : v)}
            />
            <Area 
              type="monotone" 
              dataKey="y" 
              name={title} 
              stroke={color} 
              fill={`url(#${gradientId})`} 
              strokeWidth={3}
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}


