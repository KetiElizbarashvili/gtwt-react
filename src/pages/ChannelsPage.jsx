import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GtwLogo } from '../components/GtwLogo'
import { MobileNav } from '../components/MobileNav'
import { PEOPLE, CHANNELS, MESSAGES } from '../data'

const DM_BADGES = { tarik: 2 }

export default function ChannelsPage() {
  const navigate = useNavigate()

  useEffect(() => {
    if (sessionStorage.getItem('gtw_logged_in') !== '1') navigate('/login')
  }, [navigate])

  function openChannel(key) {
    sessionStorage.setItem('gtw_open_channel', key)
    navigate('/app')
  }

  function openDM(key) {
    sessionStorage.setItem('gtw_open_dm', key)
    navigate('/app')
  }

  const dmPreviews = {}
  Object.keys(PEOPLE).forEach(key => {
    const msgs = MESSAGES[`dm-${key}`] || []
    if (msgs.length) dmPreviews[key] = msgs[msgs.length - 1].text
  })

  return (
    <>
      <style>{`
        .channels-page { display:flex; flex-direction:column; height:100vh; height:100dvh; height:var(--app-height,100dvh); background:var(--color-bg); }
        .channels-topbar { display:flex; align-items:center; justify-content:center; padding:0 var(--space-4); height:56px; background:var(--color-surface); border-bottom:1px solid var(--color-border); flex-shrink:0; position:sticky; top:0; z-index:20; }
        .channels-scroll { flex:1; overflow-y:auto; padding-bottom:calc(80px + env(safe-area-inset-bottom)); -webkit-overflow-scrolling:touch; }
        .ch-hash { color:var(--color-text-muted); font-size:0.85rem; font-weight:600; width:18px; flex-shrink:0; text-align:center; }
      `}</style>

      <div className="channels-page">
        <div className="channels-topbar">
          <GtwLogo size="sidebar" />
        </div>

        <div className="channels-scroll">
          <div className="drawer-section-label">Channels</div>
          {Object.entries(CHANNELS).map(([key, ch]) => (
            <button key={key} className="drawer-item" onClick={() => openChannel(key)}>
              <span className="ch-hash" style={ch.color ? { color: ch.color } : {}}>#</span>
              <span style={{ flex:1 }}>{ch.label}</span>
              {ch.badge > 0 && <span className="badge">{ch.badge}</span>}
            </button>
          ))}

          <div className="drawer-section-label" style={{ marginTop:'var(--space-2)' }}>Direct Messages</div>
          {Object.entries(PEOPLE).map(([key, person]) => (
            <button key={key} className="drawer-item drawer-item-dm" onClick={() => openDM(key)}>
              <div className="avatar-wrap" style={{ flexShrink:0 }}>
                <img src={person.avatar} alt="" className="avatar avatar-xs" />
                {person.online && <span className="presence-dot" style={{ width:8, height:8 }} />}
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:'0.875rem', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', display:'flex', alignItems:'center', gap:4 }}>
                  {person.name}
                  {person.volunteer && <span style={{ fontSize:'0.6rem', color:'var(--color-lime)', background:'rgba(195,251,26,0.1)', border:'1px solid rgba(195,251,26,0.2)', borderRadius:'var(--radius-full)', padding:'1px 5px', fontWeight:700, letterSpacing:'0.04em', textTransform:'uppercase' }}>Vol</span>}
                </div>
                <div style={{ fontSize:'0.72rem', color:'var(--color-text-muted)' }}>{dmPreviews[key] || 'Start a conversation…'}</div>
              </div>
              {DM_BADGES[key] > 0 && <span className="badge">{DM_BADGES[key]}</span>}
            </button>
          ))}

        
        </div>
      </div>

      <MobileNav />
    </>
  )
}
