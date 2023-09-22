import { faGear, faPenToSquare, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import getUser from "../utils/getUser";
import ContextMenu from './ContextMenu';
import css from './Navbar.module.scss';

const host = import.meta.env.VITE_HOST

const Navbar = ({ isNav }) => {
    const [isActive, setIsActive] = useState(false)
    const navigate = useNavigate()

    const [name, setName] = useState(null)

    const nameFunction = async () => {
        try {
            const user = await getUser();
            // let { username } = user;
            if (user && user.username) {
                setName(user.username);
            }
        } catch (error) {
            console.log(error)
        }
    }
    nameFunction();

    // useEffect(() => {
    // }, []);

    const logOut = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
        }

        fetch(`${host}/api/logout`, requestOptions)
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
            {isActive && <ContextMenu logOut={logOut}/>}
            <div className={css.mobile}>
                <div>{name !== null ? name : 'cargando'}</div>
                {/* <div className={css.csbtn} onClick={logOut}>logout</div> */}
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
            {/* {isActive ? <Alert /> : null} */}
        </div>
    )
}


const styles = {
    main: {
        width: 'auto',
        // height: '100%'
        position:"relative"
    },
    hide: {
        display: 'none'
    }

    
}


export default Navbar;
