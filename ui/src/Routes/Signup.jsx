import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './register.module.scss'


const host =  import.meta.env.VITE_HOST

function Signup() {
    const [value, setValue] = useState({
        name: '',
        username: '',
        lastname: '',
        email: '',
        password: '',
        password2: '',
        age: ''
    })

    const navigate = useNavigate()


    const signUp = () => {
        if (value.name == '') return alert('field name must have a valid value')
        if (value.username == '') return alert('field username must have a valid value')
        if (value.lastname == '') return alert('field lastname must have a valid value')
        if (value.email == '') return alert('field email must have a valid value')
        if (value.password !== value.password2) return alert('Passwords don\'t match')
        if (value.age == '') return alert('field age must have a valid value')
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ name: value.name, lastname: value.lastname, username: value.username, email: value.email, password: value.password, age: value.age })
        }
        console.log(requestOptions.body)
        fetch(`${host}/api/signup`, requestOptions)
            .then(response => response.json())
            .then(data => data.message ? navigate('/react-app/login') : alert('user already exists'))

    }
    const handleChange = (e) => {
        setValue((state) => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }



    return (
        <div className={styles.main}>
            <div className={styles.container1}>
                <div className={styles.header}>Sign Up</div>
                <div style={{ textAlign: 'center', paddingTop: '20px', display: 'flex', flexDirection: 'column', marginBottom: '2rem' }}>
                    Already have an account?
                    <Link to="/react-app/login">Log in</Link>
                </div>
                <div className={styles.form}>
                    <div className={styles['form-group']}>
                        <div>
                            <label htmlFor="username">Username</label>
                        </div>
                        <input name="username" type="text" placeholder="username" value={value.username} onChange={handleChange} />
                    </div>
                    <div className={styles['form-group']}>
                        <div>
                            <label htmlFor="name">Name</label>
                        </div>
                        <input name="name" type="text" placeholder="name" value={value.name} onChange={handleChange} />

                    </div>
                    <div className={styles['form-group']}>
                        <div>
                            <label htmlFor="lastname">Last name</label>
                        </div>
                        <input name="lastname" type="text" placeholder="lastname" value={value.lastname} onChange={handleChange} />
                    </div>
                    <div className={styles['form-group']}>
                        <div>
                            <label>Age</label>
                        </div>
                        <input name="age" type="number" placeholder="age" value={value.age} onChange={handleChange} />
                    </div>
                    <div className={styles['form-group']}>
                        <div>
                            <label>Email</label>
                        </div>
                        <input name="email" type="email" placeholder="email" value={value.email} onChange={handleChange} />
                    </div>

                    <div className={styles['form-group']}>
                        <div>
                            <label>Password</label>
                        </div>
                        <input name="password" type="password" placeholder="password" value={value.password} onChange={handleChange} />
                    </div>
                    <div className={styles['form-group']}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div>Repeat Password</div>
                            {value.password !== value.password2 ? <div style={{ paddingLeft: '20px', fontSize: '0.6rem', marginBottom: '5px', color: 'red' }}>passwords don't match</div> : ''}
                        </div>
                        <input name="password2" type="password" placeholder="repeat-password" value={value.password2} onChange={handleChange} />
                    </div>

                </div>
                <button onClick={signUp}>Create Account</button>
            </div>
            <div className={styles.container2}>
                <img src='./illustration.svg' style={{ maxHeight: '20rem' }} />
            </div>
        </div>
    )
}

export default Signup