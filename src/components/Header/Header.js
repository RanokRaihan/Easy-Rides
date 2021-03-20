import React from 'react';
import { useState } from 'react';
import logo from '../../images/logo.png';
import './Header.css';

const Header = () => {
    const [navClass, setNavClass] = useState('nav-hidden');
    const handleNav = () => {
        if (navClass === 'nav-hidden') {
            setNavClass('nav-show')
        }
        else {
            setNavClass('nav-hidden')
        }
    }
    return (
        <div className='main-header'>
            <div className="logo">
                <img src={logo} alt="" />
            </div>
            <nav className={navClass}>
                <ul className='nav-items'>
                    <li> <a className='nav-link' href="/">Home</a> </li>
                    <li><a className='nav-link' href="/destination">Destination</a></li>
                    <li>Blog</li>
                    <li>Contact</li>
                    <button className='btn btn-login'>
                        <a className='nav-link' href="/login">Login</a>
                    </button>
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