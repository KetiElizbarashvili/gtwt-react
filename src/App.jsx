import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage    from './pages/LoginPage'
import AppPage      from './pages/AppPage'
import DirectoryPage from './pages/DirectoryPage'
import ProfilePage  from './pages/ProfilePage'

export default function App() {
  return (
    <Routes>
      <Route path="/"          element={<Navigate to="/login" replace />} />
      <Route path="/login"     element={<LoginPage />} />
      <Route path="/app"       element={<AppPage />} />
      <Route path="/directory" element={<DirectoryPage />} />
      <Route path="/profile"   element={<ProfilePage />} />
      <Route path="*"          element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
