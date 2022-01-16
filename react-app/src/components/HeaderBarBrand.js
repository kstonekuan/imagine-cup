import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../logo.png';

const HeaderBarBrand = () => (
  <div className="navbar-brand">
    <a
      className="navbar-item"
      href="home"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src={logo} alt='logo'/>
    </a>
    <NavLink to="/" className="navbar-item nav-home">
      <span className="brand-first">ME</span>
      <span className="brand-second">NT</span>
      <span className="brand-third">Y</span>
    </NavLink>
  </div>
);

export default HeaderBarBrand;
