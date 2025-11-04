import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);
// Log environment info for the codespace-based backend URL
console.log('REACT_APP_CODESPACE_NAME=', process.env.REACT_APP_CODESPACE_NAME);

// Construct and log the base codespace backend URL (used by components)
const CODESPACE_BASE = process.env.REACT_APP_CODESPACE_NAME
	? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
	: null;
console.log('Codespace backend base URL (derived):', CODESPACE_BASE);

root.render(<App />);
