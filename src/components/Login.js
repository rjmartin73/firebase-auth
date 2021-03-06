import React, { useRef, useState } from 'react'
import { Card, Button, Form, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext"



export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, currentUser } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError('')
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/")
     } catch (err) {
      console.error(err.message)
      setError('Email or password is incorrect.')
    }

    setLoading(false)

  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {currentUser && currentUser.email}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button type="submit" className="w-100" disabled={loading}>Sign In</Button>
          </Form>
          <div className="w-100 text-center mt-2">
            <Link to="/forgot-password">Forgot Password</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  )
}
