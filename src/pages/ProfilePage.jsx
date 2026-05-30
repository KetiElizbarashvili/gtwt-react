import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GtwLogo } from '../components/GtwLogo'
import { TopBarUser } from '../components/TopBarUser'
import { TopBarActions } from '../components/TopBarActions'
import { MobileNav } from '../components/MobileNav'

export default function ProfilePage() {
  const navigate = useNavigate()

  useEffect(() => {
    if (sessionStorage.getItem('gtw_logged_in') !== '1') navigate('/login')
  }, [navigate])

  return (
    <>
      <style>{`
        .profile-shell { display:flex; height:100vh; height:100dvh; overflow:hidden; background:var(--color-bg); }
        .profile-sidebar {
          width:220px; flex-shrink:0;
          background:rgba(8,11,32,0.9);
          backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px);
          border-right:1px solid rgba(255,255,255,0.06);
          display:flex; flex-direction:column; padding:var(--space-5); gap:var(--space-4); overflow-y:auto;
        }
        .profile-main { flex:1; overflow-y:auto; padding:var(--space-6); display:flex; flex-direction:column; gap:var(--space-5); }
        .profile-card {
          background:rgba(8,11,32,0.75);
          backdrop-filter:blur(16px); -webkit-backdrop-filter:blur(16px);
          border:1px solid rgba(255,255,255,0.07);
          border-radius:var(--radius-xl); padding:var(--space-6);
          transition:border-color var(--transition);
        }
        .profile-card:hover { border-color:rgba(0,253,255,0.12); }
        .profile-hero { display:flex; gap:var(--space-5); align-items:flex-start; flex-wrap:wrap; }
        .profile-name { font-family:var(--font-display); font-size:1.5rem; font-weight:700; margin-bottom:4px; }
        .profile-role { color:var(--color-text-muted); font-size:0.9rem; margin-bottom:var(--space-3); }
        .profile-tags { display:flex; gap:var(--space-2); flex-wrap:wrap; }
        .profile-section-title { font-family:var(--font-display); font-size:0.8rem; letter-spacing:0.1em; text-transform:uppercase; color:var(--color-text-muted); margin-bottom:var(--space-4); display:flex; align-items:center; gap:var(--space-2); }
        .profile-section-title::after { content:''; flex:1; height:1px; background:var(--color-border); }
        .profile-bio { font-size:0.9rem; line-height:1.7; color:var(--color-text-primary); }
        .stat-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(120px,1fr)); gap:var(--space-3); }
        .stat-item {
          background:rgba(0,0,0,0.3);
          border:1px solid rgba(255,255,255,0.06);
          border-radius:var(--radius-lg); padding:var(--space-4); text-align:center;
          transition:border-color var(--transition);
        }
        .stat-item:hover { border-color:rgba(0,253,255,0.2); }
        .stat-value { font-family:var(--font-display); font-size:1.5rem; font-weight:700; color:var(--color-cyan); }
        .stat-label { font-size:0.72rem; color:var(--color-text-muted); margin-top:2px; text-transform:uppercase; letter-spacing:0.06em; }
        .session-row { display:flex; gap:var(--space-3); align-items:flex-start; padding:var(--space-4) 0; border-bottom:1px solid rgba(255,255,255,0.05); transition:background var(--transition); border-radius:var(--radius-md); padding-left:var(--space-2); padding-right:var(--space-2); }
        .session-row:last-child { border-bottom:none; }
        .session-row:hover { background:rgba(0,253,255,0.03); }
        .session-time { font-family:var(--font-display); font-size:0.75rem; color:var(--color-cyan); width:90px; flex-shrink:0; padding-top:2px; }
        .session-title { font-size:0.88rem; font-weight:600; margin-bottom:2px; }
        .session-stage { font-size:0.75rem; color:var(--color-text-muted); }
        .form-row { display:flex; flex-direction:column; gap:var(--space-1); }
        .pf-sidebar-nav a,.pf-sidebar-nav button { display:flex; align-items:center; gap:var(--space-3); padding:10px 12px; border-radius:var(--radius-md); color:var(--color-text-muted); font-size:0.875rem; text-decoration:none; cursor:pointer; background:none; border:none; width:100%; transition:background var(--transition),color var(--transition); }
        .pf-sidebar-nav a:hover,.pf-sidebar-nav button:hover { background:rgba(255,255,255,0.04); color:var(--color-text-primary); }
        .pf-sidebar-nav a.active { background:rgba(0,253,255,0.08); color:var(--color-cyan); }
        .profile-mobile-topbar {
          display:none; align-items:center; justify-content:flex-end;
          padding:env(safe-area-inset-top) var(--space-4) 0; min-height:56px;
          background:rgba(8,11,32,0.9); backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px);
          border-bottom:1px solid rgba(255,255,255,0.06);
          flex-shrink:0; position:sticky; top:0; z-index:20;
        }
        .profile-topbar-logo { position:absolute; left:50%; transform:translateX(-50%); }
        .session-badge { display:inline-flex; align-items:center; gap:4px; padding:2px 8px; background:rgba(0,253,255,0.08); color:var(--color-cyan); border:1px solid rgba(0,253,255,0.2); border-radius:var(--radius-full); font-size:0.65rem; letter-spacing:0.06em; text-transform:uppercase; font-weight:600; }
        @media(max-width:640px) {
          .profile-sidebar { display:none; }
          .pf-topbar { display:none; }
          .profile-mobile-topbar { display:flex; }
          .profile-main { padding:var(--space-4) var(--space-3); padding-bottom:calc(var(--space-4) + 60px + env(safe-area-inset-bottom)); }
          .profile-card { padding:var(--space-4); }
          .profile-hero { flex-direction:column; align-items:center; text-align:center; }
        }
      `}</style>

      <div className="profile-shell">
        <aside className="profile-sidebar">
          <div style={{ paddingBottom:'var(--space-4)', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
            <GtwLogo size="sidebar" />
          </div>
          <nav className="pf-sidebar-nav" style={{ display:'flex', flexDirection:'column', gap:4 }}>
            <Link to="/directory">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              Speakers
            </Link>
            <Link to="/app">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
              Channels &amp; DMs
            </Link>
          </nav>
          <div style={{ marginTop:'auto' }}>
            <button onClick={() => { sessionStorage.clear(); navigate('/login') }} className="btn btn-ghost btn-sm" style={{ width:'100%' }}>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
              Sign Out
            </button>
          </div>
        </aside>

        <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
          <div className="profile-mobile-topbar">
            <span className="profile-topbar-logo"><GtwLogo size="sidebar" /></span>
            <button onClick={() => { sessionStorage.clear(); window.location.href='/login' }} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--color-text-muted)', fontSize:'0.75rem', fontFamily:'var(--font-label)', letterSpacing:'0.06em', textTransform:'uppercase' }}>
              Sign Out
            </button>
          </div>

          {/* Desktop topbar */}
          <header className="topbar pf-topbar">
            <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:'var(--space-3)' }}>
              <TopBarActions />
              <TopBarUser />
            </div>
          </header>

          <div className="profile-main" style={{ flex:1, overflowY:'auto' }}>

            {/* Hero */}
            <div className="profile-card" style={{ background:'linear-gradient(135deg, rgba(0,253,255,0.06) 0%, rgba(8,11,32,0.85) 60%)' }}>
              <div className="profile-hero">
                <div className="avatar-wrap" style={{ flexShrink:0 }}>
                  <img src="/speakers/keto.png" alt="Keto Elizbarashvili" className="avatar" style={{ width:80, height:80, borderRadius:'50%', border:'3px solid rgba(0,253,255,0.35)', boxShadow:'0 0 24px rgba(0,253,255,0.2)' }} />
                  <span className="presence-dot" style={{ width:16, height:16, borderWidth:3 }}></span>
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div className="profile-name">Keto Elizbarashvili</div>
                  <div className="profile-role">AI Researcher · DeepMind · Georgia &amp; UK</div>
                  <div className="profile-tags">
                    <span style={{ display:'inline-flex', alignItems:'center', padding:'3px 10px', borderRadius:'var(--radius-full)', background:'rgba(0,253,255,0.08)', color:'var(--color-cyan)', border:'1px solid rgba(0,253,255,0.2)', fontSize:'0.7rem', letterSpacing:'0.06em', textTransform:'uppercase' }}>AI Stage</span>
                    <span style={{ display:'inline-flex', alignItems:'center', padding:'3px 10px', borderRadius:'var(--radius-full)', background:'rgba(195,251,26,0.08)', color:'var(--color-lime)', border:'1px solid rgba(195,251,26,0.2)', fontSize:'0.7rem', letterSpacing:'0.06em', textTransform:'uppercase' }}>Speaker</span>
                  </div>
                </div>
                <button className="btn btn-ghost btn-sm">Edit Profile</button>
              </div>
            </div>

            {/* #8: Sessions FIRST */}
            <div className="profile-card">
              <div className="profile-section-title">My Sessions at GTW 2026</div>
              <div>
                {[
                  { time: 'June 19 · 14:30', title: 'Building Production LLM Apps', stage: 'AI Stage · Factory Tbilisi', tag: 'Talk' },
                  { time: 'June 20 · 11:00', title: 'Panel: AI in Emerging Markets', stage: 'Main Stage', tag: 'Panel' },
                  { time: 'June 21 · 16:00', title: 'Workshop: Fine-tuning on a Budget', stage: 'Workshop Room B', tag: 'Workshop' },
                ].map(s => (
                  <div key={s.time} className="session-row">
                    <div className="session-time">{s.time}</div>
                    <div style={{ flex:1 }}>
                      <div className="session-title">{s.title}</div>
                      <div className="session-stage">{s.stage}</div>
                    </div>
                    <span className="session-badge">{s.tag}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* #8: About SECOND */}
            <div className="profile-card">
              <div className="profile-section-title">About</div>
              <p className="profile-bio">
                AI Researcher at DeepMind, working on multimodal foundation models and responsible AI deployment.
                Previously Google Brain. Obsessed with bridging the gap between cutting-edge research and real-world impact,
                especially in emerging markets. At GTW 2026 I'm speaking about practical LLM deployment patterns for resource-constrained environments.
              </p>
              <div style={{ marginTop:'var(--space-4)', display:'flex', gap:'var(--space-3)', flexWrap:'wrap' }}>
                {['#AI', '#LLMs', '#ResponsibleAI', '#Georgia', '#FoundationModels'].map(tag => (
                  <span key={tag} style={{ fontSize:'0.78rem', color:'var(--color-text-muted)', cursor:'pointer', transition:'color var(--transition)' }}
                    onMouseEnter={e => e.target.style.color='var(--color-cyan)'}
                    onMouseLeave={e => e.target.style.color='var(--color-text-muted)'}
                  >{tag}</span>
                ))}
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

            {/* Settings */}
            <div className="profile-card">
              <div className="profile-section-title">Account Settings</div>
              <div style={{ display:'flex', flexDirection:'column', gap:'var(--space-4)' }}>
                <div className="form-row">
                  <label className="form-label">Display Name</label>
                  <input className="form-input" defaultValue="Keto Elizbarashvili" />
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

          </div>
        </div>
      </div>

      <MobileNav />
    </>
  )
}
