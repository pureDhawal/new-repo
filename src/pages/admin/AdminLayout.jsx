import { useLocation, Link, Outlet, useNavigate } from 'react-router-dom'
import { GraduationCap, Menu, X, Edit2, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState, useEffect } from 'react'
import { clubAdminsData } from '@/lib/clubAdminsData'

export default function AdminLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isEditingClub, setIsEditingClub] = useState(false)
  const [clubName, setClubName] = useState('')
  const [editedClubName, setEditedClubName] = useState('')
  
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const isClubAdmin = user.role === 'club_admin'

  // Get club data on load
  useEffect(() => {
    if (isClubAdmin) {
      const userData = clubAdminsData[user.email]
      if (userData) {
        setClubName(userData.club.name)
        setEditedClubName(userData.club.name)
      }
    }
  }, [user.email, isClubAdmin])

  const handleSaveClubName = () => {
    setClubName(editedClubName)
    // Store in localStorage for persistence
    const updatedUser = { ...user, clubName: editedClubName }
    localStorage.setItem('user', JSON.stringify(updatedUser))
    // Broadcast to other components
    window.dispatchEvent(new CustomEvent('clubNameUpdated', { detail: { clubName: editedClubName } }))
    setIsEditingClub(false)
  }

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 hover:bg-accent rounded-lg"
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative w-64 h-screen bg-background border-r transition-transform duration-300 z-50 md:z-auto ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-4 flex justify-center border-b">
          <Link to="/" className="flex items-center gap-2">
            <GraduationCap className="w-8 h-8 text-primary" />
            <span className="text-xl font-semibold">MNNIT-Connect</span>
          </Link>
        </div>

        <div className="p-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase mb-4">
            {isClubAdmin ? '🏢 Club Admin' : '🛡️ Super Admin'}
          </p>
          
          {/* Club Info Card for Club Admin */}
          {isClubAdmin && clubName && (
            <div className="mb-6 p-3 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-xs text-muted-foreground font-semibold mb-2">YOUR CLUB</p>
              {isEditingClub ? (
                <div className="space-y-2">
                  <Input
                    value={editedClubName}
                    onChange={(e) => setEditedClubName(e.target.value)}
                    className="h-8 text-sm"
                    placeholder="Club name"
                  />
                  <Button
                    size="sm"
                    onClick={handleSaveClubName}
                    className="w-full h-7 text-xs"
                  >
                    <Check className="w-3 h-3 mr-1" />
                    Save
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-sm text-primary">{clubName}</p>
                    <button
                      onClick={() => setIsEditingClub(true)}
                      className="p-1 hover:bg-primary/20 rounded transition-colors"
                      title="Edit club name"
                    >
                      <Edit2 className="w-3 h-3 text-primary" />
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground">Club Administrator</p>
                </div>
              )}
            </div>
          )}

          <div className="space-y-2">
            {isClubAdmin ? (
              <>
                <Link
                  to="/admin/club"
                  onClick={() => setSidebarOpen(false)}
                  className={`block px-4 py-2 rounded-lg transition-colors ${
                    location.pathname === '/admin/club'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent'
                  }`}
                >
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/admin/super"
                  onClick={() => setSidebarOpen(false)}
                  className={`block px-4 py-2 rounded-lg transition-colors ${
                    location.pathname === '/admin/super'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent'
                  }`}
                >
                  Dashboard
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          {/* Empty or add logout here if needed */}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
