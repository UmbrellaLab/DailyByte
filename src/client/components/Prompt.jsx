import React from 'react';

const Prompt = ({promptData}) => {
  return (
    <div id='algo-prompt'>
      <h2>Challenge of the day</h2>
      <p>{promptData}</p>
    </div>
  )
}

export default Prompt;