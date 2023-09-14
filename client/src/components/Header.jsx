import React from "react";
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import common from '../pages/Common.jsx';

axios.defaults.withCredentials = true;

function Header(prop) {
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
        {prop.logined &&
        <div className="dropdown">
          <span class="material-symbols-outlined">
           account_circle
          </span>
          <div className="dropdown-content">
            <span onClick={() => logout()}>Logout</span>
          </div>
        </div>
        }
        {/* {prop.logined &&
        <div className="dropdown">
          <span class="material-symbols-outlined" onClick={() => logout()}>
            account_circle
          </span>
          <div className="dropdown-content">
            <p>Logout</p>
          </div>
        </div>
        } */}
      </div>
    </header>
  );
}

export default Header;