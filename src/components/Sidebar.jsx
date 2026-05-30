import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GtwLogo } from './GtwLogo'
import { PEOPLE, CHANNELS } from '../data'

function Caret({ open }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      style={{ transition: 'transform 0.2s ease', transform: open ? 'rotate(0deg)' : 'rotate(-90deg)', flexShrink: 0 }}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
    </svg>
  )
}

const sectionTitleBtn = { background: 'none', border: 'none', width: '100%', cursor: 'pointer', textAlign: 'left' }

export function Sidebar({ activeChannel, activeDM, onSwitchChannel, onSwitchDM, dmPreviews, dmBadges }) {
  const navigate = useNavigate()
  const [channelsOpen, setChannelsOpen] = useState(true)
  const [dmsOpen, setDmsOpen] = useState(true)

  function doLogout() {
    sessionStorage.clear()
    navigate('/login')
  }

  return (
    <aside className="sidebar" role="navigation">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <GtwLogo size="sidebar" />
        </div>
      </div>

      <div className="sidebar-section">
        <Link to="/directory" className="sidebar-item">
          <svg className="sidebar-item-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          Speakers
        </Link>
      </div>

      <div className="sidebar-section">
        <button className="sidebar-section-title" style={sectionTitleBtn} onClick={() => setChannelsOpen(o => !o)}>
          Channels
          <Caret open={channelsOpen} />
        </button>
        {channelsOpen && Object.entries(CHANNELS).map(([key, ch]) => (
          <button
            key={key}
            className={`sidebar-item${activeChannel === key && !activeDM ? ' active' : ''}`}
            onClick={() => onSwitchChannel(key)}
          >
            <span className="ch-hash" style={ch.color ? { color: ch.color } : {}}>#</span>
            {' '}{ch.label}
            {ch.badge > 0 && (
              <span className="sidebar-item-badge">
                <span className="badge">{ch.badge}</span>
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="sidebar-section" style={{ flex: 1 }}>
        <button className="sidebar-section-title" style={sectionTitleBtn} onClick={() => setDmsOpen(o => !o)}>
          Direct Messages
          <Caret open={dmsOpen} />
        </button>
        {dmsOpen && Object.entries(PEOPLE).map(([key, person]) => (
          <button
            key={key}
            className={`dm-item${activeDM === key ? ' active' : ''}`}
            onClick={() => onSwitchDM(key)}
          >
            <div className="avatar-wrap">
              <img src={person.avatar} alt="" className="avatar avatar-xs" />
              {person.online && <span className="presence-dot" style={{ width: 8, height: 8 }}></span>}
            </div>
            <div className="dm-item-info">
              <div className="dm-item-name">{person.name}</div>
              <div className="dm-item-preview">{dmPreviews[key] || 'Start a conversation...'}</div>
            </div>
            {dmBadges[key] > 0 && <span className="badge">{dmBadges[key]}</span>}
          </button>
        ))}
      </div>

      <div className="sidebar-bottom">
        <button onClick={doLogout} className="btn btn-ghost btn-sm" style={{ flex: 1 }}>
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
          </svg>
          Sign Out
        </button>
      </div>
    </aside>
  )
}
