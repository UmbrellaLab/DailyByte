import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [invalidMsg, setInvalidMsg] = useState('');
  const navigate = useNavigate();
  const [githubUsername, setGithubUsername] = useState('');

  const [loggedInWithGithub, setLoggedInWithGithub] = useState(false);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get("code");

    if (codeParam && localStorage.getItem("accessToken") === null) {
      const getAccessToken = async () => {
        await fetch("http://localhost:3000/getAccessToken?code=" + codeParam, {
          method: "GET"
        }).then((response) => {
          return response.json();
        }).then((data) => {
          if (data.access_token) {
            localStorage.setItem("accessToken", data.access_token);
            setLoggedInWithGithub(true);
          }
        });
      };

      getAccessToken();
    }

    if (loggedInWithGithub) {
      getUserData();
    }
  }, [loggedInWithGithub]);

  const getUserData = async () => {
    await fetch("http://localhost:3000/getUserData", {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("accessToken") //BEARER ACCESSTOKEN
      }
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log('inside getUserData fetch response')
      console.log(data);
      navigate('/Home');
    })
  }
  
  function loginWithGithub() {
    const Client_ID = "473a8476fcc6e8de6ca3";
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



        {/* GitHub Authentication */}
        {localStorage.getItem("accessToken") ?
          <>
            <Link to={'/Home'}>github Login Successful submit</Link>
          </>
          :
          <>
            <h3>User is not logged in</h3>
            <button onClick={loginWithGithub}>Login with Github</button>
          </>
        }
      </form>
    </div>
  )
}

export default Login;

