import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import common from './Common.jsx';
import Header from "../components/Header"
import Footer from "../components/Footer"
import "../css/main.css"

axios.defaults.withCredentials = true;
const Register = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirtmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(password !== confirtmPassword){
      setError('The password and confirmation password do not match');
      return;
    }
    try {
      await axios.post(common.api + '/register', {
        userName: userName,
        email: email,
        password: password,
      });
      navigate(`/`);
    } catch (error) {
      console.log(error);
      navigate(`/login`, { state: { err: true }});
    }
  };

  return (
    <main>
      <Header logined={false}/>
      <section className="register-container">
        <div className='register-wrap'>
          <p>Register</p>
          <div className='form-wrap'>
            <form onSubmit={handleSubmit} action='/'>
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
                  type="text"
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
              <div className='button-group'>
                <button className='register' type="submit">Register</button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Register;