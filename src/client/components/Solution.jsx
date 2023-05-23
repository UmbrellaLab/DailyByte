import React from 'react';
import { CodeSnippet } from '@carbon/react';
import { Prism } from '@mantine/prism'

const Solution = ({solutionData}) => {
  return (
    <div>
      <p className='usernameHeader'>{solutionData.username}</p>
      <button >Star</button>
      <p>{solutionData.star_count}</p>
      <div className='code-snippet'>
        <CodeSnippet type='multi' wrapText='true' copyButtonDescription=''>{solutionData.solution}</CodeSnippet>
      </div> 
    </div>
  )
};

export default Solution;