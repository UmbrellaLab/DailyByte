import React, { useState } from 'react';

const Prompt = ({promptData}) => {
  return (
    <div>
      <h1>Challenge of the day</h1>
      <p>{promptData}</p>
    </div>
  )
}

export default Prompt;