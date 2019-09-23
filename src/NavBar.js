import React from 'react';
import { Link } from '@reach/router'

class NavBar extends React.Component {
  render() {
    return (
      <div id="navbar">
        <div><Link to="/" className="nav-link">Logo</Link></div>
        <div>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/browse" className="nav-link">Browse Movies</Link>
        </div>
      </div>
    )
  }
}

export default NavBar;
