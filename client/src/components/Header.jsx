import React from "react";
import { Link } from 'react-router-dom'
import axios from 'axios'
import common from '../pages/Common.jsx';

axios.defaults.withCredentials = true;
const logout = async() => {
  await axios.get(common.api + "/logout");
}

function Header() {
  return (
    <header>
      <div class="header-content">
        <Link to={`/`}><p class="site-name">Travel Planner</p></Link>
      </div>
      <button onClick={() => logout()}>logout</button>
    </header>
  );
}

export default Header;