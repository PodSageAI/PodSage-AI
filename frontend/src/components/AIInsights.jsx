import React from 'react'
import { formatUnknown } from '../utils/metrics'

export default function AIInsights({ insights, loading }) {
  return (
    <div className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
      <div className="sectionTitle">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--brand2)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
        <h2>AI Insights & Intelligence</h2>
        <div className="badge" style={{ marginLeft: 'auto', background: 'rgba(46, 233, 166, 0.1)', color: 'var(--brand2)', borderColor: 'rgba(46, 233, 166, 0.2)' }}>
          {insights?.length ?? 0} Recommendations
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'auto', minHeight: 300, maxHeight: 450, paddingRight: 4 }}>
        {loading ? (
          <div className="text-muted" style={{ padding: 40, textAlign: 'center' }}>
            <div className="spinner" style={{ margin: '0 auto 12px', width: 24, height: 24, border: '3px solid rgba(255,255,255,0.1)', borderTopColor: 'var(--brand2)', borderRadius: '50%' }} />
            Consulting AI models...
          </div>
        ) : insights?.length ? (
          <div style={{ display: 'grid', gap: 16 }}>
            {insights.map((x, idx) => (
              <div
                key={idx}
                className="insight-card"
                style={{
                  border: '1px solid rgba(255,255,255,0.05)',
                  background: 'rgba(255,255,255,0.02)',
                  borderRadius: 16,
                  padding: 16,
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--brand2)' }} />
                  <div className="text-primary font-bold" style={{ fontSize: 14 }}>{formatUnknown(x.pod)}</div>
                </div>
                <div className="text-muted font-sm" style={{ lineHeight: 1.6, marginBottom: 12 }}>
                  {x.insight || 'No detailed insight available.'}
                </div>
                <div style={{ 
                  background: 'rgba(46, 233, 166, 0.05)', 
                  padding: '10px 12px', 
                  borderRadius: 10, 
                  fontSize: 13,
                  border: '1px dashed rgba(46, 233, 166, 0.2)'
                }}>
                  <span className="text-brand2 font-bold uppercase" style={{ fontSize: 10, display: 'block', marginBottom: 4 }}>
                    Recommendation
                  </span>
                  <span className="text-primary font-bold">{x.recommendation || 'No recommendation provided.'}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ padding: 60, textAlign: 'center', color: 'var(--muted)' }}>
             <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.2, marginBottom: 16 }}>
              <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            <div style={{ fontSize: 14, fontWeight: 500 }}>Awaiting Intelligence</div>
            <div style={{ fontSize: 12, marginTop: 4 }}>Run a refresh to generate fresh insights.</div>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .insight-card:hover { border-color: rgba(46, 233, 166, 0.3); background: rgba(46, 233, 166, 0.03); transform: translateX(4px); }
      `}} />
    </div>
  )
}
