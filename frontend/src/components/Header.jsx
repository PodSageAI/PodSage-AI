import React from 'react'

export default function Header({ onRefresh, loading }) {
  return (
    <header className="header-glass">
      <div className="container" style={{ padding: '16px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 16,
                background: 'linear-gradient(135deg, var(--brand), var(--brand2))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 20px rgba(124, 92, 255, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <div>
              <div className="font-lg font-black" style={{ letterSpacing: '-0.03em', background: 'linear-gradient(to right, #fff, #888)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                PodSage AI
              </div>
              <div className="text-muted font-xs font-bold uppercase">
                Kubernetes Intelligence Dashboard
              </div>
            </div>
          </div>


          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ textAlign: 'right', display: 'none', '@media (min-width: 768px)': { display: 'block' } }}>
              <div className="text-muted font-xs font-bold uppercase" style={{ opacity: 0.7 }}>
                Last Updated
              </div>
              <div className="font-sm font-bold" style={{ color: 'var(--brand2)' }}>
                {new Date().toISOString().split('T')[1].split('.')[0]} UTC
              </div>
            </div>

            <button className="btn btnPrimary" onClick={onRefresh} disabled={loading}>

              {loading ? (
                <>
                  <svg className="spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                    <path d="M12 2a10 10 0 0 1 10 10" />
                  </svg>
                  Refreshing...
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                  </svg>
                  Refresh Now
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .spinner { animation: spin 0.8s linear infinite; }
      `}} />
    </header>
  )
}
