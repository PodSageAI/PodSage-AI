import React from 'react'

export default function MetricCard({ title, subtitle, valueText, tone, loading }) {
  const getColors = () => {
    switch (tone) {
      case 'danger': return { bg: 'rgba(255, 77, 109, 0.15)', text: '#ff4d6d', border: 'rgba(255, 77, 109, 0.3)' }
      case 'warn': return { bg: 'rgba(255, 176, 32, 0.15)', text: '#ffb020', border: 'rgba(255, 176, 32, 0.3)' }
      case 'ok': return { bg: 'rgba(46, 233, 166, 0.15)', text: '#2ee9a6', border: 'rgba(46, 233, 166, 0.3)' }
      default: return { bg: 'rgba(124, 92, 255, 0.15)', text: '#7c5cff', border: 'rgba(124, 92, 255, 0.3)' }
    }
  }

  const colors = getColors()

  return (
    <div className="card" style={{ padding: 24, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', background: colors.text }} />
      
      <div className="sectionTitle" style={{ marginBottom: 20 }}>
        <span
          className="badge"
          style={{
            background: colors.bg,
            color: colors.text,
            borderColor: colors.border,
            fontSize: 10,
            letterSpacing: '0.05em'
          }}
        >
          {subtitle}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <div className="text-primary font-black" style={{ fontSize: 42, letterSpacing: '-0.03em' }}>
          {loading ? (
            <span style={{ opacity: 0.3 }}>—</span>
          ) : (
            valueText
          )}
        </div>
      </div>
      
      <div className="text-muted font-sm font-bold" style={{ marginTop: 8 }}>
        {title}
      </div>
      
      {/* Subtle background glow */}
      <div style={{ 
        position: 'absolute', 
        bottom: -20, 
        right: -20, 
        width: 100, 
        height: 100, 
        background: colors.text, 
        filter: 'blur(60px)', 
        opacity: 0.1,
        pointerEvents: 'none'
      }} />
    </div>
  )
}
