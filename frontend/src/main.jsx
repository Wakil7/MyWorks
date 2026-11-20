import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider, useDispatch } from 'react-redux';
// import { BrowserRouter } from 'react-router-dom';

import { store } from './app/store.js';
import { checkAuth } from './features/auth/authSlice.js';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css';
import App from './App.jsx'

function AuthInitializer({children}) {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(checkAuth());
  }, [dispatch]);

  return children;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
        <AuthInitializer>
          <App />
        </AuthInitializer>
    </Provider>
  </StrictMode>,
);
