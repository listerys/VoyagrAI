// API route handler for /api/auth
export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body
    
    // This is a mock implementation - in a real app, you would validate credentials against a database
    if (email === 'demo@example.com' && password === 'password') {
      res.status(200).json({ 
        token: 'mock-jwt-token',
        user: {
          id: '1',
          email: 'demo@example.com',
          firstName: 'Demo',
          lastName: 'User',
          role: 'Project Manager'
        }
      })
    } else {
      res.status(401).json({ error: 'Invalid credentials' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
