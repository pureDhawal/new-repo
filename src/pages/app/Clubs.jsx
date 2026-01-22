import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { clubs } from '@/lib/data'
import { X, Users, Edit2, Check } from 'lucide-react'
import { clubAdminsData } from '@/lib/clubAdminsData'

export default function Clubs() {
  const [selectedClub, setSelectedClub] = useState(null)
  const [clubsList, setClubsList] = useState(clubs)
  const [isEditingClub, setIsEditingClub] = useState(false)
  const [editForm, setEditForm] = useState({})
  const [user] = useState(JSON.parse(localStorage.getItem('user') || '{}'))
  
  // Check if current user is a club admin for this club
  const isClubAdmin = user.role === 'club_admin'
  const userClubAdminData = clubAdminsData[user.email]
  const isAdminOfThisClub = isClubAdmin && userClubAdminData?.club.id === selectedClub?.id

  // Listen for club name updates from admin
  useEffect(() => {
    const handleClubNameUpdate = (event) => {
      const { clubName } = event.detail
      setClubsList(prevClubs => 
        prevClubs.map(club => 
          club.id === selectedClub?.id 
            ? { ...club, name: clubName }
            : club
        )
      )
      // Update selected club display
      if (selectedClub?.id) {
        setSelectedClub(prev => ({ ...prev, name: clubName }))
      }
    }

    window.addEventListener('clubNameUpdated', handleClubNameUpdate)
    return () => window.removeEventListener('clubNameUpdated', handleClubNameUpdate)
  }, [selectedClub?.id])

  const handleEditClick = () => {
    setEditForm({
      name: selectedClub.name,
      description: selectedClub.description,
      members: selectedClub.members,
      info: selectedClub.info,
      founded: selectedClub.founded || '',
      location: selectedClub.location || '',
      instagram: selectedClub.instagram || '',
      linkedin: selectedClub.linkedin || '',
      facebook: selectedClub.facebook || ''
    })
    setIsEditingClub(true)
  }

  const handleSaveEdit = () => {
    const updatedClub = { ...selectedClub, ...editForm }
    setSelectedClub(updatedClub)
    setClubsList(prevClubs => 
      prevClubs.map(club => 
        club.id === selectedClub.id ? updatedClub : club
      )
    )
    // Dispatch event to sync with admin sidebar
    window.dispatchEvent(new CustomEvent('clubNameUpdated', { detail: { clubName: editForm.name } }))
    setIsEditingClub(false)
  }

  const handleCloseModal = () => {
    setSelectedClub(null)
    setIsEditingClub(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Clubs</h1>
        <p className="text-muted-foreground mt-2">Explore campus clubs and join your interests</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clubsList.map((club) => (
          <Card 
            key={club.id} 
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedClub(club)}
          >
            {club.imageUrl && (
              <img
                src={club.imageUrl}
                alt={club.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            )}
            <CardHeader>
              <CardTitle>{club.name}</CardTitle>
              <CardDescription>{club.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {club.members} members
                </Badge>
                <button className="text-sm text-primary hover:underline font-medium">
                  View Info
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Club Info Modal */}
      {selectedClub && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-screen overflow-y-auto">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              {isEditingClub ? (
                <div className="space-y-4 w-full max-h-96 overflow-y-auto pr-4">
                  <Label>Club Name</Label>
                  <Input
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  />
                  <Label>Description</Label>
                  <Input
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  />
                  <Label>About</Label>
                  <Input
                    value={editForm.info}
                    onChange={(e) => setEditForm({ ...editForm, info: e.target.value })}
                  />
                  <Label>Members</Label>
                  <Input
                    type="number"
                    value={editForm.members}
                    onChange={(e) => setEditForm({ ...editForm, members: parseInt(e.target.value) })}
                  />
                  <Label>Founded Year</Label>
                  <Input
                    value={editForm.founded}
                    onChange={(e) => setEditForm({ ...editForm, founded: e.target.value })}
                  />
                  <Label>Location</Label>
                  <Input
                    value={editForm.location}
                    onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                  />
                  <Label>Instagram</Label>
                  <Input
                    value={editForm.instagram}
                    onChange={(e) => setEditForm({ ...editForm, instagram: e.target.value })}
                    placeholder="@username"
                  />
                  <Label>LinkedIn</Label>
                  <Input
                    value={editForm.linkedin}
                    onChange={(e) => setEditForm({ ...editForm, linkedin: e.target.value })}
                  />
                  <Label>Facebook</Label>
                  <Input
                    value={editForm.facebook}
                    onChange={(e) => setEditForm({ ...editForm, facebook: e.target.value })}
                  />
                  <div className="flex gap-2 pt-4">
                    <Button onClick={handleSaveEdit} className="flex-1 gap-2">
                      <Check className="w-4 h-4" />
                      Save Changes
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsEditingClub(false)} 
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <CardTitle className="text-2xl">{selectedClub.name}</CardTitle>
                    <CardDescription>{selectedClub.description}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    {isAdminOfThisClub && (
                      <button
                        onClick={handleEditClick}
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                        title="Edit club details"
                      >
                        <Edit2 className="h-5 w-5 text-primary" />
                      </button>
                    )}
                    <button
                      onClick={handleCloseModal}
                      className="p-2 hover:bg-muted rounded-lg transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </>
              )}
            </CardHeader>

            {selectedClub.imageUrl && (
              <div className="px-6">
                <img
                  src={selectedClub.imageUrl}
                  alt={selectedClub.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            )}

            <CardContent className="space-y-6 pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Members</p>
                  <p className="text-2xl font-bold">{selectedClub.members}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge>Active</Badge>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">About this Club</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {selectedClub.info}
                </p>
              </div>

              {(selectedClub.founded || selectedClub.location) && (
                <div className="grid grid-cols-2 gap-4 border-t pt-4">
                  {selectedClub.founded && (
                    <div>
                      <p className="text-sm text-muted-foreground">Founded</p>
                      <p className="font-semibold">{selectedClub.founded}</p>
                    </div>
                  )}
                  {selectedClub.location && (
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-semibold">{selectedClub.location}</p>
                    </div>
                  )}
                </div>
              )}

              {(selectedClub.instagram || selectedClub.linkedin || selectedClub.facebook) && (
                <div className="border-t pt-4">
                  <h3 className="font-semibold text-lg mb-3">Social Media</h3>
                  <div className="space-y-2">
                    {selectedClub.instagram && (
                      <p className="text-sm"><span className="font-semibold">Instagram:</span> {selectedClub.instagram}</p>
                    )}
                    {selectedClub.linkedin && (
                      <p className="text-sm"><span className="font-semibold">LinkedIn:</span> {selectedClub.linkedin}</p>
                    )}
                    {selectedClub.facebook && (
                      <p className="text-sm"><span className="font-semibold">Facebook:</span> {selectedClub.facebook}</p>
                    )}
                  </div>
                </div>
              )}

              <div className="border-t pt-4">
                <h3 className="font-semibold text-lg mb-2">Activities</h3>
                <ul className="space-y-2">
                  {selectedClub.name === 'Application Club' && (
                    <>
                      <li className="text-sm text-muted-foreground">• Weekly project collaboration</li>
                      <li className="text-sm text-muted-foreground">• App development workshops</li>
                      <li className="text-sm text-muted-foreground">• Hackathon participation</li>
                    </>
                  )}
                  {selectedClub.name === 'Computer Coding Club' && (
                    <>
                      <li className="text-sm text-muted-foreground">• Competitive programming contests</li>
                      <li className="text-sm text-muted-foreground">• Algorithm learning sessions</li>
                      <li className="text-sm text-muted-foreground">• Code review meetings</li>
                    </>
                  )}
                  {selectedClub.name === 'Dramatic Society' && (
                    <>
                      <li className="text-sm text-muted-foreground">• Theatre productions</li>
                      <li className="text-sm text-muted-foreground">• Acting workshops</li>
                      <li className="text-sm text-muted-foreground">• Drama nights and performances</li>
                    </>
                  )}
                  {selectedClub.name === 'Media Club' && (
                    <>
                      <li className="text-sm text-muted-foreground">• Photography expeditions</li>
                      <li className="text-sm text-muted-foreground">• Video production</li>
                      <li className="text-sm text-muted-foreground">• Content creation workshops</li>
                    </>
                  )}
                  {selectedClub.name === 'Quiz Club' && (
                    <>
                      <li className="text-sm text-muted-foreground">• Weekly quiz competitions</li>
                      <li className="text-sm text-muted-foreground">• Knowledge building sessions</li>
                      <li className="text-sm text-muted-foreground">• National quiz participations</li>
                    </>
                  )}
                  {selectedClub.name === 'Literary Club' && (
                    <>
                      <li className="text-sm text-muted-foreground">• Book club meetings</li>
                      <li className="text-sm text-muted-foreground">• Poetry recitations</li>
                      <li className="text-sm text-muted-foreground">• Writing workshops</li>
                    </>
                  )}
                  {selectedClub.name === 'Dance Club' && (
                    <>
                      <li className="text-sm text-muted-foreground">• Dance classes and training</li>
                      <li className="text-sm text-muted-foreground">• Performance events</li>
                      <li className="text-sm text-muted-foreground">• Inter-college competitions</li>
                    </>
                  )}
                  {selectedClub.name === 'Green Club' && (
                    <>
                      <li className="text-sm text-muted-foreground">• Tree planting drives</li>
                      <li className="text-sm text-muted-foreground">• Environmental awareness</li>
                      <li className="text-sm text-muted-foreground">• Sustainability initiatives</li>
                    </>
                  )}
                  {selectedClub.name === 'Robotic Club' && (
                    <>
                      <li className="text-sm text-muted-foreground">• Robot building and programming</li>
                      <li className="text-sm text-muted-foreground">• Robotics competitions</li>
                      <li className="text-sm text-muted-foreground">• Innovation challenges</li>
                    </>
                  )}
                  {selectedClub.name === 'Athletic Club' && (
                    <>
                      <li className="text-sm text-muted-foreground">• Sports training sessions</li>
                      <li className="text-sm text-muted-foreground">• Inter-college tournaments</li>
                      <li className="text-sm text-muted-foreground">• Fitness programs</li>
                    </>
                  )}
                  {selectedClub.name === 'Lifting Club' && (
                    <>
                      <li className="text-sm text-muted-foreground">• Strength training programs</li>
                      <li className="text-sm text-muted-foreground">• Weightlifting competitions</li>
                      <li className="text-sm text-muted-foreground">• Expert coaching sessions</li>
                    </>
                  )}
                </ul>
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <Button className="flex-1">Join Club</Button>
                <Button variant="outline" className="flex-1" onClick={() => setSelectedClub(null)}>
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
