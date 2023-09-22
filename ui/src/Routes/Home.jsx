// import { useNavigate } from "react-router-dom"
// import Card from '../components/Card'
import { useEffect, useState } from "react"
import getUser from '../utils/getUser'
import css from './Home.module.scss'


function Home() {
    const [user, setUser] = useState({ id: '' , username: ''})

    useEffect(() => {

        const fetchname = async () => {
            const user= await getUser()
            setUser(()=> user)
        }
        fetchname()

    }, [])

    return (

        <div id="cont-home" className={css.main}>
            <div>
                <div className={css.tag}>username</div>
                <div> {user.username} </div>
            </div>
            <div>
                <div className={css.tag}>name</div>
                <div>{user.name}</div>
            </div>
            <div>
                <div className={css.tag}>lastname</div>
                <div>{user.lastname}</div>
            </div>
            <div>
                <div className={css.tag}>age</div>
                <div>{user.age}</div>
            </div>
            <div>
                <div className={css.tag}>email</div>
                <div>{user.email}</div>
            </div>
        </div>

    )
}


export default Home