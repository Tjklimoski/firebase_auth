import React, { useRef, useState } from 'react';
import { Form, Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function SignUp() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!emailRef?.current?.value || !passwordRef?.current?.value ) return;
    if (passwordRef.current.value !== passwordConfirmRef?.current?.value) {
      return setError('Passwords do not match')
    }

    try {
      setError('')
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value)
    } catch (err: any) {
      const errorMessage = err.message ?? 'Failed to create an account';
      setError(errorMessage);
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Card style={{ width: '100%', maxWidth: '400px' }}>
        <Card.Body>
          <h2 className='text-center mb-4'>Sign Up</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email" className='mb-3'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' required ref={emailRef}/>
            </Form.Group>
            <Form.Group id="password" className='mb-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' required ref={passwordRef}/>
            </Form.Group>
            <Form.Group id="passwordConfirm" className='mb-3'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type='password' required ref={passwordConfirmRef}/>
            </Form.Group>
            <Button disabled={loading} type="submit" className='w-100'>Sign Up</Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Already have an account? <Link to="/login">Log In</Link>
      </div>
     </>
  )
}
