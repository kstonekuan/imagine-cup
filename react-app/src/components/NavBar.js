import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import menu from '../menu.png';

const NavBar = (props) => {
  // const [userInfo, setUserInfo] = useState();
  const providers = {
    'aad': 'Microsoft',
    'facebook': 'Facebook',
    'google': 'Google',
    'twitter': 'Twitter',
    'github': 'GitHub',
  };
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

  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggler = (e) => {
    setIsCollapsed(~isCollapsed);
    e.target.blur();
    console.log(isCollapsed);
  };

  return (
    //<div className="column is-2 sidebar">
    <div className={isCollapsed ? 'collapsed' : 'sidebar'}>
      <nav className="menu">
        
        <div className="menu-header">
          <button>
            <input 
              type="image"
              src={menu}
              id='menuButton'
              alt='menu'
              className="sidebar-icon"
              onClick={handleToggler}
            />
          </button>       
          <p className="menu-label">Menu</p>
        </div>


        <ul className="menu-list">
        <NavLink to="/home" activeClassName="active-link">
            Home
          </NavLink>
          <NavLink to="/about" activeClassName="active-link">
            About
          </NavLink>
          <NavLink to="/profile" activeClassName="active-link">
            Profile
          </NavLink>
          <NavLink to="/mentors" activeClassName="active-link">
            Mentors
          </NavLink>
          <NavLink to="/mentees" activeClassName="active-link">
            Mentees
          </NavLink>
          <NavLink to="/sessions" activeClassName="active-link">
            Sessions
          </NavLink>
          <NavLink to="/requests" activeClassName="active-link">
            Requests (TODO)
          </NavLink>
          <NavLink to="/questions" activeClassName="active-link">
            Questions (TODO)
          </NavLink>
        </ul>
        {props.children}
      </nav>
      <nav className="menu auth">
        {props.isLoading && (
          <div className="menu-label"> Loading data... </div>
        )}
        {!props.isLoading && (
          <div>
            <p className="menu-label">Login</p>
            <div className="menu-list auth">
              {!props.profile &&
                Object.entries(providers).map(([provider, displayName]) => (
                  <a key={provider} href={`/.auth/login/${provider}?post_login_redirect_uri=${redirect}`}>
                    {displayName}
                  </a>
                ))}
              {props.profile && <a href={`/.auth/logout?post_logout_redirect_uri=${redirect}`}>Logout</a>}
            </div>
          </div>
        )}
      </nav>
      {
        props.profile && (
          <div>
            <div className="user">
              <p>Welcome</p>
              <p>{props.profile && props.profile.name || 'Please set your details under profile' }</p>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default NavBar;
