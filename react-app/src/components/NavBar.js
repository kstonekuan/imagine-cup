import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = (props) => {
  // const [userInfo, setUserInfo] = useState();
  const providers = ['twitter', 'github', 'aad'];
  const redirect = window.location.pathname;

  // useEffect(() => {
  //   (async () => {
  //     setUserInfo(await getUserInfo());
  //   })();
  // }, []);

  // async function getUserInfo() {
  //   try {
  //     const response = await fetch('/.auth/me');
  //     const payload = await response.json();
  //     const { clientPrincipal } = payload;
  //     return clientPrincipal;
  //   } catch (error) {
  //     console.error('No profile could be found');
  //     return undefined;
  //   }
  // }

  return (
    <div className="column is-2">
      <nav className="menu">
        <p className="menu-label">Menu</p>
        <ul className="menu-list">
          <NavLink to="/products" activeClassName="active-link">
            Products
          </NavLink>
          <NavLink to="/about" activeClassName="active-link">
            About
          </NavLink>
          <NavLink to="/mentors" activeClassName="active-link">
            Mentors
          </NavLink>
          <NavLink to="/mentees" activeClassName="active-link">
            Mentees
          </NavLink>
          <NavLink to="/home" activeClassName="active-link">
            Home
          </NavLink>
          <NavLink to="/profile" activeClassName="active-link">
            Profile
          </NavLink>
          <NavLink to="/requests" activeClassName="active-link">
            Requests
          </NavLink>
          <NavLink to="/sessions" activeClassName="active-link">
            Sessions
          </NavLink>
        </ul>
        {props.children}
      </nav>
      <nav className="menu auth">
        <p className="menu-label">Auth</p>
        <div className="menu-list auth">
          {!props.userInfo &&
            providers.map((provider) => (
              <a key={provider} href={`/.auth/login/${provider}?post_login_redirect_uri=${redirect}`}>
                {provider}
              </a>
            ))}
          {props.userInfo && <a href={`/.auth/logout?post_logout_redirect_uri=${redirect}`}>Logout</a>}
        </div>
      </nav>
      {
        props.userInfo && (
          <div>
            <div className="user">
              <p>Welcome</p>
              <p>{props.userInfo && props.userInfo.userDetails}</p>
              <p>{props.userInfo && props.userInfo.identityProvider}</p>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default NavBar;
