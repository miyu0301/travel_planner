import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import passwordValidator from "password-validator";
import common from "./Common.jsx";
import Header from "../components/Header";
import "../css/main.css";
import { handleError } from "./Common.jsx";

axios.defaults.withCredentials = true;
const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirtmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    var validate = new passwordValidator();
    validate.is().min(8);
    if (!validate.validate(password)) {
      setError("The password must be at least 8 characters.");
      return;
    }
    validate.is().has().uppercase().has().lowercase().has().digits(1);
    if (!validate.validate(password)) {
      setError(
        "The password must contain at least one lowercase and uppercase letter, and one digit."
      );
      return;
    }
    if (password !== confirtmPassword) {
      setError("The password and confirmation password do not match.");
      return;
    }
    try {
      const res = await axios.post(common.api + "/user", { email: email });
      if (res.data.existUser) {
        setError("This email is already registered.");
        return;
      }

      await axios.post(common.api + "/register", {
        userName: userName,
        email: email,
        password: password,
      });
      navigate(`/`);
    } catch (error) {
      handleError(error, navigate);
    }
  };

  return (
    <main>
      <Header logined={false} />
      <section className="register-container">
        <div className="register-wrap">
          <p>Register</p>
          <div className="form-wrap">
            <form onSubmit={handleSubmit} action="/">
              <div className="form-group">
                <p htmlFor="user-name">User Name</p>
                <input
                  type="text"
                  id="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>
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
                  required
                />
              </div>
              <div className="form-group">
                <p htmlFor="confirtm-password">Confirm Password</p>
                <input
                  type="password"
                  id="confirtm-password"
                  value={confirtmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="error-message">{error}</p>}
              <div className="button-group">
                <button className="register" type="submit">
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

export default Register;
