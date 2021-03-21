import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { userContext } from '../../App';
import logo from '../../images/logo.png';
import './Header.css';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const [navClass, setNavClass] = useState('nav-hidden');
    const handleNav = () => {
        if (navClass === 'nav-hidden') {
            setNavClass('nav-show')
        }
        else {

        }
    }
    const history = useHistory();
    const handleNavDirection = direction => {
        history.push(direction);
        setNavClass('nav-hidden')
    }
    return (
        <div className='main-header'>
            <div className="logo">
                <img src={logo} alt="" />
            </div>
            <nav className={navClass}>
                <ul className='nav-items'>
                    <li onClick={() => handleNavDirection('/')}>Home  </li>
                    <li onClick={() => handleNavDirection('/destination/1')}>Destination</li>
                    <li>Blog</li>
                    <li>Contact</li>
                    {
                        loggedInUser.isSignedIn ? <span className='user-name'>{loggedInUser.userName}</span> :
                            <button onClick={() => handleNavDirection('/login')} className='btn btn-login'> Log in</button>
                    }

                </ul>
            </nav>
            <div className="nav-burger" onClick={handleNav}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Header;