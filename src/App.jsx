import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import DashboardLayout from './pages/app/DashboardLayout'
import Dashboard from './pages/app/Dashboard'
import Clubs from './pages/app/Clubs'
import Events from './pages/app/Events'
import Resources from './pages/app/Resources'
import Timetable from './pages/app/Timetable'
import LostAndFound from './pages/app/LostAndFound'
import AdminLayout from './pages/admin/AdminLayout'
import ClubAdminDashboard from './pages/admin/ClubAdminDashboard'
import SuperAdminDashboard from './pages/admin/SuperAdminDashboard'
import { Toaster } from '@/components/ui/toaster'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            
            {/* Student Dashboard Routes */}
            <Route path="/app" element={<DashboardLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="clubs" element={<Clubs />} />
              <Route path="events" element={<Events />} />
              <Route path="resources" element={<Resources />} />
              <Route path="timetable" element={<Timetable />} />
              <Route path="lost-and-found" element={<LostAndFound />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="club" element={<ClubAdminDashboard />} />
              <Route path="super" element={<SuperAdminDashboard />} />
            </Route>

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </AuthProvider>
    </>
  )
}

export default App
