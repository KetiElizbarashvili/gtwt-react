import { Link, useNavigate } from 'react-router-dom'
import { GtwLogo } from './GtwLogo'
import { PEOPLE, CHANNELS } from '../data'

export function Sidebar({ activeChannel, activeDM, onSwitchChannel, onSwitchDM, dmPreviews, dmBadges }) {
  const navigate = useNavigate()

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
        <div className="sidebar-user">
          <div className="avatar-wrap">
            <img src="https://i.pravatar.cc/36?img=47" alt="Ana" className="avatar avatar-sm" />
            <span className="presence-dot"></span>
          </div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">Ana Beridze</div>
            <div className="sidebar-user-role">Speaker · AI Stage</div>
          </div>
          <Link to="/profile" style={{ flexShrink: 0 }} title="Settings">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="var(--color-text-muted)">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </Link>
        </div>
      </div>

      <div className="sidebar-section">
        <Link to="/directory" className="sidebar-item">
          <svg className="sidebar-item-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          Directory
        </Link>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-title">Channels</div>
        {Object.entries(CHANNELS).map(([key, ch]) => (
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
        <div className="sidebar-section-title">Direct Messages</div>
        {Object.entries(PEOPLE).map(([key, person]) => (
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
