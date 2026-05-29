import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { GtwLogo } from '../components/GtwLogo'

export default function LoginPage() {
  const navigate = useNavigate()
  const [tab, setTab]           = useState('signin')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw]     = useState(false)
  const [error, setError]       = useState(false)
  const [loading, setLoading]   = useState(false)
  const [phase, setPhase]       = useState('login') // 'login' | 'newpw'
  const [newPw, setNewPw]       = useState('')
  const [confirmPw, setConfirmPw] = useState('')
  const [strength, setStrength] = useState(0)
  const [pwMatch, setPwMatch]   = useState(true)
  const [resetEmail, setResetEmail] = useState('')
  const [resetSent, setResetSent] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('gtw_logged_in') === '1') navigate('/app')
  }, [navigate])

  function calcStrength(val) {
    let s = 0
    if (val.length >= 8) s++
    if (/[A-Z]/.test(val)) s++
    if (/[0-9]/.test(val)) s++
    if (/[^A-Za-z0-9]/.test(val)) s++
    return s
  }

  function handleSignIn() {
    if (!email || !password) { setError(true); return }
    setError(false)
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      const seenNewPw = sessionStorage.getItem('gtw_seen_newpw')
      if (!seenNewPw) {
        setPhase('newpw')
        sessionStorage.setItem('gtw_seen_newpw', '1')
      } else {
        sessionStorage.setItem('gtw_logged_in', '1')
        navigate('/app')
      }
    }, 900)
  }

  function handleSetPassword() {
    if (newPw !== confirmPw) { setPwMatch(false); return }
    setPwMatch(true)
    sessionStorage.setItem('gtw_logged_in', '1')
    navigate('/app')
  }

  function handleReset() {
    setResetSent(true)
  }

  const strengthColors = ['', 'var(--color-magenta)', 'var(--color-cyan)', 'var(--color-cyan)', 'var(--color-lime)']
  const strengthLabels = ['', 'Weak — add uppercase, numbers, symbols.', 'Fair — getting there.', 'Good password.', 'Strong password ✓']

  return (
    <div className="login-page" style={{
      minHeight: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--space-5)',
      background: `
        radial-gradient(ellipse 600px 400px at 10% 90%, rgba(193,61,255,0.14) 0%, transparent 70%),
        radial-gradient(ellipse 500px 350px at 90% 10%, rgba(0,253,255,0.08) 0%, transparent 70%),
        radial-gradient(ellipse 400px 300px at 50% 50%, rgba(26,60,251,0.06) 0%, transparent 70%),
        var(--color-bg)`
    }}>
      <style>{`
        .login-card {
          width: 100%; max-width: 420px;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xl);
          padding: var(--space-8);
          position: relative; overflow: hidden;
          animation: slideIn 0.4s ease;
        }
        .login-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, var(--color-cyan), var(--color-violet), var(--color-magenta));
        }
        @keyframes slideIn { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        .tabs { display:flex; background:var(--color-bg); border:1px solid var(--color-border); border-radius:var(--radius-md); padding:3px; margin-bottom:var(--space-5); }
        .tab-btn { flex:1; height:36px; background:none; border:none; border-radius:var(--radius-sm); color:var(--color-text-muted); font-family:var(--font-label); font-size:0.7rem; letter-spacing:0.06em; text-transform:uppercase; cursor:pointer; transition:background var(--transition),color var(--transition); }
        .tab-btn.active { background:var(--color-surface); color:var(--color-text-primary); }
        .alert { padding:var(--space-3) var(--space-4); border-radius:var(--radius-md); font-size:0.875rem; display:flex; align-items:flex-start; gap:var(--space-2); }
        .alert-error { background:rgba(255,0,64,0.08); border:1px solid rgba(255,0,64,0.25); color:var(--color-magenta); }
        .alert-info  { background:rgba(0,253,255,0.06); border:1px solid rgba(0,253,255,0.2); color:var(--color-cyan); }
        .alert-success { background:rgba(195,251,26,0.06); border:1px solid rgba(195,251,26,0.2); color:var(--color-lime); }
        .input-with-toggle { position:relative; }
        .input-with-toggle .form-input { padding-right:48px; }
        .pw-toggle { position:absolute; right:4px; top:50%; transform:translateY(-50%); background:none; border:none; cursor:pointer; color:var(--color-text-muted); width:36px; height:36px; display:flex; align-items:center; justify-content:center; border-radius:var(--radius-md); }
        .pw-strength-bar { height:3px; background:var(--color-border); border-radius:99px; overflow:hidden; margin-top:6px; }
        .pw-strength-fill { height:100%; border-radius:99px; transition:width 0.3s ease,background 0.3s ease; }
        .step-pill { display:inline-flex; align-items:center; gap:var(--space-2); background:rgba(195,251,26,0.1); border:1px solid rgba(195,251,26,0.25); border-radius:var(--radius-full); padding:4px 12px; font-family:var(--font-label); font-size:0.65rem; letter-spacing:0.08em; color:var(--color-lime); }
        .demo-hint { text-align:center; font-size:0.75rem; color:var(--color-text-muted); margin-top:var(--space-4); padding:var(--space-3); background:rgba(0,253,255,0.04); border-radius:var(--radius-md); border:1px dashed rgba(0,253,255,0.15); }
        .event-badge { margin-top:var(--space-6); font-size:0.75rem; color:var(--color-text-muted); text-align:center; display:flex; align-items:center; gap:var(--space-2); justify-content:center; }
        .event-badge strong { color:var(--color-text-primary); }
        .btn-loading { position:relative; color:transparent!important; pointer-events:none; }
        .btn-loading::after { content:''; position:absolute; width:18px; height:18px; border:2px solid transparent; border-top-color:var(--color-bg); border-radius:50%; animation:spin 0.7s linear infinite; }
        @keyframes spin { to { transform:rotate(360deg); } }
      `}</style>

      {phase === 'login' ? (
        <div className="login-card">
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'var(--space-3)', marginBottom:'var(--space-6)', textAlign:'center' }}>
            <GtwLogo size="large" />
            <div style={{ fontSize:'0.875rem', color:'var(--color-text-muted)' }}>Speaker Hub — Private Platform</div>
          </div>

          <div className="tabs">
            <button className={`tab-btn${tab === 'signin' ? ' active' : ''}`} onClick={() => setTab('signin')}>Sign In</button>
            <button className={`tab-btn${tab === 'forgot' ? ' active' : ''}`} onClick={() => setTab('forgot')}>Forgot Password</button>
          </div>

          {tab === 'signin' && (
            <div style={{ display:'flex', flexDirection:'column', gap:'var(--space-4)' }}>
              {error && (
                <div className="alert alert-error">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ flexShrink:0 }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>
                  Please enter your email and password.
                </div>
              )}
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input className="form-input" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" />
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="input-with-toggle">
                  <input className="form-input" type={showPw ? 'text' : 'password'} placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" onKeyDown={e => e.key === 'Enter' && handleSignIn()} />
                  <button type="button" className="pw-toggle" onClick={() => setShowPw(p => !p)}>
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                  </button>
                </div>
              </div>
              <button className={`btn btn-primary btn-block${loading ? ' btn-loading' : ''}`} onClick={handleSignIn}>
                Sign In
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </button>
              <div className="demo-hint"><strong>Demo mode</strong> — type any email &amp; password and hit Sign In</div>
            </div>
          )}

          {tab === 'forgot' && (
            <div style={{ display:'flex', flexDirection:'column', gap:'var(--space-4)' }}>
              <div className="alert alert-info">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ flexShrink:0 }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                Enter the email from your invite. We'll send a reset link within 2 minutes.
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input className="form-input" type="email" placeholder="you@example.com" value={resetEmail} onChange={e => setResetEmail(e.target.value)} />
              </div>
              <button className="btn btn-primary btn-block" onClick={handleReset}>Send Reset Link</button>
              {resetSent && (
                <div className="alert alert-success">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                  Reset link sent! Check your inbox.
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="login-card">
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'var(--space-3)', marginBottom:'var(--space-6)', textAlign:'center' }}>
            <span className="step-pill">
              <svg width="10" height="10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
              First Login — Set Your Password
            </span>
            <div>
              <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'1.5rem' }}>Welcome, Ana!</div>
              <div style={{ fontSize:'0.875rem', color:'var(--color-text-muted)' }}>Create a permanent password to continue</div>
            </div>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:'var(--space-4)' }}>
            <div className="form-group">
              <label className="form-label">New Password</label>
              <div className="input-with-toggle">
                <input className="form-input" type="password" placeholder="Minimum 8 characters" value={newPw} onChange={e => { setNewPw(e.target.value); setStrength(calcStrength(e.target.value)) }} />
              </div>
              {newPw && (
                <>
                  <div className="pw-strength-bar">
                    <div className="pw-strength-fill" style={{ width: `${strength * 25}%`, background: strengthColors[strength] }} />
                  </div>
                  <div className="form-hint" style={{ color: strengthColors[strength] }}>{strengthLabels[strength]}</div>
                </>
              )}
            </div>
            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input className="form-input" type="password" placeholder="Repeat new password" value={confirmPw} onChange={e => setConfirmPw(e.target.value)} />
              {!pwMatch && <div className="form-error">Passwords don't match.</div>}
            </div>
            <button className="btn btn-lime btn-block" onClick={handleSetPassword}>
              Set Password &amp; Enter Hub
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
            </button>
          </div>
        </div>
      )}

      <div className="event-badge">
        <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
        <strong>GTW Tbilisi 2026</strong>&nbsp;·&nbsp;June 19–21&nbsp;·&nbsp;Factory Tbilisi
      </div>
    </div>
  )
}
