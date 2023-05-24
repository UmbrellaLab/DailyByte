import React from 'react';
import Solution from './Solution';

const Solutions = ({solutions}) => {
  console.log('solutions', solutions);

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