import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import './app.css';
import { App } from './App.jsx';

// HashRouter (not BrowserRouter): the hub deploys to a GitHub-Pages subpath as a
// static bundle with no server to rewrite deep links. With hash routing the
// document path stays at …/index.html, so the base:'./' relative asset URLs
// resolve identically on every route, including deep links. See app/README.md.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
