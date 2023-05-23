import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
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
      }
    })
  };

  return (
    <div className={'auth-content'}>
      <form onSubmit={handleSubmit}>
        <input type='text' id='username' name='username' placeholder='username'
            onChange={(e) => {setUsername(e.target.value)}}/>
        <input type='password' id='password' name='password' placeholder='password'
            onChange={(e) => {setPassword(e.target.value)}}/>
        <button type='submit'>Login</button>

        <Link to={'/createAccount'}>Create Account</Link>


      </form>
    </div>
  )
}

export default Login;