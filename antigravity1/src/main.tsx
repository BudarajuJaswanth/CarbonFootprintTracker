import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './pages/App';
import { ErrorBoundary } from './components/ErrorBoundary';
import { reportWebVitals } from './utils/performance';
import './styles.css';

const container = document.getElementById('root')!;
const root = createRoot(container);

reportWebVitals();

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
