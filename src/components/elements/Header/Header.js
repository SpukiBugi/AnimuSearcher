import React from 'react';
import {Link} from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
            <Link to='/'  style={{ textDecoration: 'none' }}>
                <header className="mainHeader">
                    <div className ="mainHeader__title"><h1>AnimuSearcher</h1></div>
                    <img className='mainHeader__image' src='/images/arc.png' alt='arc' />
                </header>
            </Link>
    )
}    


export default Header;