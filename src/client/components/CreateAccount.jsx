import React, { useState } from "react";
import { Link, Form } from 'react-router-dom';

const CreateAccount = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  return (
    <div className={'auth-content'}>
      <Form method="post" className={'auth-form'}>
        <input type='text' id='username' name='username' placeholder='username'
          onChange={() => { }} />
        <input type='password' id='password' name='password' placeholder='password'
          onChange={() => { }} />
        <button type='submit'>Create Account</button>
      </Form>
    </div>
  )
}

export default CreateAccount;