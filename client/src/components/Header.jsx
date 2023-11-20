import { React, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import common from "../pages/Common.jsx";
import UserContext from "../context/UserContext.jsx";
import { handleError } from "../pages/Common.jsx";

axios.defaults.withCredentials = true;

function Header(prop) {
  const { setUserId } = useContext(UserContext);
  const navigate = useNavigate();
  const logout = async () => {
    try {
      await axios.get(common.api + "/logout");
      setUserId(null);
      localStorage.removeItem("user_id");
      navigate(`/login`);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <header>
      <div className="header-content">
        <Link to={`/`}>
          <p className="site-name">Travel Planner</p>
        </Link>
        {prop.logined && (
          <div className="dropdown">
            <span className="material-symbols-outlined">account_circle</span>
            <div className="dropdown-content">
              <span onClick={() => logout()}>Logout</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
