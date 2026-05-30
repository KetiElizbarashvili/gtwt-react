import { Link, useLocation } from 'react-router-dom'

const MessagesIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
  </svg>
)

const SpeakersIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
  </svg>
)

const ProfileIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
  </svg>
)

export function MobileNav() {
  const { pathname } = useLocation()
  const isMessages = pathname === '/channels' || pathname === '/app'

  return (
    <nav className="mobile-nav">
      <div className="mobile-nav-inner">
        <Link to="/channels" className={`mobile-nav-item${isMessages ? ' active' : ''}`}>
          <MessagesIcon />
          <span>Channels &amp; DMs</span>
        </Link>

        <Link to="/directory" className={`mobile-nav-item${pathname === '/directory' ? ' active' : ''}`}>
          <SpeakersIcon />
          <span>Speakers</span>
        </Link>

        <Link to="/profile" className={`mobile-nav-item${pathname === '/profile' ? ' active' : ''}`}>
          <ProfileIcon />
          <span>Profile</span>
        </Link>
      </div>
    </nav>
  )
}
