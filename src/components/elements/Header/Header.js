import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ThreeWrap from './webgl/ThreeWrap/ThreeWrap.js';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <Link to='/' className="headLink" >
        <header className="mainHeader">
          <ThreeWrap />
          <div className="title">AnimuSearcher</div>
        </header>
      </Link>
    )
  }
}


export default Header;