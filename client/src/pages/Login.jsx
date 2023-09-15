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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(common.api + '/login', {
        email: email,
        password: password,
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

  const toRegister = () => {
    navigate(`/register`);
  }

  return (
    <main>
      <Header logined={false} />
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
              {error && <p className="error-message">{error}</p>}
              <div className='button-group'>
                <button className='login' type="submit">Login</button>
                <button className='toregister' type="button" onClick={toRegister}>Register</button>
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