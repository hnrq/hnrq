// @flow
import React, { useRef } from 'react';
import useTyped from 'hooks/useTyped';
import { NavLink } from 'components/NavLink';
import './Header.scss';

const Header = () => {
  const typedRef = useRef(null);
  useTyped(typedRef, 
    {
    	strings: ['HNRQ', 'HENRIQUE'],
      typeSpeed: 50,
      backDelay: 5000,
      backSpeed: 50,
      loop: true
    }
  );
  return (
    <header className="header pt-5 pb-4">
      <div className="logo mb-4"><span ref={typedRef}/></div>
      <nav className="navbar">  
        <NavLink to="home" offset={0}>Home</NavLink>
        <NavLink to="about" offset={64}>About</NavLink>
        <NavLink to="posts" offset={90}>Posts</NavLink>
      </nav>
    </header>
  );
};

export default Header;