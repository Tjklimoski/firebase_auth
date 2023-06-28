import React, { useRef, useState } from 'react';
import { Form, Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import qs from 'qs';

export default function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const query = qs.parse(window.location.search.slice(1))
  console.log(query)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!emailRef?.current?.value || !passwordRef?.current?.value ) return;

    try {
      setError('')
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value)
      navigate('/')
    } catch (err: any) {
      setError('Failed to log in');
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Card style={{ width: '100%', maxWidth: '400px' }}>
        <Card.Body>
          <h2 className='text-center mb-4'>Log In</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          {query?.reset === 'true' && <Alert variant='success'>Check your email for a password reset link</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email" className='mb-3'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' required ref={emailRef}/>
            </Form.Group>
            <Form.Group id="password" className='mb-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' required ref={passwordRef}/>
            </Form.Group>
            <Button disabled={loading} type="submit" className='w-100'>Log In</Button>
          </Form>
          <div className='w-100 text-center mt-3'>
            <Link to='/forgot-password' className='text-secondary'>Forgot password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
     </>
  )
}
