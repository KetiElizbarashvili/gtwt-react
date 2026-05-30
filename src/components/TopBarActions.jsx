import { useState, useEffect, useRef } from 'react'

const NOTIFICATIONS = [
  { id: 1, avatar: '/speakers/tarik-sultan.png',  name: 'Tarik Sultan', text: 'mentioned you in #ai-stage',        time: '2m ago'  },
  { id: 2, avatar: '/speakers/nino-eliava.jpg',   name: 'Nino Eliava',  text: 'sent you a direct message',          time: '18m ago' },
  { id: 3, avatar: '/speakers/Saba-Bakhia.png',   name: 'Saba Bakhia',  text: 'reacted 🔥 to your message',         time: '1h ago'  },
  { id: 4, avatar: '/speakers/Arman-Mamyan.jpg',  name: 'Arman Mamyan', text: 'started following you',              time: '3h ago'  },
  { id: 5, avatar: '/speakers/keto.png',          name: 'Reminder',     text: 'Your talk on the AI Stage starts in 30 min', time: '5h ago' },
]

// Shared top-bar right-side actions: online count + notifications bell (with dropdown). Identical on every page.
export function TopBarActions({ onBellClick }) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const close = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false) }
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [open])

  return (
    <>
      <style>{`
        .tb-online { display:flex; align-items:center; gap:5px; font-size:0.8rem; color:var(--color-text-muted); white-space:nowrap; }
        .tb-online-dot { width:7px; height:7px; background:#22C55E; border-radius:50%; box-shadow:0 0 6px #22C55E; flex-shrink:0; }
        .tb-bell-wrap { position:relative; display:flex; }
        .tb-bell { position:relative; background:none; border:none; cursor:pointer; color:var(--color-text-muted); display:flex; align-items:center; justify-content:center; width:var(--touch-min); height:var(--touch-min); border-radius:var(--radius-md); transition:background var(--transition),color var(--transition); }
        .tb-bell:hover { background:rgba(255,255,255,0.06); color:var(--color-text-primary); }
        .tb-bell-dot { position:absolute; top:8px; right:8px; width:8px; height:8px; background:var(--color-lime); border-radius:50%; border:2px solid var(--color-surface); }
        .tb-notif { position:absolute; top:calc(100% + 8px); right:0; width:320px; max-height:420px; overflow-y:auto; background:rgba(8,11,32,0.98); backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px); border:1px solid rgba(255,255,255,0.1); border-radius:var(--radius-lg); box-shadow:0 12px 40px rgba(0,0,0,0.5); z-index:300; animation:tbNotifIn 0.15s ease; }
        @keyframes tbNotifIn { from{opacity:0; transform:translateY(-6px)} to{opacity:1; transform:translateY(0)} }
        .tb-notif-head { padding:var(--space-3) var(--space-4); font-family:var(--font-display); font-weight:700; font-size:0.85rem; border-bottom:1px solid rgba(255,255,255,0.08); position:sticky; top:0; background:rgba(8,11,32,0.98); }
        .tb-notif-item { display:flex; gap:var(--space-3); align-items:flex-start; padding:var(--space-3) var(--space-4); border-bottom:1px solid rgba(255,255,255,0.04); transition:background var(--transition); cursor:pointer; }
        .tb-notif-item:last-child { border-bottom:none; }
        .tb-notif-item:hover { background:rgba(255,255,255,0.03); }
        .tb-notif-body { flex:1; min-width:0; }
        .tb-notif-text { font-size:0.82rem; line-height:1.45; color:var(--color-text-primary); }
        .tb-notif-text strong { font-weight:600; }
        .tb-notif-time { font-size:0.7rem; color:var(--color-text-muted); margin-top:2px; }
        @media(max-width:768px) {
          .tb-online { display:none; }
          .tb-notif { position:fixed; top:56px; left:var(--space-3); right:var(--space-3); width:auto; }
        }
      `}</style>

      <div className="tb-online">
        <span className="tb-online-dot" />
        <span>91 online</span>
      </div>

      <div className="tb-bell-wrap" ref={wrapRef}>
        <button className="tb-bell" aria-label="Notifications" onClick={() => { setOpen(o => !o); onBellClick?.() }}>
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
          <span className="tb-bell-dot" />
        </button>

        {open && (
          <div className="tb-notif" onClick={e => e.stopPropagation()}>
            <div className="tb-notif-head">Notifications</div>
            {NOTIFICATIONS.map(n => (
              <div key={n.id} className="tb-notif-item">
                <img src={n.avatar} alt="" className="avatar avatar-xs" style={{ flexShrink:0 }} />
                <div className="tb-notif-body">
                  <div className="tb-notif-text"><strong>{n.name}</strong> {n.text}</div>
                  <div className="tb-notif-time">{n.time}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
