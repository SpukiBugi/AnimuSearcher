import React from 'react';
import {Link} from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
            <Link to='/'>
                <header className="main-header">
                <div><h1>AnimuSearcher</h1></div>
                <img className='banner-image' src='/images/arc.png' alt='arc' />
                </header>
            </Link>
    )
}    


export default Header;