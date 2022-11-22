import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-country-select/dist/react-bootstrap-country-select.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'

import { AuthProvider } from './contexts/AuthContexts';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App style={{height: '100vh'}}/>
    </AuthProvider>
  </React.StrictMode>
);

