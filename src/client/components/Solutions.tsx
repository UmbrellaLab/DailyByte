import React from 'react';
import Solution from './Solution';

interface Solution {
  solution_id: number;
  username: string;
  solution: string;
  star_count: number;
}

const Solutions = ({ solutions }: { solutions: Solution[] }): JSX.Element => {
  let displaySolutions = [];

  for (const solution of solutions) {
    displaySolutions.push(<Solution solutionData={solution}/>);
  } 
    
  return (
    <div id='algo-solutions'>
      <h2>Solutions of the day</h2>
      <div id='solutions-container'>
        {displaySolutions}
      </div>
    </div>
  )
}

export default Solutions;