import React, { useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { EditorView } from '@codemirror/view';
import { javascript } from '@codemirror/lang-javascript';
import Prompt from './Prompt';
import Prompt from './Solutions';

const Home = () => {
  const [code, setCode] = useState();
  const [promptData, setPromptData] = useState();
  const [solutionsData, setSolutionsData] = useState([]);

  useEffect(() => {
    // Function to make a request for the latest algorithm and pass it down to the Prompt component
    const fetchLatestAlgorithm = async () => {
      try {
        const response = await fetch('/daily');
        const data = await response.json();
        setPromptData(data);
      } catch (error) {
        console.log('Error retrieving the latest algorithm:', error);
      }
    };

    fetchLatestAlgorithm();
  }, []);

    // Function to make a request for the latest algorithm and pass it down to the Prompt component
    // const fetchLatestSolutions = async () => {
    //   try {
    //     const response = await fetch('/solutions');
    //     const data = await response.json();
    //     setSolutions(data);
    //   } catch (error) {
    //     console.log('Error retrieving the latest algorithm:', error);
    //   }
    // };

    // fetchLatestSolutions();


  return (
    <div className='home-page'>
      <div id='algo-content'>
        <Prompt promptData={promptData} />
        <div id='algo-solutions'>
          <Solutions solutionsData={solutionsData} />
        </div>
        <CodeMirror
          id='code-mirror'
          value='//Hello World!'
          theme='dark'
          extensions={[javascript({ jsx: true }), EditorView.lineWrapping]}
        />
        <button id='submit-code' name='submit-code' type='button'>
          Submit
        </button>
        <button id='clr-editor' name='clr-editor' type='button'>
          Clear
        </button>
      </div>
    </div>
  );
};

export default Home;
