import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyle from './styles/global';
import Routes from './routes';

import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => (
  <>
    <BrowserRouter>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </BrowserRouter>
    <GlobalStyle />
  </>
);

export default App;
