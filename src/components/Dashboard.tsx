import { useState } from "react"
import { Alert, Button, Card } from "react-bootstrap"
import { useAuth } from "../context/AuthContext"
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [error, setError] = useState('')
  const { user, logout } = useAuth();

  function handleLogout() {

  }

  return (
    <>
      <Card style={{ width: '100%', maxWidth: '400px' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Dashboard</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email: </strong>{user?.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">Update Profile</Link>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        <Button variant="link" onClick={handleLogout}>Log Out</Button>
      </div>
    </>
  )
}
