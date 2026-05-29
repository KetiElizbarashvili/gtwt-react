import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GtwLogo } from '../components/GtwLogo'

export default function ProfilePage() {
  const navigate = useNavigate()

  useEffect(() => {
    if (sessionStorage.getItem('gtw_logged_in') !== '1') navigate('/login')
  }, [navigate])

  return (
    <>
      <style>{`
        .profile-shell { display:flex; height:100dvh; overflow:hidden; background:var(--color-bg); }
        .profile-sidebar { width:220px; flex-shrink:0; background:var(--color-surface); border-right:1px solid var(--color-border); display:flex; flex-direction:column; padding:var(--space-5); gap:var(--space-4); overflow-y:auto; }
        .profile-main { flex:1; overflow-y:auto; padding:var(--space-6); display:flex; flex-direction:column; gap:var(--space-5); }
        .profile-card { background:var(--color-surface); border:1px solid var(--color-border); border-radius:var(--radius-xl); padding:var(--space-6); }
        .profile-hero { display:flex; gap:var(--space-5); align-items:flex-start; flex-wrap:wrap; }
        .profile-name { font-family:var(--font-display); font-size:1.5rem; font-weight:700; margin-bottom:4px; }
        .profile-role { color:var(--color-text-muted); font-size:0.9rem; margin-bottom:var(--space-3); }
        .profile-tags { display:flex; gap:var(--space-2); flex-wrap:wrap; }
        .profile-section-title { font-family:var(--font-display); font-size:0.8rem; letter-spacing:0.1em; text-transform:uppercase; color:var(--color-text-muted); margin-bottom:var(--space-3); }
        .profile-bio { font-size:0.9rem; line-height:1.7; color:var(--color-text-primary); }
        .stat-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(120px,1fr)); gap:var(--space-3); }
        .stat-item { background:var(--color-bg); border:1px solid var(--color-border); border-radius:var(--radius-lg); padding:var(--space-4); text-align:center; }
        .stat-value { font-family:var(--font-display); font-size:1.5rem; font-weight:700; color:var(--color-cyan); }
        .stat-label { font-size:0.72rem; color:var(--color-text-muted); margin-top:2px; text-transform:uppercase; letter-spacing:0.06em; }
        .session-row { display:flex; gap:var(--space-3); align-items:center; padding:var(--space-3) 0; border-bottom:1px solid var(--color-border); }
        .session-row:last-child { border-bottom:none; }
        .session-time { font-family:var(--font-display); font-size:0.75rem; color:var(--color-cyan); width:80px; flex-shrink:0; }
        .session-title { font-size:0.88rem; font-weight:600; }
        .session-stage { font-size:0.75rem; color:var(--color-text-muted); }
        .form-row { display:flex; flex-direction:column; gap:var(--space-1); }
        .pf-sidebar-nav a,.pf-sidebar-nav button { display:flex; align-items:center; gap:var(--space-3); padding:10px 12px; border-radius:var(--radius-md); color:var(--color-text-muted); font-size:0.875rem; text-decoration:none; cursor:pointer; background:none; border:none; width:100%; transition:background var(--transition),color var(--transition); }
        .pf-sidebar-nav a:hover,.pf-sidebar-nav button:hover { background:rgba(255,255,255,0.04); color:var(--color-text-primary); }
        .pf-sidebar-nav a.active { background:rgba(0,253,255,0.08); color:var(--color-cyan); }
        .profile-mobile-topbar { display:none; align-items:center; justify-content:space-between; padding:0 var(--space-4); height:56px; background:var(--color-surface); border-bottom:1px solid var(--color-border); flex-shrink:0; position:sticky; top:0; z-index:20; }
        .profile-mobile-topbar-title { font-family:var(--font-display); font-size:0.95rem; font-weight:700; }
        @media(max-width:640px) {
          .profile-sidebar { display:none; }
          .profile-mobile-topbar { display:flex; }
          .profile-main { padding:var(--space-4); padding-bottom:calc(var(--space-4) + 60px + env(safe-area-inset-bottom)); }
          .profile-hero { flex-direction:column; align-items:center; text-align:center; }
        }
      `}</style>

      <div className="profile-shell">
        {/* Sidebar */}
        <aside className="profile-sidebar">
          <div style={{ paddingBottom:'var(--space-4)', borderBottom:'1px solid var(--color-border)' }}>
            <GtwLogo size="sidebar" />
          </div>
          <nav className="pf-sidebar-nav" style={{ display:'flex', flexDirection:'column', gap:4 }}>
            <Link to="/app">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
              Chat Hub
            </Link>
            <Link to="/directory">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              Directory
            </Link>
            <Link to="/profile" className="active">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
              My Profile
            </Link>
          </nav>
          <div style={{ marginTop:'auto' }}>
            <button
              onClick={() => { sessionStorage.clear(); navigate('/login') }}
              className="btn btn-ghost btn-sm"
              style={{ width:'100%' }}
            >
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main — flex column wraps sticky topbar + scrollable content */}
        <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
        <div className="profile-mobile-topbar">
          <GtwLogo size="sidebar" />
          <span className="profile-mobile-topbar-title">My Profile</span>
          <button
            onClick={() => { sessionStorage.clear(); window.location.href='/login' }}
            style={{ background:'none', border:'none', cursor:'pointer', color:'var(--color-text-muted)', fontSize:'0.75rem', fontFamily:'var(--font-label)', letterSpacing:'0.06em', textTransform:'uppercase' }}
          >Sign Out</button>
        </div>
        <div className="profile-main" style={{ flex:1, overflowY:'auto' }}>

          {/* Hero card */}
          <div className="profile-card" style={{ background: `linear-gradient(135deg, rgba(0,253,255,0.04) 0%, transparent 60%), var(--color-surface)` }}>
            <div className="profile-hero">
              <div className="avatar-wrap" style={{ flexShrink:0 }}>
                <img src="https://i.pravatar.cc/80?img=47" alt="Ana Beridze" className="avatar" style={{ width:80, height:80, borderRadius:'50%', border:'3px solid rgba(0,253,255,0.3)' }} />
                <span className="presence-dot" style={{ width:16, height:16, borderWidth:3 }}></span>
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div className="profile-name">Ana Beridze</div>
                <div className="profile-role">AI Researcher · DeepMind · Georgia & UK</div>
                <div className="profile-tags">
                  <span style={{ display:'inline-flex', alignItems:'center', padding:'3px 10px', borderRadius:'var(--radius-full)', background:'rgba(0,253,255,0.08)', color:'var(--color-cyan)', border:'1px solid rgba(0,253,255,0.2)', fontSize:'0.7rem', letterSpacing:'0.06em', textTransform:'uppercase' }}>AI Stage</span>
                  <span style={{ display:'inline-flex', alignItems:'center', padding:'3px 10px', borderRadius:'var(--radius-full)', background:'rgba(195,251,26,0.08)', color:'var(--color-lime)', border:'1px solid rgba(195,251,26,0.2)', fontSize:'0.7rem', letterSpacing:'0.06em', textTransform:'uppercase' }}>Speaker</span>
                </div>
              </div>
              <button className="btn btn-outline btn-sm">Edit Profile</button>
            </div>
          </div>

          {/* Stats */}
          <div className="stat-grid">
            {[
              { value: '200+', label: 'Speakers' },
              { value: '5',    label: 'Stages' },
              { value: '80+',  label: 'Side Events' },
              { value: '10K+', label: 'Attendees' },
            ].map(s => (
              <div key={s.label} className="stat-item">
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Bio */}
          <div className="profile-card">
            <div className="profile-section-title">About</div>
            <p className="profile-bio">
              AI Researcher at DeepMind, working on multimodal foundation models and responsible AI deployment.
              Previously Google Brain. Obsessed with bridging the gap between cutting-edge research and real-world impact,
              especially in emerging markets. At GTW 2026 I'm speaking about practical LLM deployment patterns for resource-constrained environments.
            </p>
            <div style={{ marginTop:'var(--space-4)', display:'flex', gap:'var(--space-3)', flexWrap:'wrap' }}>
              {['#AI', '#LLMs', '#ResponsibleAI', '#Georgia', '#FoundationModels'].map(tag => (
                <span key={tag} style={{ fontSize:'0.78rem', color:'var(--color-text-muted)', cursor:'pointer' }}>{tag}</span>
              ))}
            </div>
          </div>

          {/* Sessions */}
          <div className="profile-card">
            <div className="profile-section-title">My Sessions at GTW 2026</div>
            <div>
              {[
                { time: 'June 19 · 14:30', title: 'Building Production LLM Apps', stage: 'AI Stage · Factory Tbilisi' },
                { time: 'June 20 · 11:00', title: 'Panel: AI in Emerging Markets', stage: 'Main Stage' },
                { time: 'June 21 · 16:00', title: 'Workshop: Fine-tuning on a Budget', stage: 'Workshop Room B' },
              ].map(s => (
                <div key={s.time} className="session-row">
                  <div className="session-time">{s.time}</div>
                  <div>
                    <div className="session-title">{s.title}</div>
                    <div className="session-stage">{s.stage}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Settings */}
          <div className="profile-card">
            <div className="profile-section-title">Account Settings</div>
            <div style={{ display:'flex', flexDirection:'column', gap:'var(--space-4)' }}>
              <div className="form-row">
                <label className="form-label">Display Name</label>
                <input className="form-input" defaultValue="Ana Beridze" />
              </div>
              <div className="form-row">
                <label className="form-label">Email</label>
                <input className="form-input" type="email" defaultValue="ana.beridze@deepmind.com" />
              </div>
              <div className="form-row">
                <label className="form-label">Bio</label>
                <textarea className="form-input" rows={3} style={{ resize:'vertical' }} defaultValue="AI Researcher at DeepMind. Speaker, GTW Tbilisi 2026." />
              </div>
              <button className="btn btn-primary" style={{ alignSelf:'flex-start' }}>Save Changes</button>
            </div>
          </div>

        </div>{/* end profile-main */}
        </div>{/* end flex column wrapper */}
      </div>{/* end profile-shell */}

      {/* Mobile bottom nav */}
      <nav className="mobile-nav">
        <div className="mobile-nav-inner">
          <Link to="/app" className="mobile-nav-item">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
            <span>Channels</span>
          </Link>
          <Link to="/directory" className="mobile-nav-item">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            <span>Speakers</span>
          </Link>
          <Link to="/profile" className="mobile-nav-item active">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
            <span>Profile</span>
          </Link>
        </div>
      </nav>
    </>
  )
}
