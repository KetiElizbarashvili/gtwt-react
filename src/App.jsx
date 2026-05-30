import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import LoginPage    from './pages/LoginPage'
import AppPage      from './pages/AppPage'
import ChannelsPage from './pages/ChannelsPage'
import DirectoryPage from './pages/DirectoryPage'
import ProfilePage  from './pages/ProfilePage'

export default function App() {
  const location = useLocation()
  return (
    <div className="route-fade" key={location.pathname}>
      <Routes location={location}>
        <Route path="/"          element={<Navigate to="/login" replace />} />
        <Route path="/login"     element={<LoginPage />} />
        <Route path="/app"       element={<AppPage />} />
        <Route path="/channels"  element={<ChannelsPage />} />
        <Route path="/directory" element={<DirectoryPage />} />
        <Route path="/profile"   element={<ProfilePage />} />
        <Route path="*"          element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  )
}
