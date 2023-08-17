import React from "react";
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header>
      <div class="header-content">
        <Link to={"/"}><p class="site-name">Travel Planner</p></Link>
      </div>
  </header>
  );
}

export default Header;