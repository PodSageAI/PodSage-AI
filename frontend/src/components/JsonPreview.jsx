import React from 'react'

export default function JsonPreview({ data, title }) {
  return (
    <div className="card" style={{ padding: 24 }}>
      <div className="sectionTitle">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        </svg>
        <h2>{title || 'Raw Data'}</h2>
        <div className="badge" style={{ marginLeft: 'auto' }}>JSON</div>
      </div>
      
      <div style={{ 
        background: 'rgba(0,0,0,0.2)', 
        borderRadius: 12, 
        padding: 16, 
        border: '1px solid var(--border)',
        overflow: 'auto',
        maxHeight: 400
      }}>
        <pre
          style={{
            margin: 0,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            color: 'var(--muted)',
            fontSize: 12,
            fontFamily: 'monospace',
            lineHeight: 1.6
          }}
        >
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>
  )
}
