import React from 'react';
import ReactDOM from 'react-dom/client';
import './scss/app.scss';
import App from './App';

console.log(import.meta.env.BASE_URL)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);
