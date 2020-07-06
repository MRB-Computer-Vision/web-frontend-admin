import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';

import { useAuth } from '../context/AuthContext';

import AppRoutes from './App.routes';
import AuthRoutes from './Auth.routes';

const Routes: React.FC = () => {
  const { signed, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </div>
    );
  }

  // se o usuario nao estiver logado somente a rota de login estara dispinivel
  return signed ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
