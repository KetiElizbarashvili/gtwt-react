import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GtwLogo } from '../components/GtwLogo'

const SPEAKERS = [
  { key: 'self',   name: 'Ana Beridze',         occ: 'AI Researcher · DeepMind',         stage: 'ai',             tag: 'AI',             avatar: 'https://i.pravatar.cc/64?img=47', online: true,  country: 'Georgia · UK',       bio: 'Researching multimodal AI systems. Previously at Google Brain. Passionate about responsible AI deployment in emerging markets.' },
  { key: 'giorgi', name: 'Giorgi Kvaratskhelia', occ: 'CEO · PayGe',                      stage: 'fintech',        tag: 'Fintech',        avatar: 'https://i.pravatar.cc/64?img=12', online: true,  country: 'Georgia',            bio: 'Serial founder, exits in fintech. Obsessed with removing friction from payments across emerging markets.' },
  { key: 'nino',   name: 'Nino Tabatadze',       occ: 'Founder · Chainhaus',              stage: 'web3',           tag: 'Web3',           avatar: 'https://i.pravatar.cc/64?img=32', online: true,  country: 'Georgia · Remote',   bio: 'Building DeFi infrastructure for the Black Sea region. EF fellow. Speaker at ETHGlobal 2024.' },
  { key: 'david',  name: 'David Lomidze',         occ: 'Managing Partner · Galt & Taggart',stage: 'venture',       tag: 'Venture',        avatar: 'https://i.pravatar.cc/64?img=55', online: false, country: 'Georgia',            bio: '25+ years in Georgian capital markets. Active angel in 14 startups across the Caucasus.' },
  { key: 'luka',   name: 'Luka Chikovaní',        occ: 'Creative Director · Studio Pixel', stage: 'creative-tech', tag: 'Creative Tech',  avatar: 'https://i.pravatar.cc/64?img=22', online: true,  country: 'Georgia · Armenia',  bio: 'Blending generative AI with traditional Georgian visual motifs to create a new design language.' },
  { key: 'sophie', name: 'Sophie Merabishvili',   occ: 'Head of Product · Tbilisi City Hall',stage:'urban-innovation',tag:'Urban Innovation',avatar:'https://i.pravatar.cc/64?img=61',online:true,  country: 'Georgia',            bio: 'Leading digital transformation of city services. Smart city. Open data. Civic tech advocate.' },
  { key: 'mari',   name: 'Mari Jikia',             occ: 'Operations Lead · GTW',            stage: '',               tag: null,             avatar: 'https://i.pravatar.cc/64?img=68', online: true,  country: 'GTW Team',           bio: 'GTW operations team. Your go-to person for logistics, speaker support, and event questions.', volunteer: true },
  { key: 'tato',   name: 'Tato Sulakvelidze',      occ: 'Founder · Gamify.ge',              stage: 'gaming',         tag: 'Gaming',         avatar: 'https://i.pravatar.cc/64?img=71', online: false, country: 'Georgia · Poland',   bio: 'Building the first Georgian indie game studio. Shipped 3 titles in 2 years. Community > marketing.' },
]

const STAGES = ['all', 'ai', 'fintech', 'web3', 'venture', 'creative-tech', 'urban-innovation', 'gaming']

export default function DirectoryPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [onlineOnly, setOnlineOnly] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('gtw_logged_in') !== '1') navigate('/login')
  }, [navigate])

  const filtered = SPEAKERS.filter(s => {
    if (onlineOnly && !s.online) return false
    if (filter !== 'all' && s.stage !== filter) return false
    if (search) {
      const q = search.toLowerCase()
      return s.name.toLowerCase().includes(q) || s.occ.toLowerCase().includes(q) || s.bio.toLowerCase().includes(q)
    }
    return true
  })

  function openDM(key) {
    if (key === 'self') { navigate('/profile'); return }
    sessionStorage.setItem('gtw_open_dm', key)
    navigate('/app')
  }

  return (
    <>
      <style>{`
        .dir-shell { display:flex; height:100dvh; overflow:hidden; background:var(--color-bg); }
        .dir-sidebar { width:220px; flex-shrink:0; background:var(--color-surface); border-right:1px solid var(--color-border); display:flex; flex-direction:column; padding:var(--space-5); gap:var(--space-4); overflow-y:auto; }
        .dir-sidebar-logo { padding-bottom:var(--space-4); border-bottom:1px solid var(--color-border); }
        .dir-main { flex:1; overflow-y:auto; display:flex; flex-direction:column; }
        .dir-header { padding:var(--space-6) var(--space-6) 0; border-bottom:1px solid var(--color-border); }
        .dir-title { font-family:var(--font-display); font-size:1.25rem; font-weight:700; margin-bottom:var(--space-4); }
        .dir-controls { display:flex; gap:var(--space-3); flex-wrap:wrap; padding-bottom:var(--space-4); align-items:center; }
        .dir-search { flex:1; min-width:220px; position:relative; }
        .dir-search input { width:100%; padding:10px 16px 10px 40px; background:var(--color-bg); border:1.5px solid var(--color-border); border-radius:var(--radius-lg); color:var(--color-text-primary); font-size:0.9rem; outline:none; transition:border-color var(--transition); height:44px; box-sizing:border-box; }
        .dir-search input:focus { border-color:var(--color-cyan); }
        .dir-search input::placeholder { color:var(--color-text-muted); }
        .dir-search-icon { position:absolute; left:12px; top:50%; transform:translateY(-50%); color:var(--color-text-muted); pointer-events:none; }
        .filter-chips { display:flex; gap:var(--space-2); flex-wrap:wrap; }
        .chip { padding:5px 12px; border-radius:var(--radius-full); border:1px solid var(--color-border); background:none; color:var(--color-text-muted); font-size:0.72rem; letter-spacing:0.05em; text-transform:uppercase; cursor:pointer; transition:all var(--transition); white-space:nowrap; }
        .chip.active { background:rgba(0,253,255,0.1); border-color:rgba(0,253,255,0.4); color:var(--color-cyan); }
        .chip:hover:not(.active) { border-color:var(--color-text-muted); color:var(--color-text-primary); }
        .dir-grid { padding:var(--space-6); display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:var(--space-4); }
        .speaker-card { background:var(--color-surface); border:1px solid var(--color-border); border-radius:var(--radius-xl); padding:var(--space-5); display:flex; flex-direction:column; gap:var(--space-3); cursor:pointer; text-decoration:none; color:inherit; transition:border-color var(--transition),transform var(--transition),box-shadow var(--transition); }
        .speaker-card:hover { border-color:rgba(0,253,255,0.3); transform:translateY(-2px); box-shadow:0 8px 32px rgba(0,0,0,0.3); }
        .speaker-card-top { display:flex; gap:var(--space-3); align-items:flex-start; }
        .speaker-card-info { flex:1; }
        .speaker-card-name { font-family:var(--font-display); font-weight:600; font-size:0.95rem; margin-bottom:2px; }
        .speaker-card-occ { font-size:0.8rem; color:var(--color-text-muted); }
        .speaker-bio { font-size:0.82rem; color:var(--color-text-muted); line-height:1.5; flex:1; }
        .speaker-card-footer { display:flex; justify-content:space-between; align-items:center; margin-top:auto; }
        .stage-tag { display:inline-flex; align-items:center; padding:3px 9px; border-radius:var(--radius-full); font-size:0.65rem; font-weight:600; letter-spacing:0.06em; text-transform:uppercase; background:rgba(0,253,255,0.08); color:var(--color-cyan); border:1px solid rgba(0,253,255,0.2); }
        .stage-tag.stage-fintech { background:rgba(195,251,26,0.08); color:var(--color-lime); border-color:rgba(195,251,26,0.2); }
        .stage-tag.stage-web3 { background:rgba(193,61,255,0.08); color:var(--color-violet); border-color:rgba(193,61,255,0.2); }
        .stage-tag.stage-venture { background:rgba(255,0,64,0.08); color:var(--color-magenta); border-color:rgba(255,0,64,0.2); }
        .stage-tag.stage-creative-tech { background:rgba(245,158,11,0.08); color:#F59E0B; border-color:rgba(245,158,11,0.2); }
        .stage-tag.stage-urban-innovation { background:rgba(26,60,251,0.1); color:var(--color-blue); border-color:rgba(26,60,251,0.3); }
        .stage-tag.stage-gaming { background:rgba(255,122,0,0.08); color:#FF7A00; border-color:rgba(255,122,0,0.2); }
        .role-tag { display:inline-flex; align-items:center; gap:4px; padding:3px 9px; border-radius:var(--radius-full); font-size:0.65rem; font-weight:600; letter-spacing:0.06em; text-transform:uppercase; background:rgba(195,251,26,0.08); color:var(--color-lime); border:1px solid rgba(195,251,26,0.2); }
        .online-toggle { display:flex; align-items:center; gap:var(--space-2); font-size:0.8rem; color:var(--color-text-muted); cursor:pointer; white-space:nowrap; }
        .toggle-switch { width:36px; height:20px; background:var(--color-border); border-radius:99px; position:relative; transition:background 0.2s; cursor:pointer; border:none; flex-shrink:0; }
        .toggle-switch.on { background:var(--color-cyan); }
        .toggle-switch::after { content:''; position:absolute; top:3px; left:3px; width:14px; height:14px; background:#fff; border-radius:50%; transition:left 0.2s; }
        .toggle-switch.on::after { left:19px; }
        .empty-state { text-align:center; padding:var(--space-8); color:var(--color-text-muted); }
        .dir-sidebar-nav a,.dir-sidebar-nav button { display:flex; align-items:center; gap:var(--space-3); padding:10px 12px; border-radius:var(--radius-md); color:var(--color-text-muted); font-size:0.875rem; text-decoration:none; cursor:pointer; background:none; border:none; width:100%; transition:background var(--transition),color var(--transition); }
        .dir-sidebar-nav a:hover,.dir-sidebar-nav button:hover { background:rgba(255,255,255,0.04); color:var(--color-text-primary); }
        .dir-sidebar-nav a.active { background:rgba(0,253,255,0.08); color:var(--color-cyan); }
        @media(max-width:640px) { .dir-sidebar{display:none} .dir-grid{grid-template-columns:1fr;padding:var(--space-4);} .dir-header{padding:var(--space-4) var(--space-4) 0} }
      `}</style>

      <div className="dir-shell">
        {/* Sidebar */}
        <aside className="dir-sidebar">
          <div className="dir-sidebar-logo"><GtwLogo size="sidebar" /></div>
          <nav className="dir-sidebar-nav" style={{ display:'flex', flexDirection:'column', gap:4 }}>
            <Link to="/app">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
              Chat Hub
            </Link>
            <Link to="/directory" className="active">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              Directory
            </Link>
            <Link to="/profile">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
              My Profile
            </Link>
          </nav>
          <div style={{ marginTop:'auto', paddingTop:'var(--space-4)', borderTop:'1px solid var(--color-border)', fontSize:'0.75rem', color:'var(--color-text-muted)' }}>
            <div style={{ fontWeight:600, color:'var(--color-text-primary)', marginBottom:4 }}>GTW Tbilisi 2026</div>
            <div>June 19–21 · Factory Tbilisi</div>
            <div style={{ marginTop:4 }}>200+ speakers · 5 stages</div>
          </div>
        </aside>

        {/* Main */}
        <div className="dir-main">
          <div className="dir-header">
            <div className="dir-title">Speaker Directory</div>
            <div className="dir-controls">
              <div className="dir-search">
                <svg className="dir-search-icon" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <input type="search" placeholder="Search speakers, topics, companies…" value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              <label className="online-toggle">
                <button className={`toggle-switch${onlineOnly ? ' on' : ''}`} onClick={() => setOnlineOnly(o => !o)} aria-label="Online only" />
                Online only
              </label>
            </div>
            <div className="filter-chips" style={{ paddingBottom:'var(--space-4)' }}>
              {STAGES.map(s => (
                <button key={s} className={`chip${filter === s ? ' active' : ''}`} onClick={() => setFilter(s)}>
                  {s === 'all' ? 'All Tracks' : s}
                </button>
              ))}
            </div>
          </div>

          <div className="dir-grid">
            {filtered.length === 0 ? (
              <div className="empty-state" style={{ gridColumn:'1/-1' }}>
                <div style={{ fontSize:'2rem', marginBottom:8 }}>🔍</div>
                <div>No speakers found</div>
              </div>
            ) : filtered.map(s => (
              <div key={s.key} className="speaker-card" onClick={() => s.key === 'self' ? navigate('/profile') : null}>
                <div className="speaker-card-top">
                  <div className="avatar-wrap">
                    <img src={s.avatar} alt={s.name} className="avatar avatar-lg" />
                    {s.online && <span className="presence-dot" style={{ width:13, height:13, borderWidth:2.5 }}></span>}
                  </div>
                  <div className="speaker-card-info">
                    <div className="speaker-card-name">{s.name}</div>
                    <div className="speaker-card-occ">{s.occ}</div>
                    <div style={{ marginTop:5, display:'flex', gap:4, flexWrap:'wrap' }}>
                      {s.volunteer ? (
                        <span className="role-tag">Volunteer</span>
                      ) : s.tag ? (
                        <span className={`stage-tag${s.stage ? ` stage-${s.stage}` : ''}`}>{s.tag}</span>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="speaker-bio">{s.bio}</div>
                <div className="speaker-card-footer">
                  <span style={{ fontSize:'0.75rem', color:'var(--color-text-muted)' }}>{s.country}</span>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={e => { e.stopPropagation(); openDM(s.key) }}
                  >
                    <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
                    Message
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <nav className="mobile-nav">
        <div className="mobile-nav-inner">
          <Link to="/app" className="mobile-nav-item">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
            <span>Channels</span>
          </Link>
          <Link to="/directory" className="mobile-nav-item active">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            <span>Speakers</span>
          </Link>
          <Link to="/profile" className="mobile-nav-item">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
            <span>Profile</span>
          </Link>
        </div>
      </nav>
    </>
  )
}
