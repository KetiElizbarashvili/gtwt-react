import { useEffect, useState } from 'react'

const DISMISS_KEY = 'gtw_pwa_dismissed'

function isStandalone() {
  return window.matchMedia('(display-mode: standalone)').matches
    || window.navigator.standalone === true
}

function isIOS() {
  const ua = window.navigator.userAgent
  return /iPad|iPhone|iPod/.test(ua) && !window.MSStream
}

export function PWAInstallModal() {
  const [visible, setVisible] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [platform, setPlatform] = useState(null) // 'android' | 'ios'

  useEffect(() => {
    if (isStandalone()) return
    if (localStorage.getItem(DISMISS_KEY) === '1') return

    function onBeforeInstall(e) {
      e.preventDefault()
      setDeferredPrompt(e)
      setPlatform('android')
      setTimeout(() => setVisible(true), 800)
    }
    window.addEventListener('beforeinstallprompt', onBeforeInstall)

    let timer
    if (isIOS()) {
      timer = setTimeout(() => {
        setPlatform('ios')
        setVisible(true)
      }, 800)
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall)
      if (timer) clearTimeout(timer)
    }
  }, [])

  function dismiss() {
    localStorage.setItem(DISMISS_KEY, '1')
    setVisible(false)
  }

  async function installAndroid() {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') localStorage.setItem(DISMISS_KEY, '1')
    setDeferredPrompt(null)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <>
      <style>{`
        .pwa-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.6); backdrop-filter:blur(6px); -webkit-backdrop-filter:blur(6px); z-index:2000; display:flex; align-items:flex-end; justify-content:center; animation:pwaFade 0.25s ease; }
        @keyframes pwaFade { from{opacity:0} to{opacity:1} }
        .pwa-sheet { width:100%; max-width:440px; background:rgba(8,11,32,0.98); border-top:1px solid rgba(0,253,255,0.2); border-radius:var(--radius-2xl) var(--radius-2xl) 0 0; padding:var(--space-6) var(--space-5) calc(var(--space-6) + env(safe-area-inset-bottom)); position:relative; animation:pwaSlide 0.3s ease; box-shadow:0 -24px 64px rgba(0,0,0,0.5); }
        @keyframes pwaSlide { from{transform:translateY(100%)} to{transform:translateY(0)} }
        .pwa-sheet::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg, var(--color-cyan), var(--color-violet), var(--color-magenta)); border-radius:var(--radius-2xl) var(--radius-2xl) 0 0; }
        .pwa-handle { width:36px; height:4px; background:rgba(255,255,255,0.2); border-radius:99px; margin:0 auto var(--space-4); }
        .pwa-icon-wrap { display:flex; justify-content:center; margin-bottom:var(--space-3); }
        .pwa-icon { width:56px; height:56px; border-radius:var(--radius-lg); background:linear-gradient(135deg, var(--color-cyan), var(--color-violet)); display:flex; align-items:center; justify-content:center; box-shadow:0 8px 24px rgba(0,253,255,0.25); }
        .pwa-title { font-family:var(--font-display); font-weight:700; font-size:1.25rem; text-align:center; margin-bottom:var(--space-2); }
        .pwa-subtitle { font-size:0.875rem; color:var(--color-text-muted); text-align:center; margin-bottom:var(--space-5); line-height:1.5; }
        .pwa-steps { display:flex; flex-direction:column; gap:var(--space-3); margin-bottom:var(--space-5); }
        .pwa-step { display:flex; align-items:center; gap:var(--space-3); padding:var(--space-3); background:rgba(255,255,255,0.03); border:1px solid var(--color-border); border-radius:var(--radius-md); font-size:0.875rem; }
        .pwa-step-num { width:24px; height:24px; border-radius:50%; background:rgba(0,253,255,0.12); color:var(--color-cyan); display:flex; align-items:center; justify-content:center; font-family:var(--font-display); font-weight:700; font-size:0.78rem; flex-shrink:0; }
        .pwa-step-icon { color:var(--color-cyan); flex-shrink:0; }
        .pwa-actions { display:flex; flex-direction:column; gap:var(--space-2); }
        .pwa-skip { background:none; border:none; color:var(--color-text-muted); font-size:0.82rem; cursor:pointer; padding:var(--space-2); font-family:inherit; }
        .pwa-skip:hover { color:var(--color-text-primary); }
      `}</style>

      <div className="pwa-overlay" onClick={dismiss} role="dialog" aria-modal="true" aria-labelledby="pwa-title">
        <div className="pwa-sheet" onClick={e => e.stopPropagation()}>
          <div className="pwa-handle"></div>

          <div className="pwa-icon-wrap">
            <div className="pwa-icon">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#000016" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16"/>
              </svg>
            </div>
          </div>

          <div id="pwa-title" className="pwa-title">Install GTW Speaker Hub</div>
          <div className="pwa-subtitle">
            Add to your home screen for instant access during the event — no browser bar, faster launch.
          </div>

          {platform === 'ios' ? (
            <>
              <div className="pwa-steps">
                <div className="pwa-step">
                  <span className="pwa-step-num">1</span>
                  <span style={{ flex: 1 }}>Tap the <strong>Share</strong> button</span>
                  <svg className="pwa-step-icon" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12v-1a4 4 0 014-4m0 0V3m0 4l-3-3m3 3l3-3m6 14v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2"/></svg>
                </div>
                <div className="pwa-step">
                  <span className="pwa-step-num">2</span>
                  <span style={{ flex: 1 }}>Scroll and tap <strong>Add to Home Screen</strong></span>
                  <svg className="pwa-step-icon" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
                </div>
                <div className="pwa-step">
                  <span className="pwa-step-num">3</span>
                  <span style={{ flex: 1 }}>Tap <strong>Add</strong> — done!</span>
                  <svg className="pwa-step-icon" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                </div>
              </div>
              <div className="pwa-actions">
                <button className="pwa-skip" onClick={dismiss}>Maybe later</button>
              </div>
            </>
          ) : (
            <div className="pwa-actions">
              <button className="btn btn-primary btn-block" onClick={installAndroid} disabled={!deferredPrompt}>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16"/></svg>
                Install App
              </button>
              <button className="pwa-skip" onClick={dismiss}>Maybe later</button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
