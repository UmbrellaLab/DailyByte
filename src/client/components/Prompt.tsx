import React from 'react';

interface promptData {
  problem_name: string;
  problem: string;
}

const Prompt = (promptData: promptData): JSX.Element => {

  return (
    <div id='algo-prompt'>
      <h2>Challenge of the day</h2>
      <p>{promptData.problem_name}</p>
      <p>{promptData.problem}</p>
    </div>
  )
}

export default Prompt;

// {problem_name: 'No Duplicates', problem: 'Given an array of integers return an array with th…tes removed [1,2,3,3,4,5,6,1,1] ==> [1,2,3,4,5,6]'}
// problem
// : 
// "Given an array of integers return an array with the duplicates removed [1,2,3,3,4,5,6,1,1] ==> [1,2,3,4,5,6]"
// problem_name
// : 
// "No Duplicates"
// [[Prototype]]
// : 
// Object