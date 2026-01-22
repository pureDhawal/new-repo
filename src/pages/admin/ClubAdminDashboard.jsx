import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, Users, Mail, Phone, Building2, Edit2, LogOut, TrendingUp, Award } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { clubAdminsData } from '@/lib/clubAdminsData'

export default function ClubAdminDashboard() {
  const navigate = useNavigate()
  const { user, logout, loading } = useAuth()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  
  // Get user-specific data from mock data (fallback until backend ready)
  const userEmail = user?.email
  const userData = clubAdminsData[userEmail] || clubAdminsData['rahul.kumar@mnnit.ac.in']

  const [clubAdmin, setClubAdmin] = useState(userData.admin)
  const [club] = useState(userData.club)
  const [editForm, setEditForm] = useState(clubAdmin)
  const [clubEditForm, setClubEditForm] = useState({
    description: club.description,
    achievements: club.achievements || '',
    instagram: club.socialMedia?.instagram || '',
    linkedin: club.socialMedia?.linkedin || '',
    facebook: club.socialMedia?.facebook || '',
    location: club.location || ''
  })
  const [isEditingClubProfile, setIsEditingClubProfile] = useState(false)
  
  const [events, setEvents] = useState(userData.events)
  const [newEvent, setNewEvent] = useState({ title: '', date: '', description: '', poster: null })
  const [isEventFormOpen, setIsEventFormOpen] = useState(false)

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!user?.email) {
      navigate('/login')
    }
  }, [user, navigate])

  const handleAddEvent = (e) => {
    e.preventDefault()
    if (newEvent.title && newEvent.date) {
      setEvents([...events, { 
        id: events.length + 1, 
        title: newEvent.title, 
        date: newEvent.date, 
        description: newEvent.description,
        attendees: 0,
        status: 'Upcoming'
      }])
      setNewEvent({ title: '', date: '', description: '', poster: null })
      setIsEventFormOpen(false)
      alert('Event created successfully!')
    }
  }

  const deleteEvent = (id) => {
    setEvents(events.filter(e => e.id !== id))
    alert('Event deleted!')
  }

  const handleSaveProfile = () => {
    setClubAdmin(editForm)
    setIsEditingProfile(false)
    alert('Profile updated successfully!')
  }

  const handleSaveClubProfile = () => {
    setIsEditingClubProfile(false)
    alert('Club profile updated successfully!')
  }

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Club Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">Manage your club content and events</p>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="profile">Club Profile</TabsTrigger>
          <TabsTrigger value="calendar">Calendar Sync</TabsTrigger>
        </TabsList>

        {/* 1. DASHBOARD TAB */}
        <TabsContent value="dashboard" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Admin Profile Card */}
            <Card className="md:col-span-1">
              <CardHeader className="text-center">
                <img 
                  src={clubAdmin.image} 
                  alt={clubAdmin.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-primary"
                />
                <CardTitle>{clubAdmin.name}</CardTitle>
                <CardDescription>{clubAdmin.position}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a href={`mailto:${clubAdmin.email}`} className="text-blue-600 hover:underline break-all">{clubAdmin.email}</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{clubAdmin.phone}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Member since {clubAdmin.joinedDate}
                  </div>
                </div>
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  {isEditingProfile ? 'Cancel' : 'Edit Profile'}
                </Button>
              </CardContent>
            </Card>

            {/* Edit Admin Profile */}
            {isEditingProfile && (
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle className="text-lg">Edit Your Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input 
                      value={editForm.name}
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input 
                      value={editForm.phone}
                      onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Position</Label>
                    <Input 
                      value={editForm.position}
                      onChange={(e) => setEditForm({...editForm, position: e.target.value})}
                    />
                  </div>
                  <Button className="w-full" onClick={handleSaveProfile}>Save Changes</Button>
                </CardContent>
              </Card>
            )}

            {/* Club Overview */}
            <div className={`${isEditingProfile ? "md:col-span-1" : "md:col-span-2"} space-y-4`}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Club Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Club Name</p>
                    <p className="font-semibold text-lg">{club.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Description</p>
                    <p className="text-sm">{club.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 border-t pt-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Founded: {club.founded}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{club.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Club Stats */}
              <div className="grid grid-cols-3 gap-2">
                <Card>
                  <CardContent className="pt-6 text-center">
                    <div className="text-3xl font-bold text-primary">{club.members}</div>
                    <div className="text-xs text-muted-foreground">Members</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <div className="text-3xl font-bold text-primary">{events.length}</div>
                    <div className="text-xs text-muted-foreground">Events</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <div className="text-3xl font-bold text-primary">{club.achievements}</div>
                    <div className="text-xs text-muted-foreground">Achievements</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Club Coordinators */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Club Coordinators
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {club.coordinators.map((coord) => (
                  <div key={coord.role} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{coord.name}</p>
                      <p className="text-sm text-muted-foreground">{coord.role}</p>
                      <p className="text-sm text-blue-600">{coord.email}</p>
                    </div>
                    <Badge variant="secondary">{coord.role}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 2. EVENTS MANAGEMENT TAB */}
        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Club Events Management</CardTitle>
              <CardDescription>Add, edit, delete and upload event posters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Add Event Form */}
              {!isEventFormOpen ? (
                <Button onClick={() => setIsEventFormOpen(true)} className="w-full">
                  + Create New Event
                </Button>
              ) : (
                <form onSubmit={handleAddEvent} className="space-y-4 p-4 border rounded-lg bg-muted/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="eventTitle">Event Title</Label>
                      <Input
                        id="eventTitle"
                        placeholder="e.g., Workshop on Web Dev"
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="eventDate">Event Date</Label>
                      <Input
                        id="eventDate"
                        type="date"
                        value={newEvent.date}
                        onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="eventDesc">Description</Label>
                    <Input
                      id="eventDesc"
                      placeholder="Event description"
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="eventPoster">Event Poster</Label>
                    <Input
                      id="eventPoster"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setNewEvent({...newEvent, poster: e.target.files?.[0]})}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1">Create Event</Button>
                    <Button type="button" variant="outline" onClick={() => setIsEventFormOpen(false)} className="flex-1">Cancel</Button>
                  </div>
                </form>
              )}

              {/* Events List */}
              <div className="space-y-3">
                <h3 className="font-semibold mt-6">Upcoming Events ({events.length})</h3>
                {events.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No events yet. Create your first event!</p>
                ) : (
                  events.map((event) => (
                    <div key={event.id} className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-semibold text-lg">{event.title}</p>
                          <p className="text-sm text-muted-foreground">{event.date} • {event.attendees} attendees</p>
                          {event.description && <p className="text-sm mt-2">{event.description}</p>}
                          <Badge className="mt-2" variant={event.status === 'Completed' ? 'default' : event.status === 'Ongoing' ? 'secondary' : 'outline'}>
                            {event.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Edit</Button>
                        <Button size="sm" variant="destructive" onClick={() => deleteEvent(event.id)}>Delete</Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 3. CLUB PROFILE TAB */}
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Club Profile Settings</CardTitle>
              <CardDescription>Update club description, achievements, and contact information</CardDescription>
            </CardHeader>
            <CardContent>
              {!isEditingClubProfile ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Description</p>
                    <p className="text-sm">{club.description}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Achievements</p>
                    <p className="text-sm">{club.achievements || 'No achievements yet'}</p>
                  </div>
                  <div className="border-t pt-4">
                    <p className="text-sm text-muted-foreground mb-3">Social Media & Contact</p>
                    <div className="space-y-2">
                      <p className="text-sm"><span className="font-semibold">Instagram:</span> {club.socialMedia?.instagram}</p>
                      <p className="text-sm"><span className="font-semibold">LinkedIn:</span> {club.socialMedia?.linkedin}</p>
                      <p className="text-sm"><span className="font-semibold">Facebook:</span> {club.socialMedia?.facebook}</p>
                      <p className="text-sm"><span className="font-semibold">Location:</span> {club.location}</p>
                    </div>
                  </div>
                  <Button onClick={() => setIsEditingClubProfile(true)} className="w-full mt-4">
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit Club Profile
                  </Button>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); handleSaveClubProfile(); }} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Club Description</Label>
                    <Input
                      value={clubEditForm.description}
                      onChange={(e) => setClubEditForm({...clubEditForm, description: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Achievements</Label>
                    <Input
                      value={clubEditForm.achievements}
                      onChange={(e) => setClubEditForm({...clubEditForm, achievements: e.target.value})}
                      placeholder="e.g., Won National Competition 2023"
                    />
                  </div>
                  <div className="border-t pt-4">
                    <h3 className="font-semibold mb-4">Social Media & Contact</h3>
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label>Instagram Handle</Label>
                        <Input
                          value={clubEditForm.instagram}
                          onChange={(e) => setClubEditForm({...clubEditForm, instagram: e.target.value})}
                          placeholder="@clubname"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>LinkedIn Profile</Label>
                        <Input
                          value={clubEditForm.linkedin}
                          onChange={(e) => setClubEditForm({...clubEditForm, linkedin: e.target.value})}
                          placeholder="Club LinkedIn name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Facebook Page</Label>
                        <Input
                          value={clubEditForm.facebook}
                          onChange={(e) => setClubEditForm({...clubEditForm, facebook: e.target.value})}
                          placeholder="Club Facebook page"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Location</Label>
                        <Input
                          value={clubEditForm.location}
                          onChange={(e) => setClubEditForm({...clubEditForm, location: e.target.value})}
                          placeholder="Club location"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1">Save Changes</Button>
                    <Button type="button" variant="outline" onClick={() => setIsEditingClubProfile(false)} className="flex-1">Cancel</Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* 4. CALENDAR SYNC TAB */}
        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Event Calendar Sync
              </CardTitle>
              <CardDescription>Push your club events to the main campus calendar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-950">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  Sync your club events to make them visible to all students on the campus calendar. This helps increase attendance and engagement.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold">Events Ready to Sync</h3>
                {events.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No events to sync. Create events first!</p>
                ) : (
                  events.map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{event.title}</p>
                        <p className="text-sm text-muted-foreground">{event.date}</p>
                      </div>
                      <Button size="sm" variant="outline">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Sync to Calendar
                      </Button>
                    </div>
                  ))
                )}
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Synced Events</h3>
                <p className="text-sm text-muted-foreground">No synced events yet</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Logout Section */}
      <div className="flex justify-center mt-8">
        <Button 
          variant="destructive" 
          size="lg"
          onClick={handleLogout}
          className="gap-2"
          disabled={loading}
        >
          <LogOut className="h-5 w-5" />
          {loading ? 'Logging out...' : 'Logout'}
        </Button>
      </div>
    </div>
  )
}
