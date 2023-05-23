import React from 'react';

const Solutions = ({solutions}) => {
  console.log("inside solutions")
  console.log(solutions[0])
  let printSolutions = []
  for (let key of solutions) {
    printSolutions.push(
    `Top Solution User ${key.user_id} 
     
     Top Solution ${key.solution}
  `
    )
  } 
    
  return (
    <div id='algo-solutions'>
      <h2>Solutions of the day</h2>
      <p>{printSolutions}</p>
    </div>
  )
}

export default Solutions;