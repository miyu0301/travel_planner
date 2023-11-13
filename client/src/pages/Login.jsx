import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import common from "./Common.jsx";
import Header from "../components/Header";
import "../css/main.css";
import UserContext from "../context/UserContext.jsx";

axios.defaults.withCredentials = true;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [commonError, setCommonError] = useState("");
  const { setUserId } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setCommonError("An error occurred. Please try login later.");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(common.api + "/login", {
        email: email,
        password: password,
      });
      if (response.data.success) {
        console.log("login succeed");
        setUserId(response.data.user_id);
        navigate(`/`);
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      console.log(error);
      setCommonError("An error occurred. Please try login later.");
    }
  };
  const toRegister = () => {
    navigate(`/register`);
  };

  return (
    <main>
      <Header logined={false} />
      <section className="login-container">
        <div className="login-wrap">
          {commonError && <p className="common-error-message">{commonError}</p>}
          <p>Login</p>
          <div className="form-wrap">
            <form onSubmit={handleSubmit} action="/">
              <div className="form-group">
                <p htmlFor="email">Email</p>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <p htmlFor="password">Password</p>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="on"
                  required
                />
              </div>
              {error && <p className="error-message">{error}</p>}
              <div className="button-group">
                <button className="login" type="submit">
                  Login
                </button>
                <button
                  className="toregister"
                  type="button"
                  onClick={toRegister}
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
