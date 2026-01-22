import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  BarChart3, Users, Calendar, FileText, Shield, Plus, Edit2, Trash2, 
  CheckCircle, XCircle, AlertCircle, Download, Upload, Mail, Phone, LogOut
} from 'lucide-react'

export default function SuperAdminDashboard() {
  const navigate = useNavigate()
  const [isEditingProfile, setIsEditingProfile] = useState(false)

  // Super Admin Profile
  const [adminProfile, setAdminProfile] = useState({
    name: 'Dr. Vikram Sharma',
    email: 'vikram.sharma@mnnit.ac.in',
    phone: '+91-9876543221',
    position: 'Platform Administrator',
    department: 'Computer Science & Engineering',
    joinedDate: 'January 2020',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram',
    accessLevel: 'Super Admin'
  })

  const [editForm, setEditForm] = useState(adminProfile)

  const [stats, setStats] = useState({
    totalEvents: 156,
    totalClubs: 24,
    totalUsers: 2450,
    pendingApprovals: 12,
  })

  const [pendingEvents, setPendingEvents] = useState([
    { id: 1, title: 'Cultural Fest 2024', organizer: 'Cultural Club', status: 'Pending', date: '2024-03-15' },
    { id: 2, title: 'Coding Challenge', organizer: 'Tech Club', status: 'Pending', date: '2024-02-20' },
    { id: 3, title: 'Sports Meet', organizer: 'Sports Club', status: 'Pending', date: '2024-04-05' }
  ])

  const [clubs, setClubs] = useState([
    { id: 1, name: 'Tech Innovation Club', coordinator: 'Raj Kumar', coordinatorEmail: 'raj.k@mnnit.ac.in', members: 245, status: 'Active', founded: '2015' },
    { id: 2, name: 'Cultural Club', coordinator: 'Priya Singh', coordinatorEmail: 'priya.s@mnnit.ac.in', members: 189, status: 'Active', founded: '2018' },
    { id: 3, name: 'Sports Club', coordinator: 'Amit Patel', coordinatorEmail: 'amit.p@mnnit.ac.in', members: 312, status: 'Active', founded: '2014' },
  ])

  const [materials, setMaterials] = useState([
    { id: 1, title: 'DSA Notes - Semester 3', branch: 'CSE', size: '2.5 MB', status: 'Approved', uploadedBy: 'Rahul Kumar' },
    { id: 2, title: 'DBMS Tutorials', branch: 'ECE', size: '1.8 MB', status: 'Pending', uploadedBy: 'Priya Sharma' },
    { id: 3, title: 'Web Development Guide', branch: 'CSE', size: '3.2 MB', status: 'Approved', uploadedBy: 'Vikram Singh' },
  ])

  const [moderation, setModeration] = useState([
    { id: 1, title: 'Lost: iPhone 14', author: 'Rohit Kumar', contact: '9876543210', status: 'Pending', date: '2024-01-18' },
    { id: 2, title: 'Found: Silver Watch', author: 'Priya Gupta', contact: '9876543211', status: 'Approved', date: '2024-01-17' },
    { id: 3, title: 'Lost: Math Notes', author: 'Aditya Singh', contact: '9876543212', status: 'Rejected', date: '2024-01-16' },
  ])

  const approveEvent = (id) => {
    setPendingEvents(pendingEvents.filter(e => e.id !== id))
    alert('Event approved!')
  }

  const rejectEvent = (id) => {
    setPendingEvents(pendingEvents.filter(e => e.id !== id))
    alert('Event rejected!')
  }

  const handleSaveProfile = () => {
    setAdminProfile(editForm)
    setIsEditingProfile(false)
    alert('Profile updated successfully!')
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <div className="space-y-6 pb-6">
      {/* Admin Profile Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="md:col-span-1">
          <CardHeader className="text-center">
            <img 
              src={adminProfile.image} 
              alt={adminProfile.name}
              className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-primary"
            />
            <CardTitle>{adminProfile.name}</CardTitle>
            <CardDescription>{adminProfile.position}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a href={`mailto:${adminProfile.email}`} className="text-blue-600 hover:underline break-all">{adminProfile.email}</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{adminProfile.phone}</span>
              </div>
              <div className="text-xs text-muted-foreground">
                Dept: {adminProfile.department}
              </div>
              <div className="text-xs text-muted-foreground">
                Member since {adminProfile.joinedDate}
              </div>
              <Badge className="mt-2">{adminProfile.accessLevel}</Badge>
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

        {/* Edit Profile Section */}
        {isEditingProfile && (
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Edit Profile</CardTitle>
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
                <Label>Email</Label>
                <Input 
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({...editForm, email: e.target.value})}
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
              <div className="space-y-2">
                <Label>Department</Label>
                <Input 
                  value={editForm.department}
                  onChange={(e) => setEditForm({...editForm, department: e.target.value})}
                />
              </div>
              <Button className="w-full" onClick={handleSaveProfile}>Save Changes</Button>
            </CardContent>
          </Card>
        )}

        {/* System Stats */}
        <Card className={isEditingProfile ? "md:col-span-2" : "md:col-span-3"}>
          <CardHeader>
            <CardTitle>Platform Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 border rounded-lg">
                <div className="text-2xl font-bold text-primary">{stats.totalEvents}</div>
                <div className="text-xs text-muted-foreground">Total Events</div>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <div className="text-2xl font-bold text-primary">{stats.totalClubs}</div>
                <div className="text-xs text-muted-foreground">Total Clubs</div>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <div className="text-2xl font-bold text-primary">{stats.totalUsers}</div>
                <div className="text-xs text-muted-foreground">Registered Users</div>
              </div>
              <div className="text-center p-3 border rounded-lg bg-orange-50">
                <div className="text-2xl font-bold text-orange-600">{stats.pendingApprovals}</div>
                <div className="text-xs text-muted-foreground">Pending Approvals</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Management */}
      <Tabs defaultValue="events" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="academics">Academics</TabsTrigger>
          <TabsTrigger value="materials">Materials</TabsTrigger>
          <TabsTrigger value="moderation">Moderation</TabsTrigger>
          <TabsTrigger value="clubs">Clubs</TabsTrigger>
        </TabsList>

        {/* Events Management Tab */}
        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Event Approvals</CardTitle>
              <CardDescription>Review and approve events from all clubs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingEvents.map((event) => (
                  <div key={event.id} className="p-4 border rounded-lg hover:bg-muted/50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold">{event.title}</h4>
                        <p className="text-sm text-muted-foreground">{event.organizer} • {event.date}</p>
                        <Badge className="mt-2" variant="outline">Pending Review</Badge>
                      </div>
                      <div className="space-x-2">
                        <Button size="sm" variant="outline" className="text-green-600 hover:text-green-700" onClick={() => approveEvent(event.id)}>
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700" onClick={() => rejectEvent(event.id)}>
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Academic Management Tab */}
        <TabsContent value="academics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Academic Calendar & Timetables</CardTitle>
              <CardDescription>Manage academic schedules and calendars</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Academic Calendar 2023-24
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">Last updated: 15 Dec 2023</p>
                  <Button variant="outline" className="w-full mb-2">
                    <Download className="w-4 h-4 mr-2" />
                    Download Current
                  </Button>
                  <Button className="w-full">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload New Calendar
                  </Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Branch-wise Timetables
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">Available for all branches</p>
                  <Button variant="outline" className="w-full mb-2">
                    <Download className="w-4 h-4 mr-2" />
                    View All Timetables
                  </Button>
                  <Button className="w-full">
                    <Upload className="w-4 h-4 mr-2" />
                    Update Timetable
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Study Material Tab */}
        <TabsContent value="materials" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Study Material Control</CardTitle>
              <CardDescription>Approve and manage study materials</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {materials.map((material) => (
                  <div key={material.id} className="p-4 border rounded-lg hover:bg-muted/50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold">{material.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {material.branch} • {material.size} • Uploaded by {material.uploadedBy}
                        </p>
                        <Badge className="mt-2" variant={material.status === 'Approved' ? 'default' : 'outline'}>
                          {material.status}
                        </Badge>
                      </div>
                      <div className="space-x-2">
                        {material.status === 'Pending' && (
                          <>
                            <Button size="sm" variant="outline" className="text-green-600">
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600">
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Lost & Found Moderation Tab */}
        <TabsContent value="moderation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lost & Found Moderation</CardTitle>
              <CardDescription>Review and manage lost & found posts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {moderation.map((post) => (
                  <div key={post.id} className="p-4 border rounded-lg hover:bg-muted/50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold">{post.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          Posted by {post.author} • {post.contact} • {post.date}
                        </p>
                        <Badge className="mt-2" variant={post.status === 'Approved' ? 'default' : post.status === 'Rejected' ? 'destructive' : 'outline'}>
                          {post.status}
                        </Badge>
                      </div>
                      <div className="space-x-2">
                        {post.status === 'Pending' && (
                          <>
                            <Button size="sm" variant="outline" className="text-green-600">
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        {post.status === 'Approved' && (
                          <Button size="sm" variant="outline" className="text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Club Management Tab */}
        <TabsContent value="clubs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Club Management</CardTitle>
              <CardDescription>Manage all clubs and their coordinators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {clubs.map((club) => (
                  <div key={club.id} className="p-4 border rounded-lg hover:bg-muted/50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold">{club.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          Founded: {club.founded} • Members: {club.members}
                        </p>
                        <div className="mt-2 text-sm">
                          <p className="text-muted-foreground">Coordinator: <span className="font-medium text-foreground">{club.coordinator}</span></p>
                          <p className="text-blue-600">{club.coordinatorEmail}</p>
                        </div>
                        <Badge className="mt-2">{club.status}</Badge>
                      </div>
                      <div className="space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
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
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  )
}
