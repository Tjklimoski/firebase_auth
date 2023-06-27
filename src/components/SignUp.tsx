import { useRef } from 'react';
import { Form, Card, Button } from 'react-bootstrap';

export default function SignUp() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Sign Up</h2>
          <Form>
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
            <Button type="submit" className='w-100'>Sign Up!</Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Already have an account? Log In
      </div>
     </>
  )
}
