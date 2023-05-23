import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { EditorView } from '@codemirror/view';
import { javascript } from '@codemirror/lang-javascript';

const Home = () => {
  const [code, setCode] = useState();

  return (
    <div className='home-page'>
      <div id='algo-content'>
        <div id='algo-prompt'>

        </div>
        <div id='algo-solutions'>

        </div>
        <div id='code-editor'>
          <CodeMirror
            value='//Hello World!'
            height='100px'
            extensions={[javascript({ jsx: true}), EditorView.lineWrapping]}/>
        </div>
        <button id='submit-code' name='submit-code' type='button'>Submit</button>
      </div>
    </div>
  )
}

export default Home;