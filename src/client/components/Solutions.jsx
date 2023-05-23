import React from 'react';

const Solutions = ({solutions}) => {
  console.log(solutionsData)
  let solutions = []
  for (let key of solutionsData) {
    solutions.push(
    `Top Solution User ${key.user_id} 
     
     Top Solution ${key.solution}
  `
    )
  } 
    
  return (
    <div id='algo-solutions'>
      <h2>Solutions of the day</h2>
      <p>{solutions}</p>
    </div>
  )
}

export default Solutions;