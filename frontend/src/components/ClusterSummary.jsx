import React from 'react'

export default function ClusterSummary({ metrics }) {
  const { totalPods, healthy, warnings, critical } = metrics

  const items = [
    { label: 'Total Pods', value: totalPods, color: '#7c5cff' },
    { label: 'Healthy', value: healthy, color: '#2ee9a6' },
    { label: 'Warnings', value: warnings, color: '#ffb020' },
    { label: 'Critical', value: critical, color: '#ff4d6d' },
  ]

  return (
    <div className="card fade-in" style={{ 
      padding: '12px 24px', 
      marginBottom: 24, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      background: 'rgba(255, 255, 255, 0.03)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.05)'
    }}>
      <div style={{ display: 'flex', gap: 40 }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="text-muted font-xs font-bold uppercase" style={{ letterSpacing: '0.05em', marginBottom: 4 }}>
              {item.label}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.color, boxShadow: `0 0 10px ${item.color}` }} />
              <span className="font-lg font-black" style={{ color: '#fff' }}>{item.value}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div className="badge" style={{ background: 'rgba(46, 233, 166, 0.1)', color: '#2ee9a6', borderColor: 'rgba(46, 233, 166, 0.2)' }}>
          System Operational
        </div>
      </div>
    </div>
  )
}
