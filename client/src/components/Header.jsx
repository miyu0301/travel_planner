import React from "react";
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import common from '../pages/Common.jsx';

axios.defaults.withCredentials = true;

function Header() {
  const navigate = useNavigate();
  const logout = async() => {
    try {
      await axios.get(common.api + "/logout");
      navigate(`/login`);
    } catch (error) {
      console.log(error)
    }
  }
  
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