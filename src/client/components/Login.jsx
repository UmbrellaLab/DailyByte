import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from "react";

const Login= () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [invalidMsg, setInvalidMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    //  localhost:8080/home?code=5b6ca9e372efce21fc2e
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get("code");
    console.log(codeParam)

  }, []);

  const Client_ID = "473a8476fcc6e8de6ca3";

  function loginWithGithub() {
    window.location.assign("https://github.com/login/oauth/authorize?client_id=" + Client_ID);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/signin', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
      .then(response => response.json())
      .then((data) => {
        if (data) {
          navigate('/Home');
        } else {
          setInvalidMsg('Invalid username or password');
        }
      })
      .catch(err => {
        console.log('Error connecting to server using path \'/signin\'');
      });
  };

  return (
    <div className='auth-content'>
      <form className='auth-form' onSubmit={handleSubmit}>
        <input type='text' id='username' name='username' placeholder='username'
          onChange={(e) => { setUsername(e.target.value) }} />
        <input type='password' id='password' name='password' placeholder='password'
          onChange={(e) => { setPassword(e.target.value) }} />
        <button type='submit'>Login</button>
        <p className='invalidMsg'>{invalidMsg}</p>

        <Link to={'/createAccount'}>Create Account</Link>
        <div>
        <button onClick={loginWithGithub}>Login with Github</button>
        </div>
       
        {/* GitHub Authentication */}

      </form>
    </div>
  )
}

export default Login;