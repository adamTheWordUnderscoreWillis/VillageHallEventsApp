import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <GoogleOAuthProvider clientId='648611715479-ir065jvp0akr5i1tihs609c1s59rdogr.apps.googleusercontent.com'>
  <StrictMode>
      <App />

  </StrictMode>,
    </GoogleOAuthProvider>
)