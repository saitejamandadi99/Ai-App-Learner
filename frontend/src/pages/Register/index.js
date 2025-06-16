import './index.css'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Cookie from 'js-cookie'
import axios from 'axios'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    if (name === '' || email === '' || password === '' || confirmPassword === '') {
      setError('Please provide all the details')
      setLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    try {
      const url = 'https://ai-app-learner-backend.onrender.com/api/users/register'
      const response = await axios.post(url, { name, email, password })
      const token = response.data.user.token

      if (token) {
        Cookie.set('token', token, { expires: 7 })
        setSuccess(response.data.message || 'Registration successful')
        setLoading(false)
        navigate('/mainpage')
      } else {
        setError(response.data.message || 'Registration failed')
        setLoading(false)
      }
    } catch (e) {
      setLoading(false)
      console.error('Registration error details:', e)

      if (e.response) {
        setError(e.response.data.message || 'Registration failed. Please check your inputs.')
      } else if (e.request) {
        setError('Cannot connect to the server. Please check your internet connection or try again later.')
      } else {
        setError('An unexpected error occurred. Please try again.')
      }
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="text-center mb-4">Register</h2>
        <form className="d-flex flex-column" onSubmit={handleSubmit}>
          <label htmlFor="inputName">Name</label>
          <input
            type="text"
            id="inputName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="form-control mb-3"
          />

          <label htmlFor="inputEmail">Email</label>
          <input
            type="email"
            id="inputEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-control mb-3"
          />

          <label htmlFor="inputPassword">Password</label>
          <input
            type="password"
            id="inputPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-control mb-3"
          />

          <label htmlFor="inputConfirmPassword">Confirm Password</label>
          <input
            type="password"
            id="inputConfirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="form-control mb-3"
          />

          <button className="btn login-btn mt-2" type="submit" disabled={isLoading}>
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>

        {error && <div className="alert alert-danger mt-3 text-center">{error}</div>}
        {success && <div className="alert alert-success mt-3 text-center">{success}</div>}

        <div className="text-center mt-3">
          <span>Already have an account? </span>
          <Link to="/login">Login here</Link>
        </div>
      </div>
    </div>
  )
}

export default Register
