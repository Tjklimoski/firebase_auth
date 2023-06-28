import React, { useRef, useState } from 'react';
import { Form, Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Update() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (passwordRef?.current?.value !== passwordConfirmRef?.current?.value) {
      return setError('Passwords do not match')
    }

    // try {
    //   setError('')
    //   setLoading(true);
    //   await signup(emailRef.current.value, passwordRef.current.value)
    //   navigate('/');
    // } catch (err: any) {
    //   setError('Failed to create an account');
    // } finally {
    //   setLoading(false)
    // }
  }

  return (
    <>
      <Card style={{ width: '100%', maxWidth: '400px' }}>
        <Card.Body>
          <h2 className='text-center mb-4'>Update Profile</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email" className='mb-3'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' defaultValue={user?.email ?? ''} required ref={emailRef}/>
            </Form.Group>
            <Form.Group id="password" className='mb-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' placeholder='leave blank to keep the same' ref={passwordRef}/>
            </Form.Group>
            <Form.Group id="passwordConfirm" className='mb-3'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type='password' placeholder='leave blank to keep the same' ref={passwordConfirmRef}/>
            </Form.Group>
            <Button disabled={loading} type="submit" className='w-100'>Update</Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        <Link to="/">Cancel</Link>
      </div>
     </>
  )
}
