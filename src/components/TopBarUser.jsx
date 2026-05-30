import { Link } from 'react-router-dom'

// Shared top-bar user chip: avatar with name underneath. Used in every page's desktop top bar.
export function TopBarUser() {
  return (
    <Link to="/profile" className="topbar-user-chip" aria-label="Profile">
      <img src="/speakers/keto.png" alt="Keto Elizbarashvili" className="avatar" />
      <span>Keto Elizbarashvili</span>
    </Link>
  )
}
