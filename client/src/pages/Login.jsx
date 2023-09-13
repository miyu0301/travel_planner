import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import common from './Common.jsx';
import Header from "../components/Header"
import Footer from "../components/Footer"
import "../css/main.css"

axios.defaults.withCredentials = true;
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if(!document.cookie){
      navigate(`/login`);
    }
  }, [])

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(common.api + '/login', {
        email: "test",
        password: "test",
      });
      console.log("LOGIN RES")
      console.log(response)

      if (response.data.success) {
        console.log('Login successful');
        navigate(`/`);
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError('An error occurred');
    }
  };

  return (
    <main>
      <Header />
      <section className="login-container">
        <div className='login-wrap'>
          <p>Login</p>
          <div className='form-wrap'>
            <form onSubmit={handleSubmit} action='/'>
              <div className="form-group">
                <p htmlFor="email">Email</p>
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  // required
                />
              </div>
              <div className="form-group">
                <p htmlFor="password">Password</p>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  // required
                />
              </div>
              {error && <p className="error-message">{error}</p>}
              <div className='button-group'>
                <button className='login' type="submit">Login</button>
                <button className='register' type="button">Register</button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Login;