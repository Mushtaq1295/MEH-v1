import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AccessoriesProvider } from './contexts/AccessoriesContext';
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AccessoriesProvider>
      <App />
    </AccessoriesProvider>
  </React.StrictMode>
);