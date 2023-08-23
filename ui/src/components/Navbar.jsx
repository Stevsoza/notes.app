import css from './Navbar.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faGear, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Navbar = ({ isNav, name }) => {
    const [isActive, setIsActive] = useState(false)
    const navigate = useNavigate()

    const logOut = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
        }

        fetch('https://stevsoza.com/api/logout', requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.loggOut) {
                    navigate('/react-app/login')
                }
            })
    }

    const combinedStyles = {
        ...styles.main,
        ...(isNav ? null : styles.hide)
    }
    const toggleMenu = () => {
        setIsActive(!isActive)
        // console.log(menuOpen)
    }
    
    return (
        // this navbar will be show only for screens up 768
        // combinedStyles goin to be showed if show variable is false, hide the navbar and dont shows at all 
        <div style={combinedStyles}>
            <div className={css.mobile}>
                <div>{name}</div>
                <div className={css.csbtn} onClick={logOut}>logout</div>
                <div onClick={toggleMenu} className={`${css.menu_icon} ${isActive ? css.active : {}}`}>
                    <span className={css.menuicon__line}></span>
                    <span className={css.menuicon__line}></span>
                    <span className={css.menuicon__line}></span>
                </div>
            </div>
            <div className={css.show}>
                <button><FontAwesomeIcon icon={faUser} /><span>Profile</span></button>
                <button><FontAwesomeIcon icon={faGear} /><span>Configuration</span></button>
                <button><FontAwesomeIcon icon={faPenToSquare} /><span>Managment</span></button>
                <button onClick={logOut}><FontAwesomeIcon icon={faPenToSquare} /><span>logOut</span></button>
            </div>
        </div>
    )
}


const styles = {
    main: {
        width: 'auto'
        // height: '100%'
    },
    hide: {
        display: 'none'
    }
}


export default Navbar;
