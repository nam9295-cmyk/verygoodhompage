import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/au-site.css';

const root = document.getElementById('root');
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

if (root.hasChildNodes() && root.dataset.pageStatus !== '404') {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
