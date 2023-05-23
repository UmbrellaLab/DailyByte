import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client'
import App from './components/App';

import styles from './styles.css'

const root = createRoot(document.getElementById("root"));
root.render(<App/>);