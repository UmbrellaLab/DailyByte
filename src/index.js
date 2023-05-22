import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client'
import App from './client/components/App';

import styles from './client/styles.css'

const root = createRoot(document.getElementById("root"));
root.render(<App />)