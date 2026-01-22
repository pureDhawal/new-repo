import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { GraduationCap, Loader2, Info, CheckCircle } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import api from '@/services/api'

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    registrationNumber: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Validation
    if (!formData.fullName || !formData.email || !formData.registrationNumber || !formData.password || !formData.confirmPassword) {
      setError('All fields are required')
      setLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long')
      setLoading(false)
      return
    }

    if (!formData.agreeTerms) {
      setError('You must agree to the terms and conditions')
      setLoading(false)
      return
    }

    try{
      const res = await api.post("/auth/signup", formData);

      console.log(res);
      alert("Registered Successful");
    }catch(error){
      console.error("Signup Failed:", 
          error.response?.data || error.message
        );
        alert("Failed to register");
    }
    // Simulate API call
    // setTimeout(() => {
    //   setSuccess(true)
    //   localStorage.setItem('user', JSON.stringify({ 
    //     name: formData.fullName, 
    //     email: formData.email 
    //   }))
    //   setTimeout(() => {
    //     navigate('/app/dashboard')
    //   }, 1500)
    // }, 1000)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950 p-4">
      <div className="w-full max-w-lg">
        <div className="flex justify-center mb-6">
          <Link to="/" className="flex items-center justify-center gap-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="font-semibold text-2xl">MNNIT-Connect</span>
          </Link>
        </div>
        <Card>
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl">Create Your Account</CardTitle>
            <CardDescription>
              Join MNNIT-Connect and connect with your college community
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mb-4 border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-800">Success!</AlertTitle>
                <AlertDescription className="text-green-700">
                  Account created successfully. Redirecting...
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="registrationNumber">Registration Number</Label>
                <Input
                  id="registrationNumber"
                  name="registrationNumber"
                  placeholder="e.g., 2023001"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="At least 8 characters"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <Alert className="border-blue-200 bg-blue-50">
                <Info className="h-4 w-4 text-blue-600" />
                <AlertTitle className="text-blue-900">Password Requirements</AlertTitle>
                <AlertDescription className="text-blue-800">
                  • At least 8 characters long
                  <br />
                  • Mix of letters and numbers
                </AlertDescription>
              </Alert>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
                />
                <label htmlFor="terms" className="text-sm">
                  I agree to the{' '}
                  <Link to="#" className="underline">
                    terms and conditions
                  </Link>
                </label>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading || success}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : success ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Account Created!
                  </>
                ) : (
                  'Sign Up'
                )}
              </Button>

              <div className="text-center text-sm">
                Already have an account?{' '}
                <Link to="/login" className="underline">
                  Sign in
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
