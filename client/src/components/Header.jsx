import React from "react";
import { Link } from 'react-router-dom'

function Header(props) {
  return (
    <header>
      <div class="header-content">
        <Link to={`/${props.userId}`}><p class="site-name">Travel Planner</p></Link>
      </div>
  </header>
  );
}

export default Header;