import { useState, useEffect } from 'react'
import styles from './login.module.scss'
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [value, setValue] = useState({ user: '', password: '' })
  const navigate = useNavigate();

  useEffect(() => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-type': 'application/json' },
        // body: JSON.stringify({})
    }

    fetch('https://stevsoza.com/api/login', requestOptions)
        .then(response => response.json())
        .then(data => {
            if (data.loggedIn === true) {
                navigate('/react-app/home')
            } else {
                navigate('/react-app/login')
            }
        })
  }, [])

  const handleChange = (e) => {
    setValue((state) => ({
      ...state,
      [e.target.name]: e.target.value
    }))
  }
  const validateUser = () => {
    if (value.user == "") return alert('user is empty')
    if (value.password == "") return alert('password is empty')

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ username: value.user, password: value.password })
    }
    fetch('https://stevsoza.com/api/login', requestOptions)
      .then(response => response.json())
      .then(data => data.message ? navigate('/react-app/home') : alert(data.error))

  }

  return (
    <div className={styles.main}>
      <div id='form' className={styles.form}>
        <div style={{ textAlign: 'center', fontSize: '2rem', margin: '2rem 2rem', fontWeight: 'bold' }}>
          Log in
        </div>
        <div id="form-user" className={styles['form-group']}>
          <label htmlFor="user">User</label>
          <input id='user' name='user' type='text' placeholder='user...' value={value.user} onChange={handleChange} autoComplete='false' />
        </div>
        <div id="form-password" className={styles['form-group']}>
          <label htmlFor="password">Password</label>
          <input id='password' name='password' type='password' placeholder='password...' value={value.password} onChange={handleChange} autoComplete='false' />
        </div>
        <div id="form-button" className={styles['form-group']}>
          <button onClick={validateUser}>Log in</button>
        </div>
        <div id="form-link" className={styles['form-group']}>
          <center>Don't have an account?</center>
          <Link to="/react-app/signup">Sign up</Link>
        </div>
      </div>
    </div>
  )
}

export default Login
