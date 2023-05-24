import React from 'react';

interface Prompt {
  problem_name: string;
  problem: string;
}

const Prompt = ({promptData}: {promptData: Prompt}): JSX.Element => {

  return (
    <div id='algo-prompt'>
      <h2>Challenge of the day</h2>
      <h3>{promptData.problem_name}</h3>
      <div>
        <p>{promptData.problem}</p>
      </div>
    </div>
  )
}

export default Prompt;