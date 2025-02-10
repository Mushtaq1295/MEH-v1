import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AccessoriesProvider } from './contexts/AccessoriesContext';
import { EnginesProvider } from './contexts/EnginesContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <EnginesProvider> {/* ✅ Provides global state for engine data */}
      <AccessoriesProvider> {/* ✅ Provides global state for accessories */}
        <App />
      </AccessoriesProvider>
    </EnginesProvider>
  </React.StrictMode>
);
