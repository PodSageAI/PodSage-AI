import React from 'react'
import { formatUnknown } from '../utils/metrics'

export default function AnomalyTable({ anomalies, loading }) {
  return (
    <div className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
      <div className="sectionTitle">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--danger)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01" />
        </svg>
        <h2>Anomalies Detected</h2>
        <div className="badge" style={{ marginLeft: 'auto', background: 'rgba(255, 77, 109, 0.1)', color: 'var(--danger)', borderColor: 'rgba(255, 77, 109, 0.2)' }}>
          {anomalies?.length ?? 0} Critical
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'auto', minHeight: 300, maxHeight: 450 }}>
        {loading ? (
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--muted)' }}>
            <div className="spinner" style={{ margin: '0 auto 12px', width: 24, height: 24, border: '3px solid rgba(255,255,255,0.1)', borderTopColor: 'var(--brand)', borderRadius: '50%' }} />
            Analyzing telemetry data...
          </div>
        ) : anomalies?.length ? (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>

            <thead>
              <tr style={{ textAlign: 'left', color: 'var(--muted)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '12px 10px', borderBottom: '1px solid var(--border)' }}>Event Type</th>
                <th style={{ padding: '12px 10px', borderBottom: '1px solid var(--border)' }}>Resource / Pod</th>
                <th style={{ padding: '12px 10px', borderBottom: '1px solid var(--border)' }}>Status</th>
                <th style={{ padding: '12px 10px', borderBottom: '1px solid var(--border)', textAlign: 'right' }}>Severity</th>
              </tr>
            </thead>
            <tbody>
              {anomalies.map((a, idx) => (
                <tr key={idx} className="table-row-hover" style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <td style={{ padding: '16px 10px' }}>
                    <div style={{ fontWeight: 700, color: '#fff', fontSize: 14 }}>{a.type || 'Unknown'}</div>
                  </td>
                  <td style={{ padding: '16px 10px' }}>
                    <div style={{ color: 'var(--muted)', fontSize: 13, fontFamily: 'monospace' }}>{formatUnknown(a.pod)}</div>
                  </td>
                  <td style={{ padding: '16px 10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ 
                        width: 6, height: 6, borderRadius: '50%', 
                        background: a.status === 'Critical' ? '#ff4d6d' : '#ffb020',
                        boxShadow: `0 0 6px ${a.status === 'Critical' ? '#ff4d6d' : '#ffb020'}`
                      }} />
                      <span style={{ fontSize: 12, fontWeight: 600, color: a.status === 'Critical' ? '#ff4d6d' : '#ffb020' }}>
                        {a.status || 'Warning'}
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: '16px 10px', textAlign: 'right' }}>
                    <span className="badge" style={{ 
                      background: a.severity === 'HIGH' ? 'rgba(255, 77, 109, 0.15)' : 'rgba(255, 176, 32, 0.15)', 
                      color: a.severity === 'HIGH' ? '#ff4d6d' : '#ffb020',
                      borderColor: a.severity === 'HIGH' ? 'rgba(255, 77, 109, 0.3)' : 'rgba(255, 176, 32, 0.3)',
                      fontSize: 10,
                      fontWeight: 800
                    }}>
                      {a.severity || 'MEDIUM'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        ) : (
          <div style={{ padding: 60, textAlign: 'center', color: 'var(--muted)' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.2, marginBottom: 16 }}>
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <div style={{ fontSize: 14, fontWeight: 500 }}>System Health Nominal</div>
            <div style={{ fontSize: 12, marginTop: 4 }}>No anomalies detected in the current window.</div>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .table-row-hover:hover { background: rgba(255, 255, 255, 0.02); }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .spinner { animation: spin 0.8s linear infinite; }
      `}} />
    </div>
  )
}
