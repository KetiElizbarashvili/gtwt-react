import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Sidebar } from '../components/Sidebar'
import { PEOPLE, CHANNELS, MESSAGES } from '../data'

const EMOJIS = ['😊','🙌','👍','🎉','🔥','💡','🚀','❓']

export default function AppPage() {
  const navigate = useNavigate()
  const feedRef  = useRef(null)
  const inputRef = useRef(null)

  const [messages, setMessages]     = useState(() => structuredClone(MESSAGES))
  const [activeChannel, setActiveChannel] = useState('general')
  const [activeDM, setActiveDM]     = useState(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerTab, setDrawerTab]   = useState('channels')
  const [inputVal, setInputVal]     = useState('')
  const [typing, setTyping]         = useState(null)
  const [notifOpen, setNotifOpen]   = useState(false)
  const [dmBadges, setDmBadges]     = useState({ giorgi: 2 })

  // Auth guard
  useEffect(() => {
    if (sessionStorage.getItem('gtw_logged_in') !== '1') navigate('/login')
  }, [navigate])

  // Handle DM nav from directory/profile
  useEffect(() => {
    const dmKey = sessionStorage.getItem('gtw_open_dm')
    sessionStorage.removeItem('gtw_open_dm')
    if (dmKey && PEOPLE[dmKey]) {
      setActiveDM(dmKey)
      setActiveChannel(null)
    }
  }, [])

  // Auto-scroll feed
  useEffect(() => {
    if (feedRef.current) feedRef.current.scrollTop = feedRef.current.scrollHeight
  }, [messages, activeChannel, activeDM])

  const currentKey = activeDM ? `dm-${activeDM}` : activeChannel
  const currentMessages = messages[currentKey] || []
  const channelInfo = activeChannel && !activeDM ? CHANNELS[activeChannel] : null

  function switchChannel(key) {
    setActiveChannel(key)
    setActiveDM(null)
    setDrawerOpen(false)
    setInputVal('')
    inputRef.current?.focus()
  }

  function switchDM(key) {
    setActiveDM(key)
    setActiveChannel(null)
    setDrawerOpen(false)
    setDmBadges(b => ({ ...b, [key]: 0 }))
    setInputVal('')
    inputRef.current?.focus()
  }

  function sendMessage() {
    if (!inputVal.trim()) return
    const newMsg = { id: Date.now(), author: 'self', text: inputVal.trim(), time: new Date().toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit', hour12: false }) }
    setMessages(prev => ({ ...prev, [currentKey]: [...(prev[currentKey] || []), newMsg] }))
    setInputVal('')
    // Simulate reply
    if (activeDM) {
      const person = PEOPLE[activeDM]
      setTyping(person.name.split(' ')[0])
      setTimeout(() => {
        const replies = ["Got it! 👍", "Sounds great!", "See you then 🙌", "Perfect, thanks!", "On my way!"]
        const reply = { id: Date.now() + 1, author: activeDM, text: replies[Math.floor(Math.random() * replies.length)], time: new Date().toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit', hour12: false }) }
        setMessages(prev => ({ ...prev, [currentKey]: [...(prev[currentKey] || []), reply] }))
        setTyping(null)
      }, 1500)
    }
  }

  function insertEmoji() {
    const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)]
    setInputVal(v => v + emoji)
    inputRef.current?.focus()
  }

  const dmPreviews = {}
  Object.keys(PEOPLE).forEach(key => {
    const msgs = messages[`dm-${key}`] || []
    if (msgs.length > 0) dmPreviews[key] = msgs[msgs.length - 1].text
  })

  const topbarTitle = activeDM
    ? PEOPLE[activeDM]?.name
    : `# ${activeChannel}`

  const isReadonly = !activeDM && channelInfo?.readonly

  return (
    <>
      <style>{`
        body { overflow: hidden; }
        @keyframes msgIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        .message-group { animation: msgIn 0.2s ease; }
        .typing-indicator { padding:0 var(--space-5) var(--space-2); font-size:0.78rem; color:var(--color-text-muted); min-height:24px; display:flex; align-items:center; gap:var(--space-2); transition:opacity 0.2s; }
        .typing-dots { display:flex; gap:3px; align-items:center; }
        .typing-dots span { width:5px; height:5px; background:var(--color-text-muted); border-radius:50%; animation:blink 1.2s infinite; }
        .typing-dots span:nth-child(2){animation-delay:0.2s} .typing-dots span:nth-child(3){animation-delay:0.4s}
        @keyframes blink{0%,80%,100%{opacity:0.3}40%{opacity:1}}
        .notif-btn { position:relative; background:none; border:none; cursor:pointer; color:var(--color-text-muted); display:flex; align-items:center; justify-content:center; width:var(--touch-min); height:var(--touch-min); border-radius:var(--radius-md); transition:background var(--transition),color var(--transition); }
        .notif-btn:hover { background:rgba(255,255,255,0.06); color:var(--color-text-primary); }
        .notif-dot { position:absolute; top:8px; right:8px; width:8px; height:8px; background:var(--color-lime); border-radius:50%; border:2px solid var(--color-surface); }
        .messages-feed { flex:1; overflow-y:auto; padding:var(--space-4) var(--space-5); display:flex; flex-direction:column; gap:var(--space-1); }
        .message-group { display:flex; gap:var(--space-3); padding:var(--space-2) 0; }
        .message-group:hover { background:rgba(255,255,255,0.015); border-radius:var(--radius-md); }
        .message-body { flex:1; min-width:0; }
        .message-meta { display:flex; align-items:baseline; gap:var(--space-2); margin-bottom:3px; }
        .message-author { font-family:var(--font-display); font-weight:600; font-size:0.9rem; }
        .message-time { font-size:0.72rem; color:var(--color-text-muted); }
        .message-text { font-size:0.9rem; line-height:1.55; color:var(--color-text-primary); word-break:break-word; }
        .composer { padding:var(--space-3) var(--space-4) var(--space-4); border-top:1px solid var(--color-border); flex-shrink:0; }
        .composer-inner { display:flex; align-items:center; gap:var(--space-2); background:var(--color-bg); border:1.5px solid var(--color-border); border-radius:var(--radius-lg); padding:0 var(--space-3); transition:border-color var(--transition); }
        .composer-inner:focus-within { border-color:var(--color-cyan); }
        .composer-input { flex:1; background:transparent; border:none; outline:none; color:var(--color-text-primary); font-size:0.9rem; height:var(--touch-min); padding:0; }
        .composer-input::placeholder { color:var(--color-text-muted); }
        .composer-emoji { background:none; border:none; cursor:pointer; color:var(--color-text-muted); font-size:1.1rem; display:flex; align-items:center; justify-content:center; width:36px; height:36px; border-radius:var(--radius-md); }
        .composer-send { background:none; border:none; cursor:pointer; color:var(--color-cyan); display:flex; align-items:center; justify-content:center; width:36px; height:36px; border-radius:var(--radius-md); transition:background var(--transition); }
        .composer-send:hover { background:rgba(0,253,255,0.1); }
        .composer-send:disabled { color:var(--color-border); cursor:default; }
        .readonly-notice { padding:var(--space-3) var(--space-5); text-align:center; font-size:0.82rem; color:var(--color-text-muted); background:rgba(193,61,255,0.04); border-top:1px solid var(--color-border); flex-shrink:0; }
        .date-separator { display:flex; align-items:center; gap:var(--space-3); padding:var(--space-3) 0 var(--space-1); color:var(--color-text-muted); font-size:0.75rem; }
        .date-separator::before,.date-separator::after{content:'';flex:1;height:1px;background:var(--color-border)}
        .channel-desc { font-size:0.8rem; color:var(--color-text-muted); }
        .topbar { position:relative; }
        .dm-item { display:flex; align-items:center; gap:var(--space-3); padding:0 var(--space-4); height:var(--touch-min); cursor:pointer; color:var(--color-text-muted); font-size:0.875rem; transition:background var(--transition),color var(--transition); text-decoration:none; border:none; background:none; width:100%; text-align:left; }
        .dm-item:hover { background:rgba(255,255,255,0.04); color:var(--color-text-primary); }
        .dm-item.active { background:rgba(0,253,255,0.08); color:var(--color-cyan); }
        .dm-item-info { flex:1; min-width:0; }
        .dm-item-name { font-size:0.875rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .dm-item-preview { font-size:0.75rem; color:var(--color-text-muted); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .sidebar-item { cursor:pointer; background:none; border:none; width:100%; text-align:left; }
        .sidebar-item.active { background:rgba(0,253,255,0.08); color:var(--color-cyan); position:relative; }
        .sidebar-item.active::before { content:''; position:absolute; left:0; top:8px; bottom:8px; width:3px; background:var(--color-cyan); border-radius:0 3px 3px 0; }
        .sidebar-bottom { margin-top:auto; padding:var(--space-3) var(--space-4); border-top:1px solid var(--color-border); display:flex; align-items:center; gap:var(--space-2); }
        .ch-hash { color:var(--color-text-muted); font-size:0.85rem; font-weight:600; width:18px; flex-shrink:0; text-align:center; }
        .sidebar-item-badge { margin-left:auto; }
        .member-count { display:flex; align-items:center; gap:5px; font-size:0.8rem; color:var(--color-text-muted); }
        .member-count-dot { width:7px; height:7px; background:#22C55E; border-radius:50%; }
        @media(max-width:480px) { .channel-desc{display:none} }
      `}</style>

      <div className="app-shell">
        <Sidebar
          activeChannel={activeChannel}
          activeDM={activeDM}
          onSwitchChannel={switchChannel}
          onSwitchDM={switchDM}
          dmPreviews={dmPreviews}
          dmBadges={dmBadges}
        />

        <div className="main-panel">
          <header className="topbar" id="topbar">
            <button className="mobile-menu-btn" onClick={() => setDrawerOpen(true)} aria-label="Open navigation">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>

            <div style={{ display:'flex', flexDirection:'column', marginRight:'auto', minWidth:0, flex:1 }}>
              <div className="topbar-title">
                {activeDM ? (
                  <span style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <img src={PEOPLE[activeDM]?.avatar} alt="" className="avatar avatar-xs" style={{ width:20, height:20 }} />
                    {PEOPLE[activeDM]?.name}
                  </span>
                ) : (
                  <span><span style={{ color:'var(--color-text-muted)' }}>#</span> {activeChannel}</span>
                )}
              </div>
              {!activeDM && channelInfo && (
                <div className="channel-desc">{channelInfo.desc}</div>
              )}
            </div>

            {!activeDM && (
              <div className="member-count">
                <span className="member-count-dot"></span>
                <span>91 online</span>
              </div>
            )}

            <button className="notif-btn" onClick={() => setNotifOpen(o => !o)} aria-label="Notifications">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
              <span className="notif-dot"></span>
            </button>

            <Link to="/profile">
              <img src="https://i.pravatar.cc/36?img=47" alt="Profile" className="avatar avatar-sm" style={{ cursor:'pointer' }} />
            </Link>
          </header>

          <div className="messages-feed" ref={feedRef} role="log" aria-live="polite">
            <div className="date-separator">Today, June 19</div>
            {currentMessages.map(msg => {
              const isSelf = msg.author === 'self'
              const person = isSelf ? { name: 'Ana Beridze', avatar: 'https://i.pravatar.cc/36?img=47' } : PEOPLE[msg.author]
              return (
                <div className="message-group" key={msg.id}>
                  <img src={person?.avatar || `https://i.pravatar.cc/36?img=1`} alt="" className="avatar avatar-sm" style={{ flexShrink:0 }} />
                  <div className="message-body">
                    <div className="message-meta">
                      <span className="message-author" style={{ color: isSelf ? 'var(--color-cyan)' : 'var(--color-text-primary)' }}>
                        {person?.name || msg.author}
                      </span>
                      <span className="message-time">{msg.time}</span>
                    </div>
                    <div className="message-text">{msg.text}</div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="typing-indicator" style={{ opacity: typing ? 1 : 0 }}>
            {typing && (
              <>
                <div className="typing-dots"><span/><span/><span/></div>
                <span>{typing} is typing…</span>
              </>
            )}
          </div>

          {isReadonly ? (
            <div className="readonly-notice">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ display:'inline', verticalAlign:'middle', marginRight:5 }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
              Only admins can post in #{activeChannel}
            </div>
          ) : (
            <div className="composer">
              <div className="composer-inner">
                <button className="composer-emoji" onClick={insertEmoji} aria-label="Emoji">😊</button>
                <input
                  ref={inputRef}
                  className="composer-input"
                  type="text"
                  value={inputVal}
                  onChange={e => setInputVal(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMessage()}
                  placeholder={activeDM ? `Message ${PEOPLE[activeDM]?.name.split(' ')[0]}` : `Message #${activeChannel}`}
                />
                <button className="composer-send" onClick={sendMessage} disabled={!inputVal.trim()} aria-label="Send">
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile drawer overlay */}
      {drawerOpen && (
        <div className="drawer-overlay" onClick={() => setDrawerOpen(false)} />
      )}

      {/* Mobile drawer */}
      <div className={`mobile-drawer${drawerOpen ? ' open' : ''}`} role="dialog" aria-modal="true">
        <div className="drawer-handle"></div>
        <div className="drawer-heading">Channels &amp; Messages</div>

        <div className="drawer-section-label">Channels</div>
        {Object.entries(CHANNELS).map(([key, ch]) => (
          <button key={key} className={`drawer-item${activeChannel === key && !activeDM ? ' active' : ''}`} onClick={() => switchChannel(key)}>
            <span className="ch-hash" style={ch.color ? { color: ch.color } : {}}>#</span>
            <span style={{ flex:1 }}>{ch.label}</span>
            {ch.badge > 0 && <span className="badge">{ch.badge}</span>}
          </button>
        ))}

        <div className="drawer-section-label" style={{ marginTop:'var(--space-2)' }}>Direct Messages</div>
        {Object.entries(PEOPLE).map(([key, person]) => (
          <button key={key} className={`drawer-item${activeDM === key ? ' active' : ''}`} onClick={() => switchDM(key)}>
            <div className="avatar-wrap" style={{ flexShrink:0 }}>
              <img src={person.avatar} alt="" className="avatar avatar-xs" />
              {person.online && <span className="presence-dot" style={{ width:8, height:8 }}></span>}
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:'0.875rem', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{person.name}</div>
              <div style={{ fontSize:'0.72rem', color:'var(--color-text-muted)' }}>{dmPreviews[key] || 'Start a conversation...'}</div>
            </div>
            {dmBadges[key] > 0 && <span className="badge">{dmBadges[key]}</span>}
          </button>
        ))}

        <div className="drawer-footer">
          <Link to="/directory" className="btn btn-ghost btn-block btn-sm" onClick={() => setDrawerOpen(false)}>
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            Speaker Directory
          </Link>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <nav className="mobile-nav">
        <div className="mobile-nav-inner">
          <button className={`mobile-nav-item${!activeDM ? ' active' : ''}`} onClick={() => { setDrawerTab('channels'); setDrawerOpen(true) }} style={{ background:'none', border:'none', cursor:'pointer' }}>
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
            <span>Channels</span>
          </button>
          <button className={`mobile-nav-item${activeDM ? ' active' : ''}`} onClick={() => { setDrawerTab('dms'); setDrawerOpen(true) }} style={{ background:'none', border:'none', cursor:'pointer' }}>
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
            <span>DMs</span>
          </button>
          <Link to="/directory" className="mobile-nav-item">
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
