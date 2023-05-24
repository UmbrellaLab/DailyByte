import React, { useState } from 'react';
import { CodeSnippet } from '@carbon/react';

const Solution = ({solutionData}) => {
  const [stars, setStars] = useState(solutionData.star_count);

  const handleStar = (id) => {
    fetch('/solutions', {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        solution_id: id
      })
    })
    .then(res => res.json())
    .then((data) => {
      setStars(data);
    })
    .catch(err => {
      console.log('Error connecting to server using path \'/solutions\'');
    })
  };

  return (
    <div>
      <p className='usernameHeader'>{solutionData.username}</p>
      <button onClick={() => handleStar(solutionData.solution_id)}>Star</button>
      <p>{stars}</p>
      <div className='code-snippet'>
        <CodeSnippet type='multi' wrapText='true' copyButtonDescription=''>{solutionData.solution}</CodeSnippet>
      </div> 
    </div>
  )
};

export default Solution;