import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sidebar } from '../components/Sidebar'
import { TopBarUser } from '../components/TopBarUser'
import { TopBarActions } from '../components/TopBarActions'
import { MobileNav } from '../components/MobileNav'
import { PWAInstallModal } from '../components/PWAInstallModal'
import { PEOPLE, CHANNELS, MESSAGES } from '../data'

const EASTER_EGG_CLICKS = 7

// #13: Confetti particle for easter egg
function EasterEgg() {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.8,
    color: ['#00FDFF','#C3FB1A','#C13DFF','#FF0040','#1A3CFB'][Math.floor(Math.random() * 5)],
    size: 6 + Math.random() * 8,
    drift: (Math.random() - 0.5) * 200,
  }))
  return (
    <div style={{ position:'fixed', inset:0, pointerEvents:'none', zIndex:9999, overflow:'hidden' }}>
      {particles.map(p => (
        <div key={p.id} style={{
          position:'absolute',
          left:`${p.left}%`,
          top:'-20px',
          width:p.size,
          height:p.size,
          background:p.color,
          borderRadius: p.id % 3 === 0 ? '50%' : '2px',
          animation:`confettiFall 2.5s ${p.delay}s ease-in forwards`,
          '--drift': `${p.drift}px`,
        }} />
      ))}
      <div style={{
        position:'absolute', top:'30%', left:'50%', transform:'translateX(-50%)',
        fontFamily:'var(--font-display)', fontSize:'1.5rem', color:'var(--color-cyan)',
        textAlign:'center', lineHeight:1.4,
        animation:'eggText 0.4s ease forwards',
        whiteSpace:'nowrap',
      }}>
        🎉 GTW Tbilisi 2026! 🎉
      </div>
      <style>{`
        @keyframes confettiFall {
          0%   { transform:translateY(0) translateX(0) rotate(0deg); opacity:1; }
          100% { transform:translateY(100vh) translateX(var(--drift)) rotate(720deg); opacity:0; }
        }
        @keyframes eggText {
          from { opacity:0; transform:translateX(-50%) scale(0.5); }
          to   { opacity:1; transform:translateX(-50%) scale(1); }
        }
      `}</style>
    </div>
  )
}

// #10: Mini profile sheet when tapping an avatar
function PersonSheet({ personKey, person, onClose, onDM }) {
  return (
    <>
      <div onClick={onClose} style={{
        position:'fixed', inset:0, background:'rgba(0,0,0,0.6)',
        backdropFilter:'blur(4px)', WebkitBackdropFilter:'blur(4px)',
        zIndex:400, animation:'fadeIn 0.2s ease',
      }} />
      <div style={{
        position:'fixed', left:0, right:0, bottom:0, zIndex:401,
        background:'rgba(8,11,32,0.95)', backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)',
        borderTop:'1px solid rgba(255,255,255,0.1)', borderRadius:'var(--radius-xl) var(--radius-xl) 0 0',
        padding:'var(--space-5)', display:'flex', flexDirection:'column', gap:'var(--space-4)',
        animation:'slideUp 0.3s cubic-bezier(0.32,0.72,0,1)',
        boxShadow:'0 -24px 64px rgba(0,0,0,0.5)',
        paddingBottom:'calc(var(--space-5) + env(safe-area-inset-bottom))',
      }}>
        {/* Handle */}
        <div style={{ width:40, height:4, background:'rgba(255,255,255,0.15)', borderRadius:99, margin:'0 auto -8px' }} />
        <div style={{ display:'flex', gap:'var(--space-4)', alignItems:'center' }}>
          <div className="avatar-wrap">
            <img src={person.avatar} alt={person.name} style={{ width:64, height:64, borderRadius:'50%', border:'2px solid rgba(0,253,255,0.3)', boxShadow:'0 0 16px rgba(0,253,255,0.15)' }} />
            {person.online && <span className="presence-dot" style={{ width:14, height:14, borderWidth:3 }} />}
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'1.1rem', marginBottom:2 }}>{person.name}</div>
            <div style={{ fontSize:'0.85rem', color:'var(--color-text-muted)', marginBottom:6 }}>{person.role}</div>
            {person.volunteer && (
              <span style={{ display:'inline-flex', alignItems:'center', gap:4, padding:'2px 8px', background:'rgba(195,251,26,0.1)', color:'var(--color-lime)', border:'1px solid rgba(195,251,26,0.25)', borderRadius:'var(--radius-full)', fontSize:'0.65rem', fontWeight:600, letterSpacing:'0.06em', textTransform:'uppercase' }}>
                ⚡ Volunteer
              </span>
            )}
          </div>
        </div>
        <div style={{ display:'flex', gap:'var(--space-3)' }}>
          <button className="btn btn-primary" style={{ flex:1 }} onClick={() => onDM(personKey)}>
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
            Message
          </button>
          <button className="btn btn-ghost" style={{ flex:1 }} onClick={onClose}>Close</button>
        </div>
      </div>
      <style>{`
        @keyframes slideUp { from{transform:translateY(100%)} to{transform:translateY(0)} }
        @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
      `}</style>
    </>
  )
}

// #12: Highlight @mentions in message text
function renderText(text) {
  const parts = text.split(/(@\w[\w\s]*\w|@\w+)/g)
  return parts.map((part, i) =>
    part.startsWith('@')
      ? <span key={i} style={{ color:'var(--color-cyan)', fontWeight:600 }}>{part}</span>
      : part
  )
}

export default function AppPage() {
  const navigate  = useNavigate()
  const feedRef   = useRef(null)
  const inputRef  = useRef(null)
  const eggTimer  = useRef(null)

  const [messages, setMessages]         = useState(() => structuredClone(MESSAGES))
  const [activeChannel, setActiveChannel] = useState('general')
  const [activeDM, setActiveDM]         = useState(null)
  const [inputVal, setInputVal]         = useState('')
  const [typing, setTyping]             = useState(null)
  const [dmBadges, setDmBadges]         = useState({ tarik: 2 })
  const [pinnedMsgs, setPinnedMsgs]     = useState(new Set())
  // #10: Profile sheet
  const [profileSheet, setProfileSheet] = useState(null)
  // #13: Easter egg
  const [eggCount, setEggCount]         = useState(0)
  const [eggActive, setEggActive]       = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('gtw_logged_in') !== '1') navigate('/login')
  }, [navigate])

  useEffect(() => {
    const dmKey = sessionStorage.getItem('gtw_open_dm')
    const chKey = sessionStorage.getItem('gtw_open_channel')
    sessionStorage.removeItem('gtw_open_dm')
    sessionStorage.removeItem('gtw_open_channel')
    if (dmKey && PEOPLE[dmKey]) {
      setActiveDM(dmKey)
      setActiveChannel(null)
    } else if (chKey && CHANNELS[chKey]) {
      setActiveChannel(chKey)
      setActiveDM(null)
    }
  }, [])

  useEffect(() => {
    if (feedRef.current) feedRef.current.scrollTop = feedRef.current.scrollHeight
  }, [messages, activeChannel, activeDM])

  const currentKey      = activeDM ? `dm-${activeDM}` : activeChannel
  const currentMessages = messages[currentKey] || []
  const channelInfo     = activeChannel && !activeDM ? CHANNELS[activeChannel] : null
  const isReadonly      = !activeDM && channelInfo?.readonly

  function switchChannel(key) {
    setActiveChannel(key); setActiveDM(null)
    setInputVal('')
    inputRef.current?.focus()
  }

  function switchDM(key) {
    setActiveDM(key); setActiveChannel(null)
    setDmBadges(b => ({ ...b, [key]: 0 }))
    setInputVal('')
    inputRef.current?.focus()
  }

  function sendMessage() {
    if (!inputVal.trim()) return
    const newMsg = {
      id: Date.now(), author: 'self', text: inputVal.trim(),
      time: new Date().toLocaleTimeString('en', { hour:'2-digit', minute:'2-digit', hour12:false })
    }
    setMessages(prev => ({ ...prev, [currentKey]: [...(prev[currentKey] || []), newMsg] }))
    setInputVal('')
    if (activeDM) {
      const person = PEOPLE[activeDM]
      setTyping(person.name.split(' ')[0])
      setTimeout(() => {
        const replies = ["Got it! 👍","Sounds great!","See you then 🙌","Perfect, thanks!","On my way!"]
        const reply = {
          id: Date.now() + 1, author: activeDM,
          text: replies[Math.floor(Math.random() * replies.length)],
          time: new Date().toLocaleTimeString('en', { hour:'2-digit', minute:'2-digit', hour12:false })
        }
        setMessages(prev => ({ ...prev, [currentKey]: [...(prev[currentKey] || []), reply] }))
        setTyping(null)
      }, 1500)
    }
  }

  // #15: Delete own message
  function deleteMessage(msgId) {
    setMessages(prev => ({
      ...prev,
      [currentKey]: (prev[currentKey] || []).filter(m => m.id !== msgId)
    }))
  }

  // #15: Pin message
  function togglePin(msgId) {
    setPinnedMsgs(prev => {
      const next = new Set(prev)
      if (next.has(msgId)) next.delete(msgId)
      else next.add(msgId)
      return next
    })
  }

  // #13: Easter egg - tap logo 7× quickly
  function handleEasterEgg() {
    const next = eggCount + 1
    setEggCount(next)
    clearTimeout(eggTimer.current)
    if (next >= EASTER_EGG_CLICKS) {
      setEggActive(true); setEggCount(0)
      setTimeout(() => setEggActive(false), 3000)
    } else {
      eggTimer.current = setTimeout(() => setEggCount(0), 2000)
    }
  }

  const dmPreviews = {}
  Object.keys(PEOPLE).forEach(key => {
    const msgs = messages[`dm-${key}`] || []
    if (msgs.length) dmPreviews[key] = msgs[msgs.length - 1].text
  })

  return (
    <>
      <style>{`
        @keyframes msgIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        .message-group { animation:msgIn 0.2s ease; position:relative; }

        /* Typing indicator */
        .typing-indicator { padding:0 var(--space-5) 6px; font-size:0.78rem; color:var(--color-text-muted); min-height:22px; display:flex; align-items:center; gap:var(--space-2); flex-shrink:0; }
        .typing-dots { display:flex; gap:3px; align-items:center; }
        .typing-dots span { width:5px; height:5px; background:var(--color-text-muted); border-radius:50%; animation:blink 1.2s infinite; }
        .typing-dots span:nth-child(2){animation-delay:0.2s}
        .typing-dots span:nth-child(3){animation-delay:0.4s}
        @keyframes blink{0%,80%,100%{opacity:0.3}40%{opacity:1}}

        /* Topbar */
        .topbar {
          position:sticky; top:0;
          background:rgba(8,11,32,0.88);
          backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px);
          border-bottom:1px solid rgba(255,255,255,0.06);
          z-index:50;
        }
        .notif-btn { position:relative; background:none; border:none; cursor:pointer; color:var(--color-text-muted); display:flex; align-items:center; justify-content:center; width:var(--touch-min); height:var(--touch-min); border-radius:var(--radius-md); transition:background var(--transition),color var(--transition); }
        .notif-btn:hover { background:rgba(255,255,255,0.06); color:var(--color-text-primary); }
        .notif-dot { position:absolute; top:8px; right:8px; width:8px; height:8px; background:var(--color-lime); border-radius:50%; border:2px solid var(--color-surface); }

        /* Feed */
        .messages-feed { flex:1; overflow-y:auto; padding:var(--space-5); display:flex; flex-direction:column; gap:2px; }
        .message-group { display:flex; gap:var(--space-3); padding:var(--space-3) var(--space-2); border-radius:var(--radius-md); transition:background var(--transition); }
        .message-group:hover { background:rgba(255,255,255,0.025); }
        .message-group.pinned { background:rgba(195,251,26,0.04); border-left:3px solid rgba(195,251,26,0.5); padding-left:calc(var(--space-2) - 3px); }
        .message-body { flex:1; min-width:0; }
        .message-meta { display:flex; align-items:baseline; gap:var(--space-2); margin-bottom:4px; flex-wrap:wrap; }
        .message-author { font-family:var(--font-display); font-weight:600; font-size:0.9rem; cursor:pointer; }
        .message-author:hover { text-decoration:underline; }
        .message-time { font-size:0.72rem; color:var(--color-text-muted); }
        .message-text { font-size:0.9rem; line-height:1.6; color:var(--color-text-primary); word-break:break-word; }

        /* Volunteer badge in messages */
        .volunteer-badge { display:inline-flex; align-items:center; gap:3px; padding:1px 6px; background:rgba(195,251,26,0.1); color:var(--color-lime); border:1px solid rgba(195,251,26,0.2); border-radius:var(--radius-full); font-size:0.6rem; font-weight:700; letter-spacing:0.06em; text-transform:uppercase; vertical-align:middle; margin-left:4px; }

        /* #14 Reactions */
        .reactions-row { display:flex; flex-wrap:wrap; gap:var(--space-1); margin-top:6px; }
        .reaction-chip { display:inline-flex; align-items:center; gap:4px; padding:3px 8px; border-radius:var(--radius-full); background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1); cursor:pointer; font-size:0.82rem; transition:all var(--transition); color:var(--color-text-muted); }
        .reaction-chip:hover { background:rgba(0,253,255,0.1); border-color:rgba(0,253,255,0.3); color:var(--color-text-primary); }
        .reaction-add { display:inline-flex; align-items:center; padding:3px 8px; border-radius:var(--radius-full); background:none; border:1px dashed rgba(255,255,255,0.12); cursor:pointer; font-size:0.78rem; color:var(--color-text-muted); transition:all var(--transition); }
        .reaction-add:hover { border-color:rgba(0,253,255,0.3); color:var(--color-cyan); background:rgba(0,253,255,0.06); }
        .reaction-picker { position:absolute; left:44px; bottom:calc(100% + 4px); background:rgba(8,11,32,0.98); backdrop-filter:blur(16px); -webkit-backdrop-filter:blur(16px); border:1px solid rgba(255,255,255,0.1); border-radius:var(--radius-lg); padding:var(--space-2); display:flex; gap:4px; z-index:200; box-shadow:0 8px 32px rgba(0,0,0,0.5); animation:msgIn 0.15s ease; }
        .reaction-picker-emoji { background:none; border:none; cursor:pointer; font-size:1.2rem; padding:4px 6px; border-radius:var(--radius-md); transition:background var(--transition); }
        .reaction-picker-emoji:hover { background:rgba(255,255,255,0.1); }

        /* #15 Message actions bar */
        .msg-actions { position:absolute; right:var(--space-2); top:50%; transform:translateY(-50%); display:flex; gap:2px; background:rgba(8,11,32,0.95); backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px); border:1px solid rgba(255,255,255,0.1); border-radius:var(--radius-md); padding:3px; opacity:0; pointer-events:none; transition:opacity var(--transition); box-shadow:0 4px 16px rgba(0,0,0,0.4); }
        .message-group:hover .msg-actions { opacity:1; pointer-events:auto; }
        .msg-action-btn { background:none; border:none; cursor:pointer; color:var(--color-text-muted); width:28px; height:28px; display:flex; align-items:center; justify-content:center; border-radius:var(--radius-sm); transition:background var(--transition),color var(--transition); font-size:0.85rem; }
        .msg-action-btn:hover { background:rgba(255,255,255,0.08); color:var(--color-text-primary); }
        .msg-action-btn.danger:hover { background:rgba(255,0,64,0.12); color:var(--color-magenta); }

        /* Composer */
        .composer { padding:var(--space-2) var(--space-4) var(--space-4); border-top:1px solid rgba(255,255,255,0.06); flex-shrink:0; background:rgba(8,11,32,0.85); backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px); }
        .composer-inner { display:flex; align-items:center; gap:var(--space-2); background:rgba(0,0,0,0.4); border:1.5px solid rgba(255,255,255,0.08); border-radius:var(--radius-lg); padding:0 var(--space-3); transition:border-color var(--transition), box-shadow var(--transition); }
        .composer-inner:focus-within { border-color:rgba(0,253,255,0.5); box-shadow:0 0 0 3px rgba(0,253,255,0.08); }
        .composer-input { flex:1; background:transparent; border:none; outline:none; color:var(--color-text-primary); font-size:1rem; height:var(--touch-min); padding:0; }
        .composer-input::placeholder { color:var(--color-text-muted); }
        .composer-emoji { background:none; border:none; cursor:pointer; color:var(--color-text-muted); font-size:1.1rem; display:flex; align-items:center; justify-content:center; width:36px; height:36px; border-radius:var(--radius-md); transition:background var(--transition); }
        .composer-emoji:hover { background:rgba(255,255,255,0.06); }
        .composer-send { background:none; border:none; cursor:pointer; color:var(--color-cyan); display:flex; align-items:center; justify-content:center; width:36px; height:36px; border-radius:var(--radius-md); transition:background var(--transition); }
        .composer-send:hover { background:rgba(0,253,255,0.1); }
        .composer-send:disabled { color:rgba(255,255,255,0.15); cursor:default; }
        .readonly-notice { padding:var(--space-3) var(--space-5); text-align:center; font-size:0.82rem; color:var(--color-text-muted); background:rgba(193,61,255,0.04); border-top:1px solid rgba(255,255,255,0.05); flex-shrink:0; }

        /* Date separator */
        .date-separator { display:flex; align-items:center; gap:var(--space-3); padding:var(--space-4) 0 var(--space-2); color:var(--color-text-muted); font-size:0.75rem; }
        .date-separator::before,.date-separator::after{content:'';flex:1;height:1px;background:rgba(255,255,255,0.06)}

        /* Channel desc */
        .channel-desc { font-size:0.78rem; color:var(--color-text-muted); }
        .member-count { display:flex; align-items:center; gap:5px; font-size:0.8rem; color:var(--color-text-muted); }
        .member-count-dot { width:7px; height:7px; background:#22C55E; border-radius:50%; box-shadow:0 0 6px #22C55E; }

        /* DM items in sidebar/drawer */
        .dm-item { display:flex; align-items:center; gap:var(--space-3); padding:0 var(--space-4); height:var(--touch-min); cursor:pointer; color:var(--color-text-muted); font-size:0.875rem; transition:background var(--transition),color var(--transition); text-decoration:none; border:none; background:none; width:100%; text-align:left; }
        .dm-item:hover { background:rgba(255,255,255,0.04); color:var(--color-text-primary); }
        .dm-item.active { background:rgba(0,253,255,0.08); color:var(--color-cyan); }
        .dm-item-info { flex:1; min-width:0; }
        .dm-item-name { font-size:0.875rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .dm-item-preview { font-size:0.75rem; color:var(--color-text-muted); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .ch-hash { color:var(--color-text-muted); font-size:0.85rem; font-weight:600; width:18px; flex-shrink:0; text-align:center; }

        /* Sidebar items (inline) */
        .sidebar-item { cursor:pointer; background:none; border:none; width:100%; text-align:left; }
        .sidebar-item.active { background:rgba(0,253,255,0.08); color:var(--color-cyan); position:relative; }
        .sidebar-item.active::before { content:''; position:absolute; left:0; top:8px; bottom:8px; width:3px; background:var(--color-cyan); border-radius:0 3px 3px 0; }
        .sidebar-item-badge { margin-left:auto; }
        .sidebar-bottom { margin-top:auto; padding:var(--space-3) var(--space-4); border-top:1px solid rgba(255,255,255,0.05); display:flex; align-items:center; gap:var(--space-2); }

        /* #3: hide topbar hamburger on mobile (bottom nav handles it) */
        .topbar-avatar-link { display:flex; }
        /* Back-to-channels button: mobile only */
        .topbar-back { display:none; background:none; border:none; cursor:pointer; color:var(--color-text-muted); align-items:center; justify-content:center; width:var(--touch-min); height:var(--touch-min); margin-left:calc(var(--space-3) * -1); border-radius:var(--radius-md); transition:background var(--transition),color var(--transition); }
        .topbar-back:hover { background:rgba(255,255,255,0.06); color:var(--color-text-primary); }
        @media(max-width:768px) {
          .topbar-back { display:flex; }
          .member-count { display:none!important; }
          .channel-desc { display:none; }
          .topbar-title { font-size:0.9rem; }
          /* #4: hide duplicate profile avatar */
          .topbar-avatar-link { display:none; }
          /* #1: composer font-size fix (no iOS zoom) */
          .composer-input { font-size:16px; }
        }
        @media(max-width:480px) { .channel-desc{display:none} }
      `}</style>

      {/* #13 Easter egg particles */}
      {eggActive && <EasterEgg />}

      {/* #10 Profile sheet */}
      {profileSheet && PEOPLE[profileSheet] && (
        <PersonSheet
          personKey={profileSheet}
          person={PEOPLE[profileSheet]}
          onClose={() => setProfileSheet(null)}
          onDM={(key) => { switchDM(key); setProfileSheet(null) }}
        />
      )}

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
          {/* Topbar — #3: NO hamburger, #4: avatar hidden on mobile */}
          <header className="topbar" id="topbar">
            <button className="topbar-back" onClick={() => navigate('/channels')} aria-label="Back to channels">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
            </button>
            <div style={{ flex:1, minWidth:0, overflow:'hidden' }}>
              <div className="topbar-title" style={{ whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
                {activeDM ? (
                  <span style={{ display:'inline-flex', alignItems:'center', gap:8 }}>
                    <span className="avatar-wrap" style={{ display:'inline-block' }}>
                      <img src={PEOPLE[activeDM]?.avatar} alt="" className="avatar avatar-xs" style={{ width:20, height:20 }} />
                      {/* #9: online dot in topbar for DMs */}
                      {PEOPLE[activeDM]?.online && (
                        <span style={{ position:'absolute', bottom:0, right:0, width:6, height:6, background:'#22C55E', borderRadius:'50%', border:'1.5px solid var(--color-surface)' }} />
                      )}
                    </span>
                    {PEOPLE[activeDM]?.name}
                  </span>
                ) : (
                  <span>
                    <span style={{ color:'var(--color-text-muted)' }}>#</span> {activeChannel}
                  </span>
                )}
              </div>
              {!activeDM && channelInfo && (
                <div className="channel-desc" style={{ whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{channelInfo.desc}</div>
              )}
            </div>

            {/* #13 Easter egg: tap bell 7× (handled inside TopBarActions) */}
            <TopBarActions onBellClick={handleEasterEgg} />

            {/* #4: Hidden on mobile */}
            <div className="topbar-avatar-link">
              <TopBarUser />
            </div>
          </header>

          {/* Messages feed */}
          <div className="messages-feed" ref={feedRef} role="log" aria-live="polite">
            <div className="date-separator">Today, June 19</div>
            {currentMessages.map(msg => {
              const isSelf  = msg.author === 'self'
              const person  = isSelf ? { name:'Keto Elizbarashvili', avatar:'/speakers/keto.png' } : PEOPLE[msg.author]
              const isPinned = pinnedMsgs.has(msg.id)

              return (
                <div
                  key={msg.id}
                  className={`message-group${isPinned ? ' pinned' : ''}`}
                >
                  {/* #10: click avatar to open profile sheet */}
                  <img
                    src={person?.avatar || 'https://i.pravatar.cc/36?img=1'}
                    alt=""
                    className="avatar avatar-sm"
                    style={{ flexShrink:0, cursor: isSelf ? 'default' : 'pointer' }}
                    onClick={() => !isSelf && PEOPLE[msg.author] && setProfileSheet(msg.author)}
                  />
                  <div className="message-body">
                    <div className="message-meta">
                      {/* #10: click name too */}
                      <span
                        className="message-author"
                        style={{ color: isSelf ? 'var(--color-cyan)' : 'var(--color-text-primary)', cursor: isSelf ? 'default' : 'pointer' }}
                        onClick={() => !isSelf && PEOPLE[msg.author] && setProfileSheet(msg.author)}
                      >
                        {person?.name || msg.author}
                      </span>
                      {/* #11: Volunteer badge */}
                      {!isSelf && PEOPLE[msg.author]?.volunteer && (
                        <span className="volunteer-badge">⚡ Volunteer</span>
                      )}
                      <span className="message-time">{msg.time}</span>
                      {isPinned && (
                        <span style={{ fontSize:'0.65rem', color:'var(--color-lime)', display:'flex', alignItems:'center', gap:3 }}>
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M16 9V4l1-1V1H7v2l1 1v5l-3 5h6v7l1 1 1-1v-7h6z"/></svg>
                          Pinned
                        </span>
                      )}
                    </div>
                    {/* #12: @mention highlighting */}
                    <div className="message-text">{renderText(msg.text)}</div>
                  </div>

                  {/* Message action bar (hover) — pin/delete only */}
                  <div className="msg-actions">
                    <button className="msg-action-btn" title={isPinned ? 'Unpin' : 'Pin'} onClick={() => togglePin(msg.id)}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M16 9V4l1-1V1H7v2l1 1v5l-3 5h6v7l1 1 1-1v-7h6z"/></svg>
                    </button>
                    {isSelf && (
                      <button className="msg-action-btn danger" title="Delete" onClick={() => deleteMessage(msg.id)}>
                        <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Typing indicator */}
          <div className="typing-indicator" style={{ opacity: typing ? 1 : 0 }}>
            {typing && (
              <>
                <div className="typing-dots"><span/><span/><span/></div>
                <span>{typing} is typing…</span>
              </>
            )}
          </div>

          {/* Composer / Readonly */}
          {isReadonly ? (
            <div className="readonly-notice">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ display:'inline', verticalAlign:'middle', marginRight:5 }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
              Only admins can post in #{activeChannel}
            </div>
          ) : (
            <div className="composer">
              <div className="composer-inner">
                <input
                  ref={inputRef}
                  className="composer-input"
                  type="text"
                  value={inputVal}
                  onChange={e => setInputVal(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMessage()}
                  placeholder={activeDM ? `Message ${PEOPLE[activeDM]?.name.split(' ')[0]}…` : `Message #${activeChannel}…`}
                />
                <button className="composer-send" onClick={sendMessage} disabled={!inputVal.trim()} aria-label="Send">
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <MobileNav />

      <PWAInstallModal />
    </>
  )
}
