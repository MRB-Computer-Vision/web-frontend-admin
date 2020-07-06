import React, { createContext, useState, useEffect, useContext } from 'react';

import jsonWebTokenService from 'jsonwebtoken';

import * as auth from '../services/auth';

import api from '../services/api';

interface User {
  id: string;
  name: string;
}

interface AuthContextData {
  signed: boolean;
  messageResponse: string;
  user: User | null;
  loading: boolean;
  signIn(params: any): Promise<any>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [messageResponse, setMessageResponse] = useState<string>('');
  const [loading, setLoading] = useState(true);

  // carregando dados locais
  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // recuperando osd dados do storage
      const tokenLocal = await localStorage.getItem('@mrb:token');
      const userLocal = await localStorage.getItem('@mrb:user');
      // se existir os dados sao setados no estado
      if (userLocal && tokenLocal) {
        setUser(JSON.parse(userLocal));
        setLoading(false);
        api.defaults.headers.Authorization = `Baerer ${tokenLocal}`;
      }
    }
    // chama a funcao assincrona
    loadStorageData();
  });

  function signOut(): void {
    setUser(null);
    localStorage.removeItem('@mrb:token');
    localStorage.removeItem('@mrb:user');
  }

  async function signIn(params: any): Promise<any> {
    const response = await auth.signIn(params);
    // recuperando dados da resposta
    const { message, Authorization, success } = response.data;
    if (Authorization && success) {
      const decodedJwt = jsonWebTokenService.decode(Authorization);
      setUser({ id: decodedJwt?.sub, name: 'Sam' });
      localStorage.setItem('@mrb:token', Authorization);
      localStorage.setItem('@mrb:user', JSON.stringify(user));
      api.defaults.headers.Authorization = `Baerer ${Authorization}`;
    }
    setMessageResponse(message);
    return response;
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        loading,
        signIn,
        signOut,
        messageResponse,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): any {
  // context tem todos os atributos de AuthContextData, e
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }
  return context;
}

export { AuthProvider, useAuth };
