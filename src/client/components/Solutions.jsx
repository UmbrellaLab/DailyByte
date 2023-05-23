import React from 'react';

const Solutions = (solutionData) => {
  const solutions = solutionData.map(ele => {
    ele.user_id
  })
  return (
    <div id='algo-Solution'>
      <h2>Solutions of the day</h2>
      <p>{solutions}</p>
    </div>
  )
}

export default Solutions;