import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
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
  const [commonError, setCommonError] = useState('');
  const navigate = useNavigate();

  const location = useLocation();
  useEffect(() => {
    if(location.state){
      setCommonError('An error occurred. Please try login later.')
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("test-axios")
      const dataGet = async () => await axios.get(`${common.api}/test`, {
        headers: {
            'Content-Type': 'application/json'
        },
      });
      const dataPost = async () => {
        //initial call to server to get token
        await axios.get(`${common.api}/token`, {
            headers: {
                'Content-Type': 'application/json'
            },
        });
        //token is passed to the next request header
        return await dataGet()
      }
      console.log("axios", dataPost())
      console.log("test-fetch")
      const dataGetWithFetch = async () => await fetch(`${common.api}/test`, { credentials: 'include' }).then(res => res.json());
      const dataPostWithFetch = async () => {
          //initial call to server to get token
          await fetch(`${common.api}/token`, { credentials: 'include' }).then(res => res.json());
          //token is passed to the next request header
          return await dataGetWithFetch()
      }
      console.log("dataGetWithFetch", dataPostWithFetch())


      const response = await axios.post(common.api + '/login', {
        email: email,
        password: password,
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
      });

      // const response = await fetch(`${common.api}/login`, {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     email: email,
      //     password: password,
      //   }),
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   credentials: 'include'
      // }).then(res => res.json())

      console.log(response)
      if (response.data.success) {
        navigate(`/`);
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.log(error)
      setCommonError('An error occurred. Please try login later.')
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
        {commonError && <p className="common-error-message">{commonError}</p>}
          <p>Login</p>
          <div className='form-wrap'>
            <form onSubmit={handleSubmit} action='/'>
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
                  autoComplete='on'
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