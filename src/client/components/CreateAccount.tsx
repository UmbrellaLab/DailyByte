import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const CreateAccount = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [invalidMsg, setInvalidMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('/signup', {
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
        if (data === true) {
          navigate('/Home');
        } else {
          setInvalidMsg('Invalid username or password');
        }
      })
      .catch(err => {
        console.log('Error connecting to server using path \'/signup\'');
      });
  };

  return (
    <div className='auth-content'>
      <form method="post" className='auth-form' onSubmit={handleSubmit}>
        <input type='text' id='username' name='username' placeholder='username'
          onChange={(e) => {setUsername(e.target.value)}} />
        <input type='password' id='password' name='password' placeholder='password'
          onChange={(e) => {setPassword(e.target.value)}} />
        <button type='submit'>Create Account</button>
        <p className='invalidMsg'>{invalidMsg}</p>
      </form>
    </div>
  )
}

export default CreateAccount;