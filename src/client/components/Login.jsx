import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [invalidMsg, setInvalidMsg] = useState();
  const navigate = useNavigate();

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
      if(data){
        navigate('/Home');
      } else {
        setInvalidMsg('Invalid username or password');
      }
    })
    .catch(err => {
      console.log('There was an error connecting to server using path \'/signin\'');
    });
  };

  return (
    <div className='auth-content'>
      <form className='auth-form' onSubmit={handleSubmit}>
        <input type='text' id='username' name='username' placeholder='username'
            onChange={(e) => {setUsername(e.target.value)}}/>
        <input type='password' id='password' name='password' placeholder='password'
            onChange={(e) => {setPassword(e.target.value)}}/>
        <button type='submit'>Login</button>
        <p className='invalidMsg'>{invalidMsg}</p>

        <Link to={'/createAccount'}>Create Account</Link>

        {/* GitHub Authentication */}

      </form>
    </div>
  )
}

export default Login;