import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import store from './store.js'
import './styles.css'

// If redirected from 404.html, push the preserved path into History before render.
(function fixGhPagesSpaRedirect() {
  const params = new URLSearchParams(window.location.search);
  const preservedPath = params.get('p');
  const preservedQuery = params.get('q');
  if (preservedPath) {
    const target = '/e-plantStore' + preservedPath + (preservedQuery ? preservedQuery : '') + window.location.hash;
    window.history.replaceState(null, '', target);
  }
})();

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter basename="/e-plantStore">
      <App />
    </BrowserRouter>
  </Provider>
)
