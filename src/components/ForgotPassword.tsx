import React, { useRef, useState } from 'react';
import { Form, Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const emailRef = useRef<HTMLInputElement>(null);
  const { reset } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!emailRef?.current?.value) return;

    try {
      setError('')
      setLoading(true);
      await reset(emailRef.current.value)
      navigate('/login')
    } catch (err: any) {
      setError('Failed to reset your password');
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Card style={{ width: '100%', maxWidth: '400px' }}>
        <Card.Body>
          <h2 className='text-center mb-4'>Reset Password</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email" className='mb-3'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' required ref={emailRef}/>
            </Form.Group>
            <Button disabled={loading} type="submit" className='w-100'>Reset Password</Button>
          </Form>
          <div className='w-100 text-center mt-3'>
            <Link to='/login' className='text-secondary'>Log in</Link>
          </div>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
     </>
  )
}