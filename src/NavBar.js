import React from 'react';
import { Link } from '@reach/router'

const NavBar = () => {
    const highlightActiveLink = (isActive) => {
      return {
        style: {
          borderBottom: isActive && `2px solid #5d7`
        }
      }
    }

    return (
      <div id="navbar">
        <div><Link to="/" className="nav-link logo">CINEMINFO</Link></div>
        <div>
          <Link to="/" getProps={({ isCurrent }) => highlightActiveLink(isCurrent)} className="nav-link">Home</Link>
          <Link to="/browse" getProps={({ isCurrent }) => highlightActiveLink(isCurrent)} className="nav-link">Search Movies</Link>
        </div>
      </div>
    )
}

export default NavBar;
